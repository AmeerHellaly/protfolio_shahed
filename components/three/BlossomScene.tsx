"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";

/* ------------------------------------------------------------------ */
/*  Palette per theme                                                  */
/* ------------------------------------------------------------------ */
type Palette = {
  rings: string[];
  sheen: string;
  pearl: string;
  pearlGlow: string;
  orbit: string[];
  sparkle: string;
};

const PALETTES: Record<"light" | "dark", Palette> = {
  light: {
    rings: ["#ffd9e4", "#f7a8c0", "#e27a9c"],
    sheen: "#ffffff",
    pearl: "#fff4ec",
    pearlGlow: "#ffc9a8",
    orbit: ["#e26d8e", "#9b87f5", "#f4a98a"],
    sparkle: "#e8879f",
  },
  dark: {
    rings: ["#ffc2d6", "#e86f9a", "#8d4fd6"],
    sheen: "#ffd6f0",
    pearl: "#ffe8f1",
    pearlGlow: "#ff7aa8",
    orbit: ["#ff8fb1", "#b9a6ff", "#ffb89a"],
    sparkle: "#ffb3cf",
  },
};

/* ------------------------------------------------------------------ */
/*  Petal geometry — a cupped, tapered ellipsoid with its base at 0    */
/* ------------------------------------------------------------------ */
function usePetalGeometry() {
  return useMemo(() => {
    const g = new THREE.SphereGeometry(1, 64, 48);
    const pos = g.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      // y: -1..1  ->  t: 0..1 along petal length
      const t = (v.y + 1) / 2;
      // taper: narrow base, wide belly, soft pointed tip
      const width = Math.sin(Math.PI * Math.pow(t, 0.75)) * 0.52 + 0.02;
      let x = v.x * width;
      let z = v.z * 0.06;
      const y = t * 2.1;
      // cup the petal (edges curl forward) + bend tip outward
      z += x * x * 0.9 + Math.pow(t, 2.2) * 0.55;
      pos.setXYZ(i, x, y, z);
    }
    g.computeVertexNormals();
    return g;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  One ring of petals that "blooms" open over time                    */
/* ------------------------------------------------------------------ */
function PetalRing({
  count,
  scale,
  openTo,
  delay,
  color,
  sheen,
  offset = 0,
}: {
  count: number;
  scale: number;
  openTo: number;
  delay: number;
  color: string;
  sheen: string;
  offset?: number;
}) {
  const geo = usePetalGeometry();
  const refs = useRef<THREE.Group[]>([]);
  const open = useRef(0.05);

  useFrame(({ clock }, dt) => {
    const t = clock.getElapsedTime();
    const target = t > delay ? openTo + Math.sin(t * 0.8 + offset) * 0.05 : 0.05;
    open.current = THREE.MathUtils.damp(open.current, target, 1.6, dt);
    refs.current.forEach((g) => {
      if (g) g.rotation.x = open.current;
    });
  });

  return (
    <group scale={scale}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + offset;
        return (
          <group key={i} rotation={[0, a, 0]}>
            <group ref={(el) => { if (el) refs.current[i] = el; }}>
              <mesh geometry={geo} castShadow>
                <meshPhysicalMaterial
                  color={color}
                  roughness={0.22}
                  metalness={0.05}
                  clearcoat={1}
                  clearcoatRoughness={0.15}
                  iridescence={1}
                  iridescenceIOR={1.35}
                  iridescenceThicknessRange={[120, 420]}
                  sheen={1}
                  sheenColor={sheen}
                  sheenRoughness={0.3}
                  transmission={0.35}
                  thickness={0.6}
                  side={THREE.DoubleSide}
                />
              </mesh>
            </group>
          </group>
        );
      })}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Pearls orbiting the flower — PHP / Laravel / C#                    */
/* ------------------------------------------------------------------ */
function OrbitPearls({ colors }: { colors: string[] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group rotation={[0.35, 0, -0.15]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.55, 0.006, 8, 160]} />
        <meshBasicMaterial color={colors[0]} transparent opacity={0.35} />
      </mesh>
      <group ref={ref}>
        {colors.map((c, i) => {
          const a = (i / colors.length) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.55, 0, Math.sin(a) * 2.55]}>
              <sphereGeometry args={[0.13 + i * 0.03, 32, 32]} />
              <meshPhysicalMaterial
                color={c}
                roughness={0.1}
                clearcoat={1}
                iridescence={1}
                emissive={c}
                emissiveIntensity={0.25}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  The whole blossom, following the pointer softly                    */
/* ------------------------------------------------------------------ */
function Blossom({ palette }: { palette: Palette }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ pointer, clock }, dt) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.6 + t * 0.12,
      2,
      dt
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      0.35 - pointer.y * 0.25,
      2,
      dt
    );
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.8}>
      <group ref={group} position={[0, -0.75, 0]} scale={0.92}>
        <PetalRing count={9} scale={1.05} openTo={1.15} delay={0.2} color={palette.rings[2]} sheen={palette.sheen} />
        <PetalRing count={7} scale={0.85} openTo={0.78} delay={0.6} color={palette.rings[1]} sheen={palette.sheen} offset={0.4} />
        <PetalRing count={5} scale={0.62} openTo={0.38} delay={1.0} color={palette.rings[0]} sheen={palette.sheen} offset={0.9} />

        {/* glowing pearl heart */}
        <mesh position={[0, 0.42, 0]}>
          <sphereGeometry args={[0.3, 64, 64]} />
          <MeshDistortMaterial
            color={palette.pearl}
            emissive={palette.pearlGlow}
            emissiveIntensity={0.55}
            roughness={0.15}
            distort={0.28}
            speed={2}
          />
        </mesh>
        <pointLight position={[0, 0.6, 0]} intensity={4} distance={4} color={palette.pearlGlow} />

        <group position={[0, 0.9, 0]}>
          <OrbitPearls colors={palette.orbit} />
        </group>
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
export default function BlossomScene({ dark, active = true }: { dark: boolean; active?: boolean }) {
  const palette = dark ? PALETTES.dark : PALETTES.light;

  return (
    <Canvas
      dpr={[1, 1.8]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 1.3, 7.6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={dark ? 0.35 : 0.7} />
      <directionalLight position={[3, 5, 4]} intensity={dark ? 1.2 : 1.8} color="#fff4f0" />
      <directionalLight position={[-4, 2, -3]} intensity={dark ? 1.4 : 0.8} color={dark ? "#9a6bff" : "#ffd0e0"} />

      <Blossom palette={palette} />

      <Sparkles
        count={dark ? 70 : 45}
        scale={[7, 5, 5]}
        size={dark ? 3.2 : 2.4}
        speed={0.35}
        opacity={dark ? 0.9 : 0.6}
        color={palette.sparkle}
      />

      {/* studio reflections built locally — no HDR download */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer form="circle" intensity={4} position={[0, 5, -9]} scale={10} color="#ffffff" />
          <Lightformer form="rect" intensity={2} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} color={dark ? "#ff9ec4" : "#ffe1ea"} />
          <Lightformer form="rect" intensity={2} position={[5, 1, -1]} rotation-y={-Math.PI / 2} scale={[20, 2, 1]} color={dark ? "#a98bff" : "#e9e1ff"} />
          <Lightformer form="ring" intensity={3} position={[0, -2, 5]} scale={4} color={dark ? "#ffb89a" : "#fff0e6"} />
        </group>
      </Environment>
    </Canvas>
  );
}
