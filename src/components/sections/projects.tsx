import { getLocale, getTranslations } from "next-intl/server";
import { getPublishedProjects } from "@/lib/projects";
import { ProjectsGrid, type ProjectDTO } from "./projects-grid";

export async function Projects() {
  const [locale, t, rows] = await Promise.all([
    getLocale(),
    getTranslations("Projects"),
    getPublishedProjects(),
  ]);

  const isUk = locale === "uk";

  const projects: ProjectDTO[] = rows.map((p, index) => ({
    id: p.id,
    index,
    title: isUk ? p.titleUk : p.titleEn,
    summary: isUk ? p.summaryUk : p.summaryEn,
    year: p.year,
    liveUrl: p.liveUrl,
    repoUrl: p.repoUrl,
    tags: p.tags.map((tag) => ({
      id: tag.id,
      slug: tag.slug,
      name: tag.name,
      type: tag.type,
    })),
  }));

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <p className="text-brand-600 font-mono text-sm">01</p>
      <h2 className="font-display mt-2 text-4xl font-extrabold sm:text-6xl">
        {t("title")}
      </h2>
      <ProjectsGrid projects={projects} />
    </section>
  );
}
