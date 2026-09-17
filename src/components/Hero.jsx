import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const profileRef = useRef(null)
  const cardRef = useRef(null)
  const sheenRef = useRef(null)

  // Primary content references (Phase 1 & 2)
  const primaryContentRef = useRef(null)
  const primaryHeadlineRef = useRef(null)
  const titleRef = useRef(null)
  const primaryDescRef = useRef(null)
  const primaryCtasRef = useRef(null)

  // Secondary narrative references (Phase 3–5)
  const secondaryContentRef = useRef(null)
  const secondaryHeadlineRef = useRef(null)
  const secondaryTagsRef = useRef(null)
  const secondaryDescRef = useRef(null)

  const scrollIndicatorRef = useRef(null)
  const [imageError, setImageError] = useState(false)

  // 2.5D interactive rotation & drag state
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const dragRot = useRef({ x: 0, y: 0 })
  const mouseRot = useRef({ x: 0, y: 0 })

  // Apply combined 2.5D rotation & specular reflection
  const applyCardTransform = useCallback(() => {
    if (!cardRef.current) return
    const totalRotX = Math.max(-18, Math.min(18, mouseRot.current.x + dragRot.current.x))
    const totalRotY = Math.max(-22, Math.min(22, mouseRot.current.y + dragRot.current.y))

    gsap.set(cardRef.current, {
      rotationX: totalRotX,
      rotationY: totalRotY,
      transformPerspective: 1100,
      transformOrigin: 'center center',
    })

    if (sheenRef.current) {
      gsap.set(sheenRef.current, {
        xPercent: totalRotY * 2.5,
        yPercent: totalRotX * 2.5,
      })
    }

    if (titleRef.current) {
      const px = mouseRot.current.y / 12
      const py = -mouseRot.current.x / 10
      gsap.set(titleRef.current, {
        x: px * 3.5,
        y: py * 2.5,
        rotationY: px * 1.4,
        rotationX: -py * 1.0,
        transformPerspective: 1000,
        transformOrigin: 'center center',
      })
    }
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const mm = gsap.matchMedia()

    // ═════════════════════════════════════════════════════════
    // DESKTOP & TABLET (min-width: 768px)
    // ═════════════════════════════════════════════════════════
    mm.add('(min-width: 768px)', () => {
      // ── Subtle 2.5D Cursor Depth Tracking ──
      const handleMouseMove = (e) => {
        if (isDragging.current || !cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2
        const nx = (e.clientX - cardCenterX) / (window.innerWidth / 2)
        const ny = (e.clientY - cardCenterY) / (window.innerHeight / 2)

        gsap.to(mouseRot.current, {
          x: -ny * 10,
          y: nx * 12,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: applyCardTransform,
        })
      }

      const handleMouseLeave = () => {
        if (isDragging.current) return
        gsap.to(mouseRot.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onUpdate: applyCardTransform,
        })
      }

      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)

      // ── Initial Load Entrance Animation ──
      const introTl = gsap.timeline({ delay: 0.2 })
      introTl
        .fromTo(primaryHeadlineRef.current?.children || [],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power4.out' })
        .fromTo(primaryDescRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(primaryCtasRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(profileRef.current,
          { scale: 1.06, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }, '-=1.0')

      // ── Continuous ScrollTrigger Timeline (NO DEAD STATES) ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=240%',
          pin: true,
          scrub: 1,
        },
      })

      // PHASE 1 -> 2: Portrait steps forward into focus; CTAs & desc soften
      scrollTl
        .to(profileRef.current, {
          scale: 1.04,
          y: -12,
          duration: 2,
          ease: 'power1.inOut',
        }, 0)
        .to(primaryCtasRef.current, {
          opacity: 0,
          y: -12,
          duration: 1.2,
          ease: 'power2.in',
        }, 0.5)
        .to(primaryDescRef.current, {
          opacity: 0,
          y: -12,
          duration: 1.2,
          ease: 'power2.in',
        }, 0.8)

      // PHASE 3: Seamless Cross-Fade (NO BLANK TIME)
      // Primary headline fades up vertically (NO lateral x shift = NO clipping)
      scrollTl
        .to(primaryHeadlineRef.current, {
          y: -25,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 2,
          ease: 'power2.inOut',
        }, 2.0)

        // Simultaneously bring in Secondary headline
        .set(secondaryContentRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 2.4)
        .fromTo(secondaryHeadlineRef.current,
          { opacity: 0, y: 25, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' }, 2.4)

      // PHASE 4: Secondary capabilities & statement reveal; Portrait remains dominant anchor
      scrollTl
        .to(profileRef.current, {
          scale: 0.98,
          y: -20,
          duration: 2.2,
          ease: 'power1.inOut',
        }, 3.8)
        .fromTo(secondaryTagsRef.current?.children || [],
          { opacity: 0, y: 12, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 1.4, ease: 'power2.out' }, 4.2)
        .fromTo(secondaryDescRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' }, 4.8)

      // PHASE 5: Balanced hold (6.8 to 8.6) — Portrait & secondary content active together
      scrollTl.to({}, { duration: 1.8 }, 6.8)

      // PHASE 6: Organic exit into next section (8.6 to 10)
      scrollTl.to(wrapperRef.current, {
        scale: 0.96,
        opacity: 0,
        y: -25,
        duration: 1.4,
        ease: 'power2.in',
      }, 8.6)

      // Scroll indicator fade
      gsap.to(scrollIndicatorRef.current, {
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=15%',
          scrub: true,
        },
        opacity: 0,
        y: 15,
      })

      return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
    })

    // ═════════════════════════════════════════════════════════
    // MOBILE (< 768px)
    // ═════════════════════════════════════════════════════════
    mm.add('(max-width: 767px)', () => {
      const introTl = gsap.timeline({ delay: 0.2 })
      introTl
        .fromTo(profileRef.current, { scale: 1.04, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .fromTo(primaryHeadlineRef.current?.children || [],
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
        .fromTo(primaryDescRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo(primaryCtasRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 1,
        },
      })

      scrollTl
        .to(profileRef.current, { scale: 0.96, y: -8, duration: 1 }, 0)
        .to(primaryCtasRef.current, { opacity: 0, y: -8, duration: 0.8 }, 0.5)
        .to(primaryHeadlineRef.current, { opacity: 0, y: -15, filter: 'blur(5px)', duration: 1.2 }, 1.2)
        .set(secondaryContentRef.current, { autoAlpha: 1 }, 1.8)
        .fromTo(secondaryHeadlineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.2 }, 1.8)
        .fromTo(secondaryTagsRef.current?.children || [],
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 1 }, 2.2)
        .to(wrapperRef.current, { opacity: 0, scale: 0.96, duration: 1 }, 4.2)
    })

    return () => mm.revert()
  }, [applyCardTransform])

  // ── Pointer Drag Event Handlers for 2.5D Rotation ──
  const handlePointerDown = (e) => {
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const deltaX = e.clientX - dragStart.current.x
    const deltaY = e.clientY - dragStart.current.y
    dragRot.current = {
      x: Math.max(-16, Math.min(16, -deltaY * 0.22)),
      y: Math.max(-22, Math.min(22, deltaX * 0.22)),
    }
    applyCardTransform()
  }

  const handlePointerUp = (e) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId)
    } catch (_) {}

    // Elastic snap-back to resting / cursor-following state
    gsap.to(dragRot.current, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.45)',
      onUpdate: applyCardTransform,
    })
  }

  const scrollToWork = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-bg-primary w-full flex items-center justify-center select-none"
    >
      {/* ── Ambient Background Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full blur-[140px] bg-accent/[0.08]" />
        <div className="absolute top-1/4 right-1/4 w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] rounded-full blur-[110px] bg-white/[0.015]" />
        <div className="absolute bottom-1/4 left-1/4 w-[32vw] h-[32vw] max-w-[420px] max-h-[420px] rounded-full blur-[90px] bg-accent/[0.04]" />
      </div>

      {/* ── Master Composition Wrapper ── */}
      <div
        ref={wrapperRef}
        className="w-full min-h-screen flex items-center justify-center relative z-10 py-16 md:py-0 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16"
      >
        {/* ═══ Truly Centered Viewport Container ═══ */}
        <div className="w-full max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] lg:grid-cols-[1.12fr_0.88fr] gap-8 md:gap-8 lg:gap-12 xl:gap-14 items-center">

            {/* ═════════════════════════════════════════════
                COLUMN 1: Typography & Narrative (Left-Center)
            ═════════════════════════════════════════════ */}
            <div className="relative min-w-0 order-2 md:order-1 text-center md:text-left z-20">

              {/* ── Primary Narrative (Phase 1 & 2) ── */}
              <div ref={primaryContentRef} className="flex flex-col items-center md:items-start">
                {/* Giant Headline: Mathematically scaled & wrapped to NEVER clip or overlap face */}
                <div
                  ref={primaryHeadlineRef}
                  className="mb-5 sm:mb-7 flex flex-col items-center md:items-start max-w-full"
                >
                  <h1
                    ref={titleRef}
                    className="hero-title-3d font-display font-extrabold text-[clamp(2.2rem,3.8vw,4.5rem)] leading-[0.94] tracking-tight"
                  >
                    <span className="block hero-title-line1">
                      FULL-STACK
                    </span>
                    <span className="block hero-title-line2">
                      DEVELOPER
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <div ref={primaryDescRef} className="max-w-md lg:max-w-lg mb-7 sm:mb-8">
                  <p className="text-body text-[0.92rem] md:text-[0.98rem] leading-relaxed text-text-secondary">
                    {portfolio.heroDescription}
                  </p>
                </div>

                {/* Dual Action CTAs */}
                <div ref={primaryCtasRef} className="flex flex-col sm:flex-row items-center gap-4">
                  <button onClick={scrollToWork} className="btn-primary">
                    VIEW MY WORK
                    <span className="text-sm">→</span>
                  </button>
                  <button onClick={scrollToContact} className="btn-secondary">
                    CONTACT ME
                  </button>
                </div>
              </div>

              {/* ── Secondary Narrative: Revealed During Scroll (Phase 3–5) ── */}
              <div
                ref={secondaryContentRef}
                className="absolute inset-0 flex flex-col justify-center items-center md:items-start opacity-0 invisible pointer-events-none"
              >
                {/* Secondary Headline */}
                <div ref={secondaryHeadlineRef} className="mb-5 sm:mb-6 flex flex-col">
                  <h2 className="font-display font-bold text-text-primary text-[clamp(2.1rem,3.5vw,4.1rem)] leading-[0.95] tracking-tight">
                    <span className="block">ENGINEERING</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-accent">
                      EXPERIENCE
                    </span>
                  </h2>
                </div>

                {/* Capability Tech Badges (Exact capabilities from stack) */}
                <div ref={secondaryTagsRef} className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-2.5 max-w-md mb-5 sm:mb-6">
                  {['React & TS', 'GSAP Motion', '3D / Depth', 'Tailwind CSS', 'Design Systems', 'Performance'].map((tech) => (
                    <span
                      key={tech}
                      className="hero-capability-badge"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Secondary Statement */}
                <div ref={secondaryDescRef} className="max-w-md">
                  <p className="text-body-sm text-text-muted leading-relaxed">
                    Transforming complex creative visions into fluid, responsive, and cinematic digital products with production-grade engineering.
                  </p>
                </div>
              </div>

            </div>

            {/* ═════════════════════════════════════════════
                COLUMN 2: 2.5D Dominant Portrait (Right-Center)
            ═════════════════════════════════════════════ */}
            <div
              ref={profileRef}
              className="order-1 md:order-2 flex justify-center items-center relative z-20"
            >
              {/* Restrained Atmospheric Backlight (gentle halo behind head & shoulders) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] bg-accent/[0.16] blur-[80px] rounded-full pointer-events-none" />

              {/* 2.5D Perspective Canvas */}
              <div
                className="relative cursor-grab active:cursor-grabbing touch-none select-none"
                style={{ perspective: 1100 }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                {/* Rotating 3D Subject Plane */}
                <div
                  ref={cardRef}
                  className="relative w-[270px] h-[340px] sm:w-[310px] sm:h-[390px] md:w-[330px] md:h-[420px] lg:w-[380px] lg:h-[480px] xl:w-[420px] xl:h-[530px] rounded-3xl will-change-transform flex items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Soft Edge Masking Container: Eliminates the harsh "white photo card" boundary */}
                  <div
                    className="w-full h-full rounded-3xl overflow-hidden relative"
                    style={{
                      // Radial gradient mask dissolves the light background edges smoothly into dark space
                      WebkitMaskImage: 'radial-gradient(ellipse 90% 90% at 50% 46%, black 58%, rgba(0,0,0,0.8) 72%, transparent 98%)',
                      maskImage: 'radial-gradient(ellipse 90% 90% at 50% 46%, black 58%, rgba(0,0,0,0.8) 72%, transparent 98%)',
                    }}
                  >
                    {!imageError ? (
                      <>
                        <img
                          src="/assets/profile.png"
                          alt={`${portfolio.name} — Developer`}
                          className="w-full h-full object-cover object-top pointer-events-none select-none"
                          draggable="false"
                          onError={() => setImageError(true)}
                        />

                        {/* Bottom gradient blend: dark suit smoothly dissolves into website background */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent pointer-events-none opacity-80" />

                        {/* Subtle top & side vignettes for atmospheric depth */}
                        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/35 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/25 via-transparent to-bg-primary/25 pointer-events-none" />

                        {/* Interactive Specular Lighting Sheen (shifts across face/suit with rotation) */}
                        <div
                          ref={sheenRef}
                          className="absolute -inset-[50%] pointer-events-none opacity-25 mix-blend-overlay"
                          style={{
                            background: 'linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.4) 50%, transparent 62%)',
                          }}
                        />
                      </>
                    ) : (
                      <div className="w-full h-full image-placeholder rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-label text-text-muted text-xs">PORTRAIT VISUAL</span>
                      </div>
                    )}
                  </div>

                  {/* Refined Floating Frame Outline (translateZ: 25px) */}
                  <div
                    className="absolute inset-0 rounded-3xl border border-white/[0.08] pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                    style={{ transform: 'translateZ(25px)' }}
                  />

                  {/* Floating Status Pill (translateZ: 45px) */}
                  <div
                    className="absolute -bottom-3 left-4 sm:left-6 z-30 bg-bg-card/95 border border-white/10 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-2xl flex items-center gap-2 pointer-events-none select-none"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[0.66rem] tracking-wider uppercase text-text-primary font-medium">
                      Available for Work
                    </span>
                  </div>

                  {/* Floating 2.5D Depth Badge (translateZ: 45px) */}
                  <div
                    className="absolute -top-3 right-4 sm:right-6 z-30 bg-bg-card/95 border border-white/10 backdrop-blur-md rounded-full px-3 py-1 shadow-2xl pointer-events-none select-none hidden sm:flex items-center gap-1.5"
                    style={{ transform: 'translateZ(45px)' }}
                  >
                    <span className="text-[0.6rem] tracking-widest uppercase text-accent font-semibold">
                      2.5D INTERACTIVE
                    </span>
                  </div>
                </div>

                {/* Subtitle Drag Cue */}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-text-muted/60 text-[0.62rem] uppercase tracking-widest pointer-events-none select-none">
                  <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Drag or hover to rotate</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom Animated Scroll Indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <span className="text-[0.58rem] uppercase tracking-[0.25em] text-text-muted/70">Scroll to explore</span>
        <div className="w-[1px] h-7 relative overflow-hidden bg-white/10">
          <div className="absolute top-0 left-0 w-full h-full bg-accent animate-scroll-line" />
        </div>
        <style>{`
          @keyframes scroll-line {
            0% { transform: translateY(-100%); opacity: 0; }
            40% { transform: translateY(0); opacity: 1; }
            80% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          .animate-scroll-line {
            animation: scroll-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
          }
        `}</style>
      </div>
    </section>
  )
}
