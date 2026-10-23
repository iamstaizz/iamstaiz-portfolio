"use client";

import { useActionState } from "react";
import { createTag } from "./actions";

const field =
  "border-ink bg-paper focus:border-brand-600 rounded-xl border-2 px-4 py-2.5 outline-none";

export function TagForm() {
  const [state, action, pending] = useActionState(createTag, undefined);

  return (
    <form action={action} className="flex flex-wrap items-start gap-3">
      <input
        name="name"
        required
        maxLength={40}
        placeholder="Tag name"
        className={field}
      />
      <select name="type" className={field} defaultValue="STACK">
        <option value="STACK">Stack</option>
        <option value="TOPIC">Topic</option>
      </select>
      <button
        type="submit"
        disabled={pending}
        className="border-ink bg-brand-600 rounded-full border-2 px-6 py-2.5 font-semibold text-white shadow-[4px_4px_0_0_var(--color-ink)] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--color-ink)] disabled:opacity-60"
      >
        {pending ? "Adding..." : "Add tag"}
      </button>
      {state?.error && (
        <p role="alert" className="w-full font-mono text-sm text-red-600">
          {state.error}
        </p>
      )}
    </form>
  );
}
