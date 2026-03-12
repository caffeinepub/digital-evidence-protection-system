import { MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type * as THREE from "three";

function GlowingSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.004;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <MeshDistortMaterial
        color="#DC2626"
        distort={0.4}
        speed={2}
        metalness={0.8}
        roughness={0.2}
        emissive="#DC2626"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

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
      <meshBasicMaterial color="#DC2626" wireframe opacity={0.3} transparent />
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
      <meshBasicMaterial color="#16A34A" wireframe opacity={0.18} transparent />
    </mesh>
  );
}

function OrbitingLights() {
  const redRef = useRef<THREE.PointLight>(null);
  const greenRef = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const r = 3.5;
    if (redRef.current) {
      redRef.current.position.x = Math.cos(t * 0.6) * r;
      redRef.current.position.z = Math.sin(t * 0.6) * r;
      redRef.current.position.y = Math.sin(t * 0.4) * 1.5;
    }
    if (greenRef.current) {
      greenRef.current.position.x = Math.cos(t * 0.6 + Math.PI) * r;
      greenRef.current.position.z = Math.sin(t * 0.6 + Math.PI) * r;
      greenRef.current.position.y = Math.sin(t * 0.4 + Math.PI) * 1.5;
    }
  });
  return (
    <>
      <pointLight ref={redRef} color="#DC2626" intensity={2} distance={8} />
      <pointLight ref={greenRef} color="#16A34A" intensity={1.5} distance={8} />
    </>
  );
}

function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;
  const helixData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 4;
      const y = (i / count) * 6 - 3;
      const radius = 2.2;
      return {
        id: `helix-${i}`,
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        rotX: angle,
        color: i % 2 === 0 ? "#DC2626" : "#16A34A",
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {helixData.map((d) => (
        <mesh key={d.id} position={[d.x, d.y, d.z]} rotation={[d.rotX, 0, 0]}>
          <torusGeometry args={[0.12, 0.03, 8, 16]} />
          <meshStandardMaterial
            color={d.color}
            emissive={d.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
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
  const count = 60;
  const spheres: SphereData[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `sp-${i}`,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
      ] as [number, number, number],
      color: i % 3 === 0 ? "#DC2626" : i % 3 === 1 ? "#16A34A" : "#3B82F6",
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
          Math.sin(t * spheres[i].speed + spheres[i].offset) * 0.4;
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
        <ambientLight intensity={0.3} />
        <OrbitingLights />
        <GlowingSphere />
        <RotatingIco />
        <RotatingOcta />
        <DNAHelix />
        <FloatingSpheres />
      </Suspense>
    </Canvas>
  );
}
