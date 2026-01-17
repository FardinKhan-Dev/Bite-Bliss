import { GoogleGenAI } from '@google/genai';

export default {
  async generate(ctx) {
    console.log('=== AI Generator: Function called ===');
    try {
      console.log('Request body:', ctx.request.body);
      const { prompt } = ctx.request.body;

      if (!prompt) {
        return ctx.badRequest('Prompt is required');
      }

      console.log('Prompt received:', prompt);

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return ctx.internalServerError('Gemini API Key is not configured');
      }

      console.log('API key present, initializing GoogleGenAI...');
      const genAI = new GoogleGenAI({ apiKey });

      const systemPrompt = `
        You are a professional chef. Generate a unique recipe based on this user prompt: "${prompt}".
        Return ONLY valid JSON with this exact structure:
        {
          "title": "Recipe Title",
          "description": "Short appetizing description",
          "ingredients": [
            { "type": "paragraph", "children": [{ "type": "text", "text": "1 cup flour" }] },
            { "type": "paragraph", "children": [{ "type": "text", "text": "2 eggs" }] }
          ],
          "instructions": [
            { "type": "paragraph", "children": [{ "type": "text", "text": "Step 1: Mix flour..." }] },
            { "type": "paragraph", "children": [{ "type": "text", "text": "Step 2: Add eggs..." }] }
          ],
          "cookingTime": 30 (integer in minutes),
          "servings": 2 (integer),
          "isPremium": false,
          "category": "Dinner" (Choose from: Breakfast, Lunch, Dinner, Dessert, Snack)
        }
        IMPORTANT: 
        - ingredients and instructions must be arrays of paragraph objects as shown
        - Each ingredient and instruction step should be separate paragraph
        - Do not include markdown formatting (like \`\`\`json). Just the raw JSON string.
      `;

      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{
          role: 'user',
          parts: [{ text: systemPrompt }]
        }],
      });

      const text = response.text.trim();

      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

      let recipeData;
      try {
        recipeData = JSON.parse(cleanJson);
      } catch (parseError) {
        console.error('Failed to parse AI response:', text);
        return ctx.badRequest('AI generated invalid JSON');
      }

      // Handle Category Logic
      let category = await strapi.db.query('api::category.category').findOne({
        where: { name: { $containsi: recipeData.category } }
      });

      if (!category) {
        // Create category if it doesn't exist using Document Service API
        category = await strapi.documents('api::category.category').create({
          data: {
            name: recipeData.category,
            slug: recipeData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
          }
        });
      }

      // Create Recipe using Document Service API
      const newRecipe = await strapi.documents('api::recipe.recipe').create({
        data: {
          title: recipeData.title,
          slug: recipeData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
          description: recipeData.description,
          ingredients: recipeData.ingredients,
          instructions: recipeData.instructions,
          cookingTime: recipeData.cookingTime,
          servings: recipeData.servings,
          isPremium: recipeData.isPremium || false,
          category: category.id,
          publishedAt: new Date(),
        },
      });

      return newRecipe;

    } catch (error) {
      console.error('AI Generation Error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      return ctx.internalServerError('Failed to generate recipe');
    }
  },
};
