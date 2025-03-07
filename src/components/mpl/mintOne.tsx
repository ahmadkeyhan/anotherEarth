'use client'
import { useState } from "react";
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

const MintOneButton = ({
    candyMachineId, 
    collectionMint, 
    mintAuth, 
    solPayDestination, 
    allowed
    } :
    { 
    candyMachineId: string, 
    collectionMint: string, 
    mintAuth: string, 
    solPayDestination: string, 
    allowed: boolean}
) => {
    const [mintLoading, setMintLoading] = useState(false)

    const wallet = useWallet()
    const umi = useUmiStore().umi
    umi.use(walletAdapterIdentity(wallet))
    umi.use(mplCandyMachine())

    const mintOne = async () => {
        try {
          setMintLoading(true)
          const nftMint = generateSigner(umi);
          await mintV1(umi, {
            candyMachine: pubKey(candyMachineId),
            collection: pubKey(collectionMint),
            asset: nftMint,
            candyGuard: pubKey(mintAuth),
            mintArgs: {
              solPayment: some({destination: pubKey(solPayDestination)})
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
        <button onClick={()=> mintOne()} 
            disabled={!allowed || mintLoading || candyMachineId===''}
            className=" bg-[#512ba8] h-12 px-6 py-0 rounded font-bold text-white disabled:bg-slate-400">
            {
              !allowed? 'Mint not allowed!' :
              mintLoading? 'Wait a sec...' :
              'Mint'
            }
        </button>
    )
}

export default MintOneButton