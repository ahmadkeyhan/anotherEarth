import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import FetchAsset from "@/components/mpl/fetchAsset"
import Asset from "./asset"
import { Suspense } from "react"

export default function AssetPage({ params }: { params: { id: string } }) {

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
        <Suspense fallback={<p>loading</p>}>
            <Asset asset={asset}/>
        </Suspense>
        </div>
    )
}

