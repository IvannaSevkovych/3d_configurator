import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useProxy } from 'valtio'

const state = proxy({
    current: null,
    items: {
        heart: "#FFF27A",
        house: "#93CCC5",
    }
})

function Arch(props) {
    const group = useRef()
    const snap = useProxy(state)
    const { nodes, materials } = useGLTF('/arch.glb')
    return (
        <group ref={group} {...props} dispose={null}>
            <group position={[0, -0.04, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_1.geometry}
                >
                    <meshStandardMaterial color={snap.items.house} />
                </mesh>

                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_2.geometry}
                >
                    <meshStandardMaterial color={snap.items.heart} />
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
