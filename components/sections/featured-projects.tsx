"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@heroui/react";
import { ArrowRight, ArrowLeft, ExternalLink, Folder, ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  category?: string;
  link?: string | null;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');
  const tPages = useTranslations('pages.projects');

  const displayProjects = projects.slice(0, 4);

  return (
    <section className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="section-container-wide relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                <Folder className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                {locale === 'fa' ? 'نمونه کارها' : 'Portfolio'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {t('featuredProjects')}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Button
              as={Link}
              href={`/${locale}/projects`}
              variant="flat"
              className="bg-white/[0.03] border border-white/[0.08] hover:border-primary/30 text-white"
              endContent={isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            >
              {tPages('viewAll')}
            </Button>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}
                className="group block h-full"
              >
                <div className="relative h-full glass-card overflow-hidden hover-glow transition-all duration-500 group-hover:border-primary/20">
                  {/* Image */}
                  {project.image && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Hover Icon */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-12 h-12 rounded-xl bg-primary/90 backdrop-blur flex items-center justify-center shadow-lg shadow-primary/25">
                          <ArrowUpRight className="w-6 h-6 text-black" />
                        </div>
                      </div>

                      {/* Title on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="p-4 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/[0.03] border border-white/[0.08] text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 border border-primary/20 text-primary">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
