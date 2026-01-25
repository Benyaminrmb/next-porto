"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  User,
  CheckCircle2
} from "lucide-react";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  screenshots?: string[];
  link: string | null;
  tags?: string[];
  category?: string;
  role?: string;
  features?: string[];
}

interface ProjectDetailProps {
  project: Project;
  locale: string;
}

export function ProjectDetail({ project, locale }: ProjectDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const t = useTranslations('projectDetail');
  const isRTL = locale === 'fa';

  const images = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [project.image];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="section-padding">
      <div className="section-container">
        {/* Back Button */}
        <Button
          as={Link}
          href={`/${locale}/projects`}
          variant="light"
          className="mb-8"
          startContent={isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
        >
          {t('backToProjects')}
        </Button>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Image Gallery - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image */}
            <div
              className="relative w-full aspect-video rounded-xl overflow-hidden border border-divider bg-default-100 cursor-pointer group"
              onClick={() => setIsLightboxOpen(true)}
            >
              <Image
                src={images[selectedImage]}
                alt={`${project.title} screenshot ${selectedImage + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent hover:border-default-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Info - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
              {project.role && (
                <div className="flex items-center gap-2 text-default-500 mb-4">
                  <User className="h-4 w-4" />
                  <span>{project.role}</span>
                </div>
              )}
              <p className="text-default-500 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{t('technologies')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Chip key={idx} variant="flat" size="sm">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <Card>
                <CardBody className="p-4">
                  <h3 className="text-sm font-medium mb-3">{t('keyFeatures')}</h3>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-default-500">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )}

            {/* Action Button */}
            {project.link && (
              <Button
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                variant="solid"
                radius="lg"
                className="w-full"
                endContent={<ExternalLink className="h-4 w-4" />}
              >
                {t('visitProject')}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div
            className="relative w-full max-w-6xl mx-4 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]}
              alt={`${project.title} screenshot ${selectedImage + 1}`}
              fill
              className="object-contain"
              unoptimized
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    selectedImage === idx ? "bg-white" : "bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
