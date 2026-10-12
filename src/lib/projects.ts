import { prisma } from "@/lib/prisma";

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { tags: { orderBy: { name: "asc" } } },
  });
}
