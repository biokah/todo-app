import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "To-Do App — HeroUI",
  description: "Next.js + HeroUI + Prisma + PostgreSQL",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <main style={{ padding: "0", margin: "0 auto" }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
