"use client"

import FetchCandyMachine  from "../../components/mpl/fetchCandyMachine";
import MintOneButton from "../../components/mpl/mintOne";

export default function Mint() {
  const candyMachineId = process.env.NEXT_PUBLIC_CANDYMACHINE_ID
  
  const candyMachine = FetchCandyMachine()
  console.log(candyMachine)
  return (
    <div className="flex flex-col gap-2 items-center">
      <h2 className="text-center">{`You are about to mint from the candy machine ${candyMachineId!.slice(0,15)}...`}</h2>
      <p>{`${candyMachine.itemsRedeemed}/${candyMachine.itemsLoaded} items are already minted!`}</p>
      <div className="flex items-center justify-center">
        <MintOneButton candyMachineId={candyMachineId!} collectionMint={candyMachine.collectionMint} mintAuth={candyMachine.mintAuth} solPayDestination={candyMachine.solPayDestination} allowed={candyMachine.allowed} />
      </div>
    </div>
      
  );
}
