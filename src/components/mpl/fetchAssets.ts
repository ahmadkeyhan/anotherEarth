'use client'

import useUmiStore from "@/store/useUmiStore";
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das }  from '@metaplex-foundation/mpl-core-das';
import { publicKey } from '@metaplex-foundation/umi';
import { useState,useEffect } from "react";
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types";

export default function FetchAssets() {
    const [assets,setAssets] = useState<AssetResult[]>([])
    const collectionId = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!)
    const umi = useUmiStore().umi
    umi.use(dasApi())
    
    const fetchAssets = async () => {
        await das.getAssetsByCollection(umi, {collection: collectionId}).then((response) => {
          setAssets(response)
        })
    }

    useEffect(() => {
        fetchAssets()
    },[])

    return {assets,collectionId}
}