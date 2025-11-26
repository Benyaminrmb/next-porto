"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
}

interface FallingStarsProps {
  count?: number;
  speed?: "slow" | "medium" | "fast";
}

export function FallingStars({ count = 30, speed = "medium" }: FallingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Speed multipliers
    const speedMultiplier = {
      slow: 0.5,
      medium: 1,
      fast: 2,
    }[speed];

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Initialize stars
    const createStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      length: Math.random() * 80 + 20,
      speed: (Math.random() * 3 + 2) * speedMultiplier,
      opacity: Math.random() * 0.5 + 0.5,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3, // ~45 degrees with variation
    });

    starsRef.current = Array.from({ length: count }, createStar);

    // Animation loop
    const animate = () => {
      // Create trail effect with semi-transparent black
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star, index) => {
        // Calculate end point based on angle
        const endX = star.x + Math.cos(star.angle) * star.length;
        const endY = star.y + Math.sin(star.angle) * star.length;

        // Create gradient for the star trail
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${star.opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(168, 85, 247, 0)");

        // Draw the star
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add a glowing point at the head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Reset star when it goes off screen
        if (star.y > canvas.height + star.length || star.x > canvas.width + star.length) {
          starsRef.current[index] = createStar();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
