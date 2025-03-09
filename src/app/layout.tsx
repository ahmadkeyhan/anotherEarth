import { ThemeProviderWrapper } from "@/providers/themeProvider";
import { WalletAdapterProvider } from "@/providers/walletAdapterProvider";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { UmiProvider } from "@/providers/umiProvider";
import Header from "@/components/ui/header";
import { Navbar } from "@/components/ui/navbar";

const orbitron = Orbitron({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Another Earth",
  description: "A generative collection based on solana blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WalletAdapterProvider>
      <UmiProvider>
        <html lang="en">
          <body className={orbitron.className}>
            <ThemeProviderWrapper>
              {/* <Header /> */}
              <Navbar />
              <main className="flex min-h-screen flex-col items-center justify-between p-12">
                {children}
              </main>
              <div className="flex p-4 justify-center border-b border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                  <p className="text-xs">{`An on-chain quest to find another earth, before it's too late! 🧑‍🚀🚀`}</p>
              </div>
            </ThemeProviderWrapper>
          </body>
        </html>
      </UmiProvider>
    </WalletAdapterProvider>
  );
}
