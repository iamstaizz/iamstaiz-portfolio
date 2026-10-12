import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Projects } from "@/components/sections/projects";

export const revalidate = 60;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="top">
      <Hero />
      <Marquee />
      <Projects />
    </main>
  );
}
