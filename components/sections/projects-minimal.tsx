"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@heroui/react";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  link: string | null;
  role?: string;
}

interface ProjectsMinimalProps {
  projects: Project[];
}

export function ProjectsMinimal({ projects }: ProjectsMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';

  // Show only 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-32 md:py-40 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />

      <div className="section-container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-white/40 font-medium">
            {locale === 'fa' ? 'نمونه کارها' : 'Featured Work'}
          </span>
        </motion.div>

        {/* Projects grid - clean 3 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut"
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="group block"
                >
                  {/* Project image with hover effect */}
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-white/[0.02]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Role badge */}
                    {project.role && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.2,
                          ease: "easeOut"
                        }}
                        className="absolute top-4 left-4"
                      >
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white/90">
                          {project.role}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Project info */}
                  <div className="space-y-3">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.1,
                        ease: "easeOut"
                      }}
                      className="text-xl font-semibold text-white group-hover:text-white/80 transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.2,
                        ease: "easeOut"
                      }}
                      className="text-sm text-white/50 leading-relaxed line-clamp-2"
                    >
                      {project.description}
                    </motion.p>

                    {/* Minimal tags */}
                    {project.tags && project.tags.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut"
                        }}
                        className="flex flex-wrap gap-2 pt-2"
                      >
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs text-white/40"
                          >
                            {tag}
                            {i < Math.min(2, project.tags!.length - 1) && ', '}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* View all projects link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              as={Link}
              href={`/${locale}/projects`}
              variant="bordered"
              className="border border-white/10 text-white/70 hover:text-white hover:border-white/30 px-6 py-5 text-sm rounded-full font-medium backdrop-blur-sm transition-all"
              endContent={
                <motion.div
                  animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {isRTL ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                </motion.div>
              }
            >
              {locale === 'fa' ? 'همه پروژه‌ها' : 'View all projects'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
