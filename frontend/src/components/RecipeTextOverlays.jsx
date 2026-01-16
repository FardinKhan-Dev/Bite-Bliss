import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * RecipeTextOverlays Component
 * 
 * Displays recipe name and tagline at the start, then fades out to reveal the recipe animation
 */
const RecipeTextOverlays = ({ recipe, containerRef }) => {
    // Get scroll progress from the same container as ScrollytellingHero
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"] // Must match ScrollytellingHero for sync
    });

    // Fade out early (0-25% of scroll) to not block recipe visuals
    const introOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.25],
        [1, 0.5, 0]
    );

    // Text sections that appear after intro fades
    const textSections = [
        {
            title: recipe.name,
            subtitle: recipe.tagline,
            range: [0, 0.25]
        },
        {
            title: "Hand-crafted perfection",
            subtitle: recipe.description,
            range: [0.25, 0.5]
        },
        {
            title: `Ready in ${recipe.cookingTime}`,
            subtitle: `Serves ${recipe.servings} hungry people`,
            range: [0.5, 0.75]
        },
        {
            title: recipe.isPremium ? "Premium Recipe" : "Free Recipe",
            subtitle: recipe.isPremium ? "Unlock with Premium membership" : "Get the full recipe now",
            range: [0.75, 1]
        }
    ];

    // Calculate opacity for each text section (must be at top level for hooks)
    const text1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.25], [0, 1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.4, 0.5], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.65, 0.75], [0, 1, 1, 0]);
    const text4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.9, 1], [0, 1, 1, 0]); // Synced with button

    const textOpacities = [text1Opacity, text2Opacity, text3Opacity, text4Opacity];

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            {/* Text Overlays - all appear in the same centered position */}
            {textSections.map((section, index) => (
                <motion.div
                    key={index}
                    style={{ opacity: textOpacities[index] }}
                    className="absolute inset-0 flex flex-col text-center items-center justify-start top-24 px-6"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight mb-6"
                        style={{
                            fontFamily: "'Outfit', 'Inter', sans-serif",
                            backgroundImage: recipe.gradient,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 4px 30px rgba(0,0,0,0.2))'
                        }}
                    >
                        {section.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-2xl md:text-4xl font-medium text-white/90 mb-8 max-w-3xl"
                        style={{
                            fontFamily: "'Outfit', 'Inter', sans-serif",
                            textShadow: '0 2px 15px rgba(0,0,0,0.5)'
                        }}
                    >
                        {section.subtitle}
                    </motion.p>
                </motion.div>
            ))}
        </div>
    );
};

export default RecipeTextOverlays;
