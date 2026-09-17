import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portfolio from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-based background change
      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        onUpdate: (self) => {
          setScrolled(self.scroll() > 100)
        },
      })

      // Active section tracking
      portfolio.navLinks.forEach((link) => {
        const id = link.href.substring(1)
        const element = document.getElementById(id)
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) setActiveSection(link.href)
            },
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        linksRef.current.filter(Boolean),
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.5, delay: 0.1, ease: 'power3.out' },
      )
    } else {
      document.body.style.overflow = ''
      if (menuRef.current) {
        gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
      }
    }
  }, [isMenuOpen])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 py-3 md:py-4 transition-all duration-500 border-b ${
          scrolled
            ? 'bg-bg-primary/80 backdrop-blur-xl border-border'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="font-display font-semibold text-sm tracking-wider uppercase text-text-primary z-50 relative"
          >
            {portfolio.name}
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {portfolio.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4 z-50 relative">
            <a
              href="#"
              className="hidden md:inline-block text-xs text-text-primary rounded-full border border-border px-4 py-1.5 hover:border-accent transition-colors duration-300 tracking-wider uppercase"
            >
              VIEW CV
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-[1.5px] bg-text-primary rounded-sm transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-text-primary rounded-sm transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-text-primary rounded-sm transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-bg-primary/95 backdrop-blur-xl invisible opacity-0 flex flex-col justify-center items-center"
      >
        <nav className="flex flex-col items-center gap-8">
          {portfolio.navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => (linksRef.current[i] = el)}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-display-md font-display font-semibold uppercase tracking-wider transition-colors duration-300 ${
                activeSection === link.href ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            ref={(el) => (linksRef.current[portfolio.navLinks.length] = el)}
            href="#"
            className="mt-8 text-sm text-text-primary rounded-full border border-border px-6 py-2 hover:border-accent transition-colors duration-300 uppercase tracking-wider"
          >
            VIEW CV
          </a>
        </nav>
      </div>
    </>
  )
}
