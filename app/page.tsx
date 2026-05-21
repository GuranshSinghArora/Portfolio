'use client'
import Link from 'next/link'
import { FolderOpen, FileText, Mail, ExternalLink } from 'lucide-react'
import {
  FaGithub,
  FaLinkedin,
  FaInstagram
} from 'react-icons/fa'

import { MdEmail } from 'react-icons/md'

export default function HomePage() {
  return (
    <div className="grid-bg radial-glow min-h-screen flex flex-col items-center justify-center relative overflow-hidden">

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center min-h-screen">

  {/* LEFT SIDE */}
  <div className="fade-up">

    {/* Status pill */}
<Link
  href="/contact"
  className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase animate-pulse hover:animate-none hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
  style={{
    background: 'rgba(59,130,246,0.08)',
    border: '1px solid rgba(59,130,246,0.2)',
    color: '#60a5fa'
  }}
>
  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
  Open to Work
</Link>

    {/* NAME */}
   <h1
      className="font-syne font-extrabold leading-none tracking-tight mb-6"
      style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
    >
      Guransh <br />

      <span
        className="whitespace-nowrap"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1.5px #3b82f6'
        }}
      >
        Singh Arora
      </span>
  </h1>

    {/* SHORT PARAGRAPH */}
    <p className="text-muted-light text-lg leading-relaxed max-w-xl mb-6 font-light">
      Mechatronics engineer passionate about robotics, UAVs, embedded systems,
      and intelligent hardware design. Experienced in developing real-world
      systems involving PCB design, CAD modeling, control systems,
      and autonomous robotics.
    </p>

    {/* SKILLS */}
    <div
      className="flex flex-wrap items-center gap-4 mb-10 text-lg"
      style={{ color: '#9ca3af' }}
    >
      <span>Robotics</span>
      <span className="text-accent">•</span>

      <span>Embedded Systems</span>
      <span className="text-accent">•</span>

      <span>PCB Design</span>
      <span className="text-accent">•</span>

      <span>3D CAD</span>
    </div>

      {/* Quick links */}
    <div className="flex items-center justify-start gap-5 flex-wrap mb-5 text-lg">
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


  </div>


{/* RIGHT SIDE IMAGE */}
<div className="relative flex justify-center lg:justify-centre fade-up">

  {/* Background Glow */}
  <div
    className="absolute inset-0"
    style={{
      background: 'radial-gradient(circle, rgba(59,130,246,0.18) 60%, transparent 70%)',
      filter: 'blur(100px)'
    }}
  />

  {/* Image Wrapper */}
  <div
    className="relative z-10"
    style={{
      WebkitMaskImage:
        'linear-gradient(to bottom, black 70%, transparent 100%)',
      maskImage:
        'linear-gradient(to bottom, black 70%, transparent 100%)'
    }}
  >

    <img
      src="/guransh1.png"
      alt="Guransh"
      className="w-full max-w-xl object-contain"
    />

  </div>

</div>

  {/* Social row */}
    <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-5 text-lg">

  <a href="https://www.linkedin.com/in/guransh-singh-arora/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
    <FaLinkedin />
    LinkedIn
  </a>

  <span className="text-gray-700">|</span>

  <a href="https://www.instagram.com/_guranshsingh_" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
    <FaInstagram />
    Instagram
  </a>

  <span className="text-gray-700">|</span>

  <a href="mailto:guranshsingh5050@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
    <MdEmail />
    Email
  </a>

  <span className="text-gray-700">|</span>

  <a href="https://github.com/guranshsingharora" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
    <FaGithub />
    GitHub
  </a>

</div>

</div>

      {/* Bottom location tag */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center">
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(107,114,128,0.5)' }}>
          Based in New Delhi, India
        </span>
      </div>
    </div>
  )
}
