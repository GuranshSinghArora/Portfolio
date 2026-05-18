'use client'
import Link from 'next/link'
import { FolderOpen, FileText, Mail, Github, Linkedin, ExternalLink } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="grid-bg radial-glow min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

      <div className="text-center px-6 fade-up" style={{ animationDelay: '0.1s' }}>

        {/* Status pill */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"
             style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Open to Internships
        </div>

        {/* Name */}
        <h1 className="font-syne font-extrabold leading-none tracking-tight mb-4"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}>
          Your<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '1.5px #3b82f6' }}>Name</span>
        </h1>

        {/* Tagline */}
        <p className="text-muted font-light mb-10 max-w-md mx-auto leading-relaxed"
           style={{ fontSize: '1.05rem' }}>
          Robotics · Embedded Systems · PCB Design · 3D CAD
        </p>

        {/* Quick links */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-14">
          <Link href="/projects" className="btn-glow">
            <FolderOpen size={15} /> View Projects
          </Link>
          <Link href="/resume" className="btn-glow">
            <FileText size={15} /> Resume
          </Link>
          <Link href="/contact" className="btn-glow">
            <Mail size={15} /> Contact
          </Link>
        </div>

        {/* Social row */}
        <div className="flex items-center justify-center gap-6">
          <a href="https://github.com/" target="_blank" rel="noopener"
             className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium">
            <Github size={16} strokeWidth={1.5} /> GitHub
          </a>
          <span className="w-px h-4" style={{ background: 'rgba(59,130,246,0.2)' }} />
          <a href="https://linkedin.com/" target="_blank" rel="noopener"
             className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium">
            <Linkedin size={16} strokeWidth={1.5} /> LinkedIn
          </a>
          <span className="w-px h-4" style={{ background: 'rgba(59,130,246,0.2)' }} />
          <a href="mailto:you@email.com"
             className="flex items-center gap-2 text-muted hover:text-accent transition-colors text-sm font-medium">
            <Mail size={16} strokeWidth={1.5} /> Email
          </a>
        </div>
      </div>

      {/* Bottom location tag */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(107,114,128,0.5)' }}>
          Based in New Delhi, India
        </span>
      </div>
    </div>
  )
}
