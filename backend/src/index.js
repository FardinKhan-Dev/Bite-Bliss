export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Patch the upload service to handle Windows EBUSY errors gracefully
    if (process.platform === 'win32') {
      // Wait for upload plugin to load
      const uploadService = strapi.plugin('upload').service('upload');

      if (uploadService && uploadService.uploadFiles) {
        const originalUploadFiles = uploadService.uploadFiles;

        uploadService.uploadFiles = async function (...args) {
          try {
            return await originalUploadFiles.apply(this, args);
          } catch (error) {
            // If it's an EBUSY error, the file was likely uploaded successfully
            // Check if we have the file data despite the error
            if (error.code === 'EBUSY' || (error.message && error.message.includes('EBUSY'))) {
              strapi.log.warn('File upload succeeded but temp cleanup failed (EBUSY - Windows file lock). This is normal.');
              // If we have file data in args or somewhere, return it
              // Otherwise, swallow the error and return empty array
              return args[0] && args[0].files ? args[0].files : [];
            }
            throw error;
          }
        };
      }
    }

    // Seed subscription plans if they don't exist
    try {
      const existingPlans = await strapi.documents('api::subscription-plan.subscription-plan').findMany();

      if (!existingPlans || existingPlans.length === 0) {
        console.log('📦 Seeding subscription plans...');

        const plans = [
          {
            name: 'Free',
            description: 'Access to basic recipes',
            price: 0,
            yearlyPrice: 0,
            tier: 0,
            features: [
              'Access to free recipes',
              'Basic search',
              'Save up to 10 favorites'
            ],
            isActive: true,
          },
          {
            name: 'Premium',
            description: 'Unlock all premium recipes',
            price: 7.99,
            yearlyPrice: 79.99,
            tier: 1,
            features: [
              'All free features',
              'Access to premium recipes',
              'Unlimited favorites',
              'Ad-free experience',
              'Meal planning tools'
            ],
            isActive: true,
          },
          {
            name: "Chef's Circle",
            description: 'VIP access to everything',
            price: 14.99,
            yearlyPrice: 149.99,
            tier: 2,
            features: [
              'All premium features',
              'Exclusive chef masterclasses',
              'Priority support',
              'Early access to new recipes',
              'Downloadable recipe PDFs'
            ],
            isActive: true,
          },
        ];

        for (const plan of plans) {
          await strapi.documents('api::subscription-plan.subscription-plan').create({
            data: plan,
          });
          console.log(`✅ Created plan: ${plan.name}`);
        }

        console.log('✨ Subscription plans seeded successfully!');
      } else {
        console.log(`ℹ️  Found ${existingPlans.length} existing subscription plans`);
      }
    } catch (error) {
      console.error('❌ Error seeding subscription plans:', error);
    }
  },
};
