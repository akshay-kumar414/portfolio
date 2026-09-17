import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const cardsRef = useRef([])
  const [imgError, setImgError] = useState(false)

  // Floating editorial card refs
  const cardContainerRef = useRef(null)
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const innerImgRef = useRef(null)
  const badgeRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardContainerRef.current || !cardRef.current) return
    if (window.innerWidth < 768) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = cardContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const nx = (x / rect.width - 0.5) * 2 // -1 to 1
    const ny = (y / rect.height - 0.5) * 2 // -1 to 1

    const rotX = -ny * 3.5 // ±3.5°
    const rotY = nx * 4.0  // ±4.0°

    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: nx * 14,
        y: ny * 12,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (innerImgRef.current) {
      gsap.to(innerImgRef.current, {
        x: -nx * 4,
        y: -ny * 4,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: nx * 8,
        y: ny * 6,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    if (window.innerWidth < 768) return

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        x: 0,
        y: 0,
        opacity: 0.7,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    if (innerImgRef.current) {
      gsap.to(innerImgRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    if (badgeRef.current) {
      gsap.to(badgeRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        },
      )

      gsap.fromTo(
        contentRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        },
      )

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { about } = portfolio

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ═══ Portrait card ═══ */}
          <div ref={imageRef} className="relative w-full max-w-md mx-auto md:mx-0">
            <div
              ref={cardContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative group [perspective:1000px]"
            >
              {/* Soft outer halo closely framing the card silhouette (85% cool violet, 15% subtle warm gold) */}
              <div
                ref={glowRef}
                style={{
                  background:
                    'radial-gradient(ellipse at 65% 30%, rgba(253, 230, 138, 0.11) 0%, rgba(139, 92, 246, 0.32) 40%, rgba(109, 40, 217, 0.20) 70%, transparent 100%)',
                }}
                className="absolute -inset-2.5 sm:-inset-3.5 rounded-3xl blur-[26px] -z-10 pointer-events-none transition-all duration-500 opacity-75 group-hover:opacity-100"
              />

              {/* Multi-layer subtle decorative outer frames */}
              <div className="absolute -inset-2 rounded-[22px] border border-violet-400/15 group-hover:border-violet-400/30 transition-colors duration-500 pointer-events-none" />
              <div className="absolute -inset-4 rounded-[26px] border border-white/[0.02] group-hover:border-violet-500/10 transition-colors duration-500 pointer-events-none hidden md:block" />

              {/* 3D Tilting Card Container with Fluorescent Edge Light */}
              <div
                ref={cardRef}
                style={{ transformStyle: 'preserve-3d' }}
                className="profile-card-glow relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-card border border-violet-300/30 group-hover:border-violet-300/50"
              >
                {/* Luminous corner & edge specular highlights (continuous outline with subtle warm gold accent) */}
                <div
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(196, 181, 253, 0.75) 35%, rgba(253, 230, 138, 0.35) 60%, rgba(196, 181, 253, 0.5) 80%, transparent 100%)',
                  }}
                  className="absolute -top-[1px] inset-x-8 h-[1.5px] pointer-events-none z-10"
                />
                <div
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(253, 230, 138, 0.32) 0%, rgba(196, 181, 253, 0.65) 35%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
                  }}
                  className="absolute -left-[1px] inset-y-10 w-[1.5px] pointer-events-none z-10"
                />
                <div
                  style={{
                    background:
                      'radial-gradient(circle at top left, rgba(253, 230, 138, 0.14) 0%, rgba(167, 139, 250, 0.18) 50%, transparent 75%)',
                  }}
                  className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl pointer-events-none z-10"
                />
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-violet-500/15 to-transparent rounded-br-2xl pointer-events-none z-10" />

                {!imgError ? (
                  <>
                    <div ref={innerImgRef} className="w-full h-full will-change-transform">
                      <img
                        src="/assets/profile.png"
                        alt={portfolio.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        onError={() => setImgError(true)}
                      />
                    </div>
                    {/* Cinematic vignettes & gradient blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/85 via-bg-primary/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/25 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 border border-violet-400/10 rounded-2xl pointer-events-none" />
                  </>
                ) : (
                  <div className="w-full h-full image-placeholder">
                    <span className="font-display text-6xl text-text-muted/30 uppercase font-bold">
                      {portfolio.firstName?.[0] || 'A'}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Status Badge (depth separated) */}
              <div
                ref={badgeRef}
                className="absolute -bottom-3 left-6 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-bg-card/95 border border-violet-400/25 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_15px_rgba(139,92,246,0.18)] pointer-events-none select-none transition-colors duration-300 group-hover:border-violet-400/45"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                </span>
                <span className="text-[0.68rem] tracking-[0.14em] uppercase font-display font-semibold text-text-primary/90">
                  OPEN TO OPPORTUNITIES
                </span>
              </div>
            </div>
          </div>

          {/* ═══ Text content ═══ */}
          <div ref={contentRef} className="flex flex-col gap-6">
            <div>
              <h2 className="text-display-md text-text-primary leading-tight">
                {about.heading}
                <br />
                <span className="text-accent">{portfolio.name}</span>
              </h2>
            </div>

            <p className="text-body max-w-xl leading-relaxed">{about.description}</p>

            <div className="mt-6 flex flex-col gap-4">
              {about.highlights.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="capability-card p-5 md:p-6 flex gap-5 items-start group"
                >
                  <span className="text-label mt-0.5 shrink-0 text-[0.7rem]" style={{ color: 'rgba(167, 139, 250, 0.7)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-body-sm mt-1.5">{item.description}</p>
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
