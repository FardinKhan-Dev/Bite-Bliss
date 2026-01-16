import React, { useState } from 'react';
import { Box, Typography, Button, Textarea, Alert } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';

const HomePage = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { post } = useFetchClient();

    const handleGenerate = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Use admin API route which supports admin authentication
            const { data } = await post('/ai-generator/generate', {
                prompt
            });

            // data contains the created recipe
            const recipe = data.data || data;

            setSuccess(`Recipe "${recipe.title}" created successfully! Click to edit.`);

            setTimeout(() => {
                window.location.href = `/admin/content-manager/collection-types/api::recipe.recipe/${recipe.id}`;
            }, 1500);

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box padding={8} background="neutral100">
            <Box padding={4} background="neutral0" shadow="filterShadow" hasRadius>
                <Typography variant="alpha">AI Recipe Generator 🪄</Typography>
                <Box paddingTop={4}>
                    <Typography variant="epsilon">Enter a recipe idea, and let Gemini do the rest.</Typography>
                </Box>

                <Box paddingTop={4} paddingBottom={4}>
                    <Textarea
                        placeholder="e.g. A spicy vegan pasta with mushrooms"
                        // @ts-ignore
                        label="Recipe Prompt"
                        name="prompt"
                        onChange={e => setPrompt(e.target.value)}
                        value={prompt}
                        rows={4}
                    />
                </Box>

                {error && <Box paddingBottom={4}><Alert closeLabel="Close" title="Error" variant="danger">{error}</Alert></Box>}
                {success && <Box paddingBottom={4}><Alert closeLabel="Close" title="Success" variant="success">{success}</Alert></Box>}

                <Button onClick={handleGenerate} loading={loading} disabled={!prompt}>Generate Recipe</Button>
            </Box>
        </Box>
    );
};

export default HomePage;
