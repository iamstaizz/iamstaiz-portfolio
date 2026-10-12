import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="top">
      <Hero />
      <Marquee />
    </main>
  );
}
