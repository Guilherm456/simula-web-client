import { Toaster } from "@components/ui";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Auth } from "./components/Auth";
import { ReduxWrapper } from "./components/Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SIMULA Web",
  description: "Gerencie e crie novas simulaçẽs",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ReduxWrapper>
          <Auth>{children}</Auth>
        </ReduxWrapper>
        <Toaster />
      </body>
    </html>
  );
}
