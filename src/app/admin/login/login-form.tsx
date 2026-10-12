"use client";

import { useActionState } from "react";
import { login } from "../actions";

const field =
  "border-ink bg-paper focus:border-brand-600 mt-2 w-full rounded-xl border-2 px-4 py-3 outline-none";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block font-medium">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="username"
          className={field}
        />
      </label>

      <label className="block font-medium">
        Password
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
      </label>

      {state?.error && (
        <p role="alert" className="font-mono text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="border-ink bg-brand-600 w-full rounded-full border-2 px-6 py-3 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)] disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
