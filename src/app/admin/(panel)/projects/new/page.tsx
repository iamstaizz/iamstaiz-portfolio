import { prisma } from "@/lib/prisma";
import { saveProject } from "../actions";
import { ProjectForm } from "../project-form";

export default async function NewProjectPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, type: true },
  });

  return (
    <ProjectForm title="New project" action={saveProject.bind(null, null)} tags={tags} />
  );
}
