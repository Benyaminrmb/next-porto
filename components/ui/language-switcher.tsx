"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/fa') ? 'fa' : 'en';

  const switchLocale = (locale: string) => {
    const pathnameWithoutLocale = pathname.replace(/^\/(en|fa)/, '');
    const newPath = `/${locale}${pathnameWithoutLocale || ''}`;
    router.push(newPath);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          radius="lg"
          size="sm"
          startContent={<Languages className="h-4 w-4" />}
          aria-label="Change language"
        >
          {currentLocale.toUpperCase()}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectionMode="single"
        selectedKeys={[currentLocale]}
        onAction={(key) => switchLocale(key as string)}
      >
        <DropdownItem
          key="en"
          startContent={<span className="text-lg">🇬🇧</span>}
        >
          English
        </DropdownItem>
        <DropdownItem
          key="fa"
          startContent={<span className="text-lg">🇮🇷</span>}
        >
          فارسی
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
