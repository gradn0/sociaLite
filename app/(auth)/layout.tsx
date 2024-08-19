import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/shared/Header";

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
        <body
          className={`${inter.className} bg-off_white h-screen flex justify-center items-center`}
        >
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
