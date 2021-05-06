import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useProxy } from 'valtio'

function Arch(props) {
    const group = useRef()
    const { nodes, materials } = useGLTF('/arch.glb')
    return (
        <group ref={group} {...props} dispose={null}>
            <group position={[0, -0.04, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_1.geometry}
                >
                    <meshStandardMaterial color='orange' />
                </mesh>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_2.geometry}
                >
                    <meshStandardMaterial color='green' />
                </mesh>
            </group>
        </group>
    )
}

export default function App() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <Suspense fallback={null}>
                <Arch />
            </Suspense>
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
    )
}
