import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { togglePublished, deleteProject } from "./actions";
import { DeleteButton } from "./delete-button";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { tags: true },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <Link href="/admin" className="text-ink-soft font-mono text-sm hover:underline">
        ← Dashboard
      </Link>

      <div className="mt-4 flex items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-extrabold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="border-ink bg-brand-600 rounded-full border-2 px-6 py-2.5 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)]"
        >
          + New project
        </Link>
      </div>

      {projects.length === 0 && (
        <p className="text-ink-soft mt-12 font-mono">No projects yet.</p>
      )}

      <ul className="mt-8 space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="border-ink bg-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-5"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="font-display truncate text-xl font-bold">{p.titleEn}</h2>
                <span
                  className={`rounded-full px-3 py-0.5 font-mono text-xs ${
                    p.published
                      ? "bg-brand-600 text-white"
                      : "bg-brand-100 text-brand-700"
                  }`}
                >
                  {p.published ? "published" : "draft"}
                </span>
              </div>
              <p className="text-ink-soft mt-1 font-mono text-sm">
                /{p.slug}
                {p.tags.length > 0 && ` · ${p.tags.map((t) => t.name).join(", ")}`}
              </p>
            </div>

            <div className="flex items-center gap-5 text-sm">
              <Link
                href={`/admin/projects/${p.id}/edit`}
                className="font-semibold hover:underline"
              >
                Edit
              </Link>
              <form action={togglePublished.bind(null, p.id)}>
                <button
                  type="submit"
                  className="text-brand-600 font-semibold hover:underline"
                >
                  {p.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              <DeleteButton action={deleteProject.bind(null, p.id)} title={p.titleEn} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
