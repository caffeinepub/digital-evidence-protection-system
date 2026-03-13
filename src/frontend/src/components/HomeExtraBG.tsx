import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ReactNode, useMemo, useRef } from "react";
import type * as THREE from "three";

class WebGLEB extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// Galaxy-style particle field
function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 14;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 2] = Math.sin(angle) * radius - 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#DC2626"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

// Slow orbiting torus ring
function OrbitRing({
  posY,
  speed,
  opacity,
}: { posY: number; speed: number; opacity: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
      ref.current.rotation.x = clock.getElapsedTime() * speed * 0.4;
    }
  });
  return (
    <mesh ref={ref} position={[0, posY, -12]}>
      <torusGeometry args={[6, 0.04, 8, 80]} />
      <meshBasicMaterial color="#DC2626" transparent opacity={opacity} />
    </mesh>
  );
}

// Subtle wireframe dodecahedron spinning slowly
function WireDodeca() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * 0.05;
      ref.current.rotation.y = t * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -14]}>
      <dodecahedronGeometry args={[7, 0]} />
      <meshBasicMaterial color="#b91c1c" wireframe transparent opacity={0.09} />
    </mesh>
  );
}

// Green accent wire tetrahedron — subtle
function WireTetra() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * 0.07;
      ref.current.rotation.z = t * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <tetrahedronGeometry args={[9, 0]} />
      <meshBasicMaterial color="#16A34A" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export default function HomeExtraBG() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <WebGLEB>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 70 }}
          dpr={Math.min(
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
            1.5,
          )}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
          performance={{ min: 0.5 }}
        >
          <GalaxyParticles />
          <WireDodeca />
          <WireTetra />
          <OrbitRing posY={3} speed={0.06} opacity={0.18} />
          <OrbitRing posY={-3} speed={0.04} opacity={0.12} />
          <OrbitRing posY={0} speed={0.03} opacity={0.08} />
        </Canvas>
      </WebGLEB>
    </div>
  );
}
