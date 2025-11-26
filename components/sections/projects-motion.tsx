"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { CardTilt } from "@/components/ui/3d-card-tilt";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ExternalLink, Github, Code2, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
  category?: string;
}

interface ProjectsMotionProps {
  projects: Project[];
}

export function ProjectsMotion({ projects }: ProjectsMotionProps) {
  const t = useTranslations("projects");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category || "web")))];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => (p.category || "web") === selectedCategory);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Parallax effect for header
      gsap.to(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        opacity: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-background via-accent/5 to-background py-32 overflow-hidden"
    >
      {/* Animated Background Orbs with new color system */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--gradient-start)) 0%, transparent 70%)"
        }}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [20, -20, 20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(var(--gradient-end)) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div ref={headerRef} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text animate-gradient">
                {t("title")}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter with enhanced animations */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg glow-purple"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid with enhanced 3D effects */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  transition={{
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.4 },
                    rotateY: { duration: 0.5 },
                  }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group"
                >
                  <CardTilt className="h-full">
                    <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                        {project.image.startsWith('/') ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <motion.div
                              animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Code2 className="w-24 h-24 text-primary" />
                            </motion.div>
                          </div>
                        ) : (
                          <Image
                            src={project.image}
                            height={1000}
                            width={1000}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                            alt={project.title}
                          />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Overlay on Hover with enhanced animations */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6 gap-4"
                        >
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                              y: hoveredId === project.id ? 0 : 20,
                              opacity: hoveredId === project.id ? 1 : 0,
                            }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors glow-purple"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{
                              y: hoveredId === project.id ? 0 : 20,
                              opacity: hoveredId === project.id ? 1 : 0,
                            }}
                            transition={{ delay: 0.15 }}
                            whileHover={{ scale: 1.2, rotate: -5 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-accent hover:text-accent-foreground transition-colors glow-blue"
                          >
                            <Github className="w-5 h-5" />
                          </motion.a>
                        </motion.div>

                        {/* Corner accent */}
                        <motion.div
                          className="absolute top-4 right-4 p-2 bg-primary/90 rounded-full"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Zap className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <motion.h3
                          className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text"
                          whileHover={{ scale: 1.02 }}
                        >
                          {project.title}
                        </motion.h3>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags with enhanced styling */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: tagIndex * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {/* Animated Progress Bar */}
                        <motion.div
                          className="mt-4 h-1 rounded-full overflow-hidden bg-secondary"
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(to right, hsl(var(--gradient-start)), hsl(var(--gradient-end)))",
                              transformOrigin: "left"
                            }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </CardTilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* View All Projects Button with enhanced styling */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-16">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium shadow-xl hover:shadow-2xl glow-purple transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">{t("viewAll")}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
