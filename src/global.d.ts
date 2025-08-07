declare module "*.css";

declare module "*.png" {
  const value: string;
  export default value;
}
// src/global.d.ts
declare module 'three/examples/jsm/postprocessing/EffectComposer';
declare module 'three/examples/jsm/postprocessing/RenderPass';
declare module 'three/examples/jsm/postprocessing/BokehPass';