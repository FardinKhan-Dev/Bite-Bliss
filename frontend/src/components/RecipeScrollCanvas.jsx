/**
 * FILE: src/components/RecipeScrollCanvas.jsx
 * PURPOSE: Canvas-based scroll animation component for recipe image sequences
 */

import { useRef, useEffect, useState } from 'react';

export default function RecipeScrollCanvas({ recipe, scrollProgress }) {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    // Load all images from recipe folder
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages = [];
            let loadedCount = 0;

            // Create array of image promises
            for (let i = 1; i <= recipe.frameCount; i++) {
                const img = new Image();
                const paddedNum = String(i).padStart(4, '0');
                img.src = `${recipe.folderPath}/${paddedNum}.jpg`;

                // Track loading progress
                img.onload = () => {
                    loadedCount++;
                    setLoadProgress(Math.floor((loadedCount / recipe.frameCount) * 100));

                    // Mark as loaded when first image is ready
                    if (loadedCount === 1) {
                        setLoading(false);
                    }
                };

                img.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}`);
                    loadedCount++;
                };

                loadedImages.push(img);
            }

            setImages(loadedImages);
        };

        loadImages();
    }, [recipe]);

    // Draw current frame based on scroll progress
    useEffect(() => {
        if (!images.length || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const render = () => {
            // Get current scroll progress (0 to 1)
            const progress = scrollProgress.get();

            // Map to frame index (0 to frameCount - 1)
            const frameIndex = Math.min(
                Math.floor(progress * (recipe.frameCount - 1)),
                recipe.frameCount - 1
            );

            const img = images[frameIndex];

            if (img && img.complete && img.naturalHeight !== 0) {
                // Get container dimensions
                const container = canvas.parentElement;
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                // Set canvas size to match container
                canvas.width = containerWidth;
                canvas.height = containerHeight;

                // Calculate scale to COVER the canvas (fills screen width, may crop top/bottom)
                const scale = Math.max(
                    containerWidth / img.width,
                    containerHeight / img.height
                );

                // Center the image
                const x = (containerWidth - img.width * scale) / 2;
                const y = (containerHeight - img.height * scale) / 2;

                // Clear and draw
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    img,
                    x,
                    y,
                    img.width * scale,
                    img.height * scale
                );
            }
        };

        // Listen to scroll changes and render
        const unsubscribe = scrollProgress.on('change', () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
        });

        // Initial render
        render();

        // Cleanup
        return () => {
            unsubscribe();
            cancelAnimationFrame(animationFrameId);
        };
    }, [images, scrollProgress, recipe.frameCount]);

    return (
        <div className="relative w-full h-full">
            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/50 backdrop-blur-sm z-10">
                    <div className="relative">
                        {/* Spinner */}
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-solid"></div>
                        {/* Progress percentage */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">{loadProgress}%</span>
                        </div>
                    </div>
                    <p className="text-white mt-4 text-sm">Loading recipe animation...</p>
                </div>
            )}

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                aria-label={`${recipe.name} animation`}
            />
        </div>
    );
}
