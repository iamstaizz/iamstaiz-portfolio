import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { saveProject } from "../../actions";
import { ProjectForm } from "../../project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [project, tags] = await Promise.all([
    prisma.project.findUnique({ where: { id }, include: { tags: true } }),
    prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, type: true },
    }),
  ]);

  if (!project) notFound();

  return (
    <ProjectForm
      title="Edit project"
      action={saveProject.bind(null, project.id)}
      tags={tags}
      initial={{
        slug: project.slug,
        titleEn: project.titleEn,
        titleUk: project.titleUk,
        summaryEn: project.summaryEn,
        summaryUk: project.summaryUk,
        descriptionEn: project.descriptionEn ?? "",
        descriptionUk: project.descriptionUk ?? "",
        liveUrl: project.liveUrl ?? "",
        repoUrl: project.repoUrl ?? "",
        year: project.year,
        order: project.order,
        featured: project.featured,
        published: project.published,
        tagIds: project.tags.map((t) => t.id),
      }}
    />
  );
}
