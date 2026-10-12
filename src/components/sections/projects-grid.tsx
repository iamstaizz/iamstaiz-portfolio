"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";

export type TagDTO = {
  id: string;
  slug: string;
  name: string;
  type: "STACK" | "TOPIC";
};

export type ProjectDTO = {
  id: string;
  index: number;
  title: string;
  summary: string;
  year: number | null;
  liveUrl: string | null;
  repoUrl: string | null;
  tags: TagDTO[];
};

const covers = ["bg-brand-300", "bg-pop", "bg-brand-500"];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border-ink rounded-full border-2 px-4 py-1.5 font-mono text-sm transition ${
        active ? "bg-ink text-white" : "bg-surface hover:bg-brand-100"
      }`}
    >
      {children}
    </button>
  );
}

export function ProjectsGrid({ projects }: { projects: ProjectDTO[] }) {
  const t = useTranslations("Projects");
  const [stack, setStack] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  const { stackTags, topicTags } = useMemo(() => {
    const unique = new Map<string, TagDTO>();
    projects.forEach((p) => p.tags.forEach((tag) => unique.set(tag.slug, tag)));
    const all = [...unique.values()].sort((a, b) => a.name.localeCompare(b.name));
    return {
      stackTags: all.filter((x) => x.type === "STACK"),
      topicTags: all.filter((x) => x.type === "TOPIC"),
    };
  }, [projects]);

  const visible = projects.filter(
    (p) =>
      (!stack || p.tags.some((x) => x.slug === stack)) &&
      (!topic || p.tags.some((x) => x.slug === topic)),
  );

  return (
    <>
      <div className="mt-10 space-y-4">
        {[
          { label: t("stack"), tags: stackTags, value: stack, set: setStack },
          { label: t("topic"), tags: topicTags, value: topic, set: setTopic },
        ].map(
          (group) =>
            group.tags.length > 0 && (
              <div key={group.label} className="flex flex-wrap items-center gap-2">
                <span className="text-ink-soft mr-2 w-14 font-mono text-xs uppercase">
                  {group.label}
                </span>
                <Chip active={group.value === null} onClick={() => group.set(null)}>
                  {t("all")}
                </Chip>
                {group.tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    active={group.value === tag.slug}
                    onClick={() => group.set(group.value === tag.slug ? null : tag.slug)}
                  >
                    {tag.name}
                  </Chip>
                ))}
              </div>
            ),
        )}
      </div>

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="border-ink bg-surface flex flex-col overflow-hidden rounded-3xl border-2 shadow-[6px_6px_0_0_var(--color-ink)]"
            >
              <div
                className={`${covers[p.index % covers.length]} border-ink flex h-44 items-end justify-between border-b-2 p-5`}
              >
                <span className="font-display text-6xl font-extrabold text-white mix-blend-difference">
                  {String(p.index + 1).padStart(2, "0")}
                </span>
                {p.year && (
                  <span className="font-mono text-sm font-medium">{p.year}</span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold">{p.title}</h3>
                <p className="text-ink-soft mt-3 flex-1 leading-relaxed">{p.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="bg-brand-100 text-brand-700 rounded-full px-3 py-1 font-mono text-xs"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {(p.liveUrl || p.repoUrl) && (
                  <div className="mt-6 flex gap-5 font-semibold">
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-600 underline underline-offset-4"
                      >
                        {t("live")} ↗
                      </a>
                    )}
                    {p.repoUrl && (
                      <a
                        href={p.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-brand-600 underline underline-offset-4"
                      >
                        {t("code")} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {visible.length === 0 && (
        <p className="text-ink-soft mt-12 text-center font-mono">{t("empty")}</p>
      )}
    </>
  );
}
