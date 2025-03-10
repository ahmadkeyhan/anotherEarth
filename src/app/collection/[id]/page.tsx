"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetDetailCard } from "@/components/ui/assetDetailCard"
import { AssetMetadata } from "@/components/ui/assetMetadata"
import {FetchAsset} from "@/components/mpl/fetchAsset"
// import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"

export default function AssetPage({ params }: { params: { id: string } }) {
    // console.log(params)
    const asset = FetchAsset({id:params.id})
console.log(asset)
    return (
        <div className="container px-4 py-8 md:px-6 md:py-12">
        <Link
            href="/collection"
            className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
        </Link>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            {asset && <AssetDetailCard asset={asset} />}

            <div className="flex flex-col gap-4">
            <div>
                <h1 className="text-3xl font-bold">{asset?.name}</h1>
                {/* <div className="mt-2 flex items-center gap-2">
                <span className="text-muted-foreground">Created by</span>
                <Link href="#" className="font-medium text-primary hover:underline transition-colors duration-300">
                    {nft.artist}
                </Link>
                </div> */}
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm border border-primary/10">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                {asset && <AssetMetadata asset={asset} />}
                </TabsContent>
                <TabsContent value="attributes" className="mt-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {asset?.content.metadata.attributes?.map((attribute, index) => (
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
        </div>
    )
}

