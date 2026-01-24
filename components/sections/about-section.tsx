"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Code2, Zap, Heart, Rocket, Sparkles } from "lucide-react";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AboutSectionProps {
  name: string;
  description: string;
}

export function AboutSection({ name, description }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const  cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Animate profile image with 3D rotation
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        rotateY: -30,
        rotateX: 10,
        scale: 0.8,
        opacity: 0,
      });

      // Animate highlight cards with stagger
      gsap.from(".highlight-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Clean Code",
      description: "Writing maintainable and scalable code",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Performance",
      description: "Optimized for speed and efficiency",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "User-Centric",
      description: "Focused on great user experiences",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Always Learning",
      description: "Staying updated with latest tech",
      gradient: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 overflow-hidden"
    >
      <BackgroundBeams className="absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 100, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-yellow-500" />
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </motion.div>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image with GitHub Avatar */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated gradient blob */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
              />

              {/* Profile card with 3D effect */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-neutral-900 rounded-3xl p-4 border border-neutral-200 dark:border-neutral-800 shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="https://github.com/benyaminrmb.png"
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay gradient on hover */}
                  <motion.div
                    whileHover={{ opacity: 0.1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300"
                  />
                </div>

                {/* Floating badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring" as const, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
                >
                  Available for hire
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4"
              >
                Full-Stack Developer
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed"
              >
                {description}
              </motion.p>
            </div>

            {/* Highlight cards with GSAP animation */}
            <div ref={cardsRef} className="grid grid-cols-2 gap-4 pt-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card group relative"
                >
                  <motion.div
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-white dark:bg-neutral-900 rounded-xl p-4 border border-neutral-200 dark:border-neutral-800 cursor-pointer transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                    <div className="relative z-10">
                      <div className={`mb-2 inline-block p-2 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
