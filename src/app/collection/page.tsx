"use client"

import FetchAssets from "@/components/mpl/fetchAssets";
import AssetCard from "@/components/ui/assetCard";

export default function Collection() {
  const collection = FetchAssets()
  console.log(collection)
  return (
    <div className="flex flex-col gap-2 items-center text-sm">
      <h2 className="text-center">{`You are reading data for ${collection.collectionId.slice(0,15)}...`}</h2>
      <ul className="w-full text-xs mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {collection.assets.length == 5 && collection.assets.map((asset) => {
          return (
            <AssetCard key={asset.name} asset={asset} />
          )
        })}
      </ul>
    </div>
  );
}
