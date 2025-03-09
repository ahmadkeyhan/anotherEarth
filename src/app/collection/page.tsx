"use client"

import FetchAssets from "@/components/mpl/fetchAssets";
import {AssetCard} from "@/components/ui/assetCard";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Collection() {
  const collection = FetchAssets()
  console.log(collection)

  return (
    <div className="container px-4 py-8 md:px-36 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collection</h1>
          <p className="text-muted-foreground">Browse our exclusive NFT collection</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      <div className="mt-8 grid gap-6   sm:grid-cols-2 lg:grid-cols-3">
        {collection.assets.length == 5 && collection.assets.map((asset) => (
          <AssetCard key={asset.name} asset={asset} />
        ))}
      </div>
    </div>
  )

  // return (
  //   <div className="flex flex-col gap-2 items-center text-sm">
  //     <h2 className="text-center">{`You are reading data for ${collection.collectionId.slice(0,15)}...`}</h2>
  //     <ul className="w-full text-xs mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
  //       {collection.assets.length == 5 && collection.assets.map((asset) => {
  //         return (
  //           <AssetCard key={asset.name} asset={asset} />
  //         )
  //       })}
  //     </ul>
  //   </div>
  // );
}
