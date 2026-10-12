export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-brand-600 font-mono text-sm">full-stack developer</p>
      <h1 className="font-display mt-4 text-5xl leading-tight font-bold sm:text-7xl">
        iam<span className="text-pop">staiz</span>
      </h1>
      <p className="text-ink-soft mt-6 max-w-xl text-lg">
        Привіт! Це перевірка дизайн-системи: кирилиця, латиниця та кольори.
      </p>
      <div className="mt-10 flex gap-4">
        <button className="bg-brand-600 hover:bg-brand-700 rounded-full px-6 py-3 font-medium text-white transition">
          Projects
        </button>
        <button className="border-ink rounded-full border-2 px-6 py-3 font-medium">
          Contact
        </button>
      </div>
    </main>
  );
}
