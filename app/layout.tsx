import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = { title: "Companies · Sales CRM" };

// Runs before first paint: restores theme (default dark) and sidebar width / collapsed state.
const init = `try{var d=document.documentElement;if(localStorage.getItem("crm-theme")!=="light")d.classList.add("dark");var s=JSON.parse(localStorage.getItem("crm-sidebar")||"null");if(s){var w=Math.min(420,Math.max(220,+s.w||240));d.style.setProperty("--sb-w",w+"px");if(s.c)d.dataset.sidebar="collapsed"}}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body className="bg-bezel font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
