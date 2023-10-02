import "./globals.css";
import "@/lib/dayjsUtility/initialize";

import Box from "@mui/material/Box";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Favicon from "/public/favicon.ico";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { DataBaseProvider } from "@/store/DataBaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendance Status App",
  description: "Attendance Status App by Next.js",
  icons: [{ rel: "icon", url: Favicon.src }],
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-slate-100`}>
        <DataBaseProvider>
          <AuthProvider>
            <Header />
            <Box id="container" className="">
              {children}
            </Box>
          </AuthProvider>
        </DataBaseProvider>
      </body>
    </html>
  );
}
