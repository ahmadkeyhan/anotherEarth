import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import Assets from "./assets";
import FetchAssets from "@/components/mpl/fetchAssets";
import { Suspense } from "react";

export default function Collection() {
  const assets = FetchAssets()
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
      <Suspense fallback={<div>Loading...</div>}>
        <Assets assets={assets} />
      </Suspense>
    </div>
  )
}
