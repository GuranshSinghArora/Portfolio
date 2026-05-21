'use client'
import { useState } from 'react'
import type React from 'react'
import { Mail, Github, Linkedin, MapPin, Phone, Send, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/mdajkelb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSent(true)
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        // Formspree returns errors in data.errors
        const msg = data?.errors?.map((err: { message: string }) => err.message).join(', ')
        setError(msg || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error — please check your connection and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    background: 'rgba(59,130,246,0.05)',
    border: '1px solid rgba(59,130,246,0.15)',
  }

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(59,130,246,0.5)'
  }
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(59,130,246,0.15)'
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
              { icon: Mail,     label: 'Email',    val: 'guranshsingh5050@gmail.com',       href: 'mailto:guranshsingh5050@gmail.com' },
              { icon: Phone,    label: 'Phone',    val: '+91 99115 55050',                  href: 'tel:+919911555050' },
              { icon: MapPin,   label: 'Location', val: 'New Delhi, India',                 href: 'https://maps.app.goo.gl/RBLmzGDjwYZQeef79' },
              { icon: Linkedin, label: 'LinkedIn', val: 'in/guransh-singh-arora',           href: 'https://linkedin.com/in/guransh-singh-arora' },
              { icon: Github,   label: 'GitHub',   val: 'github.com/guranshsingharora',    href: 'https://github.com/guranshsingharora' },
            ].map(({ icon: Icon, label, val, href }) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                       style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                    <Icon size={15} className="text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-muted uppercase tracking-widest" style={{ fontSize: '10px' }}>{label}</p>
                    <p className="text-sm text-muted-light font-light truncate transition-colors duration-300 group-hover:text-accent">
                      {val}
                    </p>
                  </div>
                </>
              )

              return href ? (
                <a key={label} href={href}
                   target={href.startsWith('http') ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   className="group flex items-center gap-4 p-4 rounded-xl card-hover transition-all duration-300"
                   style={{ background: '#0d1220' }}>
                  {inner}
                </a>
              ) : (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl card-hover"
                     style={{ background: '#0d1220' }}>
                  {inner}
                </div>
              )
            })}
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
                  <button
                    onClick={() => setSent(false)}
                    className="btn-glow mt-6 text-xs"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                        Name
                      </label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                        Email
                      </label>
                      <input
                        name="email"
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors"
                        style={inputStyle}
                        onFocus={focusStyle}
                        onBlur={blurStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-lg text-sm font-light focus:outline-none transition-colors"
                      style={{
                        backgroundColor: '#0b1120',
                        border: '1px solid rgba(59,130,246,0.15)',
                        color: form.subject ? '#e8eaf0' : '#6b7280',
                      }}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    >
                      <option value="" disabled style={{ backgroundColor: '#0b1120', color: '#6b7280' }}>
                        Select a topic
                      </option>
                      <option value="Internship Opportunity"    style={{ backgroundColor: '#0b1120', color: '#e8eaf0' }}>Internship Opportunity</option>
                      <option value="Project Collaboration"     style={{ backgroundColor: '#0b1120', color: '#e8eaf0' }}>Project Collaboration</option>
                      <option value="Freelance / Contract Work" style={{ backgroundColor: '#0b1120', color: '#e8eaf0' }}>Freelance / Contract Work</option>
                      <option value="General Inquiry"           style={{ backgroundColor: '#0b1120', color: '#e8eaf0' }}>General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-muted uppercase tracking-widest mb-1.5" style={{ fontSize: '10px' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder="Tell me about the opportunity or project..."
                      className="w-full px-3 py-2.5 rounded-lg text-sm font-light text-text placeholder-muted focus:outline-none transition-colors resize-none"
                      style={inputStyle}
                      onFocus={focusStyle}
                      onBlur={blurStyle}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-xs px-3 py-2 rounded-lg"
                       style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading
                      ? <><Loader2 size={13} className="animate-spin" /> Sending...</>
                      : <><Send size={13} /> Send Message</>
                    }
                  </button>

                  <p className="text-muted text-xs text-center font-light">
                    Or email me directly at{' '}
                    <a href="mailto:guranshsingh5050@gmail.com" className="text-accent hover:underline">
                      guranshsingh5050@gmail.com
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