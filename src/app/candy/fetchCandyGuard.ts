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
  unwrapOption,
  Umi
} from "@metaplex-foundation/umi";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

export default function FetchCandyGuard(mintAuth : string, umi: Umi) {
    const [allowed, setAllowed] = useState(true)
    const [solPayDestination, setSolPayDestination] = useState('')

    const fetchCG = async (mintAuth: string, umi: Umi) => {
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
            setSolPayDestination(solPay!.destination)
        })
    }
    fetchCG(mintAuth,umi)
    return {solPayDestination,allowed}
}