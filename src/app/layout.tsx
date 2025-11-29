import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/custom/navbar";

export const metadata: Metadata = {
  title: "BodyVision Pro - Transformação Corporal com IA",
  description: "Plataforma completa de emagrecimento com inteligência artificial. Análise corporal, planos personalizados e acompanhamento de evolução.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-50">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
