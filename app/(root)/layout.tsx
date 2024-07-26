import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";
import SidebarLeft from "@/components/shared/SidebarLeft";
import SidebarRight from "@/components/shared/SidebarRight";

export const metadata: Metadata = {
  title: "SociaLite",
  description: "A lightweight social media platform",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-light-2`}>
          <Header />
          <main>
            <SidebarLeft />
            <section className="main-content">{children}</section>
            <SidebarRight />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
