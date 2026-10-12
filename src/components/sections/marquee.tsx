const items = [
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Tailwind",
  "REST",
];

export function Marquee() {
  const row = [...items, ...items];

  return (
    <div
      aria-hidden
      className="border-ink bg-brand-600 -rotate-1 overflow-hidden border-y-2 py-4 text-white"
    >
      <div className="animate-marquee flex w-max gap-10 motion-reduce:animate-none">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-10 text-2xl font-bold whitespace-nowrap"
          >
            {item}
            <span className="text-pop">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
