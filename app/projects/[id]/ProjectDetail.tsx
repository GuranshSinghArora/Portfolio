'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project, HeroMedia, SectionMediaItem } from '@/lib/projects'
import { Play, Box, Upload, Images, Maximize2, X, ChevronLeft, ChevronRight, ZoomIn, Move3D } from 'lucide-react'
import React from 'react'

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false })

// ── SIZE → HEIGHT MAP ─────────────────────────────────────────────────────────
function containerStyle(size?: string): React.CSSProperties {
  switch (size) {
    case 'cinematic': return { aspectRatio: '16/9', width: '100%' }
    case 'square':    return { aspectRatio: '1/1',  width: '100%' }
    case 'portrait':  return { aspectRatio: '3/4',  width: '100%', maxWidth: '420px', margin: '0 auto' }
    case 'small':     return { height: '280px', width: '100%' }
    case 'large':     return { height: '520px', width: '100%' }
    case 'full':      return { height: '580px', width: '100%' }
    default:          return { height: '400px', width: '100%' } // medium
  }
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index: init, onClose }: {
  images: { src: string; caption?: string }[]
  index: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(init)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  const offsetStart = useRef({ x: 0, y: 0 })

  const prev = () => { setIdx(i => (i - 1 + images.length) % images.length); setScale(1); setOffset({ x: 0, y: 0 }) }
  const next = () => { setIdx(i => (i + 1) % images.length); setScale(1); setOffset({ x: 0, y: 0 }) }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
    setScale(s => Math.min(5, Math.max(0.5, s - e.deltaY * 0.001)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    e.preventDefault()
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    offsetStart.current = { ...offset }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return
    setOffset({
      x: offsetStart.current.x + (e.clientX - dragStart.current.x),
      y: offsetStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  const handleMouseUp = () => {
    setDragging(false)
    dragStart.current = null
  }

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 9999,
        background: 'rgba(8,12,20,0.97)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={onClose}
        style={{ position: 'absolute', top: 20, right: 20, zIndex: 10,
                 background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                 color: '#60a5fa', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>
        <X size={18} />
      </button>

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); prev() }}
          style={{ position: 'absolute', left: 20, zIndex: 10,
                   background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                   color: '#60a5fa', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        onClick={e => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
          userSelect: 'none',
          cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default',
        }}
      >
        <img
          src={images[idx].src}
          alt=""
          draggable={false}
          style={{
            maxHeight: '80vh', maxWidth: '80vw',
            width: 'auto', height: 'auto',
            objectFit: 'contain', borderRadius: '12px',
            border: '1px solid rgba(59,130,246,0.2)',
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            transformOrigin: 'center center',
            transition: dragging ? 'none' : 'transform 0.15s ease',
            pointerEvents: 'none',
          }}
        />
        {images[idx].caption && (
          <p style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 300, textAlign: 'center' }}>
            {images[idx].caption}
          </p>
        )}
        {images.length > 1 && (
          <p style={{ color: '#6b7280', fontSize: '12px', fontFamily: 'monospace' }}>
            {idx + 1} / {images.length}
          </p>
        )}
      </div>

      {images.length > 1 && (
        <button onClick={e => { e.stopPropagation(); next() }}
          style={{ position: 'absolute', right: 20, zIndex: 10,
                   background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                   color: '#60a5fa', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}>
          <ChevronRight size={20} />
        </button>
      )}
    </div>,
    document.body
  )
}

// ── GALLERY ────────────────────────────────────────────────────────────────────
function Gallery({
  images,
  size,
}: {
  images: { src: string; caption?: string }[]
  size?: string
}) {
  const [lb, setLb] = useState<number | null>(null)

  const gridClass =
    images.length === 1
      ? 'grid-cols-1'
      : 'grid-cols-2'

  return (
    <div>
      <div className={`grid ${gridClass} gap-2`}>
        {images.map((img, i) => {
          const single = images.length === 1
          const wide = images.length === 3 && i === 0

          return (
            <div
              key={i}
              onClick={() => setLb(i)}
              className={`relative rounded-xl overflow-hidden cursor-zoom-in group ${
                wide ? 'col-span-2' : ''
              }`}
              style={{
                border: '1px solid rgba(59,130,246,0.1)',
                background: '#0d1220',
              }}
            >
              {/* ── FIXED CONTAINER ── */}
              <div
                style={{
                  position: 'relative',
                  height: single
                    ? '520px'
                    : wide
                    ? '420px'
                    : '320px',
                  background: '#0d1220',
                  overflow: 'hidden',
                }}
              >
                {/* ── BLURRED BACKGROUND ── */}
                <img
                  src={img.src}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    filter: 'blur(28px) brightness(0.35)',
                    transform: 'scale(1.12)',
                    opacity: 0.9,
                  }}
                />

                {/* ── MAIN IMAGE ── */}
                <img
                  src={img.src}
                  alt=""
                  loading="lazy"
                  className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* ── HOVER OVERLAY ── */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >
                <ZoomIn size={20} className="text-white" />
              </div>

              {/* ── CAPTION ── */}
              {img.caption && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white font-light z-20"
                  style={{
                    background:
                      'linear-gradient(transparent, rgba(0,0,0,0.72))',
                  }}
                >
                  {img.caption}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {lb !== null && (
        <Lightbox
          images={images}
          index={lb}
          onClose={() => setLb(null)}
        />
      )}
    </div>
  )
}

// ── MODEL BLOCK ───────────────────────────────────────────────────────────────
function ModelBlock({ modelUrl, modelEmbedUrl, size }: { modelUrl?: string; modelEmbedUrl?: string; size?: string }) {
  const isEmbed = !!modelEmbedUrl
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        position: 'relative',
        ...(isEmbed
          ? { aspectRatio: '16/9', width: '100%' }
          : containerStyle(size || 'large')),
        border: isEmbed ? 'none' : '1px solid rgba(59,130,246,0.2)',
        background: isEmbed ? 'transparent' : '#0d1220',
      }}
    >
      <ModelViewer modelUrl={modelUrl} modelEmbedUrl={modelEmbedUrl} />
      {!isEmbed && (
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded text-xs"
             style={{ background: 'rgba(8,12,20,0.85)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
          <Move3D size={11} /> Drag · Scroll · Right-click
        </div>
      )}
    </div>
  )
}

// ── VIDEO BLOCK ───────────────────────────────────────────────────────────────
function VideoBlock({
  videoUrl,
  videoFile,
  size,
}: {
  videoUrl?: string
  videoFile?: string
  size?: string
}) {
  const s = containerStyle(size || 'cinematic')

  const mainVideoRef = React.useRef<HTMLVideoElement>(null)
  const bgVideoRef = React.useRef<HTMLVideoElement>(null)

  const syncVideos = () => {
    if (!mainVideoRef.current || !bgVideoRef.current) return

    bgVideoRef.current.currentTime = mainVideoRef.current.currentTime
  }

  const playBg = async () => {
    try {
      await bgVideoRef.current?.play()
    } catch {}
  }

  const pauseBg = () => {
    bgVideoRef.current?.pause()
  }

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{
        ...s,
        background: '#0d1220',
        border: '1px solid rgba(59,130,246,0.15)',
      }}
    >
      {videoUrl ? (
        <iframe
          src={videoUrl}
          title="Demo"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      ) : videoFile ? (
        <>
          {/* ── BLURRED BACKGROUND VIDEO ── */}
          <video
            ref={bgVideoRef}
            muted
            playsInline
            preload="metadata"
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(28px) brightness(0.35) saturate(1.2)',
              transform: 'scale(1.15)',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <source src={videoFile} type="video/mp4" />
          </video>

          {/* Optional dark overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.2)',
              zIndex: 1,
            }}
          />

          {/* ── MAIN VIDEO ── */}
          <video
            ref={mainVideoRef}
            controls
            preload="metadata"
            onPlay={playBg}
            onPause={pauseBg}
            onSeeking={syncVideos}
            onTimeUpdate={syncVideos}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              zIndex: 2,
            }}
          >
            <source src={videoFile} type="video/mp4" />
          </video>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted">
          <Play size={32} strokeWidth={1} />
          <p className="text-xs font-light">
            Add videoUrl or videoFile in lib/projects.ts
          </p>
        </div>
      )}
    </div>
  )
}

