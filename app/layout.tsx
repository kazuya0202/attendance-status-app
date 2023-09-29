import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { DataBaseProvider } from "@/store/DataBaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendance Status App",
  description: "Attendance Status App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <DataBaseProvider>
          <AuthProvider>
            <Header />
            <div id="container" className="m-5">
              {children}
            </div>
          </AuthProvider>
        </DataBaseProvider>
      </body>
    </html>
  );
}
