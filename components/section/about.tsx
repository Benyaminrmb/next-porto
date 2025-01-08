import BCard from '@/components/main/b-card';
import { getData } from '@/lib/data';

export default async function About() {
  const data = await getData();
  return (
    <BCard>
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        About Me
      </h1>
      <p className="max-w-2xl text-lg font-light text-foreground">
        {data.description}
      </p>
    </BCard>
  );
}