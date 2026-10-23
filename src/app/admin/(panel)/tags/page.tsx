import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "../projects/delete-button";
import { renameTag, deleteTag } from "./actions";
import { TagForm } from "./tag-form";

const sections = [
  { type: "STACK", title: "Stack" },
  { type: "TOPIC", title: "Topic" },
] as const;

export default async function TagsAdminPage() {
  const tags = await prisma.tag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { projects: true } } },
  });

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/admin" className="text-ink-soft font-mono text-sm hover:underline">
        ← Dashboard
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold">Tags</h1>

      <div className="mt-8">
        <TagForm />
      </div>

      {sections.map(({ type, title }) => {
        const group = tags.filter((t) => t.type === type);
        return (
          <section key={type} className="mt-12">
            <h2 className="text-brand-600 font-mono text-sm uppercase">{title}</h2>

            {group.length === 0 && (
              <p className="text-ink-soft mt-4 font-mono text-sm">No tags yet.</p>
            )}

            <ul className="mt-4 space-y-3">
              {group.map((t) => (
                <li
                  key={t.id}
                  className="border-ink bg-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 p-4"
                >
                  <form
                    action={renameTag.bind(null, t.id)}
                    className="flex items-center gap-3"
                  >
                    <input
                      name="name"
                      defaultValue={t.name}
                      maxLength={40}
                      required
                      className="border-ink bg-paper focus:border-brand-600 rounded-lg border-2 px-3 py-1.5 outline-none"
                    />
                    <button
                      type="submit"
                      className="text-brand-600 font-semibold hover:underline"
                    >
                      Save
                    </button>
                  </form>

                  <div className="flex items-center gap-5 text-sm">
                    <span className="text-ink-soft font-mono">
                      {t._count.projects}{" "}
                      {t._count.projects === 1 ? "project" : "projects"}
                    </span>
                    <DeleteButton action={deleteTag.bind(null, t.id)} title={t.name} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
