export default function ProjectCard({ project, index }) {
  return (
    <div className="w-[300px] sm:w-[330px] md:w-[360px] h-[390px] sm:h-[415px] featured-project-card rounded-2xl flex flex-col justify-between overflow-hidden relative shrink-0 group">

      {/* ═══ TOP: Image / Media Preview (Aspect Video) ═══ */}
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#0b0a10] border-b border-white/[0.06]">
        {/* Subtle diagonal light-sweep across preview on card hover */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20"
          style={{ transform: 'skewX(-20deg)' }}
        />

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full image-placeholder relative flex flex-col items-center justify-center p-4 select-none">
            <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-text-muted/60 mb-1 group-hover:border-violet-400/30 transition-colors duration-300">
              <span className="font-display font-bold text-xs text-accent group-hover:text-[#c4b5fd] transition-colors duration-300">0{index + 1}</span>
            </div>
            <span className="text-[0.6rem] text-text-muted/70 tracking-[0.2em] uppercase font-display group-hover:text-text-secondary transition-colors duration-300">
              [PROJECT IMAGE]
            </span>
          </div>
        )}

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-bg-primary/85 border border-white/10 text-[0.58rem] tracking-widest text-accent font-semibold uppercase backdrop-blur-md group-hover:border-violet-400/30 group-hover:text-[#c4b5fd] transition-colors duration-300">
            PROJECT 0{index + 1}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full bg-bg-primary/85 border border-white/10 text-[0.56rem] tracking-wider text-text-secondary uppercase backdrop-blur-md font-medium group-hover:text-text-primary transition-colors duration-300">
            {project.category || 'Engineering'}
          </span>
        </div>
      </div>

      {/* ═══ CONTENT: Title, Description, Tags & Action Row ═══ */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-display font-bold text-text-primary tracking-tight group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(196,181,253,0.30)] transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-body-sm text-text-secondary text-xs mt-1.5 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* ═══ BOTTOM: Tags + Action Row ═══ */}
        <div className="pt-3 border-t border-white/[0.06] mt-3">
          {/* Tech tags */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 mb-3 select-none">
            {project.tags?.map((tag, i) => (
              <span key={i} className="pill-tag text-[0.6rem] px-2 py-0.5 whitespace-nowrap shrink-0">
                {tag}
              </span>
            ))}
          </div>

          {/* Action links */}
          <div className="flex items-center justify-between">
            <span className="text-[0.58rem] tracking-wider uppercase text-text-muted font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 inline-block" />
              Production
            </span>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.64rem] tracking-wider uppercase text-text-muted hover:text-text-primary px-2 py-0.5 rounded-full border border-white/10 transition-colors duration-300"
                >
                  Code ↗
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-[0.64rem] py-1 px-3 flex items-center gap-1"
                >
                  <span>EXPLORE</span>
                  <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
