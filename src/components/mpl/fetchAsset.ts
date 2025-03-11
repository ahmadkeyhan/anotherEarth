import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das }  from '@metaplex-foundation/mpl-core-das';
import { publicKey } from '@metaplex-foundation/umi';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"

export default async function FetchAsset({id}:{id: string}) {
    // const [asset,setAsset] = useState<AssetResult>()
    const umi = createUmi("https://api.devnet.solana.com").use(dasApi())
    const assetId = publicKey(id)

    const asset = await das.getAsset(umi, assetId)
    // const fetchAsset = async () => {
    //     await das.getAsset(umi, assetId).then((response) => {
    //       setAsset(response)
    //     })
    // }

    // useEffect(() => {
    //     fetchAsset()
    // },[])

    return asset
}