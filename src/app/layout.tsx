import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PRODUCT_NAME } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} — clinic workspace`,
  description: "A thoughtful workspace for veterinary clinic teams.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
