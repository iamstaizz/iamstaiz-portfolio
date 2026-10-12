"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;
const letters = "iamstaiz".split("");

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden">
      <motion.div
        aria-hidden
        className="bg-pop absolute -top-24 -right-24 size-72 rounded-full sm:size-[28rem]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.9, ease }}
      />
      <motion.div
        aria-hidden
        className="border-brand-600 absolute right-10 bottom-10 hidden size-28 rotate-12 rounded-3xl border-4 sm:block"
        animate={{ rotate: [12, 32, 12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="border-ink bg-surface inline-flex items-center gap-2 rounded-full border-2 px-4 py-1.5 font-mono text-sm"
        >
          <span className="bg-brand-500 size-2.5 animate-pulse rounded-full" />
          {t("status")}
        </motion.p>

        <h1
          aria-label="iamstaiz"
          className="font-display mt-8 text-[clamp(3.25rem,14vw,10.5rem)] leading-[0.95] font-extrabold tracking-tight"
        >
          {letters.map((char, i) => (
            <span
              key={i}
              aria-hidden
              className="inline-block overflow-hidden pb-[0.08em]"
            >
              <motion.span
                className={`inline-block ${i >= 3 ? "text-brand-600" : ""}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease }}
        >
          <p className="text-brand-700 mt-6 font-mono text-sm tracking-wide uppercase">
            {t("role")}
          </p>
          <p className="mt-4 max-w-xl text-xl leading-relaxed">{t("intro")}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="border-ink bg-brand-600 rounded-full border-2 px-7 py-3.5 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)]"
            >
              {t("ctaProjects")}
            </a>
            <a
              href="#contact"
              className="border-ink bg-surface rounded-full border-2 px-7 py-3.5 font-semibold shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)]"
            >
              {t("ctaContact")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
