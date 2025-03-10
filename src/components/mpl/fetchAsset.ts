'use client'

import useUmiStore from "@/store/useUmiStore";
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das }  from '@metaplex-foundation/mpl-core-das';
import { PublicKey, publicKey } from '@metaplex-foundation/umi';
import { useState,useEffect } from "react";
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types";

export function FetchAsset({id}:{id: string}) {
    const [asset,setAsset] = useState<AssetResult>()
    const umi = useUmiStore().umi
    umi.use(dasApi())
    const assetId = publicKey(id)
    
    const fetchAsset = async () => {
        await das.getAsset(umi, assetId).then((response) => {
          setAsset(response)
        })
    }

    useEffect(() => {
        fetchAsset()
    },[])

    return asset
}