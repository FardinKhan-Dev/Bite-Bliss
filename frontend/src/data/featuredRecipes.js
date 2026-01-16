/**
 * FILE: src/data/featuredRecipes.js
 * PURPOSE: Recipe data for featured scrollytelling recipes
 */

export const featuredRecipes = [
  {
    id: 1,
    slug: "mac-and-cheese",
    name: "Creamy Mac & Cheese",
    tagline: "Comfort food perfection",
    difficulty: "Medium",
    cookingTime: "45 min",
    servings: "6-8",
    folderPath: "/Macaroni and Cheese",
    frameCount: 192,
    color: "#FFB74D",
    gradient: "linear-gradient(135deg, #FFB74D 0%, #FFA726 100%)",
    backgroundColor: "#62380c",
    description: "Triple cheese blend meets perfectly al dente pasta in this restaurant-quality comfort classic.",
    isPremium: false
  },
  {
    id: 2,
    slug: "pepperoni-pizza",
    name: "NY Style Pepperoni Pizza",
    tagline: "Authentic Italian mastery",
    difficulty: "Advanced",
    cookingTime: "2h 30min",
    servings: "2-3",
    folderPath: "/New York Style Pepperoni Pizza",
    frameCount: 190,
    color: "#E57373",
    gradient: "linear-gradient(135deg, #E57373 0%, #FF6F00 100%)",
    backgroundColor: "#460309",
    description: "Hand-tossed perfection with San Marzano tomatoes and buffalo mozzarella.",
    isPremium: true
  },
  {
    id: 3,
    slug: "fried-chicken",
    name: "Southern Fried Chicken",
    tagline: "Crispy, juicy, legendary",
    difficulty: "Medium",
    cookingTime: "1 hour",
    servings: "4-6",
    folderPath: "/Southern Fried Chicken",
    frameCount: 192,
    color: "#997300",
    gradient: "linear-gradient(135deg, #997300 0%, #FFA726 100%)",
    backgroundColor: "#462f12",
    description: "Double-fried technique with secret spice blend creates that addictive crunch.",
    isPremium: true
  }
];
