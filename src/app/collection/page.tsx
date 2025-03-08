"use client"
import Header from "@/components/ui/header";
import FetchAssets from "@/components/mpl/fetchAssets";
import Link from "next/link";
import {MdLink} from 'react-icons/md'

export default function Collection() {
  const collection = FetchAssets()
  // console.log(collection)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Header />
      <div className="flex flex-col gap-2 items-center text-sm">
        <h2 className="text-center">{`You are reading data for ${collection.collectionId.slice(0,15)}...`}</h2>
        <ul className="w-full text-xs mt-2">
          {collection.assets.map((asset,index) => {
            return (
              <li key={index} className="mb-2 border-b-2">
                <div className="flex flex-row justify-between w-full">
                  <p>{asset.name}</p>
                  <Link 
                    href={`https://solana.fm/address/${asset.owner}/transactions?cluster=devnet-alpha`} 
                    target="_blank">
                    <div className="flex flex-row gap-1 items-center">
                      <p>{asset.owner.slice(0,8)}</p>
                      <MdLink />
                    </div>
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <p>{`An on-chain quest to find another earth, before it's too late! 🧑‍🚀🚀`}</p>
    </main>
  );
}
