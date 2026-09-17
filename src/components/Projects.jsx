import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'
import ProjectCard from './ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const lineRef = useRef(null)
  const titleRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform',
        },
      )
      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform',
        },
        '-=0.35',
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { projects } = portfolio
  const marqueeList = projects.marqueeItems || [
    'SELECTED WORK',
    'FEATURED PROJECTS',
    'DIGITAL ENGINEERING',
    'CREATIVE DEVELOPMENT',
    'IMMERSIVE EXPERIENCES',
  ]

  // Editorial text marquee repeated set
  const repeatedMarquee = [...marqueeList, ...marqueeList, ...marqueeList, ...marqueeList]

  // Project cards repeated 3 times per set (~4,600px wide, guaranteed wider than any 4K screen)
  const projectCardsSet = [...projects.items, ...projects.items, ...projects.items]

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-bg-primary"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* ═══ 1. MOVING HORIZONTAL MARQUEE (SEPARATE EDITORIAL TEXT STRIP) ═══ */}
        <div
          ref={marqueeRef}
          className="relative w-full overflow-hidden mb-3 py-2.5 border-y border-white/[0.06] bg-white/[0.015] backdrop-blur-[2px]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

          {/* Continuous Left-to-Right text marquee */}
          <div className="flex select-none whitespace-nowrap animate-marquee-ltr w-max">
            <div className="flex shrink-0 items-center">
              {repeatedMarquee.map((item, idx) => (
                <span
                  key={`pseg1-${idx}`}
                  className="inline-flex items-center text-[0.68rem] sm:text-[0.74rem] md:text-[0.8rem] tracking-[0.24em] uppercase font-display font-medium text-text-muted/70"
                >
                  <span>{item}</span>
                  <span className="mx-4 sm:mx-6 text-accent/50 text-[0.55rem]">•</span>
                </span>
              ))}
            </div>

            <div className="flex shrink-0 items-center" aria-hidden="true">
              {repeatedMarquee.map((item, idx) => (
                <span
                  key={`pseg2-${idx}`}
                  className="inline-flex items-center text-[0.68rem] sm:text-[0.74rem] md:text-[0.8rem] tracking-[0.24em] uppercase font-display font-medium text-text-muted/70"
                >
                  <span>{item}</span>
                  <span className="mx-4 sm:mx-6 text-accent/50 text-[0.55rem]">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ 2. STATIC FEATURED PROJECTS HEADING ═══ */}
        <div ref={headerRef} className="mb-8 md:mb-10 mt-5">
          <div ref={lineRef} className="section-accent-line" />
          <h2 ref={titleRef} className="text-display-md section-title-premium">
            {projects.heading}
          </h2>
        </div>

        {/* ═══ 4. 3D PERSPECTIVE PROJECT CARDS TRACK (CONTINUOUS LEFT → RIGHT AUTO-MOTION) ═══ */}
        <div
          className="relative w-full overflow-hidden py-6"
          style={{ perspective: 1200 }}
        >
          {/* Edge gradient vignettes */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-bg-primary via-bg-primary/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-bg-primary via-bg-primary/90 to-transparent z-10 pointer-events-none" />

          {/* Continuous Left-to-Right Moving Track */}
          <div
            className="flex items-stretch gap-6 md:gap-7 w-max will-change-transform animate-card-track-projects py-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Set 1 */}
            <div className="flex items-stretch gap-6 md:gap-7 shrink-0" style={{ transformStyle: 'preserve-3d' }}>
              {projectCardsSet.map((project, index) => (
                <div
                  key={`proj-set1-${index}`}
                  className="shrink-0 will-change-transform"
                  style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(1.5deg)' }}
                >
                  <ProjectCard project={project} index={index % 4} />
                </div>
              ))}
            </div>

            {/* Set 2 (exact duplicate for seamless, invisible loop) */}
            <div className="flex items-stretch gap-6 md:gap-7 shrink-0" style={{ transformStyle: 'preserve-3d' }} aria-hidden="true">
              {projectCardsSet.map((project, index) => (
                <div
                  key={`proj-set2-${index}`}
                  className="shrink-0 will-change-transform"
                  style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(1.5deg)' }}
                >
                  <ProjectCard project={project} index={index % 4} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
