import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Skills() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const lineRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

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

      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const { skills } = portfolio
  const categories = skills.categories

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <div ref={lineRef} className="section-accent-line" />
          <h2 ref={titleRef} className="text-display-md section-title-premium">
            {skills.heading}
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const isLast = index === categories.length - 1 && categories.length === 5
            return (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`tech-card p-6 md:p-8 ${
                  isLast ? 'md:col-span-2 lg:col-span-1 lg:mx-0' : ''
                }`}
              >
                <h3 className="font-display text-base font-semibold text-text-primary mb-6">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIdx) => (
                    <span key={itemIdx} className="pill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
