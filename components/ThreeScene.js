"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import useMediaQuery from "@/lib/useMediaQuery";

function Env() {
  return <Environment files="/3d/christmas_photo_studio_07_1k.hdr" />;
}

function Model({ path, scale, position }) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => scene.clone(), [scene]);
  return <primitive object={cloned} scale={scale} position={position} />;
}

function Scene() {
  const ref = useRef();
  const isMobile = useMediaQuery("(max-width: 1224px)");

  useFrame((state, delta) => {
    if (!isMobile && ref.current) {
      const y = Math.min(Math.max(state.pointer.y, -0.05), 0.05);
      const x = Math.min(Math.max(state.pointer.x, -0.05), 0.05);
      easing.dampE(
        ref.current.rotation,
        [y, x * (state.camera.position.z > 1 ? 0.9 : -1), 0],
        1,
        delta
      );
    }
  });

  const items = isMobile
    ? [
        { position: [0, 1, 1.5], scale: [0.15, 0.15, 0.15] },
        { position: [1.25, -1, 0], scale: [0.05, 0.05, 0.05] },
        { position: [-1, -2, 0], scale: [0.005, 0.005, 0.005] },
      ]
    : [
        { position: [1.5, 0.5, 3], scale: [0.15, 0.15, 0.15] },
        { position: [2.5, -2, 0], scale: [0.1, 0.1, 0.1] },
        { position: [-3, -4, 0], scale: [0.01, 0.01, 0.01] },
      ];

  return (
    <mesh ref={ref}>
      <Suspense fallback={null}>
        <Env />
        <Model path="/3d/react_logo.glb" {...items[0]} />
        <Model path="/3d/css.glb" {...items[1]} />
        <Model path="/3d/html_logo.glb" {...items[2]} />
      </Suspense>
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

useGLTF.preload("/3d/react_logo.glb");
useGLTF.preload("/3d/css.glb");
useGLTF.preload("/3d/html_logo.glb");
