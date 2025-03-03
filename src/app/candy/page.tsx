"use client"
import Header from "@/components/header";
import useUmiStore from "@/store/useUmiStore";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplCandyMachine,
  fetchCandyMachine,
  safeFetchCandyGuard,
  mintV1
} from "@metaplex-foundation/mpl-core-candy-machine";
import { 
  publicKey as pubKey, 
  unwrapOption, generateSigner, 
  some 
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState,useEffect } from "react";

export default function Candy() {
  const [cmId, setCmId] = useState('')
  const [collectionMint,setCollectionMint] = useState('')
  const [mintAuth,setMintAuth] = useState('')
  const [itemsRedeemed, setItemsRedeemed] = useState(0)
  const [itemsLoaded, setItemsLoaded] = useState(0)
  // const [cgId, setCgId] = useState('')
  const [allowed, setAllowed] = useState(true)
  const [mintLoading, setMintLoading] = useState(false)
  const candyMachineId = process.env.NEXT_PUBLIC_CANDYMACHINE_ID

  const wallet = useWallet()
  const umi = useUmiStore().umi
  umi.use(walletAdapterIdentity(wallet))
  umi.use(mplCandyMachine())
  
  const fetchCG = async (mintAuth: string) => {
    console.log(mintAuth)
    await safeFetchCandyGuard(umi, pubKey(mintAuth)).then(async (candyGuard) => {
      console.log(candyGuard)
      // fetch the current slot and read the blocktime
      const slot = await umi.rpc.getSlot();
      let solanaTime = await umi.rpc.getBlockTime(slot);
      // Check if a `default` startDate guard is attached
      const startDate = unwrapOption(candyGuard!.guards.startDate);
      if (startDate) {
        // validate the startTime is in the future
        if (Number(startDate.date) > Number(solanaTime)) {
              console.info(`StartDate not reached!`);
              setAllowed(false)
        } else {console.log('valid time')}
      }
      const solPay = unwrapOption(candyGuard!.guards.solPayment)
    })
  }

  const fetchCM = async () => {
    await fetchCandyMachine(umi, pubKey(candyMachineId!)).then((candyMachine) => {
      console.log(candyMachine)
      setCmId(candyMachine.publicKey)
      setCollectionMint(candyMachine.collectionMint)
      setMintAuth(candyMachine.mintAuthority)
      setItemsRedeemed(Number(candyMachine.itemsRedeemed))
      setItemsLoaded(candyMachine.itemsLoaded)
      if (Number(candyMachine.itemsRedeemed) === candyMachine.itemsLoaded) setAllowed(false)
      // const mintAuth = (candyMachine.mintAuthority)
      fetchCG(candyMachine.mintAuthority)
    })
  }

  useEffect(() => {
    fetchCM()
  },[])

  const mintOne = async () => {
    try {
      setMintLoading(true)
      const nftMint = generateSigner(umi);
      await mintV1(umi, {
        candyMachine: pubKey(cmId),
        collection: pubKey(collectionMint),
        asset: nftMint,
        candyGuard: pubKey(mintAuth),
        mintArgs: {
          //Remember to change this to parameter!
          solPayment: some({destination: pubKey("4axXmAoxAcV4QNHr2YYxmNXsgyahu2syDZ2XzNz9dgb8")})
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
        <h2 className="text-center">{`You are about to mint from the candy machine ${cmId.slice(0,15)}...`}</h2>
        <p>{`${itemsRedeemed}/${itemsLoaded} items are already minted!`}</p>
        <div className="flex items-center justify-center">
          <button onClick={()=> mintOne()} 
            disabled={!allowed || mintLoading || cmId===''}
            className=" bg-[#512ba8] h-12 px-6 py-0 rounded font-bold text-white disabled:bg-slate-400">
            {
              !allowed? 'Mint not allowed!' :
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
