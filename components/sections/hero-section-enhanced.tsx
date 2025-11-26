"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowDown, Download, Mail } from "lucide-react";

interface HeroSectionProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroSection({ name, title, description }: HeroSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Create a timeline for sequential animations
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 0.5,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.3"
        )
        .from(
          descRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          buttonsRef.current?.children || [],
          {
            y: 20,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.3"
        );

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
        opacity: 0.5,
        scale: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AuroraBackground>
      <div className="relative flex flex-col gap-6 items-center justify-center px-4 min-h-screen">
        {/* Animated title */}
        <div
          ref={titleRef}
          className="text-center"
        >
          <motion.div className="text-3xl md:text-5xl lg:text-7xl font-bold dark:text-white">
            <span className="block mb-2">Hi, I'm</span>
            <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.div>
        </div>

        {/* Title */}
        {title && (
          <motion.div
            ref={subtitleRef}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-600 dark:text-neutral-400 text-center"
          >
            <span className="relative inline-block">
              {title}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
            </span>
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          ref={descRef}
          className="font-light text-base md:text-xl lg:text-2xl dark:text-neutral-200 text-neutral-700 text-center max-w-3xl"
        >
          {description}
        </motion.div>

        {/* Magnetic Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap gap-4 mt-8 justify-center">
          <MagneticButton>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">View My Work</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-neutral-700 dark:border-neutral-300 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </motion.a>
          </MagneticButton>
        </div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.5,
            duration: 1,
          }}
          onClick={scrollToAbout}
          className="absolute bottom-10 cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
              Scroll Down
            </span>
            <ArrowDown className="w-6 h-6 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
