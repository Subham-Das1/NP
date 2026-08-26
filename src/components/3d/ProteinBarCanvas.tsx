import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows } from '@react-three/drei';
import { ProteinBarModel } from './ProteinBarModel';
import { LightingRig } from './LightingRig';
import { ParticleField } from './ParticleField';
import { useFlavor } from '../../context/FlavorContext';
import { FLAVOR_LIST } from '../../data/flavorData';
import { RotateCw, Eye, RefreshCcw } from 'lucide-react';

interface ProteinBarCanvasProps {
  interactive?: boolean;
  className?: string;
}

export const ProteinBarCanvas: React.FC<ProteinBarCanvasProps> = ({
  interactive = true,
  className = 'w-full h-[520px] md:h-[620px]',
}) => {
  const { currentFlavor, setFlavor, isUnwrapped, setIsUnwrapped, autoRotate, setAutoRotate } = useFlavor();
  const [isDragging, setIsDragging] = useState(false);
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden group select-none ${className}`}>
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentFlavor.accentGlow} 0%, rgba(7, 8, 11, 0) 70%)`,
        }}
      />

      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 5.2], fov: 42 }}
        className="cursor-grab active:cursor-grabbing"
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
      >
        <Suspense fallback={null}>
          <LightingRig />
          <ParticleField count={45} />

          <Float
            speed={autoRotate ? 2 : 0}
            rotationIntensity={0.3}
            floatIntensity={0.5}
            floatingRange={[-0.05, 0.05]}
          >
            <ProteinBarModel isDragging={isDragging} />
          </Float>

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.65}
            scale={10}
            blur={2.4}
            far={4}
            color="#000000"
          />

          {interactive && (
            <OrbitControls
              ref={controlsRef}
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3.5}
              maxPolarAngle={Math.PI - Math.PI / 3.5}
              rotateSpeed={0.8}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          onClick={() => setIsUnwrapped((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-300 border ${
            isUnwrapped
              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20'
              : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
          }`}
          title="Toggle Inside Bar Core"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isUnwrapped ? 'Foil Wrapped' : 'Unwrap Core'}</span>
        </button>

        <button
          onClick={() => setAutoRotate((prev) => !prev)}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 border ${
            autoRotate
              ? 'bg-white/10 border-white/20 text-white'
              : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
        </button>

        <button
          onClick={handleResetCamera}
          className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 backdrop-blur-md transition-all"
          title="Reset Camera View"
        >
          <RefreshCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-400 tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>360° DRAG TO INSPECT  •  CLICK FLAVORS BELOW</span>
      </div>
    </div>
  );
};