// ── IMAGE BLOCK ───────────────────────────────────────────────────────────────
function ImageBlock({ src, alt, size }: { src: string; alt?: string; size?: string }) {
  const [lb, setLb] = useState(false)
  return (
    <div>
      <div onClick={() => setLb(true)}
           className="rounded-xl overflow-hidden cursor-zoom-in group relative"
           style={{ ...containerStyle(size || 'medium'), border: '1px solid rgba(59,130,246,0.1)' }}>
        <img src={src} alt={alt || ''} loading="lazy"
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
             style={{ background: 'rgba(0,0,0,0.2)' }}>
          <ZoomIn size={22} className="text-white" />
        </div>
      </div>
      {lb && <Lightbox images={[{ src, caption: alt }]} index={0} onClose={() => setLb(false)} />}
    </div>
  )
}

// ── DIAGRAM BLOCK ─────────────────────────────────────────────────────────────
function DiagramBlock({ src, alt, size }: { src: string; alt?: string; size?: string }) {
  const [lb, setLb] = useState(false)
  return (
    <div>
      <div onClick={() => setLb(true)}
           className="rounded-xl overflow-hidden cursor-zoom-in group relative"
           style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.15)' }}>
        <img src={src} alt={alt || ''} loading="lazy"
             className="w-full h-auto object-contain block mx-auto p-3 transition-opacity"
             style={{ maxHeight: size === 'full' ? '580px' : size === 'large' ? '520px' : '400px' }} />
        <div className="absolute top-3 right-3 p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
             style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
          <ZoomIn size={13} className="text-accent" />
        </div>
      </div>
      {lb && <Lightbox images={[{ src, caption: alt }]} index={0} onClose={() => setLb(false)} />}
    </div>
  )
}

