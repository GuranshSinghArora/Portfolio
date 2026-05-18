'use client'
import { useState } from 'react'
import { Mail, Github, Linkedin, MapPin, Phone, Send } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  // For a real form, connect to Formspree, EmailJS, or a Next.js API route.
  // Instructions in the README.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect your form service here
    setSent(true)
  }

  return (
    <div className="min-h-screen grid-bg pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12 fade-up">
          <div className="flex items-center gap-2 mb-3 text-xs font-medium tracking-widest uppercase" style={{ color: '#60a5fa' }}>
            <span className="w-5 h-px bg-accent opacity-60" /> Contact
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-muted font-light max-w-md">
            Open to internship opportunities in robotics, embedded systems, PCB design, and CAD. 
            Feel free to reach out.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">

          {/* Left — contact info */}
          <div className="md:col-span-2 space-y-4 fade-up">
            {[
              { icon: Mail,    label: 'Email',    val: 'yourname@email.com',     href: 'mailto:yourname@email.com' },
              { icon: Phone,   label: 'Phone',    val: '+91 XXXXX XXXXX',       href: 'tel:+91XXXXXXXXXX' },
              { icon: MapPin,  label: 'Location', val: 'New Delhi, India',       href: null },
              { icon: Github,  label: 'GitHub',   val: 'github.com/yourname',   href: 'https://github.com/' },
              { icon: Linkedin,label: 'LinkedIn', val: 'in/yourname',           href: 'https://linkedin.com/' },
            ].map(({ icon: Icon, label, val, href }) => (
              <div key={label} className="flex items-center gap-4 p-4 rounded-xl card-hover"
                   style={{ background: '#0d1220' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <Icon size={15} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted text-xs uppercase tracking-widest" style={{ fontSize: '10px' }}>{label}</p>
                  {href
                    ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener"
                         className="text-sm text-muted-light hover:text-accent transition-colors font-light truncate block">
                        {val}
                      </a>
                    : <p className="text-sm text-muted-light font-light">{val}</p>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Right — form */}
          <div className="md:col-span-3 fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="rounded-xl p-6" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)' }}>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                       style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                    <Send size={20} className="text-accent" />
                  </div>
                  <h3 className="font-syne font-bold text-lg mb-2">Message Sent!</h3>
                  <p className="text-muted text-sm font-light">I'll get back to you as soon as possible.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                          className="btn-glow mt-6 text-xs">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                        Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors"
                        style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.15)'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                        Email
                      </label>
                      <input
                        required type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors"
                        style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
                        onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.15)'}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg text-sm font-light focus:outline-none transition-colors"
                      style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)', color: form.subject ? '#e8eaf0' : '#6b7280' }}
                    >
                      <option value="" disabled>Select a topic</option>
                      <option value="internship">Internship Opportunity</option>
                      <option value="collab">Project Collaboration</option>
                      <option value="freelance">Freelance / Contract Work</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                      Message
                    </label>
                    <textarea
                      required rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about the opportunity or project..."
                      className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors resize-none"
                      style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.15)' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.15)'}
                    />
                  </div>
                  <button type="submit" className="btn-glow w-full justify-center">
                    <Send size={13} /> Send Message
                  </button>
                  <p className="text-muted text-xs text-center font-light">
                    Or email me directly at{' '}
                    <a href="mailto:yourname@email.com" className="text-accent hover:underline">
                      yourname@email.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
