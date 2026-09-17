import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1, ease: 'power4.out' })
        .from(linksRef.current?.children || [], {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform',
        }, '-=0.5')
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const { contact } = portfolio

  return (
    <section id="contact" className="section-padding relative overflow-hidden flex flex-col items-center justify-center w-full" ref={containerRef}>
      {/* Atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-[120px] opacity-10 -z-10 pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center relative">
        <h2 ref={headingRef} className="text-display-lg md:text-display-xl mb-10 md:mb-12 leading-none text-center flex flex-col items-center">
          <span className="block contact-heading-line1">LET&apos;S BUILD</span>
          <span className="block contact-heading-line2">SOMETHING.</span>
        </h2>

        <div ref={linksRef} className="flex flex-wrap justify-center items-center gap-4 w-full">
          {contact.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="contact-card group"
            >
              <span>{link.label}</span>
              <span className="contact-card-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
