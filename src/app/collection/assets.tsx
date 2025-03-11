"use client"

import {AssetCard} from "@/components/ui/assetCard";
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types";
import {use} from 'react'

export default function Assets({ assets } : { assets: Promise<AssetResult[]>}) {
  const allAssets = use(assets)
    return (
        <div className="mt-8 grid gap-6   sm:grid-cols-2 lg:grid-cols-3">
        {allAssets.map((asset) => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
    )
}