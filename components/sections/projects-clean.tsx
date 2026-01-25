"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardBody, CardFooter, Chip, Button } from "@heroui/react";
import { ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";

interface Project {
  id: number;
  slug?: string;
  title: string;
  description: string;
  image?: string;
  link?: string | null;
  tags?: string[];
  category?: string;
}

interface ProjectsCleanProps {
  projects: Project[];
}

export function ProjectsClean({ projects }: ProjectsCleanProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('pages.projects');

  return (
    <section id="projects" className="section-padding border-b border-divider">
      <div className="section-container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">{t('title')}</h2>
          <p className="text-default-500">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} isHoverable className="h-full">
              {project.image && (
                <Link href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}>
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      unoptimized
                    />
                  </div>
                </Link>
              )}
              <CardBody className="p-4">
                <Link href={project.slug ? `/${locale}/projects/${project.slug}` : '#'}>
                  <h3 className="font-medium mb-2 hover:text-primary transition-colors">{project.title}</h3>
                </Link>
                <p className="text-sm text-default-500 line-clamp-2">{project.description}</p>
              </CardBody>
              <CardFooter className="pt-0 px-4 pb-4 flex-col items-start gap-3">
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, idx) => (
                      <Chip key={idx} size="sm" variant="flat">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 w-full">
                  {project.slug && (
                    <Button
                      as={Link}
                      href={`/${locale}/projects/${project.slug}`}
                      color="primary"
                      variant="solid"
                      size="sm"
                      className="flex-1"
                      endContent={isRTL ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                    >
                      {t('viewDetails')}
                    </Button>
                  )}
                  {project.link && (
                    <Button
                      as="a"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="flat"
                      size="sm"
                      isIconOnly={!!project.slug}
                      className={project.slug ? "" : "w-full"}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
