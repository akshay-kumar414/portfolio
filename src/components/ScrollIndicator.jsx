export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
      <span className="text-label text-text-muted text-[0.625rem]">SCROLL</span>
      <div className="w-[1px] h-8 relative overflow-hidden">
        <div
          className="w-full h-full bg-text-muted/50"
          style={{
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
      <style>{`
        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </div>
  )
}
