"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { ProjectFormValues } from "@/lib/validations";
import type { ProjectFormState } from "./actions";

type TagOption = { id: string; name: string; type: "STACK" | "TOPIC" };

type Props = {
  title: string;
  action: (prev: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  tags: TagOption[];
  initial?: ProjectFormValues;
};

const empty: ProjectFormValues = {
  slug: "",
  titleEn: "",
  titleUk: "",
  summaryEn: "",
  summaryUk: "",
  descriptionEn: "",
  descriptionUk: "",
  liveUrl: "",
  repoUrl: "",
  year: new Date().getFullYear(),
  order: 0,
  featured: false,
  published: false,
  tagIds: [],
};

const input =
  "border-ink bg-paper focus:border-brand-600 mt-2 w-full rounded-xl border-2 px-4 py-3 outline-none";

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string[];
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block font-medium">
      {label}
      {children}
      {hint && <span className="text-ink-soft mt-1 block font-mono text-xs">{hint}</span>}
      {error && (
        <span className="mt-1 block font-mono text-sm text-red-600">{error[0]}</span>
      )}
    </label>
  );
}

export function ProjectForm({ title, action, tags, initial = empty }: Props) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const v = state?.values ?? initial;
  const e = state?.errors ?? {};

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/admin/projects"
        className="text-ink-soft font-mono text-sm hover:underline"
      >
        ← Projects
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold">{title}</h1>

      <form action={formAction} className="mt-10 space-y-8">
        <Field
          label="Slug"
          error={e.slug}
          hint="Lowercase letters, numbers and hyphens, e.g. demo-store"
        >
          <input name="slug" defaultValue={v.slug} required className={input} />
        </Field>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Title (EN)" error={e.titleEn}>
            <input name="titleEn" defaultValue={v.titleEn} required className={input} />
          </Field>
          <Field label="Заголовок (UK)" error={e.titleUk}>
            <input name="titleUk" defaultValue={v.titleUk} required className={input} />
          </Field>

          <Field label="Summary (EN)" error={e.summaryEn} hint="Up to 400 characters">
            <textarea
              name="summaryEn"
              defaultValue={v.summaryEn}
              required
              rows={3}
              className={input}
            />
          </Field>
          <Field label="Короткий опис (UK)" error={e.summaryUk} hint="До 400 символів">
            <textarea
              name="summaryUk"
              defaultValue={v.summaryUk}
              required
              rows={3}
              className={input}
            />
          </Field>

          <Field label="Description (EN)" error={e.descriptionEn}>
            <textarea
              name="descriptionEn"
              defaultValue={v.descriptionEn}
              rows={6}
              className={input}
            />
          </Field>
          <Field label="Опис (UK)" error={e.descriptionUk}>
            <textarea
              name="descriptionUk"
              defaultValue={v.descriptionUk}
              rows={6}
              className={input}
            />
          </Field>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Live URL" error={e.liveUrl}>
            <input
              name="liveUrl"
              type="url"
              defaultValue={v.liveUrl}
              placeholder="https://"
              className={input}
            />
          </Field>
          <Field label="Repository URL" error={e.repoUrl}>
            <input
              name="repoUrl"
              type="url"
              defaultValue={v.repoUrl}
              placeholder="https://github.com/"
              className={input}
            />
          </Field>
          <Field label="Year" error={e.year}>
            <input
              name="year"
              type="number"
              defaultValue={v.year ?? ""}
              className={input}
            />
          </Field>
          <Field label="Order" error={e.order} hint="Lower numbers come first">
            <input name="order" type="number" defaultValue={v.order} className={input} />
          </Field>
        </div>

        {(["STACK", "TOPIC"] as const).map((type) => (
          <fieldset key={type}>
            <legend className="font-medium">
              {type === "STACK" ? "Stack" : "Topic"}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags
                .filter((t) => t.type === type)
                .map((t) => (
                  <label
                    key={t.id}
                    className="border-ink bg-surface has-[:checked]:bg-ink cursor-pointer rounded-full border-2 px-4 py-1.5 font-mono text-sm transition has-[:checked]:text-white"
                  >
                    <input
                      type="checkbox"
                      name="tagIds"
                      value={t.id}
                      defaultChecked={v.tagIds.includes(t.id)}
                      className="sr-only"
                    />
                    {t.name}
                  </label>
                ))}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-wrap gap-8">
          <label className="flex items-center gap-3 font-medium">
            <input
              type="checkbox"
              name="published"
              defaultChecked={v.published}
              className="accent-brand-600 size-5"
            />
            Published
          </label>
          <label className="flex items-center gap-3 font-medium">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={v.featured}
              className="accent-brand-600 size-5"
            />
            Featured
          </label>
        </div>

        {state?.message && (
          <p role="alert" className="font-mono text-sm text-red-600">
            {state.message}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={pending}
            className="border-ink bg-brand-600 rounded-full border-2 px-8 py-3 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)] disabled:opacity-60"
          >
            {pending ? "Saving..." : "Save project"}
          </button>
          <Link
            href="/admin/projects"
            className="border-ink bg-surface rounded-full border-2 px-8 py-3 font-semibold"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
