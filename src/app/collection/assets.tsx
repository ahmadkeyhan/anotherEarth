"use client"

import FetchAssets from "@/components/mpl/fetchAssets";
import {AssetCard} from "@/components/ui/assetCard";

export default function Assets() {
    const assets = FetchAssets()

    return (
        <div className="mt-8 grid gap-6   sm:grid-cols-2 lg:grid-cols-3">
        {assets.assets.map((asset) => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
    )
}