import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="border-ink bg-surface w-full max-w-md rounded-3xl border-2 p-8 shadow-[6px_6px_0_0_var(--color-ink)]">
        <p className="text-brand-600 font-mono text-sm">admin</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold">
          iam<span className="text-brand-600">staiz</span>
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
