import { Canvas, useFrame } from "@react-three/fiber";
import { Component, type ReactNode, useRef } from "react";
import type * as THREE from "three";

// WebGL Error Boundary
class WebGLErrorBoundary extends Component<
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

// Bigger TorusKnot, faster rotation, more visible opacity
function TorusKnotMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.38;
      ref.current.rotation.x = t * 0.16;
      ref.current.rotation.z = t * 0.09;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <torusKnotGeometry args={[7.5, 1.7, 180, 32]} />
      <meshBasicMaterial color="#DC2626" wireframe transparent opacity={0.42} />
    </mesh>
  );
}

// Bigger sphere, more visible
function SphereMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = -t * 0.14;
      ref.current.rotation.x = t * 0.08;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -8]}>
      <sphereGeometry args={[10, 20, 16]} />
      <meshBasicMaterial color="#DC2626" wireframe transparent opacity={0.13} />
    </mesh>
  );
}

// Bigger icosahedron, faster spin
function IcosahedronMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.28;
      ref.current.rotation.y = t * 0.22;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -6]}>
      <icosahedronGeometry args={[5, 1]} />
      <meshBasicMaterial color="#ff4444" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function Particles() {
  const count = 20;
  const positions = useRef(
    Array.from({ length: count }, (_, idx) => ({
      id: `p${idx}`,
      x: (Math.random() - 0.5) * 28,
      y: (Math.random() - 0.5) * 28,
      z: -12 + Math.random() * 4,
      speed: 0.5 + Math.random() * 0.6,
      offset: Math.random() * Math.PI * 2,
    })),
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    positions.current.forEach((p, i) => {
      const mesh = refs.current[i];
      if (mesh) {
        mesh.position.y = p.y + Math.sin(t * p.speed + p.offset) * 0.8;
        mesh.rotation.z = t * p.speed;
      }
    });
  });

  return (
    <>
      {positions.current.map((p, i) => (
        <mesh
          key={p.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[p.x, p.y, p.z]}
        >
          <octahedronGeometry args={[0.15, 0]} />
          <meshBasicMaterial color="#ff2222" transparent opacity={0.65} />
        </mesh>
      ))}
    </>
  );
}

const squareData = Array.from({ length: 36 }, (_, idx) => {
  const side = idx % 2 === 0 ? -1 : 1;
  const xBase = side * (5.5 + Math.random() * 2.5);
  return {
    id: `sq${idx}`,
    x: xBase,
    y: -15 + Math.random() * 30,
    z: -8 + Math.random() * 3,
    size: 0.1 + Math.random() * 0.32,
    speed: 0.8 + Math.random() * 1.4,
    swayAmp: 0.15 + Math.random() * 0.35,
    swayFreq: 0.4 + Math.random() * 0.6,
    rotSpeed: (Math.random() - 0.5) * 1.8,
    color: ["#DC2626", "#ff4444", "#ff2222", "#b91c1c"][
      Math.floor(Math.random() * 4)
    ],
    opacity: 0.38 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
  };
});

function FloatingSquares() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const yPos = useRef(squareData.map((s) => s.y));

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    squareData.forEach((s, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      yPos.current[i] += s.speed * delta;
      if (yPos.current[i] > 15) yPos.current[i] = -15;
      mesh.position.y = yPos.current[i];
      mesh.position.x = s.x + Math.sin(t * s.swayFreq + s.phase) * s.swayAmp;
      mesh.rotation.x += s.rotSpeed * delta;
      mesh.rotation.z += s.rotSpeed * 0.7 * delta;
    });
  });

  return (
    <>
      {squareData.map((s, i) => (
        <mesh
          key={s.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[s.x, s.y, s.z]}
        >
          <boxGeometry args={[s.size, s.size, s.size]} />
          <meshBasicMaterial color={s.color} transparent opacity={s.opacity} />
        </mesh>
      ))}
    </>
  );
}

export default function RedRotation3DBG() {
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
      <WebGLErrorBoundary>
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
          <TorusKnotMesh />
          <SphereMesh />
          <IcosahedronMesh />
          <Particles />
          <FloatingSquares />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
