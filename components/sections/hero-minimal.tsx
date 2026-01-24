"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Github, Linkedin, Mail } from "lucide-react";

interface HeroMinimalProps {
  name: string;
  title?: string;
  description: string;
}

export function HeroMinimal({ name, title, description }: HeroMinimalProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl">
          {/* Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            {name}
          </h1>

          {/* Title */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            {title || t('defaultTitle')}
          </p>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href={`/${locale}/projects`}>
                {t('viewMyWork')}
                {isRTL ? (
                  <ArrowLeft className="mr-2 h-4 w-4" />
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Link>
            </Button>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com/benyaminrmb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://linkedin.com/in/benyaminrmb"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:benyaminrmb@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
