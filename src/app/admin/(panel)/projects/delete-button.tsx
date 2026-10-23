"use client";

export function DeleteButton({
  action,
  title,
}: {
  action: () => Promise<void>;
  title: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <button type="submit" className="font-semibold text-red-600 hover:underline">
        Delete
      </button>
    </form>
  );
}
