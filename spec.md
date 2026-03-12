# Digital Evidence Protection System

## Current State
- Home page has basic Three.js scene (wireframe icosahedron + octahedron + 80 floating spheres)
- CyberBackground with canvas particles, hex grid, scan lines
- motion/react animations: word-by-word hero title, floating orbs, stat counters, card stagger
- No scroll-driven narrative / scrollytelling
- No PBR materials, no post-processing, no depth-of-field
- No immersive scene transitions between sections

## Requested Changes (Diff)

### Add
- **Hyper-realistic 3D hero scene**: Replace basic wireframe with PBR-lit mesh using `@react-three/drei` (Environment, MeshDistortMaterial or MeshTransmissionMaterial), bloom post-processing via `@react-three/postprocessing`, dynamic lighting, depth-of-field
- **Scrollytelling 2.0**: A dedicated narrative scroll section on Home page where each scroll step reveals a cinematic panel — evidence locked, hash verified, chain secured — with parallax depth layers, text reveal, and counter animations tied to scroll position using `useScroll` + `useTransform` from motion/react
- **AR/VR-style motion overlays**: Holographic HUD elements (corner brackets, scanning reticles, data readouts) that animate over the 3D scene, simulating AR overlay feel
- **Cinematic scroll parallax**: Hero background moves at 0.3x scroll speed, mid-layer at 0.6x, foreground content at 1x — true multi-layer parallax
- **Reveal animations**: Section headings split into characters that slide/fade in from below when entering viewport; staggered timing per character
- **Particle depth field**: 3D scene gets more spheres with varying Z depth and opacity falloff to simulate depth

### Modify
- `ThreeScene.tsx`: Upgrade to PBR materials, add bloom post-processing, rotating DNA-helix-like structure, animated point lights orbiting the scene
- `Home.tsx`: Add scrollytelling section between Features and How It Works; enhance hero with parallax layers
- `CyberBackground.tsx`: Add depth layers — foreground particles move faster than background ones

### Remove
- Nothing removed

## Implementation Plan
1. Install / verify `@react-three/drei` and `@react-three/postprocessing` are available (they likely are already as R3F is used)
2. Upgrade `ThreeScene.tsx` — PBR sphere with MeshDistortMaterial, bloom via EffectComposer/Bloom, orbiting point lights, animated DNA helix rings
3. Add `ScrollytellingSection` component — uses `useScroll`/`useTransform` for scroll-driven cinematic panels with 3 narrative steps
4. Add `HolographicHUD` overlay component — AR-style corner brackets, animated reticle, data readout lines
5. Update `Home.tsx` hero with `useScroll`+`useTransform` parallax (background moves slower than foreground)
6. Add character-split heading animation component for section titles
7. Validate and deploy
