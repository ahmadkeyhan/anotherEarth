"use client"
import Header from "@/components/ui/header";
import useUmiStore from "@/store/useUmiStore";
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das }  from '@metaplex-foundation/mpl-core-das';
import { publicKey } from '@metaplex-foundation/umi';
import { useState,useEffect } from "react";
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types";

export default function Collection() {
  const [collection, setCollection] = useState({})
  const [assets,setAssets] = useState<AssetResult[]>([])
  const collectionId = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!)
  const umi = useUmiStore().umi
  umi.use(dasApi())
  
  // const fetchCollection = async () => {
  //   await das.getCollection(umi,collectionId).then((response) => {
  //     setCollection(response)
  //     console.log(response)
  //   })
  // }

  const fetchAssets = async () => {
    await das.getAssetsByCollection(umi, {collection: collectionId}).then((response) => {
      setAssets(response)
    })
  }
  useEffect(() => {
    fetchAssets()
  },[])

  useEffect(() => {
    console.log(assets)
  }, [assets])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Header />
      <div className="flex flex-col gap-2 items-center text-sm">
        <h2 className="text-center">{`You are reading data for ${collectionId!.slice(0,15)}...`}</h2>

      </div>
      <p>{`An on-chain quest to find another earth, before it's too late! 🧑‍🚀🚀`}</p>
    </main>
  );
}
