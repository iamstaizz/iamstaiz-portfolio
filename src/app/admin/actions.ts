"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/session";

// Порівнюємо з фіктивним хешем, якщо користувача не знайдено,
// щоб час відповіді не видавав, чи існує такий email.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

type LoginState = { error?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  const valid = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);

  if (!admin || !valid) {
    return { error: "Invalid email or password." };
  }

  await createSession(admin.id);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
