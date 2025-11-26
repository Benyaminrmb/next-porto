"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { TextMorph } from "@/components/ui/text-morph";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

interface HeroMotionProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroMotion({ name, title, description }: HeroMotionProps) {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const morphTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
      })
        .from(
          morphTextRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-buttons > *",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.3"
        )
        .from(
          ".hero-social > *",
          {
            x: -30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.5"
        );

      // Parallax on scroll
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        opacity: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const roles = [
    title || "Senior PHP Developer",
    "Laravel Expert",
    "Full Stack Developer",
    "API Architect",
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-50 via-purple-50/30 to-neutral-50 dark:from-neutral-950 dark:via-purple-950/20 dark:to-neutral-950">
      {/* Floating Particles Background */}
      <FloatingParticles count={40} />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-700" />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Greeting Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light"
          >
            {t("greeting")}
          </motion.div>

          {/* Name with Gradient */}
          <div ref={titleRef} className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                {name}
              </span>
            </h1>

            {/* Underline Animation */}
            <motion.div
              className="absolute -bottom-4 left-1/2 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "100%", x: "-50%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>

          {/* Morphing Role Text */}
          <div ref={morphTextRef} className="text-2xl md:text-4xl lg:text-5xl font-semibold min-h-[60px] flex items-center">
            <TextMorph
              texts={roles}
              className="bg-gradient-to-r from-neutral-700 via-neutral-900 to-neutral-700 dark:from-neutral-200 dark:via-neutral-100 dark:to-neutral-200 bg-clip-text text-transparent"
              duration={2500}
            />
          </div>

          {/* Description */}
          <motion.p
            className="hero-description max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <div className="hero-buttons flex flex-wrap gap-4 mt-4 justify-center">
            <MagneticButton>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">{t("viewWork")}</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </MagneticButton>

            <MagneticButton>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-neutral-700 dark:border-neutral-300 text-neutral-700 dark:text-neutral-300 rounded-full font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                <span>{t("contact")}</span>
              </motion.a>
            </MagneticButton>

            <MagneticButton>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{t("downloadCV")}</span>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Social Links */}
          <div className="hero-social flex gap-6 mt-8">
            <motion.a
              href="https://github.com/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-purple-600 hover:text-white transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            onClick={scrollToProjects}
            className="absolute bottom-10 cursor-pointer group"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {t("scrollDown")}
              </span>
              <div className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-400 rounded-full mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
