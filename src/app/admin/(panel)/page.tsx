import { prisma } from "@/lib/prisma";
import { logout } from "../actions";
import Link from "next/link";

export default async function AdminHome() {
  const [projects, published, unread] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { published: true } }),
    prisma.message.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Projects", value: projects },
    { label: "Published", value: published },
    { label: "Unread messages", value: unread },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-extrabold">Admin</h1>
        <form action={logout}>
          <button
            type="submit"
            className="border-ink bg-surface hover:bg-brand-100 rounded-full border-2 px-5 py-2 font-semibold transition"
          >
            Log out
          </button>
        </form>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <li
            key={s.label}
            className="border-ink bg-surface rounded-3xl border-2 p-6 shadow-[6px_6px_0_0_var(--color-ink)]"
          >
            <p className="font-display text-5xl font-extrabold">{s.value}</p>
            <p className="text-ink-soft mt-2 font-mono text-sm">{s.label}</p>
          </li>
        ))}
      </ul>
      <Link
        href="/admin/projects"
        className="border-ink bg-brand-600 mt-10 inline-block rounded-full border-2 px-6 py-3 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)]"
      >
        Manage projects →
      </Link>
    </main>
  );
}
