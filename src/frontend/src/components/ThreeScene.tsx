import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type * as THREE from "three";

function RotatingIco() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#DC2626" wireframe opacity={0.35} transparent />
    </mesh>
  );
}

function RotatingOcta() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.18;
      ref.current.rotation.x += delta * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[2.8, 0]} />
      <meshBasicMaterial color="#16A34A" wireframe opacity={0.2} transparent />
    </mesh>
  );
}

interface SphereData {
  id: string;
  position: [number, number, number];
  color: string;
  speed: number;
  offset: number;
}

function FloatingSpheres() {
  const count = 80;
  const spheres: SphereData[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `sp-${i}-${Math.floor(Math.random() * 9999)}`,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      color: i % 2 === 0 ? "#DC2626" : "#16A34A",
      speed: 0.2 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y =
          spheres[i].position[1] +
          Math.sin(t * spheres[i].speed + spheres[i].offset) * 0.3;
      }
    });
  });

  return (
    <>
      {spheres.map((s, i) => (
        <mesh
          key={s.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={s.position}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={s.color} opacity={0.6} transparent />
        </mesh>
      ))}
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#DC2626" />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color="#16A34A" />
        <RotatingIco />
        <RotatingOcta />
        <FloatingSpheres />
      </Suspense>
    </Canvas>
  );
}
