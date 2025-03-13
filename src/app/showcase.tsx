"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Layers, Rocket, Shield, Sparkles, Wallet, Zap } from "lucide-react"
import { showcaseItems } from "./showcaseItems"

export default function Showcase() {
    const showcaseRef = useRef(null)
    const isShowcaseInView = useInView(showcaseRef, { once: true, amount: 0.2 })
    const showcaseControls = useAnimation()

    useEffect(() => {
        if (isShowcaseInView) {
          showcaseControls.start("visible")
        }
    }, [isShowcaseInView, showcaseControls])

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut",
          },
        }),
    }
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
    }

    return (
        <section ref={showcaseRef} className="py-8 px-4 lg:px-24 w-full relative overflow-hidden">
          <div className="container relative z-10 px-4">
            <motion.div
              initial="hidden"
              animate={showcaseControls}
              variants={staggerContainer}
              className="text-center mb-8"
            >
              <motion.h2 variants={fadeInUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                  Featured Collectibles
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} custom={1} className="text-muted-foreground max-w-2xl mx-auto">
                Explore our generative collectibles.
              </motion.p>
            </motion.div>
            <motion.div
              initial="hidden"
              animate={showcaseControls}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {showcaseItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index + 2}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link href={`/collection/${item.id}`}>
                    <div className="rounded-2xl overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/20">
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <div className="text-white">
                            <h3 className="font-bold text-base">{item.name}</h3>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      </div>
                      <div className="flex items-center justify-around py-6">
                        <h3 className="text-base font-bold mb-2">{item.name}</h3>
                        <Button size="sm" variant="secondary" className="bg-primary/10 text-primary">
                            View
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              custom={5}
              initial="hidden"
              animate={showcaseControls}
              className="mt-12 text-center"
            >
              <Link href="/collection">
                <Button
                  variant="default"
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300 relative overflow-hidden"
                >
                  Explore Collectibles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
    )
}
