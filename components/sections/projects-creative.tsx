"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, ArrowLeft, Briefcase } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
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

interface ProjectsCreativeProps {
  projects: Project[];
}

export function ProjectsCreative({ projects }: ProjectsCreativeProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';

  // Show only first 4 projects as featured
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Wavy Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(94, 234, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(94,234,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(94,234,212,0.02)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />
      </div>

      <div className="section-container-wide relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card border border-primary/20 mb-8">
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-primary uppercase tracking-wide">
              {locale === 'fa' ? 'نمونه کارها' : 'Portfolio'}
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold gradient-text mb-6 leading-tight">
            {locale === 'fa' ? 'پروژه‌های برجسته' : 'Featured Work'}
          </h2>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
            {locale === 'fa'
              ? 'مجموعه‌ای از بهترین کارهایی که با عشق ساخته‌ام'
              : 'A collection of my best work, crafted with passion'}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {featuredProjects.map((project, index) => (
            <CardContainer
              key={project.id}
              containerClassName="py-0"
              className="w-full"
            >
              <CardBody className="w-full h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <CardItem
                    translateZ={50}
                    className="w-full"
                  >
                    <div className="glass-card p-4 group-hover:border-primary/40 transition-all overflow-hidden">
                      {/* Project Image */}
                      <CardItem
                        translateZ={100}
                        className="w-full mb-6 relative overflow-hidden rounded-xl"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                          />

                          {/* Overlay on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              className="flex gap-3"
                            >
                              <Button
                                as={Link}
                                href={`/${locale}/projects/${project.slug}`}
                                size="sm"
                                className="bg-primary text-black font-semibold"
                                endContent={isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                              >
                                {locale === 'fa' ? 'جزئیات' : 'View Details'}
                              </Button>
                              {project.link && (
                                <Button
                                  as="a"
                                  href={project.link}
                                  target="_blank"
                                  size="sm"
                                  variant="bordered"
                                  className="border-white/30 text-white"
                                  isIconOnly
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </CardItem>

                      {/* Project Info */}
                      <div className="space-y-4">
                        {/* Role Badge */}
                        {project.role && (
                          <CardItem translateZ={60}>
                            <div className="inline-flex px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                              <span className="text-xs font-semibold text-primary">{project.role}</span>
                            </div>
                          </CardItem>
                        )}

                        {/* Title */}
                        <CardItem translateZ={75}>
                          <Link href={`/${locale}/projects/${project.slug}`}>
                            <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all">
                              {project.title}
                            </h3>
                          </Link>
                        </CardItem>

                        {/* Description */}
                        <CardItem translateZ={60}>
                          <p className="text-white/60 leading-relaxed line-clamp-2">
                            {project.description}
                          </p>
                        </CardItem>

                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                          <CardItem translateZ={50}>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.3 + i * 0.05 }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white/70 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </div>
                          </CardItem>
                        )}
                      </div>
                    </div>
                  </CardItem>
                </motion.div>
              </CardBody>
            </CardContainer>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            as={Link}
            href={`/${locale}/projects`}
            size="lg"
            variant="bordered"
            className="group border-2 border-white/20 text-white hover:bg-white/5 hover:border-primary/50 px-10 py-7 text-lg rounded-2xl font-semibold backdrop-blur-sm transition-all"
            endContent={
              <motion.div
                animate={{ x: isRTL ? [-5, 0, -5] : [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isRTL ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </motion.div>
            }
          >
            {locale === 'fa' ? 'مشاهده همه پروژه‌ها' : 'View All Projects'}
          </Button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
}
