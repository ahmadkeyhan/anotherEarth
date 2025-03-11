"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Rocket } from "lucide-react"
import { Card, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"
import { cn } from "@/lib/uiUtils"

interface AssetCardProps {
    asset?: AssetResult
    className?: string
    showPrice?: boolean
    showActions?: boolean
    aspectRatio?: "square" | "portrait" | "video"
}

export function AssetCard({
    asset, 
    className,
    showPrice = true,
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

    if (asset) {
        return (
            <Link href={`collection/${asset.publicKey}`}>
                {/* card */}
                <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group", className)}>
                    <div className={cn("relative", aspectRatioClass[aspectRatio])}>
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                        {/* Image */}
                        <Image
                            src={`${asset.content.files![0].uri?.slice(32)}`}
                            alt={asset.name}
                            className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* Like button */}
                        {showActions && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-${isLiked? '100' : '0'} group-hover:opacity-100 transition-opacity duration-300`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    setIsLiked(!isLiked)
                                }}
                            >
                                <Heart
                                    className={cn(
                                    "h-4 w-4 transition-colors duration-300",
                                    isLiked ? "fill-purple-500 text-purple-500" : "text-foreground",
                                    )}
                                />
                                <span className="sr-only">Like</span>
                            </Button>
                        )}
                    </div>
                    {/* Card content */}
                    <CardContent className="p-4 z-20">
                        <h3 className="font-semibold truncate">{asset.name}</h3>
                    </CardContent>
                    {/* card footer */}
                    {(showPrice || showActions) && (
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            {showPrice && (
                                <div className="flex items-center gap-1">
                                    <Rocket className="h-4 w-4 text-primary" />
                                    <span className="font-medium">1 SOL</span>
                                </div>
                            )}
                            {showActions && (
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="bg-primary/10 text-primary hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition-colors duration-300"
                                    onClick={(e) => {
                                    e.preventDefault()
                                    // Handle view details action
                                    }}
                                >
                                    View Details
                                </Button>
                            )}
                        </CardFooter>
                    )}
                </Card>
            </Link>
        )
    }

    return (
        
            // {/* card */}
            <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg group", className)}>
                <div className={aspectRatioClass[aspectRatio]}>
                    <Image
                        src='/placeholder.svg'
                        alt='placeholder image'
                        className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {showActions && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-${isLiked? '100' : '0'} group-hover:opacity-100 transition-opacity duration-300`}
                            onClick={(e) => {
                                e.preventDefault()
                                setIsLiked(!isLiked)
                            }}
                        >
                            <Heart
                                className={cn(
                                "h-4 w-4 transition-colors duration-300",
                                isLiked ? "fill-purple-500 text-purple-500" : "text-foreground",
                                )}
                            />
                            <span className="sr-only">Like</span>
                        </Button>
                    )}
                </div>
                {/* Card content */}
                <CardContent className="p-4 z-20">
                    <h3 className="font-semibold truncate">Loading astronaut</h3>
                </CardContent>
                {/* card footer */}
                {(showPrice || showActions) && (
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                        {showPrice && (
                            <div className="flex items-center gap-1">
                                <Rocket className="h-4 w-4 text-primary" />
                                {/* <span className="font-medium">1 SOL</span> */}
                            </div>
                        )}
                        {showActions && (
                            <Button
                                size="sm"
                                variant="secondary"
                                className="bg-primary/10 text-primary hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition-colors duration-300"
                                disabled
                            >
                                View Details
                            </Button>
                        )}
                    </CardFooter>
                )}
            </Card>
    )
}