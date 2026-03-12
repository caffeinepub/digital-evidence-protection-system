import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ReactNode, useMemo, useRef } from "react";
import type * as THREE from "three";

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

function FloatingParticles() {
  const count = 20;
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#DC2626"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function WireIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.08;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.12;
  });
  return (
    <mesh ref={ref} position={[-5, 1, -8]}>
      <icosahedronGeometry args={[4, 0]} />
      <meshBasicMaterial color="#DC2626" wireframe transparent opacity={0.12} />
    </mesh>
  );
}

function WireOctahedron() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.07;
  });
  return (
    <mesh ref={ref} position={[6, -2, -6]}>
      <octahedronGeometry args={[3.5, 0]} />
      <meshBasicMaterial color="#16A34A" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function WireTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.09;
  });
  return (
    <mesh ref={ref} position={[2, 4, -10]}>
      <torusGeometry args={[2.5, 0.6, 6, 12]} />
      <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

// Centered rotating TorusKnot — bigger and more visible
function BgTorusKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.18;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.07;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, -12]}>
      <torusKnotGeometry args={[4.5, 1.1, 120, 24]} />
      <meshBasicMaterial color="#DC2626" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

// Outer rotating sphere shell — centered
function BgRotatingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.getElapsedTime() * 0.06;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.04;
  });
  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <sphereGeometry args={[6, 16, 12]} />
      <meshBasicMaterial color="#16A34A" wireframe transparent opacity={0.08} />
    </mesh>
  );
}

export default function ThreeBackground3D() {
  return (
    <WebGLErrorBoundary fallback={null}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 65 }}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent" }}
          dpr={Math.min(window.devicePixelRatio, 1)}
          performance={{ min: 0.5 }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
          <BgTorusKnot />
          <BgRotatingSphere />
          <WireIcosahedron />
          <WireOctahedron />
          <WireTorus />
          <FloatingParticles />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
