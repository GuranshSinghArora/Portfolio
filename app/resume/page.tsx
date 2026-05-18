import { Download, GraduationCap, Briefcase, Award, Code } from 'lucide-react'

// ── EDIT ALL YOUR RESUME DATA HERE ──────────────────────────────────────────
const data = {
  name: 'Your Name',
  role: 'Robotics & Embedded Systems Engineer',
  bio: 'B.Tech student in Electronics & Communication with hands-on experience in embedded firmware, PCB design, robotic systems, and 3D CAD. Seeking internship opportunities in hardware engineering.',
  email: 'yourname@email.com',
  phone: '+91 XXXXX XXXXX',
  location: 'New Delhi, India',
  github: 'github.com/yourname',
  linkedin: 'linkedin.com/in/yourname',

  education: [
    {
      degree: 'B.Tech — Electronics & Communication Engineering',
      institution: 'Your College Name',
      period: '2022 – 2026',
      detail: 'CGPA: X.X / 10 · Relevant: Embedded Systems, Control Theory, Signal Processing, VLSI',
    },
    {
      degree: 'Class XII — PCM + CS',
      institution: 'Your School Name',
      period: '2022',
      detail: 'XX% — CBSE Board',
    },
  ],

  experience: [
    {
      role: 'Electronics Team Member',
      org: 'Robotics Club, Your College',
      period: 'Aug 2022 – Present',
      points: [
        'Designed and fabricated 4+ custom PCBs for club robots using KiCad and JLCPCB',
        'Developed STM32 firmware for autonomous navigation and motor control',
        'Led embedded systems workshops for 30+ junior members',
      ],
    },
    {
      role: 'Project Intern',
      org: 'Company / Lab Name',
      period: 'May 2024 – Jul 2024',
      points: [
        'Worked on [describe what you did]',
        'Achieved [measurable outcome]',
        'Technologies used: [list them]',
      ],
    },
  ],

  skills: [
    { category: 'Embedded', items: ['STM32', 'ESP32', 'Arduino', 'FreeRTOS', 'C/C++', 'Bare-metal', 'UART/SPI/I2C', 'CAN'] },
    { category: 'PCB Design', items: ['KiCad', 'Altium Designer', 'EasyEDA', 'LTSpice', '4-Layer', 'Impedance Control', 'JLCPCB'] },
    { category: '3D CAD', items: ['Fusion 360', 'SolidWorks', 'ANSYS FEA', 'Topology Opt.', 'GD&T', 'FDM / SLA'] },
    { category: 'Robotics', items: ['ROS2', 'MoveIt', 'Kinematics', 'PID Control', 'OpenCV', 'SLAM', 'Pixhawk'] },
    { category: 'Programming', items: ['C', 'C++', 'Python', 'MATLAB', 'Git', 'Linux'] },
  ],

  achievements: [
    { title: '2nd Place — [Competition Name]', year: '2024', detail: 'Line-following robot category' },
    { title: 'Smart India Hackathon Finalist', year: '2023', detail: 'Hardware track, team of 6' },
    { title: 'Best Project Award — College Tech Fest', year: '2023', detail: 'Robotic arm project' },
    { title: 'NPTEL — Embedded Systems (Elite + Gold)', year: '2023', detail: 'Score: 89/100' },
  ],

  certifications: [
    'NPTEL — Embedded Systems (IIT Kharagpur) · 2023',
    'Coursera — Control of Mobile Robots (Georgia Tech) · 2024',
    'KiCad PCB Design — Udemy · 2023',
  ],
}
// ────────────────────────────────────────────────────────────────────────────

function SectionHead({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
           style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
        <Icon size={14} className="text-accent" />
      </div>
      <h2 className="font-syne font-bold text-base tracking-wide">{label}</h2>
      <div className="flex-1 h-px" style={{ background: 'rgba(59,130,246,0.1)' }} />
    </div>
  )
}

