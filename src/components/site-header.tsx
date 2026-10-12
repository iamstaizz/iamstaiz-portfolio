import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

const links = ["about", "projects", "skills", "contact"] as const;

export function SiteHeader() {
  const t = useTranslations("Nav");

  return (
    <header className="border-ink bg-paper/90 sticky top-0 z-50 border-b-2 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-lg font-bold">
          iam<span className="text-brand-600">staiz</span>
        </a>

        <nav className="hidden gap-8 font-medium md:flex">
          {links.map((key) => (
            <a key={key} href={`#${key}`} className="hover:text-brand-600 transition">
              {t(key)}
            </a>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
