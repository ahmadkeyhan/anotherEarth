'use client'

import useUmiStore from "@/store/useUmiStore";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  mplCandyMachine,
  fetchCandyMachine,
  safeFetchCandyGuard
} from "@metaplex-foundation/mpl-core-candy-machine";
import { 
  publicKey as pubKey, 
  unwrapOption
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function FetchCandyMachine() {
    const [collectionMint,setCollectionMint] = useState('')
    const [mintAuth,setMintAuth] = useState('')
    const [itemsRedeemed, setItemsRedeemed] = useState(0)
    const [itemsLoaded, setItemsLoaded] = useState(0)
    const [allowed, setAllowed] = useState(true)
    const [solPayDestination, setSolPayDestination] = useState('')
    const candyMachineId = process.env.NEXT_PUBLIC_CANDYMACHINE_ID
    
    const wallet = useWallet()
    const umi = useUmiStore().umi
    umi.use(walletAdapterIdentity(wallet))
    umi.use(mplCandyMachine())
    
    const fetchCG = async (mintAuth: string) => {
        await safeFetchCandyGuard(umi, pubKey(mintAuth)).then(async (candyGuard) => {
            // console.log(candyGuard)
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
            setSolPayDestination(solPay!.destination)
        })
    }

    const fetchCM = async () => {
        await fetchCandyMachine(umi, pubKey(candyMachineId!)).then((candyMachine) => {
            // console.log(candyMachine)
            setCollectionMint(candyMachine.collectionMint)
            setMintAuth(candyMachine.mintAuthority)
            setItemsRedeemed(Number(candyMachine.itemsRedeemed))
            setItemsLoaded(candyMachine.itemsLoaded)
            if (Number(candyMachine.itemsRedeemed) === candyMachine.itemsLoaded) setAllowed(false)
            // const mintAuth = (candyMachine.mintAuthority)
            fetchCG(candyMachine.mintAuthority)
          })
    }
    fetchCM()
    return {collectionMint,mintAuth,itemsLoaded,itemsRedeemed,allowed,solPayDestination}
    
    // return ({

    // })
}