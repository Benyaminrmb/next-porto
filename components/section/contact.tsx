import BCard from '@/components/main/b-card';
import { getData } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default async function Contact() {
  const data = await getData();
  return (
    <BCard>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Contact Me
      </h1>
      <div className="mt-4 space-y-2">
        <p className="text-muted-foreground">Email: {data.contact.email}</p>
        <p className="text-muted-foreground">Phone: {data.contact.phone}</p>
        <div className="flex gap-2">
          <Button asChild>
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
          <Button asChild>
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </BCard>
  );
}