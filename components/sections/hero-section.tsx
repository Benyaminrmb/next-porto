"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroSection({ name, title, description }: HeroSectionProps) {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 1,
            ease: "easeOut",
          }}
          className="text-3xl md:text-5xl lg:text-7xl font-bold dark:text-white text-center"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {name}
          </span>
        </motion.div>

        {title && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.6,
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-600 dark:text-neutral-400 text-center"
          >
            {title}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="font-light text-base md:text-xl lg:text-2xl dark:text-neutral-200 text-neutral-700 text-center max-w-3xl"
        >
          {description}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1.3,
            duration: 0.5,
          }}
          className="flex gap-4 mt-8"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-neutral-700 dark:border-neutral-300 text-neutral-700 dark:text-neutral-300 px-8 py-3 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          onClick={scrollToAbout}
          className="absolute bottom-10 cursor-pointer"
        >
          <ArrowDown className="w-8 h-8 text-neutral-600 dark:text-neutral-400 animate-bounce" />
        </motion.div>
      </motion.div>
    </AuroraBackground>
  );
}
