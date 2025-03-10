import { Card, CardContent } from "@/components/ui/card"
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types"
import { cn } from "@/lib/uiUtils"

interface AssetMetadataProps {
  asset: AssetResult
  className?: string
}

export function AssetMetadata({ asset, className }: AssetMetadataProps) {
  return (
    <Card className={cn("overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm", className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {asset.content.metadata.description && (
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="mt-1 text-muted-foreground">{asset.content.metadata.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {asset.owner && (
              <div>
                <h3 className="font-semibold">Owner</h3>
                <p className="text-muted-foreground truncate">{asset.owner}</p>
              </div>
            )}

            {/* {nft.created && (
              <div>
                <h3 className="font-semibold">Created</h3>
                <p className="text-muted-foreground">{nft.created}</p>
              </div>
            )} */}

            {/* {nft.blockchain && ( */}
              <div>
                <h3 className="font-semibold">Blockchain</h3>
                <p className="text-muted-foreground">Solana</p>
              </div>
            {/* )} */}

            {asset.publicKey && (
              <div>
                <h3 className="font-semibold">Token ID</h3>
                <p className="text-muted-foreground truncate">{asset.publicKey}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

