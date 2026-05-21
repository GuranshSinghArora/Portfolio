import { Download, GraduationCap, Briefcase, Award, Code } from 'lucide-react'

// ── EDIT ALL YOUR RESUME DATA HERE ──────────────────────────────────────────
const data = {
  name: 'Guransh Singh Arora',
  role: 'Mechatronics Engineering Student · Robotics · Embedded Systems · UAVs',

  bio:
    'Passionate Mechatronics Engineering student specializing in robotics, embedded systems, UAVs, and intelligent hardware design. Experienced in developing autonomous robots, secure IoT systems, and mechatronic products through cross-disciplinary engineering and hands-on prototyping.',

  email: 'guranshsingh5050@gmail.com',
  phone: '+91 99115 55050',
  location: 'New Delhi, India',

  github: 'github.com/guranshsingharora',
  linkedin: 'linkedin.com/in/guransh-singh-arora',

  education: [
    {
      degree: 'B.Tech — Mechatronics Engineering',
      institution: 'Manipal University Jaipur',
      period: '2023 – 2027',
      detail:
        'CGPA: 8.44 / 10 · Last Semester GPA: 9.42\nRelevant Areas: Robotics, Embedded Systems, Control Systems, CAD Design',
    },

    {
      degree: 'Class XII — PCM + Computer Science',
      institution: 'Indraprastha World School, Delhi',
      period: '2022 – 2023',
      detail: 'CBSE Board · Percentage: 85.4%',
    },

    {
      degree: 'Class X',
      institution: 'Indraprastha World School, Delhi',
      period: '2020 – 2021',
      detail: 'CBSE Board · Percentage: 84.1%',
    },
  ],

  experience: [
    {
      role: 'Head — Projects & Research',
      org: 'ACM SIGBED Chapter, Manipal University Jaipur',
      period: '2024 – 2025',
      points: [
        'Mentoring and supervising student projects in embedded systems and cyber-physical systems',
        'Leading project planning, technical execution, and research-oriented development activities',
        'Managing collaborative engineering workflows across robotics and hardware teams',
      ],
    },

    {
      role: 'Student Instructor — MATLAB & PID Control',
      org: 'Manipal University Jaipur',
      period: '2025',
      points: [
        'Delivered student-led lectures on MATLAB Simulink and PID control systems',
        'Explained control-system fundamentals and practical tuning approaches',
        'Demonstrated real-world implementation of PID control in robotic systems',
      ],
    },

    {
      role: 'Erasmus+ Research Exchange Participant',
      org: 'Technische Universität Braunschweig, Germany',
      period: '2025 – 2026',
      points: [
        'Selected to represent Manipal University Jaipur in an international research collaboration',
        'Working on sustainable fabrication methods and optimization of photovoltaic modules',
        'Collaborating with international teams under the Erasmus+ initiative',
      ],
    },
    {
      role: 'Research Intern at IIT Delhi',
      org: 'Under Prof. S.K. Saha, Indian Institute of Technology (IIT) Delhi',
      period: '2026 — Present',
      points: [
        'Working on embedded programming and robotics-focused research projects under faculty mentorship.',
        'Contributing to hardware development, system integration, prototyping, and technical experimentation.',
        'Gaining exposure to advanced research workflows, engineering problem solving, and interdisciplinary project development.',
      ],
    },
  ],

  skills: [
    {
      category: 'Embedded Systems',
      items: [
        '8051',
        'Arduino',
        'ESP32',
        'Embedded C',
        'Keil µVision',
        'Sensors & Actuators',
        'UART/I2C/SPI',
      ],
    },

    {
      category: 'Programming',
      items: [
        'C',
        'Embedded C',
        'Python',
        'MATLAB',
        'Simulink',
      ],
    },

    {
      category: 'CAD & Design',
      items: [
        'Fusion 360',
        'AutoCAD',
        '3D Printing',
        'Mechanical Design',
        'Rapid Prototyping',
      ],
    },

    {
      category: 'Electronics',
      items: [
        'EasyEDA',
        'Circuit Design',
        'PCB Design',
        'Debugging',
        'Electronics Integration',
      ],
    },

    {
      category: 'Robotics & Control',
      items: [
        'PID Control',
        'Autonomous Robots',
        'Dead Reckoning',
        'Motion Control',
        'UAV Systems',
      ],
    },
  ],

  achievements: [
    {
      title: 'Selected for Erasmus+ Research Program',
      year: '2025',
      detail:
        'International collaborative research initiative with TU Braunschweig, Germany',
    },

    {
      title: '3x Dean’s List Award',
      year: '2025',
      detail: 'Awarded for achieving 9.24 GPA in IV Semester, 9.67 GPA in V Semester and 9.42 GPA in VI Semester',
    },

    {
      title: 'Patent Published in India',
      year: '2025',
      detail:
        'Smart Parcel Box — Intelligent Parcel Delivery Box with Authenticated Access and Theft Detection System',
    },

    {
      title: 'Patent Granted in Germany',
      year: '2025',
      detail:
        'Smart Parcel Box patent granted internationally under German patent publication',
    },

    {
      title: '2nd Position — Department Project Expo',
      year: '2025',
      detail: 'Awarded for Smart Parcel Box project',
    },

  ],

  //certifications: []
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
            <div className="flex items-center gap-2 mb-3 text-xs font-medium tracking-widest uppercase" style={{ color: '#60a5fa' }}>
              <span className="w-5 h-px bg-accent opacity-60" /> Resume
            </div>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-2">{data.name}</h1>
            <p className="text-muted font-light text-sm">{data.role}</p>
          </div>
          <a href="/Guransh Singh Arora CV 2026.pdf" download className="btn-glow self-start">
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
                  { label: 'LinkedIn', val: data.linkedin },
                  { label: 'GitHub', val: data.github },
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

            {/* Certifications
            <div className="rounded-xl p-5 fade-up" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)', animationDelay: '0.15s' }}>
              <SectionHead icon={Award} label="Certifications" />
              <ul className="space-y-2">
                {data.certifications.map((c, i) => (
                  <li key={i} className="text-xs text-muted-light font-light flex gap-2">
                    <span className="text-accent mt-0.5">·</span>{c}
                  </li>
                ))}
              </ul>
            </div>*/}
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
                    <div className="pb-4 w-full">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className="font-syne font-bold text-sm flex-1 pr-4">{e.degree}</h3>
                        <span className="text-xs font-mono flex-shrink-0 whitespace-nowrap ml-auto"  style={{ color: '#60a5fa' }}>
                          {e.period}
                        </span>
                      </div>
                      <p className="text-muted text-xs mb-1 font-light">{e.institution}</p>
                      <p className="text-muted-light text-xs font-light whitespace-pre-line">{e.detail}</p>
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
                    <div className="pb-2 w-full">
                      <div className="flex items-start justify-between gap-4 mb-0.5">
                        <h3 className="font-syne font-bold text-sm flex-1 pr-4">
                          {exp.role}
                        </h3>
                        <span
                          className="text-xs font-mono flex-shrink-0 whitespace-nowrap ml-auto"
                          style={{ color: '#60a5fa' }}>
                          {exp.period}
                        </span>

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
