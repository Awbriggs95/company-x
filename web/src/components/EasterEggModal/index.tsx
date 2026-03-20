'use client';

import { Suspense, Component, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import DanceScene, { DanceSceneFallback, DanceSceneError } from './DanceScene';

interface EasterEggModalProps {
  onClose: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/** Catches useGLTF load failures (e.g. dancer.glb not yet in repo). */
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

/** Full-screen modal overlay with interactive 3D dance scene. */
const EasterEggModal = ({ onClose }: EasterEggModalProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    role="dialog"
    aria-modal="true"
    aria-label="Easter egg dance scene"
  >
    {/* Close button — minimum 44×44px tap target */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white text-2xl"
      aria-label="Close"
    >
      ✕
    </button>

    {/* 3D scene canvas */}
    <div className="w-full h-full">
      <SceneErrorBoundary fallback={<DanceSceneError />}>
        <Suspense fallback={<DanceSceneFallback />}>
          <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
            <DanceScene />
          </Canvas>
        </Suspense>
      </SceneErrorBoundary>
    </div>
  </div>
);

export default EasterEggModal;
