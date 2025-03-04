"use client"
import Header from "@/components/header";
import useUmiStore from "@/store/useUmiStore";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplCandyMachine,
  mintV1
} from "@metaplex-foundation/mpl-core-candy-machine";
import { 
  publicKey as pubKey,
  generateSigner, 
  some 
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState,useEffect } from "react";
import FetchCandyMachine  from "./fetchCandyMachine";

export default function Candy() {
  const [mintLoading, setMintLoading] = useState(false)
  const candyMachineId = process.env.NEXT_PUBLIC_CANDYMACHINE_ID

  const wallet = useWallet()
  const umi = useUmiStore().umi
  umi.use(walletAdapterIdentity(wallet))
  umi.use(mplCandyMachine())
  
  
  const candyMachine = FetchCandyMachine()
  const mintOne = async () => {
    try {
      setMintLoading(true)
      const nftMint = generateSigner(umi);
      await mintV1(umi, {
        candyMachine: pubKey(candyMachineId!),
        collection: pubKey(candyMachine.collectionMint),
        asset: nftMint,
        candyGuard: pubKey(candyMachine.mintAuth),
        mintArgs: {
          solPayment: some({destination: pubKey(candyMachine.solPayDestination)})
        }
      }).sendAndConfirm(umi).then(() => {
        setMintLoading(false)
        console.log(`NFT ${nftMint.publicKey} minted!`)

      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Header />
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-center">{`You are about to mint from the candy machine ${candyMachineId!.slice(0,15)}...`}</h2>
        <p>{`${candyMachine.itemsRedeemed}/${candyMachine.itemsLoaded} items are already minted!`}</p>
        <div className="flex items-center justify-center">
          <button onClick={()=> mintOne()} 
            disabled={!candyMachine.allowed || mintLoading || candyMachineId===''}
            className=" bg-[#512ba8] h-12 px-6 py-0 rounded font-bold text-white disabled:bg-slate-400">
            {
              !candyMachine.allowed? 'Mint not allowed!' :
              mintLoading? 'Wait a sec...' :
              'Mint'
            }
          </button>
        </div>
      </div>
      <p>{`An on-chain quest to find another earth, before it's too late! 🧑‍🚀🚀`}</p>
    </main>
  );
}