export default function ResumePage() {
  return (
    <div className="min-h-screen grid-bg pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12 fade-up">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-medium tracking-widest uppercase" style={{ color: '#60a5fa' }}>
              <span className="w-5 h-px bg-accent opacity-60" /> Resume
            </div>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-2">{data.name}</h1>
            <p className="text-muted font-light text-sm">{data.role}</p>
          </div>
          <a href="/resume.pdf" download className="btn-glow self-start">
            <Download size={14} /> Download PDF
          </a>
        </div>

        {/* 2-col layout */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT — info + skills */}
          <div className="md:col-span-1 space-y-6">

            {/* Contact card */}
            <div className="rounded-xl p-5 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)' }}>
              <p className="text-muted-light text-sm font-light leading-relaxed mb-5">{data.bio}</p>
              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'Email', val: data.email },
                  { label: 'Phone', val: data.phone },
                  { label: 'Location', val: data.location },
                  { label: 'GitHub', val: data.github },
                  { label: 'LinkedIn', val: data.linkedin },
                ].map(({ label, val }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-muted uppercase tracking-widest" style={{ fontSize: '10px' }}>{label}</span>
                    <span className="text-muted-light font-light">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="rounded-xl p-5 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)', animationDelay: '0.1s' }}>
              <SectionHead icon={Code} label="Skills" />
              <div className="space-y-4">
                {data.skills.map(g => (
                  <div key={g.category}>
                    <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: '#60a5fa' }}>
                      {g.category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map(s => <span key={s} className="tag-blue" style={{ fontSize: '10px', padding: '2px 7px' }}>{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-xl p-5 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)', animationDelay: '0.15s' }}>
              <SectionHead icon={Award} label="Certifications" />
              <ul className="space-y-2">
                {data.certifications.map((c, i) => (
                  <li key={i} className="text-xs text-muted-light font-light flex gap-2">
                    <span className="text-accent mt-0.5">·</span>{c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — education, experience, achievements */}
          <div className="md:col-span-2 space-y-6">

            {/* Education */}
            <div className="rounded-xl p-6 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)' }}>
              <SectionHead icon={GraduationCap} label="Education" />
              <div className="space-y-6">
                {data.education.map((e, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="timeline-dot" />
                      {i < data.education.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: 'rgba(59,130,246,0.15)' }} />
                      )}
                    </div>
                    <div className="pb-4 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="font-syne font-bold text-sm">{e.degree}</h3>
                        <span className="text-xs font-mono" style={{ color: '#60a5fa' }}>{e.period}</span>
                      </div>
                      <p className="text-muted text-xs mb-1 font-light">{e.institution}</p>
                      <p className="text-muted-light text-xs font-light">{e.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-xl p-6 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)', animationDelay: '0.1s' }}>
              <SectionHead icon={Briefcase} label="Experience" />
              <div className="space-y-7">
                {data.experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="timeline-dot" />
                      {i < data.experience.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: 'rgba(59,130,246,0.15)' }} />
                      )}
                    </div>
                    <div className="pb-2 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-0.5">
                        <h3 className="font-syne font-bold text-sm">{exp.role}</h3>
                        <span className="text-xs font-mono" style={{ color: '#60a5fa' }}>{exp.period}</span>
                      </div>
                      <p className="text-muted text-xs mb-3 font-light">{exp.org}</p>
                      <ul className="space-y-1.5">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="text-muted-light text-xs font-light flex gap-2">
                            <span className="text-accent mt-0.5 flex-shrink-0">→</span>{pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="rounded-xl p-6 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)', animationDelay: '0.15s' }}>
              <SectionHead icon={Award} label="Achievements" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.achievements.map((a, i) => (
                  <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.1)' }}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-syne font-bold text-xs">{a.title}</h4>
                      <span className="text-xs font-mono flex-shrink-0" style={{ color: '#60a5fa' }}>{a.year}</span>
                    </div>
                    <p className="text-muted text-xs font-light">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
