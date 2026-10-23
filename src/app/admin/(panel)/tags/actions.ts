"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { tagSchema, slugify } from "@/lib/validations";
import { Prisma } from "@/generated/prisma/client";

export type TagFormState = { error?: string } | undefined;

function refreshPages() {
  revalidatePath("/", "layout");
}

export async function createTag(
  _prev: TagFormState,
  formData: FormData,
): Promise<TagFormState> {
  await requireAdmin();

  const parsed = tagSchema.safeParse({
    name: formData.get("name"),
    type: formData.get("type"),
  });
  if (!parsed.success) {
    return { error: "Enter a name (up to 40 characters) and choose a type." };
  }

  const slug = slugify(parsed.data.name);
  if (!slug) return { error: "Use Latin letters or numbers in the name." };

  try {
    await prisma.tag.create({ data: { ...parsed.data, slug } });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A tag with this name already exists." };
    }
    throw e;
  }

  refreshPages();
  return undefined;
}

export async function renameTag(id: string, formData: FormData): Promise<void> {
  await requireAdmin();

  const name = z.string().trim().min(1).max(40).safeParse(formData.get("name"));
  if (!name.success) return;

  await prisma.tag.update({ where: { id }, data: { name: name.data } });
  refreshPages();
}

export async function deleteTag(id: string): Promise<void> {
  await requireAdmin();
  await prisma.tag.delete({ where: { id } });
  refreshPages();
}
