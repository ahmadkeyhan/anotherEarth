"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Share2, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"
import { cn } from "@/lib/uiUtils"

interface AssetDetailCardProps {
  asset: AssetResult
  className?: string
}

export function AssetDetailCard({ asset, className }: AssetDetailCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: asset.name,
          text: `Check out this NFT: ${asset.name}`,
          url: window.location.href,
        })
        .catch(console.error)
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          // Show toast notification
          console.log("URL copied to clipboard")
        })
        .catch(console.error)
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="overflow-hidden rounded-lg border bg-background relative group">
        {/* Main image */}
        <div className="aspect-square relative">
          <Image
            src={`${asset.content.files![0].uri?.slice(32)}`}
            alt={asset.name}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* NFT info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-bold text-lg">{asset.name}</h3>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm transition-colors duration-300",
            isLiked && "border-red-500/30 text-red-500",
          )}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={cn("h-4 w-4 transition-colors duration-300", isLiked ? "fill-red-500 text-red-500" : "")} />
          <span className="sr-only">Add to favorites</span>
          <div
            className={cn(
              "absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 transition-opacity duration-300",
              isLiked ? "bg-red-500" : "bg-primary",
            )}
          ></div>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden group border border-primary/10 bg-background/50 backdrop-blur-sm transition-colors duration-300"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
          <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-20 group-hover:bg-primary transition-opacity duration-300"></div>
        </Button>
      </div>

      {/* Price card */}
      <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <div className="flex items-center gap-1">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">1 SOL</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300 relative overflow-hidden group"
            >
              Buy Now
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NFT Properties Card */}
      {/* {asset.content.metadata.attributes && asset.content.metadata.attributes.length > 0 && (
        <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Attributes</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {asset.content.metadata.attributes.map((attribute, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-primary/10 p-3 text-center bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
                >
                  <p className="text-xs text-muted-foreground uppercase">{attribute.trait_type}</p>
                  <p className="font-medium truncate">{attribute.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}

      {/* NFT History Card */}
      {/* {asset.history && asset.history.length > 0 && (
        <Card className="overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Transaction History</h3>
            <div className="space-y-4">
              {asset.history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-primary/10 pb-4 last:border-0 last:pb-0"
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
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  )
}

