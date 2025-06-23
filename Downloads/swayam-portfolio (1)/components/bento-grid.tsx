"use client"

import { Suspense, lazy } from "react"
import { useDragDrop } from "@/components/drag-drop-provider"
import { DraggableCard } from "@/components/draggable-card"

// Lazy load all card components
const HeroCard = lazy(() => import("@/components/cards/hero-card").then((m) => ({ default: m.HeroCard })))
const AboutCard = lazy(() => import("@/components/cards/about-card").then((m) => ({ default: m.AboutCard })))
const ContactCard = lazy(() => import("@/components/cards/contact-card").then((m) => ({ default: m.ContactCard })))
const TimeCard = lazy(() => import("@/components/cards/time-card").then((m) => ({ default: m.TimeCard })))
const JourneyCard = lazy(() => import("@/components/cards/journey-card").then((m) => ({ default: m.JourneyCard })))
const StatusCard = lazy(() => import("@/components/cards/status-card").then((m) => ({ default: m.StatusCard })))
const ProjectsCard = lazy(() => import("@/components/cards/projects-card").then((m) => ({ default: m.ProjectsCard })))
const BlogCard = lazy(() => import("@/components/cards/blog-card").then((m) => ({ default: m.BlogCard })))
const WorksCard = lazy(() => import("@/components/cards/works-card").then((m) => ({ default: m.WorksCard })))
const MapCard = lazy(() => import("@/components/cards/map-card").then((m) => ({ default: m.MapCard })))
const ColorPicker = lazy(() => import("@/components/color-picker").then((m) => ({ default: m.ColorPicker })))
const FooterCard = lazy(() => import("@/components/cards/footer-card").then((m) => ({ default: m.FooterCard })))

const componentMap = {
  hero: HeroCard,
  about: AboutCard,
  contact: ContactCard,
  time: TimeCard,
  journey: JourneyCard,
  status: StatusCard,
  projects: ProjectsCard,
  blog: BlogCard,
  works: WorksCard,
  map: MapCard,
  colors: ColorPicker,
  footer: FooterCard,
}

function CardSkeleton() {
  return (
    <div className="macos-window rounded-2xl overflow-hidden animate-pulse">
      <div className="traffic-lights border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white/20 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-full" />
            <div className="w-3 h-3 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-3 bg-white/10 rounded w-1/2" />
          <div className="h-3 bg-white/10 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

export function BentoGrid() {
  const { cards } = useDragDrop()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-min">
      {cards.map((card) => {
        const Component = componentMap[card.id as keyof typeof componentMap]

        return (
          <DraggableCard key={card.id} cardId={card.id} className={`${card.gridClass} ${card.minHeight}`}>
            <Suspense fallback={<CardSkeleton />}>
              <Component />
            </Suspense>
          </DraggableCard>
        )
      })}
    </div>
  )
}
