import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import type { ReactNode } from 'react';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Dumbbell from './Dumbbell';
import Particles from './Particles';
import FloatingPlates from './FloatingPlates';

/**
 * Places and sizes the dumbbell for the current screen shape:
 *  - wide screens: upper right, clear of the staggered headline
 *  - tall/narrow screens: centred in the upper third, scaled to fit the width
 */
function Rig({ children }: { children: ReactNode }) {
  const { width, height } = useThree((state) => state.viewport);
  const wide = width / height > 1.15;
  const scale = wide ? Math.min(1, width / 11) : Math.min(0.9, width / 5.6);
  const x = wide ? width * 0.27 : 0;
  const y = wide ? height * 0.2 : height * 0.27;
  return (
    <group position={[x, y, 0]} scale={scale}>
      {children}
    </group>
  );
}

interface HeroSceneProps {
  animate?: boolean;
  /** Theme accent colours (hex) */
  accent?: string;
  accent2?: string;
}

/**
 * The full WebGL hero scene: a metallic dumbbell under cinematic lighting with
 * a procedurally-generated reflection environment (no network HDR), floating
 * background weight plates, atmospheric particles, bloom glow on the lime
 * accents and a soft vignette. Pointer/scroll are tracked via refs to avoid
 * React re-renders every frame.
 *
 * Loaded dynamically (React.lazy) so the heavy 3D code is only fetched when
 * WebGL is available and motion is allowed.
 */
export default function HeroScene({
  animate = true,
  accent = '#C6FF00',
  accent2 = '#5566ff',
}: HeroSceneProps) {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  // Only render frames while the hero is on screen (saves battery/CPU).
  const [inView, setInView] = useState(true);
  // "Lite" mode drops the expensive extras (bloom, vignette, background
  // plates, high pixel ratio). It starts on for phones and low-core devices,
  // and switches on automatically anywhere the frame rate can't keep up.
  const [lite, setLite] = useState(
    () =>
      window.innerWidth < 768 || (navigator.hardwareConcurrency ?? 8) <= 4,
  );

  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const h =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      scroll.current = Math.min(window.scrollY / h, 1);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
    <Canvas
      frameloop={inView ? 'always' : 'never'}
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <PerformanceMonitor onDecline={() => setLite(true)} />

      {/* Base lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#ffffff" />
      <spotLight
        position={[-6, 4, 2]}
        angle={0.5}
        penumbra={1}
        intensity={2.2}
        color={accent}
      />
      <pointLight position={[0, -4, 4]} intensity={1.2} color={accent2} />

      {/* Procedural reflection environment — gives the metal real highlights
          without downloading any HDR file. */}
      <Environment resolution={256}>
        <Lightformer
          intensity={2}
          position={[0, 2, 4]}
          scale={[8, 4, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={3}
          position={[-4, 1, 2]}
          scale={[3, 6, 1]}
          color={accent}
        />
        <Lightformer
          intensity={1.5}
          position={[4, -2, 2]}
          scale={[4, 4, 1]}
          color={accent2}
        />
      </Environment>

      <Rig>
        <Dumbbell
          pointer={pointer}
          scroll={scroll}
          animate={animate}
          accent={accent}
        />
      </Rig>
      {!lite && <FloatingPlates animate={animate} />}
      <Particles
        count={lite ? 90 : 240}
        animate={animate}
        color={accent}
      />

      {/* Cinematic post-processing (skipped in lite mode) */}
      {!lite && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.1}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      )}
    </Canvas>
    </div>
  );
}
