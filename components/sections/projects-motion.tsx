"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import { CardTilt } from "@/components/ui/3d-card-tilt";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ExternalLink, Github, Code2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

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

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category || "web")))];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => (p.category || "web") === selectedCategory);

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-purple-50/20 to-neutral-50 dark:from-neutral-950 dark:via-purple-950/10 dark:to-neutral-950 py-32 overflow-hidden"
    >
      {/* Background Gradient Blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                {t("badge")}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
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
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group"
                >
                  <CardTilt className="h-full">
                    <div className="relative h-full bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20">
                        {project.image.startsWith('/') ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Code2 className="w-24 h-24 text-purple-400 dark:text-purple-600" />
                          </div>
                        ) : (
                          <Image
                            src={project.image}
                            height={1000}
                            width={1000}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            alt={project.title}
                          />
                        )}

                        {/* Overlay on Hover */}
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
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="w-5 h-5 text-white" />
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
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Github className="w-5 h-5 text-white" />
                          </motion.a>
                        </motion.div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                          {project.title}
                        </h3>

                        <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, tagIndex) => (
                              <motion.span
                                key={tagIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: tagIndex * 0.05 }}
                                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        )}

                        {/* Progress Bar Animation */}
                        <motion.div
                          className="mt-4 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                    </div>
                  </CardTilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* View All Projects Button */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-16">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
            >
              <span>{t("viewAll")}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ExternalLink className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
