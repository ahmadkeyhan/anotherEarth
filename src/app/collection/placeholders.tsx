"use client"

import {AssetCard} from "@/components/ui/assetCard";


export default function Placeholders() {

    return (
        <div className="mt-8 grid gap-6   sm:grid-cols-2 lg:grid-cols-3">
        {[0,1,2,3,4,5].map((ph) => (
          <AssetCard key={ph} />
        ))}
      </div>
    )
}