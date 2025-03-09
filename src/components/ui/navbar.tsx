"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ThemeSwitcher from "./themeSwitcher" 
import { Menu, X, Rocket, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/uiUtils"
import dynamic from "next/dynamic";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
require('@solana/wallet-adapter-react-ui/styles.css');
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import { useWallet } from "@solana/wallet-adapter-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"] });

const navItems = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "Mint", href: "/mint" },
//   { name: "About", href: "/about" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [balance, setBalance] = useState(0)

  const connection = new Connection('https://explorer-api.devnet.solana.com')
  const {publicKey} = useWallet()

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const balanceLamport = await connection.getBalance(publicKey)
        setBalance(Math.round(balanceLamport*100/LAMPORTS_PER_SOL)/100)
        }
    })()
  }, [publicKey,connection])

  return (
    <header className="sticky top-0 z-50">
      {/* Glassmorphism background with futuristic border */}
      <div className="absolute inset-0 backdrop-blur-md bg-background/70 border-b border-primary/10 dark:bg-background/40 transition-colors duration-300"></div>

      {/* Decorative gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Rocket className="relative z-10 w-4 h-4 text-white" />
            </div>
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              ANOTHER EARTH
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex md:gap-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <div className="hidden sm:flex sm:gap-2 sm:items-center">
            <p className="text-xs">{balance} sol</p>
            <WalletMultiButtonDynamic 
                style={{width: '8.5rem',
                    padding: '0.75rem', 
                    borderRadius: '0.5rem', 
                    fontSize: '0.75rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'linear-gradient(to right,#a855f7 , #3b82f6)'
                }}>
                {publicKey? 
                        <p className={orbitron.className}>
                            {`${publicKey.toString().slice(0,8)}...`}
                        </p> :
                        <div className="flex justify-around w-full items-center">
                            <Wallet />
                            <p className={orbitron.className}>
                                Connect
                            </p>
                        </div>
                    } 
            </WalletMultiButtonDynamic>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative h-9 w-9 rounded-full overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-5 w-5 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5 group-hover:text-primary transition-colors duration-300" aria-hidden="true" />
            )}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-primary transition-opacity duration-300"></div>
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        style={{
            transitionProperty: "opacity, visibility",
            transitionDuration: "300ms",
            visibility: mobileMenuOpen ? "visible" : "hidden",
          }}
      >
        <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300" 
            style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transitionProperty: "opacity",
                transitionDuration: "300ms",
              }}
            onClick={() => setMobileMenuOpen(false)}></div>
        <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-background/90 backdrop-blur-md border-l border-primary/10 p-6 shadow-xl"
            style={{
                transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
                transitionProperty: "transform",
                transitionDuration: "300ms",
              }}>
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                <Rocket className="relative z-10 w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                ANOTHER EARTH
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 rounded-full overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 group-hover:bg-primary transition-opacity duration-300"></div>
            </Button>
          </div>
          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:bg-primary/5 rounded-md transition-colors duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-primary/10 flex items-center gap-2">
                <p className="text-xs">{balance} sol</p>    
                <WalletMultiButtonDynamic 
                    style={{width: '8.5rem',
                        padding: '0.75rem', 
                        borderRadius: '0.5rem', 
                        fontSize: '0.75rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: 'linear-gradient(to right,#a855f7 , #3b82f6)'
                    }}>
                    {publicKey? 
                        <p className={orbitron.className}>
                            {`${publicKey.toString().slice(0,8)}...`}
                        </p> :
                        <div className="flex justify-around w-full items-center">
                            <Wallet />
                            <p className={orbitron.className}>
                                Connect
                            </p>
                        </div>
                    } 
                </WalletMultiButtonDynamic>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

