"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import {TimelineEvent} from "./timeLineEvent"
import { timelineEvents } from "./timelineEvents"
// import { FlowerIcon } from "./flowerIcon"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Clock, Rocket, Sparkles, Star, Zap } from "lucide-react"



export default function Timeline() {
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => setIsVisible(true),[])
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut",
          },
        }),
      }

  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
<div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-0">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          <div className="container relative z-10 px-4 py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-6">
                Redefining Digital Ownership
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're building the future of digital collectibles with cutting-edge blockchain technology and immersive
                experiences.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300 relative overflow-hidden"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border border-primary/20 bg-background/50 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden"
                >
                  Join Community
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 relative">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={fadeIn} custom={0}>
                <h2 className="text-3xl font-bold mb-6 inline-flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                    Our Story
                  </span>
                  <div className="ml-4 h-px w-12 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                </h2>
                <p className="text-muted-foreground mb-4">
                  Our NFT collection was born from a passion for digital art and blockchain technology. We believe in
                  empowering artists and creators by providing them with a platform to showcase their unique talents and
                  connect with collectors worldwide.
                </p>
                <p className="text-muted-foreground mb-6">
                  Founded in 2023, our platform has quickly grown to become a hub for innovative digital art, hosting
                  works from both established and emerging artists who push the boundaries of creativity in the digital
                  realm.
                </p>
                <div className="flex gap-4 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      10K+
                    </div>
                    <div className="text-sm text-muted-foreground">NFTs Created</div>
                  </div>
                  <div className="h-12 w-px bg-primary/10"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      5K+
                    </div>
                    <div className="text-sm text-muted-foreground">Artists</div>
                  </div>
                  <div className="h-12 w-px bg-primary/10"></div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                      50K+
                    </div>
                    <div className="text-sm text-muted-foreground">Collectors</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                custom={1}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border border-primary/10 bg-background/50 backdrop-blur-sm shadow-xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:opacity-75 transition-opacity duration-500"></div>
                  {/* <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="NFT Collection"
                    width={600}
                    height={600}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  /> */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="font-bold text-xl">Genesis Collection</h3>
                      <p className="text-sm text-white/80">Our first 10,000 unique NFTs</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Roadmap section */}
        <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Road Map</h2>
          <p className="mt-4 text-lg text-muted-foreground">A road map to find another earth before It's too late!🧑‍🚀🚀</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* Flower icon */}
          {/* <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          >
            <FlowerIcon progress={useTransform(scrollYProgress, [0, 1], [0.5, 1]) as any} />
          </motion.div> */}

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
        {/* Mission Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Support Artists",
                  description:
                    "We ensure artists receive fair compensation for their work and ongoing royalties from secondary sales.",
                  icon: <Sparkles className="h-6 w-6" />,
                  color: "from-purple-500 to-blue-500",
                  delay: 0,
                },
                {
                  title: "Curate Quality",
                  description:
                    "We carefully curate our collection to showcase the highest quality digital art from around the world.",
                  icon: <Star className="h-6 w-6" />,
                  color: "from-blue-500 to-cyan-400",
                  delay: 1,
                },
                {
                  title: "Build Community",
                  description:
                    "We foster a supportive community of creators and collectors who share a passion for digital art.",
                  icon: <Zap className="h-6 w-6" />,
                  color: "from-cyan-400 to-purple-500",
                  delay: 2,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeIn}
                  custom={item.delay}
                  className="group"
                >
                  <div className="h-full p-8 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10 mb-4 inline-block`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="container px-4">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              custom={0}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "What is an NFT?",
                  answer:
                    "NFT stands for Non-Fungible Token. It's a digital asset that represents ownership of a unique item or piece of content on the blockchain, making digital art scarce, provably unique, and ownable.",
                },
                {
                  question: "How do I purchase an NFT?",
                  answer:
                    "To purchase an NFT, you'll need a cryptocurrency wallet and some cryptocurrency (typically Ethereum). Browse our collection, connect your wallet, and follow the prompts to complete your purchase.",
                },
                {
                  question: "Can I sell my NFT later?",
                  answer:
                    "Yes, you can list your NFT for sale on our marketplace or transfer it to another marketplace. As the owner, you have full control over your digital asset.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={fadeIn}
                  custom={index + 1}
                  className="p-6 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group"
                >
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-0">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
          </div>

          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                Ready to explore the future of digital art?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">Join our community of creators and collectors today.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/collection">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 transition-all duration-300 relative overflow-hidden"
                  >
                    Browse Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group border border-primary/20 bg-background/50 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden"
                  >
                    Sign Up
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}



