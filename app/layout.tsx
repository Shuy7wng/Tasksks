import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/app/contextAPI";
import Sidebar from "@/app/Components/Sidebar"; // Assicurati che Sidebar sia nel path giusto

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "tasksks",
  description: "do task :)",
  icons: "/icon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ita" className="dark">
      <body
        className={`${montserrat.variable} transition-colors duration-300 overflow-x-hidden`}
      >
        <GlobalContextProvider>
          <div className="flex">
            {/* Sidebar visibile solo da md in su */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>

            {/* Main si adatta a presenza/assenza della sidebar */}
            <main className="w-full h-screen overflow-y-auto md:ml-[280px]">
              {children}
            </main>
          </div>
        </GlobalContextProvider>
      </body>
    </html>
  );
}

