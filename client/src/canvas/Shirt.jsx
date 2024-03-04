import React, { useEffect } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const { gl } = useThree(); // Get the Three.js renderer from the useThree hook

  // Set anisotropy for logoTexture after it's loaded
  useEffect(() => {
    if (logoTexture) {
      logoTexture.anisotropy = gl.capabilities.getMaxAnisotropy();
    }
  }, [logoTexture, gl]);

  // Update the color of the material using easing from maath in the animation loop
  useFrame((state, delta) => {
    if (materials.lambert1 && snap.color) {
      easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]} // Ensure scale is an array or a Vector3
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal 
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={[0.15, 0.15, 0.15]} // Ensure scale is an array or a Vector3
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
