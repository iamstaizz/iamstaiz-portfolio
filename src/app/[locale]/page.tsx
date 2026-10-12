import { getTranslations, setRequestLocale } from "next-intl/server";
import { LanguageSwitcher } from "@/components/language-switcher";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <LanguageSwitcher />
      <p className="text-brand-600 mt-12 font-mono text-sm">{t("role")}</p>
      <h1 className="font-display mt-4 text-5xl leading-tight font-bold sm:text-7xl">
        iam<span className="text-pop">staiz</span>
      </h1>
      <p className="text-ink-soft mt-6 max-w-xl text-lg">{t("intro")}</p>
      <div className="mt-10 flex gap-4">
        <button className="bg-brand-600 hover:bg-brand-700 rounded-full px-6 py-3 font-medium text-white transition">
          {t("projects")}
        </button>
        <button className="border-ink rounded-full border-2 px-6 py-3 font-medium">
          {t("contact")}
        </button>
      </div>
    </main>
  );
}
