import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

interface FloatingPlatesProps {
  animate?: boolean;
}

const PLATES = [
  { pos: [-4.2, 2.2, -4], r: 0.9, speed: 0.4, tilt: 0.6 },
  { pos: [6.4, -3.6, -6], r: 1.1, speed: -0.3, tilt: 1.1 },
  { pos: [3.2, 2.8, -6], r: 0.7, speed: 0.5, tilt: 0.3 },
  { pos: [-6.2, -3.4, -6], r: 0.8, speed: -0.45, tilt: 0.9 },
] as const;

/** Slowly rotating metallic weight plates drifting in the background depth. */
export default function FloatingPlates({ animate = true }: FloatingPlatesProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!animate || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const p = PLATES[i];
      child.rotation.z = t * p.speed;
      child.rotation.x = p.tilt;
      child.position.y = p.pos[1] + Math.sin(t * 0.5 + i) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {PLATES.map((p, i) => (
        <group key={i} position={[p.pos[0], p.pos[1], p.pos[2]]} rotation={[p.tilt, 0, 0]}>
          <mesh>
            <torusGeometry args={[p.r, p.r * 0.33, 24, 64]} />
            <meshStandardMaterial
              color="#1a1a1a"
              metalness={1}
              roughness={0.35}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
