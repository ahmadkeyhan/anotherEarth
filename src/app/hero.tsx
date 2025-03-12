"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Rocket } from "lucide-react"

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
      color: `rgba(15,23,42,${0.1 + i * 0.03})`,
      width: 0.5 + i * 0.03,
    }))
  
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full text-slate-950 dark:text-white" viewBox="0 0 696 316" fill="none">
          <title>Another Earth</title>
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  export default function Hero({
    title = "Another Earth",
  }: {
    title?: string
  }) {
    const words = title.split(" ")
    

    const heroRef = useRef(null)
    const isHeroInView = useInView(heroRef, { once: true })
    
    const heroControls = useAnimation()
    useEffect(() => {
        if (isHeroInView) {
          heroControls.start("visible")
        }
    }, [isHeroInView, heroControls])

    const showcaseItems = [
        {
          name: "Astronaut #1",
          price: "1.2 SOL",
          image: "/astro1.jpg",
        },
        {
          name: "Astronaut #2",
          price: "0.8 SOL",
          image: "/astro2.jpg",
        },
        {
          name: "Astronaut #3",
          price: "2.5 SOL",
          image: "/astro3.jpg",
        },
    ]

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
        <section ref={heroRef} className="relative w-full min-h-[90vh] flex flex-col items-center justify-start overflow-hidden">
          {/* Animated background elements */}
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-2} />
            </div>
            <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
          
          <div className="container relative z-10 px-4 py-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate={heroControls} variants={staggerContainer}>
                <motion.h1
                  variants={fadeInUp}
                  custom={1}
                  className="text-3xl md:text-4xl font-bold tracking-tight mb-6"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    Discover & Collect
                  </span>
                  <br />
                  <span>Astronauts</span>
                  <br />
                  <span className="relative">
                    and more
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </span>
                </motion.h1>

                <motion.p variants={fadeInUp} custom={2} className="text-base text-muted-foreground mb-8 max-w-lg">
                  {`Explore our NFT collection. Embark ok a quest to find another earth, before it's too late.`}
                </motion.p>

                <motion.div variants={fadeInUp} custom={3} className="flex flex-wrap gap-4">
                  <Link href="/collection">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300 relative overflow-hidden"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                  <Link href="/mint">
                    <Button
                      size="lg"
                      variant="outline"
                      className="group border border-primary/20 bg-background/50 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden"
                    >
                      Mint an astronaut
                      <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInUp} custom={4} className="mt-10 flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      10K+
                    </span>
                    <span className="text-sm text-muted-foreground">Artworks</span>
                  </div>
                  <div className="h-12 w-px bg-primary/10"></div>
                  
                  <div className="h-12 w-px bg-primary/10"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      4K+
                    </span>
                    <span className="text-sm text-muted-foreground">Collectors</span>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative hidden md:block"
              >
                {/* 3D-like stacked NFT cards */}
                <div className="relative h-[500px] w-[400px] mx-auto">
                  {showcaseItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        x: 60 * index,
                        y: -40 * index,
                        rotate: 5 * index,
                        scale: 1 - index * 0.05,
                      }}
                      whileHover={{
                        y: -60 * index - 20,
                        x: 60 * index + index * 5,
                        rotate: 5 * index + 2,
                        transition: { duration: 0.3 },
                      }}
                      className="absolute origin-bottom-left"
                      style={{ zIndex: showcaseItems.length - index }}
                    >
                      <div className="w-[350px] rounded-2xl overflow-hidden border border-primary/10 bg-background/80 backdrop-blur-sm shadow-xl">
                        <div className="aspect-square relative overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <div className="text-white">
                              <h3 className="font-bold text-lg">{item.name}</h3>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Rocket className="h-4 w-4 text-primary" />
                            <span className="font-medium">{item.price}</span>
                          </div>
                          <Button size="sm" variant="secondary" className="bg-primary/10 text-primary">
                            View
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                />
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex flex-col items-center z-10"
          >
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-6 h-10 rounded-full border border-primary/20 flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                className="w-1.5 h-3 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>
    )
  }