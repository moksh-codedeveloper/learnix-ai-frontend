import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Headers";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/themeProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnix",
  description: "AI-Powered Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
          <main className="container mx-auto p-4">{children}</main>
          <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-900 text-white border border-gray-700 shadow-lg",
            style: { background: "#1E1E1E", color: "#FFF", border: "1px solid #333" },
          }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
