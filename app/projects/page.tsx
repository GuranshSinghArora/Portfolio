'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { projects, categories, ProjectCategory } from '@/lib/projects'
import { ArrowUpRight, Box, Cpu, Bot, Wind, CircuitBoard } from 'lucide-react'

const catIcons: Record<string, React.ReactNode> = {
  'all':         <CircuitBoard size={15} />,
  '3d-models':   <Box size={15} />,
  'pcb-designs': <Cpu size={15} />,
  'robots':      <Bot size={15} />,
  'uavs':        <Wind size={15} />,
  'embedded':    <CircuitBoard size={15} />,
}

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  // Multi-category filtering: project appears if ANY of its categories match
  const filtered = useMemo(
    () =>
      active === 'all'
        ? projects
        : projects.filter(p => p.categories.includes(active as ProjectCategory)),
    [active]
  )

  return (
    <div className="min-h-screen grid-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 fade-up">
          <div className="flex items-center gap-2 mb-3 text-xs font-medium tracking-widest uppercase" style={{ color: '#60a5fa' }}>
            <span className="w-5 h-px bg-accent opacity-60" /> Projects
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Featured Engineering Projects
          </h1>
          <p className="text-muted font-light max-w-xl">
            Hardware, firmware, and mechanical work — from 3D models and PCB layouts to full robotic systems.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 fade-up" style={{ animationDelay: '0.1s' }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id as ProjectCategory | 'all')}
              className={`cat-pill flex items-center gap-1.5 ${active === cat.id ? 'active' : ''}`}
            >
              {catIcons[cat.id]}
              {cat.label}
              {/* Show count badge for non-all categories */}
              {cat.id !== 'all' && (
                <span className="ml-0.5 text-xs opacity-50 font-mono">
                  {projects.filter(p => p.categories.includes(cat.id as ProjectCategory)).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Project grid — card visuals unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="card-hover rounded-xl p-6 block group relative overflow-hidden fade-up"
              style={{ background: '#0d1220' }}
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-5 border border-[rgba(59,130,246,0.1)]">
                {project.thumbnail.startsWith('/') || project.thumbnail.startsWith('http') ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  // Fallback color swatch
                  <div className="w-full h-full" style={{ background: project.thumbnail }} />
                )}
                {/* Cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {project.tags.slice(0, 3).map(t => (
                    <span key={t} className="tag-blue">{t}</span>
                  ))}
                </div>
                {/* Category pills — shows which categories this project belongs to */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
                  {project.categories.slice(0, 2).map(c => (
                    <span key={c} className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(8,12,20,0.7)', color: 'rgba(96,165,250,0.8)', fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      {c.replace('-', ' ')}
                    </span>
                  ))}
                  {project.categories.length > 2 && (
                    <span className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(8,12,20,0.7)', color: 'rgba(96,165,250,0.6)', fontSize: '9px' }}>
                      +{project.categories.length - 2}
                    </span>
                  )}
                </div>
                {/* Year badge — top right, inside thumbnail */}
                  {project.year && (
                    <div className="absolute top-3 right-3 z-10 font-mono text-xs px-2 py-0.5 rounded"
                        style={{ background: 'rgba(8,12,20,0.7)', color: 'rgba(96,165,250,0.8)', border: '1px solid rgba(59,130,246,0.25)', fontSize: '10px', letterSpacing: '0.06em' }}>
                      {project.year}
                    </div>
                  )}
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-syne font-bold text-base leading-snug mb-1 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted text-xs font-light mb-3">{project.subtitle}</p>
                  <p className="text-muted-light text-sm font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1"
                />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            <p className="text-lg font-light">No projects in this category yet.</p>
            <p className="text-sm mt-2 opacity-60">Add them in <code className="text-accent">lib/projects.ts</code></p>
          </div>
        )}
      </div>
    </div>
  )
}
