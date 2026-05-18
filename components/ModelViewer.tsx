'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, useGLTF } from '@react-three/drei'
import { RotateCcw, Move3D } from 'lucide-react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

function PlaceholderGeometry() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 0.3, 2]} />
        <meshStandardMaterial color="#1d4ed8" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.5, 0.4, 0.5]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.5, 0.4, -0.5]}>
        <cylinderGeometry args={[0.2, 0.2, 0.6, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1, 0.1, 1.2]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

interface ModelViewerProps {
  modelUrl?: string
  modelEmbedUrl?: string
}

export default function ModelViewer({ modelUrl, modelEmbedUrl }: ModelViewerProps) {
  // If a GrabCAD / Sketchfab embed URL is provided, use iframe
  if (modelEmbedUrl) {
    return (
      <div className="model-viewer">
        <iframe
          src={modelEmbedUrl}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="w-full h-full border-0"
          title="3D Model Viewer"
        />
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded text-xs"
               style={{ background: 'rgba(8,12,20,0.8)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
            <Move3D size={11} /> Drag to rotate
          </div>
        </div>
      </div>
    )
  }

  // Otherwise use three.js canvas (local .glb or placeholder)
  return (
    <div className="model-viewer">
      <Canvas
        camera={{ position: [3, 2, 4], fov: 45 }}
        style={{ background: '#0d1220' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#60a5fa" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#3b82f6" />

        <Suspense fallback={null}>
          {modelUrl ? <Model url={modelUrl} /> : <PlaceholderGeometry />}
          <Environment preset="studio" />
        </Suspense>

        <Grid
          args={[10, 10]}
          cellColor="rgba(59,130,246,0.1)"
          sectionColor="rgba(59,130,246,0.2)"
          fadeDistance={8}
          position={[0, -0.8, 0]}
        />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
      </Canvas>

      {/* Controls hint */}
      <div className="absolute bottom-3 right-3 flex flex-col gap-1.5 items-end">
        <div className="flex items-center gap-1 px-2 py-1 rounded text-xs"
             style={{ background: 'rgba(8,12,20,0.85)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)' }}>
          <Move3D size={11} /> Drag · Scroll · Right-click
        </div>
      </div>

      {!modelUrl && (
        <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs"
             style={{ background: 'rgba(59,130,246,0.1)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.2)' }}>
          Placeholder — add your .glb file
        </div>
      )}
    </div>
  )
}
