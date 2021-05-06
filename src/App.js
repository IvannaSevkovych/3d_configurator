import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'


const state = proxy({
    current: null,
    items: {
        heart: "#FFF27A",
        house: "#93CCC5",
    }
})

function Arch(props) {
    const group = useRef()
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF('/arch.glb')
    const [hovered, set] = useState(null)
    return (
        <group ref={group} {...props} dispose={null}>
            <group
                position={[0, -0.04, 0]}
                onPointerOver={(e) => { e.stopPropagation(), set(e.object.material.name) }}
                onPointerOut={(e) => { e.intersections.length === 0 && set(null) }}
                onPointerDown={(e) => { e.stopPropagation; state.current = e.object.material.name }}
                onPointerMissed={(e) => { state.current = null }}
                onPointerOver={(e) => { e.stopPropagation(), console.log(e.object.material.name) }}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_1.geometry}
                >
                    <meshStandardMaterial name="house" color={snap.items.house} />
                </mesh>


                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.arch_2.geometry}
                >
                    <meshStandardMaterial name="heart" color={snap.items.heart} />
                </mesh>
            </group>
        </group>
    )
}

function Picker() {
    const snap = useSnapshot(state)
    return (
        <div className="picker">{snap.current}</div>
    )
}

export default function App() {
    return (
        <>
            <Picker/>
            <Canvas>
                <ambientLight intensity={0.5} />
                <Suspense fallback={null}>
                    <Arch />
                </Suspense>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </>
    )
}
