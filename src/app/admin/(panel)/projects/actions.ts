"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import {
  projectSchema,
  parseProjectForm,
  type ProjectFormValues,
} from "@/lib/validations";
import { Prisma } from "@/generated/prisma/client";

export type ProjectFormState =
  | {
      errors?: Record<string, string[] | undefined>;
      message?: string;
      values?: ProjectFormValues;
    }
  | undefined;

function refreshPages() {
  revalidatePath("/", "layout");
}

export async function saveProject(
  id: string | null,
  _prev: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const raw = parseProjectForm(formData);
  const parsed = projectSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: z.flattenError(parsed.error).fieldErrors,
      message: "Please fix the highlighted fields.",
      values: raw,
    };
  }

  const { tagIds, ...data } = parsed.data;
  const tags = tagIds.map((tagId) => ({ id: tagId }));

  try {
    if (id) {
      await prisma.project.update({
        where: { id },
        data: { ...data, tags: { set: tags } },
      });
    } else {
      await prisma.project.create({
        data: { ...data, tags: { connect: tags } },
      });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { errors: { slug: ["This slug is already used."] }, values: raw };
    }
    throw e;
  }

  refreshPages();
  redirect("/admin/projects");
}

export async function togglePublished(id: string): Promise<void> {
  await requireAdmin();

  const project = await prisma.project.findUnique({
    where: { id },
    select: { published: true },
  });
  if (!project) return;

  await prisma.project.update({
    where: { id },
    data: { published: !project.published },
  });
  refreshPages();
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  refreshPages();
}
