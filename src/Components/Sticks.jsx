/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 ./public/popsicle_sticks/scene.gltf
Author: plaggy (https://sketchfab.com/plaggy)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/popsicle-sticks-5e23c107157f403182f9ca930d32ed75
Title: Popsicle Sticks
*/

import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
// https://github.com/pmndrs/drei
import { useGLTF, Environment } from "@react-three/drei";
// https://github.com/pmndrs/react-postprocessing
// https://github.com/vanruesc/postprocessing
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import Overlay from "./Overlay";

function Stick({ index, z, speed }) {
  const ref = useRef();
  // useThree gives you access to the R3F state model
  const { viewport, camera } = useThree();
  // getCurrentViewport is a helper that calculates the size of the viewport
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
  // It can automatically handle draco and meshopt-compressed assets without you having to
  // worry about binaries and such ...
  const { nodes, materials } = useGLTF("/popsicle_sticks/scene.gltf");
  // By the time we're here the model is loaded, this is possible through React suspense

  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1)
      ref.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );
    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin)
    );
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
  });

  // Using drei's detailed is a nice trick to reduce the vertex count because
  // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
  return (
    <group ref={ref} distances={[0, 65, 80]}>
      <mesh
        geometry={nodes.PopsicleStick6_PopsicleStick6_0.geometry}
        material={materials.PopsicleStick6}
        material-emissive="#964B00"
      />
      <mesh
        geometry={nodes.PopsicleStick6_PopsicleStick6_0.geometry}
        material={materials.PopsicleStick6}
        material-emissive="#964B00"
      />
      <mesh
        geometry={nodes.PopsicleStick6_PopsicleStick6_0.geometry}
        material={materials.PopsicleStick6}
        material-emissive="#964B00c"
      />
    </group>
  );
}

export default function Sticks({
  speed = 1,
  count = 90,
  depth = 80,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    <>
      <Canvas
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}
      >
        <color attach="background" args={["#f1efe7"]} />
        <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} />
        {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
        {Array.from(
          { length: count },
          (_, i) => <Stick key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} /> /* prettier-ignore */
        )}
        <Environment preset="lobby" />
        {/* Multisampling (MSAA) is WebGL2 antialeasing, we don't need it (faster) */}
        <EffectComposer multisampling={0}>
          <DepthOfField
            target={[0, 0, 60]}
            focalLength={0.7}
            bokehScale={6}
            height={500}
          />
        </EffectComposer>
      </Canvas>
      <Overlay />
    </>
  );
}

useGLTF.preload("/popsicle_sticks/scene.gltf");
