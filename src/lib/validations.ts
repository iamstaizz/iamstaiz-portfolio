import { z } from "zod";

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const optionalUrl = z
  .string()
  .trim()
  .transform((v) => (v === "" ? null : v))
  .refine((v) => v === null || isHttpUrl(v), "Must be a valid http(s) URL");

const optionalText = z
  .string()
  .trim()
  .max(10000)
  .transform((v) => (v === "" ? null : v));

export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens"),
  titleEn: z.string().trim().min(1, "Required").max(120),
  titleUk: z.string().trim().min(1, "Required").max(120),
  summaryEn: z.string().trim().min(1, "Required").max(400),
  summaryUk: z.string().trim().min(1, "Required").max(400),
  descriptionEn: optionalText,
  descriptionUk: optionalText,
  liveUrl: optionalUrl,
  repoUrl: optionalUrl,
  year: z.number().int().min(2000).max(2100).nullable(),
  order: z.number().int().min(0).max(9999),
  featured: z.boolean(),
  published: z.boolean(),
  tagIds: z.array(z.string()).max(30),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export function parseProjectForm(formData: FormData) {
  const text = (key: string) => String(formData.get(key) ?? "");
  const yearRaw = text("year").trim();

  return {
    slug: text("slug"),
    titleEn: text("titleEn"),
    titleUk: text("titleUk"),
    summaryEn: text("summaryEn"),
    summaryUk: text("summaryUk"),
    descriptionEn: text("descriptionEn"),
    descriptionUk: text("descriptionUk"),
    liveUrl: text("liveUrl"),
    repoUrl: text("repoUrl"),
    year: yearRaw === "" ? null : Number(yearRaw),
    order: Number(text("order") || 0),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    tagIds: formData.getAll("tagIds").map(String),
  };
}
export type ProjectFormValues = ReturnType<typeof parseProjectForm>;

export const tagSchema = z.object({
  name: z.string().trim().min(1, "Required").max(40),
  type: z.enum(["STACK", "TOPIC"]),
});

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
