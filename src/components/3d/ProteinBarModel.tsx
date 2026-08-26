import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useFlavor } from '../../context/FlavorContext';
import { createPackagingTexture, createPackagingBumpMap } from './TextureGenerator';

interface ProteinBarModelProps {
  pointerPosition?: { x: number; y: number };
  isDragging?: boolean;
}

export const ProteinBarModel: React.FC<ProteinBarModelProps> = ({ isDragging = false }) => {
  const { currentFlavor, isUnwrapped, autoRotate } = useFlavor();
  const groupRef = useRef<THREE.Group>(null);
  const wrapperRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const packagingTexture = useMemo(() => {
    return createPackagingTexture(currentFlavor);
  }, [currentFlavor]);

  const bumpTexture = useMemo(() => {
    return createPackagingBumpMap();
  }, []);

  const foilMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: packagingTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.02,
      roughness: 0.28,
      metalness: 0.72,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
      reflectivity: 0.95,
      color: new THREE.Color('#FFFFFF'),
    });
  }, [packagingTexture, bumpTexture]);

  const crimpMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.foilAccentColor),
      roughness: 0.35,
      metalness: 0.8,
      bumpMap: bumpTexture,
      bumpScale: 0.05,
    });
  }, [currentFlavor, bumpTexture]);

  const coreMaterial = useMemo(() => {
    let coreColor = '#24140C';
    let rough = 0.85;

    if (currentFlavor.id === 'peanut-butter') {
      coreColor = '#8A5229';
    } else if (currentFlavor.id === 'cookies-cream') {
      coreColor = '#E2E8F0';
      rough = 0.7;
    } else if (currentFlavor.id === 'salted-caramel') {
      coreColor = '#9A4C18';
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(coreColor),
      roughness: rough,
      metalness: 0.05,
    });
  }, [currentFlavor]);

  const drizzleMaterial = useMemo(() => {
    let drizzleColor = '#1A0D08';
    if (currentFlavor.id === 'salted-caramel') {
      drizzleColor = '#F59E0B';
    } else if (currentFlavor.id === 'cookies-cream') {
      drizzleColor = '#1E293B';
    }

    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(drizzleColor),
      roughness: 0.3,
      metalness: 0.1,
    });
  }, [currentFlavor]);

  const crispPuffs = useMemo(() => {
    const puffs = [];
    const seedRandom = (i: number) => {
      const x = Math.sin(i * 999) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 35; i++) {
      const px = (seedRandom(i) - 0.5) * 3.0;
      const py = 0.28 + seedRandom(i + 40) * 0.04;
      const pz = (seedRandom(i + 80) - 0.5) * 0.9;
      const scale = 0.05 + seedRandom(i + 120) * 0.06;
      puffs.push({ position: [px, py, pz] as [number, number, number], scale });
    }
    return puffs;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.position.y = Math.sin(time * 1.5) * 0.08;

    if (!isDragging) {
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.45;
      }

      const targetRotX = (pointer.y * 0.35) + Math.sin(time * 0.8) * 0.05;
      const targetRotZ = -(pointer.x * 0.35);

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.05);
    }

    if (wrapperRef.current && coreRef.current) {
      const targetWrapperX = isUnwrapped ? 1.6 : 0;
      const targetWrapperScaleX = isUnwrapped ? 0.65 : 1.0;
      const targetCoreScale = isUnwrapped ? 1.0 : 0.98;

      wrapperRef.current.position.x = THREE.MathUtils.lerp(wrapperRef.current.position.x, targetWrapperX, 0.08);
      wrapperRef.current.scale.x = THREE.MathUtils.lerp(wrapperRef.current.scale.x, targetWrapperScaleX, 0.08);
      coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, targetCoreScale, 0.08));
    }
  });

  return (
    <group ref={groupRef} scale={[1.15, 1.15, 1.15]}>
      {/* 1. EDIBLE INTERIOR PROTEIN BAR */}
      <group ref={coreRef}>
        <mesh position={[0, 0, 0]} material={coreMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.55, 1.1, 12, 6, 6]} />
        </mesh>

        {[-1.2, -0.8, -0.4, 0, 0.4, 0.8, 1.2].map((xPos, idx) => (
          <mesh
            key={`drizzle-${idx}`}
            position={[xPos, 0.3, 0]}
            rotation={[0, 0, Math.PI / 10 * (idx % 2 === 0 ? 1 : -1)]}
            material={drizzleMaterial}
          >
            <cylinderGeometry args={[0.04, 0.04, 1.05, 8]} />
          </mesh>
        ))}

        {crispPuffs.map((puff, idx) => (
          <mesh
            key={`puff-${idx}`}
            position={puff.position}
            material={drizzleMaterial}
            scale={puff.scale}
          >
            <sphereGeometry args={[1, 8, 8]} />
          </mesh>
        ))}
      </group>

      {/* 2. FOIL PACKAGE WRAPPER */}
      <group ref={wrapperRef}>
        <mesh position={[0, 0, 0]} material={foilMaterial} castShadow receiveShadow>
          <boxGeometry args={[3.45, 0.62, 1.18, 16, 8, 8]} />
        </mesh>

        <mesh position={[-1.9, 0, 0]} material={crimpMaterial} castShadow>
          <boxGeometry args={[0.38, 0.58, 1.25]} />
        </mesh>
        {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((z, i) => (
          <mesh key={`crimp-l-${i}`} position={[-2.1, 0, z]} material={crimpMaterial}>
            <coneGeometry args={[0.04, 0.06, 4]} />
          </mesh>
        ))}

        <mesh position={[1.9, 0, 0]} material={crimpMaterial} castShadow>
          <boxGeometry args={[0.38, 0.58, 1.25]} />
        </mesh>
        {[-0.5, -0.3, -0.1, 0.1, 0.3, 0.5].map((z, i) => (
          <mesh key={`crimp-r-${i}`} position={[2.1, 0, z]} material={crimpMaterial}>
            <coneGeometry args={[0.04, 0.06, 4]} />
          </mesh>
        ))}

        <mesh position={[0, 0, -0.62]} rotation={[Math.PI / 2, 0, 0]} material={crimpMaterial}>
          <boxGeometry args={[3.4, 0.08, 0.12]} />
        </mesh>
      </group>
    </group>
  );
};
