'use client'

import dynamic from "next/dynamic";
import ThemeSwitcher from "./themeSwitcher";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const Header = () => {
  const [balance, setBalance] = useState(0)

  const connection = new Connection('https://explorer-api.devnet.solana.com')
  const {publicKey} = useWallet()

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const balanceLamport = await connection.getBalance(publicKey)
        setBalance(Math.round(balanceLamport*1000/LAMPORTS_PER_SOL)/1000)
        }
    })()
  }, [publicKey,connection])
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono lg:flex">
      <h1 className="flex w-full justify-center border-b border-gray-300  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        ANOTHER EARTH
      </h1>
      <div className="flex pt-4 lg:pt-0 w-full items-center justify-center gap-4 dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
        <p>{balance} sol</p>
        <WalletMultiButtonDynamic />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
