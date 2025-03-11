
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das }  from '@metaplex-foundation/mpl-core-das';
import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

export default async function FetchAssets() {
    const collectionId = publicKey(process.env.NEXT_PUBLIC_COLLECTION_ID!)
    const umi = createUmi("https://api.devnet.solana.com").use(dasApi())
 
    const assets = await das.getAssetsByCollection(umi, {collection: collectionId})

    return assets
}