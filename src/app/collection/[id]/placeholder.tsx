"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetDetailCard } from "@/components/ui/assetDetailCard"
import { AssetMetadata } from "@/components/ui/assetMetadata"

export default function Placeholder() {

    return (
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <AssetDetailCard  />
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Astronaut loading</h1>
                </div>
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm border border-primary/10">
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="attributes">Attributes</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-4">
                        <AssetMetadata />
                    </TabsContent>
                    <TabsContent value="attributes" className="mt-4">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        </div>
                    </TabsContent>
                    <TabsContent value="history" className="mt-4">
                        <div className="space-y-4 border border-primary/10 rounded-lg p-6 bg-background/50 backdrop-blur-sm">
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}