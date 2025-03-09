"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Rocket, ExternalLink } from "lucide-react"
// import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"
import { cn } from "@/lib/uiUtils"

interface AssetCardProps {
    asset: AssetResult
    className?: string
    // showPrice?: boolean
    showActions?: boolean
    aspectRatio?: "square" | "portrait" | "video"
}

export function AssetCard({
    asset, 
    className,
    // showPrice = true,
    showActions = true,
    aspectRatio = "square"
}: AssetCardProps) {
    // console.log(asset)
    const [isLiked, setIsLiked] = useState(false)

    const aspectRatioClass = {
        square: "aspect-square",
        portrait: "aspect-[3/4]",
        video: "aspect-video",
    }

    return (
        <Link href={`collection/${asset.name}`}>
            {/* card */}
            <div className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group", className)}>
                <div className={cn("relative", aspectRatioClass[aspectRatio])}>
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    {/* Image */}
                    <Image
                        src={`${asset.content.files![0].uri?.slice(32)}`}
                        alt={asset.name}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Like button */}
                    {showActions && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsLiked(!isLiked)
                            }}
                        >
                            <Heart
                                className={cn(
                                "h-4 w-4 transition-colors duration-300",
                                isLiked ? "fill-red-500 text-red-500" : "text-foreground",
                                )}
                            />
                            <span className="sr-only">Like</span>
                        </Button>
                    )}
                </div>
                {/* Card content */}
                <div className="p-4">
                    <h3 className="font-semibold truncate">{asset.name}</h3>
                </div>
                {/* card footer */}
                {/* {(showPrice || showActions) && (
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        {showPrice && (
                            <div className="flex items-center gap-1">
                                <Rocket className="h-4 w-4 text-primary" />
                                <span className="font-medium">{asset.price}</span>
                            </div>
                        )}
                        {showActions && (
                            <Button
                                size="sm"
                                variant="secondary"
                                className="bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-300"
                                onClick={(e) => {
                                e.preventDefault()
                                // Handle view details action
                                }}
                            >
                                View Details
                            </Button>
                        )}
                    </CardFooter>
                )} */}
            </div>
        </Link>
    )

    // return (
    //     <li key={asset.name} 
    //         className="flex flex-col gap-1 mb-2 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-md shadow-md hover:shadow-lg transition duration-300">
    //         <Link
    //             href={`https://solana.fm/address/${asset.publicKey}/transactions?cluster=devnet-alpha`}
    //             target="_blank"
    //             rel="noopener noreferrer">
    //             <Image 
    //                 src={`${asset.content.files![0].uri?.slice(32)}`}
    //                 width={100}
    //                 height={100}
    //                 alt={asset.name}
    //                 className="w-full rounded-sm"/>
    //         </Link>
    //         <p>{asset.name}</p>
    //         <div className="flex flex-row justify-between w-full">
    //             <p>holder:</p>
    //             <Link 
    //                 href={`https://solana.fm/address/${asset.owner}/transactions?cluster=devnet-alpha`} 
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-blue-500 hover:underline">
    //                 <div className="flex flex-row gap-1 items-center">
    //                     <p className="font-mono">{asset.owner.slice(0,8)}</p>
    //                     <MdLink />
    //                 </div>
    //             </Link>
    //         </div>
    //     </li>
    // )
}