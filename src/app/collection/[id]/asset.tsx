"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetDetailCard } from "@/components/ui/assetDetailCard"
import { AssetMetadata } from "@/components/ui/assetMetadata"
import {use} from 'react'
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"

export default function Asset({ asset } : { asset: Promise<AssetResult>}) {
    const coreAsset = use(asset)
    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <AssetDetailCard asset={coreAsset} />
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{coreAsset.name}</h1>
                </div>
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm border border-primary/10">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="attributes">Attributes</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-4">
                        <AssetMetadata asset={coreAsset} />
                    </TabsContent>
                    <TabsContent value="attributes" className="mt-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {coreAsset.content.metadata.attributes?.map((attribute, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-primary/10 p-3 text-center bg-background/50 backdrop-blur-sm"
                        >
                            <p className="text-xs text-muted-foreground uppercase">{attribute.trait_type}</p>
                            <p className="font-medium">{attribute.value}</p>
                            {/* <p className="text-xs text-muted-foreground">{property.rarity}</p> */}
                        </div>
                        ))}
                    </div>
                    </TabsContent>
                    <TabsContent value="history" className="mt-4">
                    <div className="space-y-4 border border-primary/10 rounded-lg p-6 bg-background/50 backdrop-blur-sm">
                        {/* {nft.history?.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between border-b border-primary/10 pb-4 last:border-0"
                        >
                            <div>
                            <p className="font-medium">{item.event}</p>
                            <p className="text-sm text-muted-foreground">
                                From {item.from} to {item.to}
                            </p>
                            </div>
                            <div className="text-right">
                            <p className="font-medium">{item.price}</p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                        </div>
                        ))} */}
                    </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}