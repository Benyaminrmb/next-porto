import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'fa'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  const validatedLocale = locale || 'en';
  if (!locales.includes(validatedLocale as any)) notFound();

  return {
    locale: validatedLocale,
    messages: (await import(`./messages/${validatedLocale}.json`)).default
  };
});
