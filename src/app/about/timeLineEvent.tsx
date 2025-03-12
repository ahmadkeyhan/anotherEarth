import { timelineEvents } from "./timelineEvents"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket } from "lucide-react"

export function TimelineEvent({
    event,
    index,
    isExpanded,
    onToggle,
  }: {
    event: (typeof timelineEvents)[0]
    index: number
    isExpanded: boolean
    onToggle: () => void
  }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.5 })
  
    return (
      <motion.div
        ref={ref}
        className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      >
        <div className="w-[44%]" />
        <div className="z-20">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 opacity-80 rounded-full">
            <Rocket className="w-4 h-4  text-background" />
          </div>
        </div>
        <motion.div
          className="w-[44%] cursor-pointer"
        //   whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
        >
          <div className="p-4 bg-background rounded-lg shadow-md hover:shadow-lg dark:hover:border-primary/40 dark:border dark:border-primary/20 transition-all duration-300">
            <span className="font-bold text-primary">{event.year}</span>
            <h3 className="font-semibold mb-1">{event.title}</h3>
            <p className="text-muted-foreground text-sm">{event.description}</p>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-xs text-muted-foreground">{event.details}</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }