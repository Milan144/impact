import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });
import { CookieProvider } from '../..//lib/cookieContext'; // Assurez-vous de l'importer correctement
import { cookies } from 'next/headers';
import {json} from "node:stream/consumers";

export const metadata: Metadata = {
  title: "IMPACT",
  description: "Impact UGC",
  manifest: "/manifest.json"
};

const getToken = () => {
  return cookies().get('token')?.value || ''; // Récupère la valeur du cookie
};

const getType = () => {
  return cookies().get('type')?.value || ''; // Récupère la valeur du cookie
};


export const viewport = {
  name: "viewport",
  content: "width=device-width, initial-scale=1",
  themeColor: "#000000"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = getToken(); // Récupère le token
  const type = getType(); // Récupère le type
  // Met les deux valeurs ensemble en json
  const cookie = JSON.stringify({ token, type });
  return (
    <html lang="en">
      <body>
        <CookieProvider cookie={cookie}>
          {children}
        </CookieProvider>
      </body>
    </html>
  );
}
