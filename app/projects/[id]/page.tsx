import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { ArrowLeft, Github, ExternalLink, Box, Cpu, Bot, Wind, CircuitBoard } from 'lucide-react'
import ProjectDetail from './ProjectDetail'

export function generateStaticParams() {
  return projects.map(p => ({ id: p.id }))
}

const catLabel: Record<string, string> = {
  '3d-models':   '3D Models',
  'pcb-designs': 'PCB Designs',
  'robots':      'Robots',
  'uavs':        'UAVs',
  'embedded':    'Embedded',
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)
  if (!project) notFound()

  const others = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 2)

  return (
    <div className="min-h-screen grid-bg pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link href="/projects"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm mb-10 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Projects
        </Link>

        {/* Title block */}
        <div className="mb-10 fade-up">
          <div className="flex items-center gap-2 mb-3 text-xs font-medium tracking-widest uppercase"
               style={{ color: '#60a5fa' }}>
            <span className="w-5 h-px bg-accent opacity-60" />
            {catLabel[project.category]}
          </div>
          <h1 className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-muted text-sm font-light mb-5">{project.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(t => <span key={t} className="tag-blue">{t}</span>)}
          </div>
        </div>

        {/* Main interactive content - client component */}
        <ProjectDetail project={project} />

        {/* Description */}
        <div className="mt-10 p-6 rounded-xl fade-up"
             style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)' }}>
          <h2 className="font-syne font-bold text-base mb-4 flex items-center gap-2 blue-line">
            About this Project
          </h2>
          <p className="text-muted-light font-light leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <Github size={13} /> GitHub Repo
              </a>
            )}
            {project.cadUrl && (
              <a href={project.cadUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <Box size={13} /> View CAD Files
              </a>
            )}
            {project.docsUrl && (
              <a href={project.docsUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <ExternalLink size={13} /> Documentation
              </a>
            )}
          </div>
        </div>

        {/* Related projects */}
        {others.length > 0 && (
          <div className="mt-12">
            <h3 className="font-syne font-bold text-sm mb-5 text-muted uppercase tracking-widest">
              More in {catLabel[project.category]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {others.map(p => (
                <Link key={p.id} href={`/projects/${p.id}`}
                      className="card-hover rounded-xl p-5 block group"
                      style={{ background: '#0d1220' }}>
                  <h4 className="font-syne font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-muted text-xs font-light">{p.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
