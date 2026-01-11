'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Chip, ChipGroup } from 'app/components/chip'
import { SiFigma, SiMiro, SiNotion, SiVercel, SiReact, SiPosthog } from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'
import { HiSparkles } from 'react-icons/hi'

type HoverState = 'none' | 'design' | 'build'


// Each line fades in
const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

const chipGroupVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const chipGroupVariantsBottom: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function Hero() {
  const [hoverState, setHoverState] = useState<HoverState>('none')

  const designChips = (
    <ChipGroup>
      <Chip icon={<SiFigma />} variant="purple">Figma</Chip>
      <Chip icon={<SiMiro />} variant="amber">Miro</Chip>
      <Chip icon={<SiPosthog />} variant="blue">PostHog</Chip>
      <Chip icon={<SiNotion />} variant="gray">Notion</Chip>
    </ChipGroup>
  )

  const buildChips = (
    <ChipGroup >
      <Chip icon={<VscCode />} variant="blue">VSCode</Chip>
      <Chip icon={<SiVercel />} variant="gray">Vercel</Chip>
      <Chip icon={<SiReact />} variant="teal">React</Chip>
      <Chip icon={<HiSparkles />} variant="pink">Claude</Chip>
    </ChipGroup>
  )

  return (
    <motion.div
      className="text-base leading-relaxed pt-8 pb-8 relative"
    >
      {/* =================== Design Section =================== */}
      <span
        className="inline-block cursor-pointer"
        onMouseEnter={() => setHoverState('design')}
        onMouseLeave={() => setHoverState('none')}
      >
        {/* Design chips - absolute to parent container */}
      <AnimatePresence>
        {hoverState === 'design' && (
          <motion.div
            variants={chipGroupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-0 left-0 whitespace-nowrap"
          >
            {designChips}
          </motion.div>
        )}
      </AnimatePresence>
        <motion.span
          className="inline"
          variants={lineVariants}
          animate={{
            opacity: hoverState === 'build' ? 0.6  : 1,
          }}
          transition={{ duration: 0.1 }}
        >
          <span>As a </span>
          <span className="font-semibold text-blue-600 dark:text-blue-400 transition-colors">
            Product (UX/UI) Designer
          </span>
          <span>, I design software that unifies automated workflows, real-time data, and human input, delivering mission-critical situational awareness for effective decision-making in time-sensitive environments. </span>
        </motion.span>
      </span>






      {/* =================== Build Section =================== */}



      <span
        className="inline-block mt-2 cursor-pointer"
        onMouseEnter={() => setHoverState('build')}
        onMouseLeave={() => setHoverState('none')}
      >
        {/* Build chips - absolute to parent container */}
      <AnimatePresence>
        {hoverState === 'build' && (
          <motion.div
            variants={chipGroupVariantsBottom}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute bottom-0 left-0 whitespace-nowrap"
          >
            {buildChips}
          </motion.div>
        )}
      </AnimatePresence>
        <motion.span
          className="inline"
          variants={lineVariants}
          animate={{
            opacity: hoverState === 'design' ? 0.6  : 1,
          }}
          transition={{ duration: 0.6  }}
        >
          <span>Sometimes, I </span>
          <span className="font-semibold text-pink-600 dark:text-pink-400 transition-colors">
            build
          </span>
          <span> tools that eliminate operational friction, redirecting effort toward strategic problem-solving and value creation.</span>
        </motion.span>
      </span>
    </motion.div>
  )
}
 