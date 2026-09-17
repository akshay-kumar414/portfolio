import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const lineRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Header reveal on scroll
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

  const { process } = portfolio

  // Duplicate steps 3 times per set to ensure one set is ~4,200px wide (wider than any 4K display)
  const stepsSet = [...process.steps, ...process.steps, ...process.steps]

  return (
    <section
      id="process"
      ref={sectionRef}
      className="pt-16 md:pt-20 pb-20 md:pb-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden bg-bg-primary"
    >
      {/* Subtle bottom transition into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-[1200px] h-[1px] bg-gradient-to-r from-transparent via-violet-400/10 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* ═══ STATIC SECTION HEADER ═══ */}
        <div ref={headerRef} className="mb-6 md:mb-8">
          <div ref={lineRef} className="section-accent-line" />
          <h2 ref={titleRef} className="text-display-md section-title-premium">
            {process.heading}
          </h2>
        </div>

        {/* ═══ 3D PERSPECTIVE CONTINUOUS MARQUEE STAGE (LEFT → RIGHT AUTO-MOTION) ═══ */}
        <div
          className="relative w-full overflow-hidden py-8 md:py-10 my-1"
          style={{ perspective: 1200 }}
        >
          {/* Subtle Ambient Radial Atmosphere Behind Track (Center-focused) */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] lg:w-[1100px] h-[340px] sm:h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, rgba(107, 92, 231, 0.04) 45%, rgba(18, 17, 26, 0.01) 75%, transparent 100%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Subtle Center Focus Depth Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[440px] h-[260px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.07) 0%, rgba(139, 92, 246, 0.02) 65%, transparent 100%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Stage Top & Bottom Subtle Architectural Lines */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-violet-400/10 to-transparent pointer-events-none" />

          {/* Natural Edge Vignette Blends (Wider, multi-stop graceful fade) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 md:w-56 lg:w-72 bg-gradient-to-r from-bg-primary via-bg-primary/95 via-bg-primary/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 md:w-56 lg:w-72 bg-gradient-to-l from-bg-primary via-bg-primary/95 via-bg-primary/50 to-transparent z-10 pointer-events-none" />

          {/* Continuous Left-to-Right Moving Track */}
          <div
            className="flex items-stretch gap-6 md:gap-7 w-max will-change-transform animate-card-track-process py-3"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Set 1 */}
            <div className="flex items-stretch gap-6 md:gap-7 shrink-0" style={{ transformStyle: 'preserve-3d' }}>
              {stepsSet.map((step, index) => (
                <div
                  key={`p-set1-${index}`}
                  className="w-[280px] sm:w-[300px] md:w-[320px] h-[300px] sm:h-[320px] process-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between shrink-0 relative overflow-hidden will-change-transform hover:-translate-y-1.5 transition-all duration-300"
                  style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(1.5deg)' }}
                >
                  {/* TOP: Phase Badge + Stage Number */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-violet-400/20 bg-white/[0.03] text-accent font-display text-[0.66rem] tracking-widest uppercase font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      PHASE {step.number}
                    </span>
                    <span className="text-text-muted text-[0.62rem] uppercase tracking-[0.18em] font-medium">
                      0{(index % 4) + 1} / 04
                    </span>
                  </div>

                  {/* CENTER: Process Title & Description */}
                  <div className="my-auto py-1">
                    <h3 className="text-2xl sm:text-[1.75rem] font-display font-bold text-text-primary tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mt-2.5 leading-relaxed text-xs sm:text-[0.82rem] line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* BOTTOM: Category Metadata + Directional Arrow */}
                  <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between">
                    <span className="text-[0.68rem] tracking-wider uppercase text-text-muted font-medium">
                      {step.category}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-text-muted text-xs">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (exact duplicate for seamless, invisible loop) */}
            <div className="flex items-stretch gap-6 md:gap-7 shrink-0" style={{ transformStyle: 'preserve-3d' }} aria-hidden="true">
              {stepsSet.map((step, index) => (
                <div
                  key={`p-set2-${index}`}
                  className="w-[280px] sm:w-[300px] md:w-[320px] h-[300px] sm:h-[320px] process-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between shrink-0 relative overflow-hidden will-change-transform hover:-translate-y-1.5 transition-all duration-300"
                  style={{ transformStyle: 'preserve-3d', transform: 'perspective(1000px) rotateX(1.5deg)' }}
                >
                  {/* TOP: Phase Badge + Stage Number */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-violet-400/20 bg-white/[0.03] text-accent font-display text-[0.66rem] tracking-widest uppercase font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      PHASE {step.number}
                    </span>
                    <span className="text-text-muted text-[0.62rem] uppercase tracking-[0.18em] font-medium">
                      0{(index % 4) + 1} / 04
                    </span>
                  </div>

                  {/* CENTER: Process Title & Description */}
                  <div className="my-auto py-1">
                    <h3 className="text-2xl sm:text-[1.75rem] font-display font-bold text-text-primary tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-text-secondary mt-2.5 leading-relaxed text-xs sm:text-[0.82rem] line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  {/* BOTTOM: Category Metadata + Directional Arrow */}
                  <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between">
                    <span className="text-[0.68rem] tracking-wider uppercase text-text-muted font-medium">
                      {step.category}
                    </span>
                    <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-text-muted text-xs">
                      →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
