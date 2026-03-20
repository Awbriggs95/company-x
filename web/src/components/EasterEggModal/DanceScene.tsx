'use client';

import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, OrbitControls } from '@react-three/drei';
import { Group } from 'three';
import * as THREE from 'three';

/** Loads dancer.glb and plays the first animation on loop. */
const DancerModel = () => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/assets/dancer.glb');
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const firstName = names[0];
    if (!firstName) return;
    const action = actions[firstName];
    if (!action) return;
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    return () => {
      action.stop();
    };
  }, [actions, names]);

  return <primitive ref={group} object={scene} scale={1.5} position={[0, -1, 0]} />;
};

/** Fallback shown while dancer.glb is loading. */
export const DanceSceneFallback = () => (
  <div className="flex flex-col items-center justify-center h-full gap-3 text-white">
    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
    <span className="text-sm opacity-70">Loading scene…</span>
  </div>
);

/** Fallback shown when dancer.glb fails to load (asset not yet in repo). */
export const DanceSceneError = () => (
  <div className="flex items-center justify-center h-full">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://tenor.com/bQDvb.gif"
      alt="Dancing"
      className="max-h-full max-w-full object-contain"
    />
  </div>
);

/** Interactive R3F scene. Wrap in Suspense + ErrorBoundary in parent. */
const DanceScene = () => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[5, 10, 5]} intensity={1} />
    <DancerModel />
    <OrbitControls enablePan={false} minDistance={2} maxDistance={8} />
  </>
);

export default DanceScene;
