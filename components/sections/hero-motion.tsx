"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextMorph } from "@/components/ui/text-morph";
import { FallingStars } from "@/components/ui/falling-stars";
import { FloatingParticles } from "@/components/ui/floating-particles";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Download, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate gradient orbs entrance
      gsap.from([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Continuous floating animation for orbs
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb2Ref.current, {
        y: 40,
        x: -30,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(orb3Ref.current, {
        y: -20,
        x: 15,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tl.from(titleRef.current, {
        scale: 0.5,
        opacity: 0,
        rotationX: -90,
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
            stagger: 0.15,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.3"
        )
        .from(
          ".hero-social > *",
          {
            x: -30,
            opacity: 0,
            rotation: -180,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.5"
        );

      // Enhanced parallax on scroll with ScrollTrigger
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -150,
        opacity: 0.5,
        scale: 0.95,
      });

      // Parallax for orbs
      gsap.to([orb1Ref.current, orb2Ref.current, orb3Ref.current], {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        opacity: 0,
        stagger: 0.1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const roles = [
    title || "Senior PHP Developer",
    "Laravel Expert",
    "Full Stack Developer",
    "API Architect",
    "Creative Coder",
  ];

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Falling Stars Background */}
      <FallingStars count={25} speed="medium" />

      {/* Floating Particles Background */}
      <FloatingParticles count={30} />

      {/* Animated Gradient Orbs with new color system */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl opacity-70"
        style={{
          background: "radial-gradient(circle, hsl(var(--gradient-start)) 0%, transparent 70%)"
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl opacity-70"
        style={{
          background: "radial-gradient(circle, hsl(var(--gradient-end)) 0%, transparent 70%)"
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--gradient-mid)) 0%, transparent 70%)"
        }}
      />

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Greeting Text with icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-lg md:text-xl text-muted-foreground font-light"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            {t("greeting")}
          </motion.div>

          {/* Name with Enhanced Gradient */}
          <div ref={titleRef} className="relative">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="inline-block gradient-text animate-gradient">
                {name}
              </span>
            </h1>

            {/* Animated Underline with gradient */}
            <motion.div
              className="absolute -bottom-4 left-1/2 h-1.5 rounded-full"
              style={{
                background: "linear-gradient(to right, hsl(var(--gradient-start)), hsl(var(--gradient-end)))"
              }}
              initial={{ width: 0, x: "-50%" }}
              animate={{ width: "100%", x: "-50%" }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>

          {/* Morphing Role Text with new colors */}
          <div ref={morphTextRef} className="text-2xl md:text-4xl lg:text-5xl font-semibold min-h-[60px] flex items-center">
            <TextMorph
              texts={roles}
              className="gradient-text"
              duration={2500}
            />
          </div>

          {/* Description */}
          <motion.p
            className="hero-description max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Action Buttons with new color system */}
          <div className="hero-buttons flex flex-wrap gap-4 mt-4 justify-center">
            <MagneticButton>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium shadow-xl hover:shadow-2xl glow-purple transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10">{t("viewWork")}</span>
                <motion.div
                  className="absolute inset-0 bg-accent"
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
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2"
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
                className="px-8 py-4 bg-gradient-to-r from-[hsl(var(--success))] to-emerald-500 text-white rounded-full font-medium shadow-xl hover:shadow-2xl glow-cyan transition-all duration-300 flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>{t("downloadCV")}</span>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Social Links with enhanced hover effects */}
          <div className="hero-social flex gap-6 mt-8">
            <motion.a
              href="https://github.com/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 glow-purple"
            >
              <Github className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/benyaminrmb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-all duration-300 glow-blue"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>

          {/* Enhanced Scroll Indicator */}
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
              <span className="text-sm text-muted-foreground font-medium">
                {t("scrollDown")}
              </span>
              <div className="w-6 h-10 border-2 border-primary rounded-full p-1 group-hover:glow-purple transition-all">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
