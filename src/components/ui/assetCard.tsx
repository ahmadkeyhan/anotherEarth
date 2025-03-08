import Link from "next/link"
import {MdLink} from 'react-icons/md'
import { AssetResult } from "@metaplex-foundation/mpl-core-das/dist/src/types";
import Image from "next/image";

export default function AssetCard({asset}: {asset:AssetResult}) {
    console.log(asset)
    return (
        <li key={asset.name} 
            className="flex flex-col gap-1 mb-2 dark:bg-neutral-800 dark:hover:bg-neutral-700 p-2 rounded-md shadow-md hover:shadow-lg transition duration-300">
            <Link
                href={`https://solana.fm/address/${asset.publicKey}/transactions?cluster=devnet-alpha`}
                target="_blank"
                rel="noopener noreferrer">
                <Image 
                    src={`${asset.content.files![0].uri?.slice(32)}`}
                    width={100}
                    height={100}
                    alt={asset.name}
                    className="w-full rounded-sm"/>
            </Link>
            <p>{asset.name}</p>
            <div className="flex flex-row justify-between w-full">
                <p>holder:</p>
                <Link 
                    href={`https://solana.fm/address/${asset.owner}/transactions?cluster=devnet-alpha`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline">
                    <div className="flex flex-row gap-1 items-center">
                        <p className="font-mono">{asset.owner.slice(0,8)}</p>
                        <MdLink />
                    </div>
                </Link>
            </div>
        </li>
    )
}