// ── RENDER ANY SECTION MEDIA ITEM ────────────────────────────────────────────
function SectionMedia({ item }: { item: SectionMediaItem }) {
  if (item.type === 'model')   return <ModelBlock modelUrl={item.modelUrl} modelEmbedUrl={item.modelEmbedUrl} size={item.size} />
  if (item.type === 'video')   return <VideoBlock videoUrl={item.videoUrl} videoFile={item.videoFile} size={item.size} />
  if (item.type === 'image')   return <ImageBlock src={item.src} alt={item.alt} size={item.size} />
  if (item.type === 'diagram') return <DiagramBlock src={item.src} alt={item.alt} size={item.size} />
  if (item.type === 'gallery' && item.images?.length) return <Gallery images={item.images} size={item.size} />
  return null
}

// ── HERO MEDIA ────────────────────────────────────────────────────────────────
function HeroBlock({ hero }: { hero: HeroMedia }) {
  const label =
    hero.type === 'model' ? '3D Model — Interactive' :
    hero.type === 'video' ? 'Video Demonstration' :
    hero.type === 'image' ? 'ENGINEERING IMAGE' :
    null

  return (
    <div>
      {label && (
        <div className="flex items-center gap-2 mb-3">
          {hero.type === 'model' ? <Box size={13} className="text-accent" /> : <Play size={13} className="text-accent" />}
          <h2 className="font-syne font-bold text-sm text-muted uppercase tracking-widest">{label}</h2>
        </div>
      )}
      {hero.type === 'model' && <ModelBlock modelUrl={hero.modelUrl} modelEmbedUrl={hero.modelEmbedUrl} size={hero.size || 'large'} />}
      {hero.type === 'video' && <VideoBlock videoUrl={hero.videoUrl} videoFile={hero.videoFile} size={hero.size || 'cinematic'} />}
      {hero.type === 'image' && <ImageBlock src={hero.src} alt={hero.alt} size={hero.size || 'cinematic'} />}
    </div>
  )
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default function ProjectDetail({ project }: { project: Project }) {
  const hasHero     = !!project.heroMedia
  const hasSections = project.sections && project.sections.length > 0
  const hasAnyMedia = hasHero || hasSections

  if (!hasAnyMedia) {
    return (
      <div className="rounded-xl border border-dashed flex flex-col items-center justify-center py-16 text-center mb-8"
           style={{ borderColor: 'rgba(59,130,246,0.2)', background: '#0d1220' }}>
        <Upload size={28} className="text-muted mb-3" strokeWidth={1} />
        <p className="text-muted text-sm font-light">No media attached yet</p>
        <p className="text-xs mt-1" style={{ color: 'rgba(107,114,128,0.6)' }}>
          Add <code className="text-accent">heroMedia</code> or section <code className="text-accent">media[]</code> in lib/projects.ts
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12 fade-up" style={{ animationDelay: '0.15s' }}>

      {/* ── HERO ── */}
      {hasHero && (
        <div>
          <HeroBlock hero={project.heroMedia!} />
        </div>
      )}

      {/* ── SECTIONS ── */}
      {project.sections?.map((sec, i) => (
        <div key={i} className="rounded-xl p-6" style={{ background: '#0d1220', border: '1px solid rgba(59,130,246,0.1)' }}>

          {/* Section heading */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-0.5 h-5 rounded-full flex-shrink-0" style={{ background: '#3b82f6', opacity: 0.7 }} />
            <h3 className="font-syne font-bold text-sm tracking-wide">{sec.heading}</h3>
          </div>

          {/* Body text */}
          <p className="text-muted-light text-sm font-light leading-relaxed mb-4">{sec.body}</p>

          {/* Bullets */}
          {sec.bullets && sec.bullets.length > 0 && (
            <ul className="space-y-2 mb-5">
              {sec.bullets.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-muted-light font-light">
                  <span className="text-accent flex-shrink-0 mt-0.5" style={{ fontSize: '10px' }}>→</span>
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Section media */}
          {sec.media && sec.media.length > 0 && (
            <div className="space-y-4 mt-5">
              {sec.media.map((item, j) => (
                <SectionMedia key={j} item={item} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
