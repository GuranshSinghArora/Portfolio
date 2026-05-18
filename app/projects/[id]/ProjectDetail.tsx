'use client'
import dynamic from 'next/dynamic'
import { Project } from '@/lib/projects'
import { Play, Box, Upload } from 'lucide-react'

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), { ssr: false })

export default function ProjectDetail({ project }: { project: Project }) {
  const has3D = project.category === '3d-models' || project.modelUrl || project.modelEmbedUrl
  const hasVideo = project.videoUrl || project.videoFile
  const hasPCB = project.category === 'pcb-designs'

  return (
    <div className="space-y-6 fade-up" style={{ animationDelay: '0.15s' }}>

      {/* 3D Model Viewer */}
      {(has3D || hasPCB) && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-syne font-bold text-sm text-muted uppercase tracking-widest flex items-center gap-2">
              <Box size={13} className="text-accent" />
              {hasPCB ? 'PCB 3D View' : '3D Model — Interactive'}
            </h2>
            {(has3D || hasPCB) && !project.modelUrl && !project.modelEmbedUrl && (
              <span className="text-xs px-2 py-1 rounded"
                    style={{ background: 'rgba(59,130,246,0.08)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.15)' }}>
                Add your model URL in lib/projects.ts
              </span>
            )}
          </div>
          <ModelViewer modelUrl={project.modelUrl} modelEmbedUrl={project.modelEmbedUrl} />
          <p className="text-xs text-muted mt-2 flex items-center gap-1.5">
            <Box size={11} /> 
            {project.modelEmbedUrl
              ? 'Interactive 3D model — drag to rotate, scroll to zoom'
              : project.modelUrl
              ? 'Drag to rotate · Scroll to zoom · Right-click to pan'
              : 'Add a Sketchfab/GrabCAD embed URL or a local .glb file in lib/projects.ts'}
          </p>
        </div>
      )}

      {/* Video */}
      {hasVideo && (
        <div>
          <h2 className="font-syne font-bold text-sm text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
            <Play size={13} className="text-accent" /> Project Demo
          </h2>
          <div className="video-container">
            {project.videoUrl && (
              <iframe
                src={project.videoUrl}
                title="Project Demo"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
            {project.videoFile && !project.videoUrl && (
              <video controls preload="metadata">
                <source src={project.videoFile} type="video/mp4" />
              </video>
            )}
          </div>
          <p className="text-xs text-muted mt-2">
            {project.videoUrl
              ? 'YouTube demo — shows the project in action'
              : 'Local video demo'}
          </p>
        </div>
      )}

      {/* Placeholder when no media */}
      {!has3D && !hasPCB && !hasVideo && (
        <div className="rounded-xl border border-dashed flex flex-col items-center justify-center py-16 text-center"
             style={{ borderColor: 'rgba(59,130,246,0.2)', background: '#0d1220' }}>
          <Upload size={28} className="text-muted mb-3" strokeWidth={1} />
          <p className="text-muted text-sm font-light">No media attached yet</p>
          <p className="text-xs mt-1" style={{ color: 'rgba(107,114,128,0.6)' }}>
            Add videoUrl, modelUrl, or modelEmbedUrl in lib/projects.ts
          </p>
        </div>
      )}
    </div>
  )
}
