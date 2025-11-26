"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

interface ProjectsShowcaseProps {
  projects: Project[];
}

export function ProjectsShowcase({ projects }: ProjectsShowcaseProps) {
  return (
    <section id="projects" className="relative min-h-screen bg-white dark:bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Here are some of my recent works that showcase my skills and passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-neutral-900 dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-900 dark:text-white"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-600 dark:text-neutral-300 text-sm max-w-sm mt-2"
                  >
                    {project.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="relative h-60 w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900">
                      {project.image.startsWith('/') ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl font-bold text-neutral-400 dark:text-neutral-600">
                            {project.title.charAt(0)}
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={project.image}
                          height={1000}
                          width={1000}
                          className="h-full w-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                          alt={project.title}
                        />
                      )}
                    </div>
                  </CardItem>
                  {project.tags && project.tags.length > 0 && (
                    <CardItem translateZ="50" className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardItem>
                  )}
                  <div className="flex justify-between items-center mt-6">
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={project.link}
                      target="_blank"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Project
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition-shadow"
                    >
                      Learn More
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
