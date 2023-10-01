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
  icons: [{ rel: "icon", url: Favicon.src }]
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
            <Box id="container" className="m-5">
              {children}
            </Box>
          </AuthProvider>
        </DataBaseProvider>
      </body>
    </html>
  );
}
