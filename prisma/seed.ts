import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, TagType, SkillCategory } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

const tags = [
  { slug: "nextjs", name: "Next.js", type: TagType.STACK },
  { slug: "react", name: "React", type: TagType.STACK },
  { slug: "typescript", name: "TypeScript", type: TagType.STACK },
  { slug: "nodejs", name: "Node.js", type: TagType.STACK },
  { slug: "postgresql", name: "PostgreSQL", type: TagType.STACK },
  { slug: "web-app", name: "Web app", type: TagType.TOPIC },
  { slug: "e-commerce", name: "E-commerce", type: TagType.TOPIC },
  { slug: "dashboard", name: "Dashboard", type: TagType.TOPIC },
];

const skills = [
  { name: "React", category: SkillCategory.FRONTEND, order: 1 },
  { name: "Next.js", category: SkillCategory.FRONTEND, order: 2 },
  { name: "TypeScript", category: SkillCategory.FRONTEND, order: 3 },
  { name: "Tailwind CSS", category: SkillCategory.FRONTEND, order: 4 },
  { name: "Node.js", category: SkillCategory.BACKEND, order: 1 },
  { name: "REST APIs", category: SkillCategory.BACKEND, order: 2 },
  { name: "PostgreSQL", category: SkillCategory.DATABASE, order: 1 },
  { name: "Prisma", category: SkillCategory.DATABASE, order: 2 },
  { name: "Git & GitHub", category: SkillCategory.TOOLS, order: 1 },
];

const projects = [
  {
    slug: "demo-store",
    titleEn: "Demo Store",
    titleUk: "Демо-магазин",
    summaryEn: "Placeholder project: replace me from the admin panel.",
    summaryUk: "Тестовий проєкт: заміни його через адмінку.",
    year: 2026,
    featured: true,
    order: 1,
    tags: ["nextjs", "typescript", "postgresql", "e-commerce"],
  },
  {
    slug: "demo-dashboard",
    titleEn: "Demo Dashboard",
    titleUk: "Демо-дашборд",
    summaryEn: "Placeholder project: replace me from the admin panel.",
    summaryUk: "Тестовий проєкт: заміни його через адмінку.",
    year: 2026,
    featured: false,
    order: 2,
    tags: ["react", "nodejs", "dashboard"],
  },
];

async function main() {
  for (const t of tags) {
    await prisma.tag.upsert({ where: { slug: t.slug }, update: t, create: t });
  }

  await prisma.skill.deleteMany();
  await prisma.skill.createMany({ data: skills });

  for (const { tags: tagSlugs, ...p } of projects) {
    const connect = tagSlugs.map((slug) => ({ slug }));
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: { ...p, published: true, tags: { set: connect } },
      create: { ...p, published: true, tags: { connect } },
    });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
