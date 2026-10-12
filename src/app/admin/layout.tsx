import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin | iamstaiz",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
