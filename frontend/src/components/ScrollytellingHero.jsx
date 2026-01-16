/**
 * FILE: src/components/ScrollytellingHero.jsx
 * PURPOSE: Full-screen scrollytelling hero section with text overlays and navigation
 */

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import RecipeScrollCanvas from './RecipeScrollCanvas';
import RecipeTextOverlays from './RecipeTextOverlays';
import { featuredRecipes } from '../data/featuredRecipes';

export default function ScrollytellingHero() {
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const containerRef = useRef(null);

    const currentRecipe = featuredRecipes[currentRecipeIndex];

    // Apply background color to entire page
    useEffect(() => {
        document.body.style.backgroundColor = currentRecipe.backgroundColor;
        document.body.style.transition = 'background-color 1s ease';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [currentRecipe.backgroundColor]);

    // Track scroll progress through this section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Transform for CTA button (appears with 4th text - synced timing)
    const buttonOpacity = useTransform(scrollYProgress, [0.75, 0.85, 0.9, 1], [0, 1, 1, 0]);

    // Scroll indicator opacity (fades out quickly at start)
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[800vh]">
            {/* Sticky container - stays visible while scrolling through 800vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* Background gradient */}
                <div
                    className="absolute inset-0 transition-all duration-1000"
                    style={{ background: currentRecipe.gradient, opacity: 0.1 }}
                />

                {/* Canvas Animation */}
                <div className="absolute inset-0">
                    <RecipeScrollCanvas recipe={currentRecipe} scrollProgress={scrollYProgress} />
                </div>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30" />

                {/* Recipe Text Overlays (fades out early) */}
                <RecipeTextOverlays recipe={currentRecipe} containerRef={containerRef} />

                {/* CTA Button (appears at end) */}
                <motion.div
                    style={{ opacity: buttonOpacity }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <Link
                        to={`/recipe/${currentRecipe.slug}`}
                        className="pointer-events-auto bg-emerald-500 text-white px-12 py-6 rounded-full font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl hover:scale-105 inline-flex items-center gap-3"
                    >
                        {currentRecipe.isPremium ? (
                            <>
                                <span>🔒</span>
                                <span>Unlock Recipe</span>
                                <span>👑</span>
                            </>
                        ) : (
                            <>
                                <span>Get Recipe</span>
                                <span>→</span>
                            </>
                        )}
                    </Link>
                </motion.div>

                {/* Bottom Navigation Pills */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <div className="flex items-center gap-3 bg-black/50 backdrop-blur-xl px-6 py-4 rounded-full border border-white/20">
                        {featuredRecipes.map((recipe, index) => (
                            <button
                                key={recipe.id}
                                onClick={() => setCurrentRecipeIndex(index)}
                                className={`transition-all duration-300 ${index === currentRecipeIndex
                                    ? 'w-12 h-3 rounded-full'
                                    : 'w-3 h-3 rounded-full'
                                    }`}
                                style={{
                                    backgroundColor: index === currentRecipeIndex ? recipe.color : '#ffffff40'
                                }}
                                aria-label={`View ${recipe.name}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll indicator (only show at start) */}
                <motion.div
                    initial={{ opacity: 1 }}
                    style={{ opacity: scrollIndicatorOpacity }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2"
                >
                    <div className="flex flex-col items-center gap-2 text-white/70">
                        <p className="text-sm font-medium">Scroll to explore</p>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="text-2xl"
                        >
                            ↓
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
