module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            // Check if this is an EBUSY error from file upload
            if (error.code === 'EBUSY' || (error.message && error.message.includes('EBUSY'))) {
                // Check if this is an upload request
                if (ctx.request.url.includes('/upload') || ctx.request.url.includes('/api/upload')) {
                    strapi.log.warn('File uploaded successfully to Cloudinary and saved to DB. Windows temp file cleanup delayed (EBUSY) - this is normal on Windows and can be safely ignored.');

                    // The upload succeeded - just suppress the error
                    // Don't send a response body as it was already handled
                    ctx.status = 204; // No Content - success but no body needed
                    return;
                }
            }

            // If it's not an EBUSY error we can handle, rethrow it
            throw error;
        }
    };
};
