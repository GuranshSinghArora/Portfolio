# Portfolio — Robotics & Embedded Systems

Dark, minimal portfolio built with **Next.js 14 · Tailwind CSS · Framer Motion · Three.js**.  
Designed for robotics, embedded systems, PCB design, and 3D CAD internship applications.

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Install Node.js v18+ from nodejs.org first

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000
```

---

## 📁 File Structure — What to Edit

```
portfolio/
├── lib/
│   └── projects.ts          ← ADD ALL YOUR PROJECTS HERE
├── app/
│   ├── page.tsx             ← Home page (name, tagline, location)
│   ├── resume/page.tsx      ← All resume data (education, experience, skills)
│   └── contact/page.tsx     ← Your contact info and email
├── components/
│   └── Navbar.tsx           ← Your name/logo
└── public/
    ├── resume.pdf           ← PUT YOUR PDF RESUME HERE
    └── projects/            ← PUT PROJECT IMAGES / VIDEOS HERE
```

---

## ✏️ Personalizing Your Portfolio

### 1. Update your name and tagline
**`app/page.tsx`** — change "Your Name", tagline, location, and social links.

**`components/Navbar.tsx`** — change the logo initials `YN.`

### 2. Add all your projects
**`lib/projects.ts`** — this is the single source of truth. Each project has:

```typescript
{
  id: 'unique-slug',           // used in the URL: /projects/unique-slug
  title: 'Project Title',
  subtitle: 'Tools · Techniques',
  description: 'Full description shown on the project page.',
  category: 'robots',          // '3d-models' | 'pcb-designs' | 'robots' | 'uavs' | 'embedded'
  tags: ['STM32', 'KiCad'],

  // 3D MODEL — choose ONE:
  modelUrl: '/projects/mymodel.glb',         // local .glb file in /public/projects/
  modelEmbedUrl: 'https://sketchfab.com/models/MODEL_ID/embed',  // Sketchfab embed
  // or for GrabCAD:
  modelEmbedUrl: 'https://grabcad.com/models/MODEL_ID/embed?type=embed',

  // VIDEO — choose ONE:
  videoUrl: 'https://www.youtube.com/embed/VIDEO_ID',  // YouTube embed URL
  videoFile: '/projects/demo.mp4',                     // local video

  // LINKS (optional):
  githubUrl: 'https://github.com/yourname/repo',
  cadUrl: 'https://grabcad.com/...',
  docsUrl: 'https://...',

  featured: true,   // shows "Featured" badge on card
}
```

### 3. Update resume data
**`app/resume/page.tsx`** — find the `data` object at the top and fill in your education, experience, skills, achievements, and certifications.

### 4. Add your resume PDF
Drop your PDF at `public/resume.pdf`. The download button links to it automatically.

### 5. Add project images / videos
Drop files in `public/projects/` and reference them in `lib/projects.ts`:
- `thumbnail: '/projects/my-pcb.jpg'` (shown on project card)
- `videoFile: '/projects/robot-demo.mp4'`
- `modelUrl: '/projects/gearbox.glb'`

---

## 🎯 Adding a 3D Model (3 Options)

### Option A — Sketchfab (Easiest, most interactive)
1. Upload your model to [sketchfab.com](https://sketchfab.com) (free account)
2. Click "Embed" → copy the `src` URL from the iframe code
3. In `lib/projects.ts`: `modelEmbedUrl: 'https://sketchfab.com/models/YOUR_ID/embed'`

### Option B — GrabCAD
1. Upload to [grabcad.com](https://grabcad.com)
2. Click Share → Embed → copy the embed URL
3. In `lib/projects.ts`: `modelEmbedUrl: 'YOUR_GRABCAD_EMBED_URL'`

### Option C — Local .glb file
1. Export your model as `.glb` from Fusion 360 or SolidWorks
2. Place it in `public/projects/mymodel.glb`
3. In `lib/projects.ts`: `modelUrl: '/projects/mymodel.glb'`

---

## 🎬 Adding a Project Video

### YouTube
1. Go to your YouTube video
2. Click Share → Embed → copy only the URL part from `src="..."`
   - It looks like: `https://www.youtube.com/embed/dQw4w9WgXcQ`
3. In `lib/projects.ts`: `videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID'`

### Local Video
1. Place your `.mp4` in `public/projects/`
2. In `lib/projects.ts`: `videoFile: '/projects/robot-demo.mp4'`

---

## 📧 Making the Contact Form Work

The form is wired up but needs a backend. Easiest option: **Formspree** (free).

1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → get your endpoint URL (looks like `https://formspree.io/f/xyzabc`)
3. In `app/contact/page.tsx`, replace the `handleSubmit` function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  if (res.ok) setSent(true)
}
```

---

## 🚀 Deploying to Vercel (Step by Step)

### Step 1 — Create a GitHub repository

```bash
# In your portfolio folder:
git init
git add .
git commit -m "initial portfolio"
```

Go to [github.com](https://github.com) → click **"New repository"**  
Name it `portfolio` → click **"Create repository"**  
Then run the commands GitHub shows you (push to remote):

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign up / log in with GitHub
2. Click **"Add New Project"**
3. Click **"Import"** next to your `portfolio` repository
4. Vercel auto-detects Next.js — just click **"Deploy"**
5. Wait ~60 seconds → your site is live at `https://yourname.vercel.app`

### Step 3 — Auto-deploy on every push

From now on, any `git push` automatically redeploys your site:

```bash
git add .
git commit -m "add new project"
git push
# → Vercel rebuilds and deploys automatically
```

### Step 4 (Optional) — Custom domain

1. Buy a domain at [namecheap.com](https://namecheap.com) (~₹700–1000/year for `.dev` or `.in`)
2. In Vercel dashboard → your project → **Domains** → Add your domain
3. Follow Vercel's DNS instructions (takes ~5 minutes to propagate)

---

## 🎨 Customizing Colors

All colors are in `tailwind.config.js` and `app/globals.css`. The main accent is blue (`#3b82f6`).

To change the accent color, find all instances of `#3b82f6` / `59,130,246` and replace them.

---

## 📦 Adding New Pages

To add a new page (e.g., a Blog page):
1. Create `app/blog/page.tsx`
2. Add it to `components/Navbar.tsx` in the `navItems` array

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework, routing |
| Tailwind CSS | Styling |
| Three.js + React Three Fiber | 3D model viewer |
| @react-three/drei | 3D helpers (OrbitControls, Environment) |
| Lucide React | Icons |
| TypeScript | Type safety |
| Vercel | Hosting |
