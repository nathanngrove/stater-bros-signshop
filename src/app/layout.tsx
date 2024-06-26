import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import SignShopImage from "~/components/SignShopImage";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex min-h-screen min-w-full flex-col items-center font-sans font-sans`}
      >
        <TRPCReactProvider>
          <div className="w-11/12 lg:w-9/12">
            <header className="flex py-8">
              <Link href="/">
                <SignShopImage />
              </Link>
            </header>
            {children}
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
