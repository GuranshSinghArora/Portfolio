import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen grid-bg flex flex-col items-center justify-center text-center px-6">
      <p className="font-mono text-accent text-6xl font-bold mb-4" style={{ opacity: 0.3 }}>404</p>
      <h1 className="font-syne font-extrabold text-2xl mb-3">Page not found</h1>
      <p className="text-muted font-light mb-8">This page doesn't exist yet.</p>
      <Link href="/" className="btn-glow">← Back Home</Link>
    </div>
  )
}
