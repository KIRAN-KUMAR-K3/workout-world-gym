import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { MutableRefObject } from 'react';

interface DumbbellProps {
  /** Normalised pointer position (-1..1) for parallax */
  pointer: MutableRefObject<{ x: number; y: number }>;
  /** Page scroll progress 0..1 for scroll-driven rotation */
  scroll: MutableRefObject<number>;
  /** Disable idle animation for reduced motion */
  animate?: boolean;
  /** Accent (theme) colour for the glowing rings */
  accent?: string;
}

/**
 * A procedurally modelled dumbbell — no external 3D asset is downloaded, which
 * keeps the build self-contained and avoids any asset-licensing concerns.
 * Stacked metallic weight plates with electric-lime accent rings; designed to
 * catch the environment reflections and bloom set up in HeroScene.
 */
export default function Dumbbell({
  pointer,
  scroll,
  animate = true,
  accent = '#C6FF00',
}: DumbbellProps) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const g = group.current;
    const p = pointer.current;
    const s = scroll.current;

    const targetY = p.x * 0.6 + s * Math.PI * 1.3 + 0.5;
    const targetX = -p.y * 0.4 + s * 0.5 + 0.18;

    const lerp = Math.min(delta * 3, 0.12);
    g.rotation.y += (targetY - g.rotation.y) * lerp;
    g.rotation.x += (targetX - g.rotation.x) * lerp;

    if (animate) {
      g.position.y = Math.sin(performance.now() * 0.0012) * 0.14;
    }
  });

  /** One weight head: stacked plates (discs face outward along the X axis). */
  const Head = ({ dir }: { dir: 1 | -1 }) => {
    // Plates sit from the inside out; biggest nearest the handle.
    const plates = [
      { r: 1.12, t: 0.3, x: 1.15, color: '#141414' },
      { r: 0.95, t: 0.28, x: 1.5, color: '#1c1c1c' },
      { r: 0.74, t: 0.26, x: 1.82, color: '#242424' },
    ];
    return (
      <group>
        {plates.map((pl, i) => (
          <group key={i} position={[dir * pl.x, 0, 0]}>
            {/* Plate disc (cylinder rotated so the flat face points along X) */}
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[pl.r, pl.r, pl.t, 64]} />
              <meshStandardMaterial
                color={pl.color}
                metalness={1}
                roughness={0.28}
              />
            </mesh>
            {/* Lime accent ring on the rim of the outermost plate */}
            {i === 0 && (
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[pl.r, 0.045, 20, 80]} />
                <meshStandardMaterial
                  color={accent}
                  emissive={accent}
                  emissiveIntensity={2.4}
                  toneMapped={false}
                />
              </mesh>
            )}
          </group>
        ))}
        {/* End cap */}
        <mesh
          position={[dir * 2.0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        >
          <cylinderGeometry args={[0.34, 0.34, 0.18, 32]} />
          <meshStandardMaterial color="#3a3a3a" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    );
  };

  return (
    <group ref={group} rotation={[0.18, 0.5, 0]} scale={1.05}>
      {/* Handle bar */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.24, 0.24, 2.4, 40]} />
        <meshStandardMaterial color="#5a5a5a" metalness={1} roughness={0.18} />
      </mesh>
      {/* Knurled grip rings */}
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh
          key={i}
          position={[(i - 5) * 0.12, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.26, 0.26, 0.035, 24]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.55} />
        </mesh>
      ))}

      <Head dir={-1} />
      <Head dir={1} />
    </group>
  );
}
