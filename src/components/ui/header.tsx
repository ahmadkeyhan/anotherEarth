'use client'

import dynamic from "next/dynamic";
import ThemeSwitcher from "./themeSwitcher";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
require('@solana/wallet-adapter-react-ui/styles.css');
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [balance, setBalance] = useState(0)

  const connection = new Connection('https://explorer-api.devnet.solana.com')
  const {publicKey} = useWallet()
console.log(publicKey)
  useEffect(() => {
    (async () => {
      if (publicKey) {
        const balanceLamport = await connection.getBalance(publicKey)
        setBalance(Math.round(balanceLamport*100/LAMPORTS_PER_SOL)/100)
        }
    })()
  }, [publicKey,connection])

  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between lg:flex">
      <Link href='/' scroll={false}>
        <h1 className="flex font-bold justify-center border-b border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          ANOTHER EARTH
        </h1>
      </Link>
      <div className="flex pt-4 lg:pt-0 w-full items-center justify-center gap-4 dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
        <p className="text-xs">{balance} sol</p>
        <WalletMultiButtonDynamic 
          style={{width: '8rem', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '12px'}}
          // className="!bg-red-500" 
        >
          {publicKey?.toString().slice(0,8)}...
        </WalletMultiButtonDynamic>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
