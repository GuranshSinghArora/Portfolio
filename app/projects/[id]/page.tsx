import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { ArrowLeft, Github, ExternalLink, Box } from 'lucide-react'
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

function SpecsTable({ specs }: { specs: { label: string; value: string }[] }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(59,130,246,0.1)' }}>
      {specs.map((s, i) => (
        <div key={i} className="flex items-start gap-4 px-5 py-3"
             style={{
               background: i % 2 === 0 ? '#0d1220' : 'rgba(59,130,246,0.03)',
               borderBottom: i < specs.length - 1 ? '1px solid rgba(59,130,246,0.07)' : 'none',
             }}>
          <span className="font-medium tracking-widest uppercase flex-shrink-0 pt-0.5 w-36"
                style={{ color: '#60a5fa', fontSize: '10px' }}>
            {s.label}
          </span>
          <span className="text-sm text-muted-light font-light leading-relaxed">{s.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id)
  if (!project) notFound()

  // Related: shares at least one category, different project
  const others = projects
    .filter(p =>
      p.id !== project.id &&
      Array.isArray(p.categories) &&
      Array.isArray(project.categories) &&
      p.categories.some(c => project.categories.includes(c))
    )
    .slice(0, 3)

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
          {/* Category badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.categories.map(cat => (
              <span key={cat} className="text-xs font-medium tracking-widest uppercase px-2 py-0.5 rounded"
                    style={{ color: '#60a5fa', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontSize: '10px' }}>
                {catLabel[cat]}
              </span>
            ))}
          </div>

          <h1 className="font-syne font-extrabold text-3xl md:text-4xl tracking-tight mb-2">
            {project.title}
          </h1>
          <p className="text-muted text-sm font-light mb-5">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(t => <span key={t} className="tag-blue">{t}</span>)}
          </div>

          <p className="text-muted-light font-light leading-relaxed text-sm max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Hero + Sections via ProjectDetail */}
        <ProjectDetail project={project} />

        {/* Specs */}
        {project.specs && project.specs.length > 0 && (
          <div className="mt-10 fade-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-accent opacity-60" />
              <h2 className="font-syne font-bold text-sm uppercase tracking-widest text-muted">
                Technical Specifications
              </h2>
            </div>
            <SpecsTable specs={project.specs} />
          </div>
        )}

        {/* External links */}
        {(project.githubUrl || project.cadUrl || project.docsUrl) && (
          <div className="mt-8 flex flex-wrap gap-3 fade-up">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <Github size={13} /> GitHub Repo
              </a>
            )}
            {project.cadUrl && (
              <a href={project.cadUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <Box size={13} /> CAD Files
              </a>
            )}
            {project.docsUrl && (
              <a href={project.docsUrl} target="_blank" rel="noopener" className="btn-glow text-xs">
                <ExternalLink size={13} /> Documentation
              </a>
            )}
          </div>
        )}

        {/* Related */}
        {others.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-5 fade-up">
              <div className="w-5 h-px bg-accent opacity-60" />
              <h3 className="font-syne font-bold text-sm uppercase tracking-widest text-muted">
                Related Projects
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 fade-up">
              {others.map(p => (
                <Link key={p.id} href={`/projects/${p.id}`}
                      className="card-hover rounded-xl p-5 block group"
                      style={{ background: '#0d1220' }}>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.categories
                      .filter(c => project.categories.includes(c))
                      .slice(0, 2)
                      .map(c => (
                        <span key={c} style={{ color: '#60a5fa', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {catLabel[c]}
                        </span>
                      ))}
                  </div>
                  <h4 className="font-syne font-bold text-sm mb-1 group-hover:text-accent transition-colors leading-snug">
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
