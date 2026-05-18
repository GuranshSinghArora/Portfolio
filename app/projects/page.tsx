'use client'
import { useState } from 'react'
import Link from 'next/link'
import { projects, categories, ProjectCategory } from '@/lib/projects'
import { ArrowUpRight, Box, Cpu, Bot, Wind, CircuitBoard } from 'lucide-react'

const catIcons: Record<string, React.ReactNode> = {
  'all':        <CircuitBoard size={15} />,
  '3d-models':  <Box size={15} />,
  'pcb-designs':<Cpu size={15} />,
  'robots':     <Bot size={15} />,
  'uavs':       <Wind size={15} />,
  'embedded':   <CircuitBoard size={15} />,
}

export default function ProjectsPage() {
  const [active, setActive] = useState<ProjectCategory | 'all'>('all')

  const filtered = active === 'all' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="min-h-screen grid-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12 fade-up">
          <div className="flex items-center gap-2 mb-3 text-accent text-xs font-medium tracking-widest uppercase">
            <span className="w-6 h-px bg-accent opacity-60" />
            02 — Work
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Selected Projects
          </h1>
          <p className="text-muted font-light max-w-xl">
            Hardware, firmware, and mechanical work — from PCB layout to full robotic systems.
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
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="card-hover rounded-xl p-6 block group relative overflow-hidden"
              style={{ background: '#0d1220', animationDelay: `${i * 0.07}s` }}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded"
                     style={{ background: 'rgba(59,130,246,0.12)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' }}>
                  Featured
                </div>
              )}

              {/* Color swatch / thumbnail */}
              <div className="w-full h-36 rounded-lg mb-5 flex items-end p-3"
                   style={{ background: project.thumbnail as string, border: '1px solid rgba(59,130,246,0.1)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map(t => (
                    <span key={t} className="tag-blue">{t}</span>
                  ))}
                </div>
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
