import React from 'react';
import { useFlavor } from '../../context/FlavorContext';

export const LightingRig: React.FC = () => {
  const { currentFlavor } = useFlavor();

  return (
    <>
      {/* Soft studio ambient base */}
      <ambientLight intensity={0.8} />

      {/* Main Studio Key Light (High-angle soft white) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Cool Secondary Fill Light */}
      <directionalLight position={[-6, -2, 4]} intensity={0.9} color="#D1E8FF" />

      {/* Dynamic Flavor Accent Rim Light (Back-Right Edge Glow) */}
      <pointLight
        position={[4, 2, -3]}
        intensity={3.5}
        color={currentFlavor.accentColor}
        distance={10}
      />

      {/* Dynamic Flavor Accent Rim Light (Back-Left Edge Glow) */}
      <pointLight
        position={[-4, 2, -3]}
        intensity={2.8}
        color={currentFlavor.accentColor}
        distance={10}
      />

      {/* Front Specular Highlight Light */}
      <spotLight
        position={[0, 4, 6]}
        angle={0.6}
        penumbra={0.8}
        intensity={1.8}
        color="#FFFFFF"
      />
    </>
  );
};
