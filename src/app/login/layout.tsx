import type { Metadata } from "next";
import { Sora } from "next/font/google";

const inter = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Log in | Novu Store",
  description: "Your No.1 Jewellery Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
