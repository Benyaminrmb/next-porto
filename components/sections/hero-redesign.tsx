"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Code2, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroRedesignProps {
  name: string;
  title?: string;
  description: string;
  avatarUrl?: string;
}

export function HeroRedesign({ name, title, description, avatarUrl }: HeroRedesignProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient orbs */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-primary to-accent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-full h-full bg-gradient-to-l from-accent to-primary" />
      </motion.div>

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 section-container"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center gap-8 max-w-5xl mx-auto"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="glass-card px-4 py-2 text-sm font-medium flex items-center gap-2 hover-lift"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new opportunities
            </Badge>
          </motion.div>

          {/* Avatar with glass effect */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50" />
            <Avatar className="h-32 w-32 relative border-4 border-white/20 shadow-2xl">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-4xl font-bold">
                {name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Name with oversized typography */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-display gradient-text animate-gradient leading-none">
              {name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
                whileHover={{ scale: 1.05 }}
              >
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-lg font-semibold">{title || "Full Stack Developer"}</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-lg font-semibold">Creative Builder</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed text-body"
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-4 justify-center"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden px-8 py-6 text-lg rounded-full shadow-xl glow-purple"
              asChild
            >
              <a href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full glass-card hover-lift"
              asChild
            >
              <a href="#contact">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-full glass-card hover-lift"
              asChild
            >
              <a href="/resume.pdf" download>
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/benyaminrmb", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/benyaminrmb", label: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full glass-card hover-lift"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-sm text-muted-foreground font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-primary rounded-full mx-auto"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
