"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

interface ContactCTAProps {
  email: string;
}

export function ContactCTA({ email }: ContactCTAProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith('/fa') ? 'fa' : 'en';
  const isRTL = locale === 'fa';
  const t = useTranslations('home');

  return (
    <section className="section-padding border-t">
      <div className="section-container">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-3">
            {t('letsWorkTogether')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('contactDescription')}
          </p>
          <Button asChild>
            <a href={`mailto:${email}`}>
              <Mail className={isRTL ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
              {email}
              {isRTL ? (
                <ArrowLeft className="mr-2 h-4 w-4" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
