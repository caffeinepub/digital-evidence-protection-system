import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "motion/react";
import { Component, type ReactNode, useMemo, useRef } from "react";
import type * as THREE from "three";
import CharSplitHeading from "./CharSplitHeading";

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

function TorusKnotMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
      <meshBasicMaterial color="#DC2626" wireframe />
    </mesh>
  );
}

function WireSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = -state.clock.getElapsedTime() * 0.18;
    ref.current.rotation.x = -state.clock.getElapsedTime() * 0.08;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.5, 18, 12]} />
      <meshBasicMaterial color="#16A34A" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

const ORBIT_CONFIG = [
  { id: "cube-0", angle: 0, speed: 0.7, radius: 3.2, color: "#DC2626", y: 0.4 },
  {
    id: "cube-1",
    angle: Math.PI / 3,
    speed: 0.55,
    radius: 3.5,
    color: "#16A34A",
    y: -0.6,
  },
  {
    id: "cube-2",
    angle: (2 * Math.PI) / 3,
    speed: 0.9,
    radius: 3.0,
    color: "#DC2626",
    y: 0.8,
  },
  {
    id: "cube-3",
    angle: Math.PI,
    speed: 0.6,
    radius: 3.6,
    color: "#3B82F6",
    y: -0.3,
  },
  {
    id: "cube-4",
    angle: (4 * Math.PI) / 3,
    speed: 0.75,
    radius: 3.1,
    color: "#16A34A",
    y: 0.2,
  },
  {
    id: "cube-5",
    angle: (5 * Math.PI) / 3,
    speed: 0.5,
    radius: 3.4,
    color: "#DC2626",
    y: -0.7,
  },
];

function OrbitingCube({
  initAngle,
  speed,
  radius,
  color,
  yOffset,
}: {
  initAngle: number;
  speed: number;
  radius: number;
  color: string;
  yOffset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + initAngle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yOffset + Math.sin(t * 0.7) * 0.3;
    ref.current.rotation.x = t * 1.2;
    ref.current.rotation.y = t * 0.9;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.22, 0.22, 0.22]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function FloatingCloud() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const count = 120;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi);
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
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
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#DC2626" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#16A34A" />
      <TorusKnotMesh />
      <WireSphere />
      {ORBIT_CONFIG.map((cfg) => (
        <OrbitingCube
          key={cfg.id}
          initAngle={cfg.angle}
          speed={cfg.speed}
          radius={cfg.radius}
          color={cfg.color}
          yOffset={cfg.y}
        />
      ))}
      <FloatingCloud />
    </>
  );
}

function CSSFallback() {
  return (
    <div
      style={{
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "2px solid rgba(220,38,38,0.6)",
          boxShadow:
            "0 0 40px rgba(220,38,38,0.3), inset 0 0 40px rgba(220,38,38,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <motion.div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "2px solid rgba(22,163,74,0.6)",
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
}

export default function Rotating3DShowcase() {
  return (
    <section
      style={{ background: "#0a0a0f", padding: "80px 16px" }}
      className="relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2
            className="section-heading text-3xl md:text-4xl mb-4"
            style={{ color: "#f0f0f0" }}
          >
            <CharSplitHeading text="3D Secure " />
            <span style={{ color: "#DC2626" }}>
              <CharSplitHeading text="Visualization" />
            </span>
          </h2>
          <p
            style={{
              color: "rgba(240,240,240,0.5)",
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Real-time cryptographic integrity rendered in 3D — every node, every
            connection, tamper-proof.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(220,38,38,0.2)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow:
              "0 0 60px rgba(220,38,38,0.08), 0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top bar */}
          <div
            style={{
              padding: "10px 18px",
              borderBottom: "1px solid rgba(220,38,38,0.12)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(220,38,38,0.04)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#DC2626",
                boxShadow: "0 0 6px #DC2626",
                display: "block",
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(220,38,38,0.3)",
                display: "block",
              }}
            />
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "rgba(22,163,74,0.5)",
                display: "block",
              }}
            />
            <span
              style={{
                marginLeft: 8,
                fontSize: 11,
                fontFamily: "monospace",
                color: "rgba(220,38,38,0.7)",
                letterSpacing: 2,
              }}
            >
              LIVE — CRYPTO INTEGRITY ENGINE
            </span>
            <motion.span
              style={{
                marginLeft: "auto",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#16A34A",
                display: "block",
              }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>

          {/* Canvas area */}
          <WebGLErrorBoundary fallback={<CSSFallback />}>
            <Canvas
              camera={{ position: [0, 0, 7], fov: 55 }}
              gl={{ antialias: false, alpha: true }}
              style={{
                height: 400,
                display: "block",
                background: "transparent",
              }}
              dpr={Math.min(
                typeof window !== "undefined" ? window.devicePixelRatio : 1,
                1.5,
              )}
              performance={{ min: 0.5 }}
            >
              <Scene />
            </Canvas>
          </WebGLErrorBoundary>

          {/* Bottom status bar */}
          <div
            style={{
              padding: "10px 18px",
              borderTop: "1px solid rgba(220,38,38,0.12)",
              display: "flex",
              gap: 20,
              background: "rgba(0,0,0,0.3)",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "HASH", value: "SHA-256" },
              { label: "NODES", value: "6 ACTIVE" },
              { label: "STATUS", value: "VERIFIED" },
              { label: "INTEGRITY", value: "100%" },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", gap: 6, alignItems: "center" }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: "rgba(220,38,38,0.5)",
                    letterSpacing: 1,
                  }}
                >
                  {item.label}:
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: "#16A34A",
                    letterSpacing: 1,
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
