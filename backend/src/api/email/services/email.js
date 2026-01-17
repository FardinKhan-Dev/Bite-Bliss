export default ({ strapi }) => ({
    /**
     * Send welcome email to new users
     */
    async sendWelcomeEmail(user) {
        try {
            await strapi.plugins['email'].services.email.send({
                to: user.email,
                from: process.env.EMAIL_ADDRESS_FROM || 'noreply@bitebliss.com',
                subject: 'Welcome to Bite Bliss! 🍴',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to Bite Bliss!</h1>
                </div>
                <div class="content">
                  <p>Hi ${user.username || 'there'},</p>
                  <p>Thank you for joining Bite Bliss! We're excited to have you in our food-loving community.</p>
                  <p>You now have access to our collection of delicious recipes. Browse, save your favorites, and start your culinary journey!</p>
                  <p><strong>What you can do:</strong></p>
                  <ul>
                    <li>🍽️ Browse free recipes</li>
                    <li>📖 Get 5 premium recipe previews per month</li>
                    <li>❤️ Save up to 10 favorite recipes</li>
                  </ul>
                  <p>Want unlimited access? Upgrade to Premium or Chef's Circle anytime!</p>
                  <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/recipes" class="button">Start Exploring Recipes</a>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Bite Bliss. All rights reserved.</p>
                  <p>Questions? Email us at support@bitebliss.com</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });
            console.log(`Welcome email sent to ${user.email}`);
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    },

    /**
     * Send subscription confirmation email
     */
    async sendSubscriptionConfirmation(user, plan) {
        try {
            await strapi.plugins['email'].services.email.send({
                to: user.email,
                from: process.env.EMAIL_ADDRESS_FROM || 'noreply@bitebliss.com',
                subject: `Welcome to ${plan.name}! 🎉`,
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; }
                .plan-badge { display: inline-block; padding: 10px 20px; background: #fbbf24; color: #111; border-radius: 20px; font-weight: bold; }
                .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Subscription Activated!</h1>
                  <div class="plan-badge">${plan.name}</div>
                </div>
                <div class="content">
                  <p>Hi ${user.username},</p>
                  <p>Your subscription to ${plan.name} is now active! Get ready to enjoy premium recipes and features.</p>
                  <div class="features">
                    <h3>Your Benefits:</h3>
                    ${plan.features ? plan.features.map(f => `<li>${f}</li>`).join('') : '<li>Full access to all features</li>'}
                  </div>
                  <p>Start exploring your premium content now!</p>
                  <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/account" class="button">View My Account</a>
                  <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 14px; color: #666;">
                    You can manage your subscription anytime from your account settings.
                  </p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Bite Bliss. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });
            console.log(`Subscription confirmation sent to ${user.email}`);
        } catch (error) {
            console.error('Failed to send subscription confirmation:', error);
        }
    },

    /**
     * Send payment receipt email
     */
    async sendPaymentReceipt(user, amount, plan) {
        try {
            await strapi.plugins['email'].services.email.send({
                to: user.email,
                from: process.env.EMAIL_ADDRESS_FROM || 'noreply@bitebliss.com',
                subject: 'Payment Receipt - Bite Bliss',
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #111; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; }
                .receipt { background: white; padding: 20px; border-radius: 8px; }
                .receipt-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .total { font-size: 18px; font-weight: bold; color: #667eea; }
                .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>Payment Receipt</h2>
                </div>
                <div class="content">
                  <p>Hi ${user.username},</p>
                  <p>Thank you for your payment! Here's your receipt:</p>
                  <div class="receipt">
                    <div class="receipt-row">
                      <span>Date:</span>
                      <span>${new Date().toLocaleDateString()}</span>
                    </div>
                    <div class="receipt-row">
                      <span>Plan:</span>
                      <span>${plan.name}</span>
                    </div>
                    <div class="receipt-row total">
                      <span>Amount Paid:</span>
                      <span>$${(amount / 100).toFixed(2)}</span>
                    </div>
                  </div>
                  <p style="margin-top: 20px; font-size: 14px; color: #666;">
                    This receipt has been sent to ${user.email}. For billing questions, please contact support@bitebliss.com
                  </p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Bite Bliss. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });
            console.log(`Payment receipt sent to ${user.email}`);
        } catch (error) {
            console.error('Failed to send payment receipt:', error);
        }
    },

    /**
     * Send weekly newsletter to Premium/VIP members
     */
    async sendNewsletter(subscribers, recipes) {
        try {
            const emailPromises = subscribers.map(user =>
                strapi.plugins['email'].services.email.send({
                    to: user.email,
                    from: process.env.EMAIL_ADDRESS_FROM || 'noreply@bitebliss.com',
                    subject: `This Week's Delicious Recipes 🍳`,
                    html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .recipe-card { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                  .recipe-title { font-size: 20px; font-weight: bold; color: #667eea; margin-bottom: 10px; }
                  .button { display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px; }
                  .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>This Week's Recipes</h1>
                    <p>Fresh, delicious, and handpicked just for you!</p>
                  </div>
                  <div style="padding: 20px;">
                    ${recipes.map(recipe => `
                      <div class="recipe-card">
                        <div class="recipe-title">${recipe.title}</div>
                        <p>${recipe.description || 'A delicious recipe you\'ll love!'}</p>
                        <p>⏱️ ${recipe.cookingTime} mins | 🍽️ ${recipe.servings} servings</p>
                        <a href="${process.env.CLIENT_URL}/recipes/${recipe.slug}" class="button">View Recipe</a>
                      </div>
                    `).join('')}
                  </div>
                  <div class="footer">
                    <p>You're receiving this because you're a ${user.subscription?.plan?.name || 'Premium'} member</p>
                    <p><a href="${process.env.CLIENT_URL}/account/preferences">Manage email preferences</a></p>
                    <p>© ${new Date().getFullYear()} Bite Bliss. All rights reserved.</p>
                  </div>
                </div>
              </body>
            </html>
          `,
                })
            );

            await Promise.all(emailPromises);
            console.log(`Newsletter sent to ${subscribers.length} subscribers`);
        } catch (error) {
            console.error('Failed to send newsletter:', error);
        }
    },
});
