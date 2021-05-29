import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import { ContactShadows, useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from 'valtio'


const state = proxy({
    current: null,
    visibility: {
        carpaint_dark: false,
        wheels: true,
    },
    items: {
        carpaint: "#040404",
        plastic: "#040404",
        glass: "#ffffff",
        carpaint_dark: "#040404",
        carpaint_light: "#ffffff",
        tyres: "#040404",
        headlight: "#ffffff",
        chrome: "#858585",
        backlights: "#880D0D",
        plates: "#ffffff",
        mirror: "#858585",
        wheels: "#858585",
        wheels_2: "#B9AB27",
    }
})

function Mini(props) {
    const group = useRef()
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF('/Mini_cooper_opt_attached_modifiers_1_tires_vars_collapsed_draco.glb')

    // Make materials one-sided
    Object.keys(materials).forEach((key) => {
        materials[key].side = 0
    })

    const [hovered, set] = useState(null)

    useEffect(() => {
        const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
        const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
        document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group
                // Events
                onPointerOver={(e) => { e.stopPropagation(), set(e.object.material.name) }}
                onPointerOut={(e) => { e.intersections.length === 0 && set(null) }}
                onPointerDown={(e) => { e.stopPropagation, state.current = e.object.material.name }}
                onPointerMissed={(e) => { state.current = null }}

                position={[-0.01, -0.04, -0.1]} rotation={[-Math.PI, 0, -Math.PI]}
            >

                <mesh
                    geometry={nodes.Mesh001.geometry}
                    material={materials.carpaint}
                    material-color={snap.items.carpaint}
                />
                <mesh
                    geometry={nodes.Mesh001_1.geometry}
                    material={materials.backlights}
                    material-color={snap.items.backlights}
                />
                <mesh
                    geometry={nodes.Mesh001_2.geometry}
                    material={materials.carpaint_dark}
                    material-color={snap.items.carpaint_dark}
                />
                <mesh
                    geometry={nodes.Mesh001_3.geometry}
                    material={materials.carpaint_light}
                    material-color={snap.items.carpaint_light}
                />
                <mesh
                    geometry={nodes.Mesh001_4.geometry}
                    material={materials.chrome}
                    material-color={snap.items.chrome}
                />
                <mesh
                    geometry={nodes.Mesh001_5.geometry}
                    material={materials.glass}
                    material-color={snap.items.glass}
                />
                <mesh
                    geometry={nodes.Mesh001_6.geometry}
                    material={materials.headlight}
                    material-color={snap.items.headlight}
                />
                <mesh
                    geometry={nodes.Mesh001_7.geometry}
                    material={materials.mirror}
                    material-color={snap.items.mirror}
                />
                <mesh
                    geometry={nodes.Mesh001_8.geometry}
                    material={materials.plastic}
                    material-color={snap.items.plastic}
                />
                <mesh
                    geometry={nodes.Mesh001_9.geometry}
                    material={materials.plates}
                    material-color={snap.items.plates}
                />
                <mesh
                    visible={!snap.visibility.carpaint_dark}
                    geometry={nodes.Mesh001_10.geometry}
                    material={materials.roof}
                    material-color={snap.items.roof}
                />
                <mesh
                    geometry={nodes.Mesh001_11.geometry}
                    material={materials.tyres}
                    material-color={snap.items.tyres}
                />
                <mesh
                    visible={!snap.visibility.wheels}
                    geometry={nodes.Mesh001_12.geometry}
                    material={materials.wheels_2}
                    material-color={snap.items.wheels_2}
                />
                <mesh
                    visible={snap.visibility.wheels}
                    geometry={nodes.Mesh001_13.geometry}
                    material={materials.wheels}
                    material-color={snap.items.wheels}
                />
            </group>
        </group>
    )
}

function Picker() {
    const snap = useSnapshot(state)
    return (
        <div style={{ display: snap.current ? "block" : "none" }}>
            <HexColorPicker
                className="picker"
                color={snap.items[snap.current]}
                onChange={(color) => (state.items[snap.current] = color)}
            />
            <h1>{snap.current}</h1>
        </div>
    )
}

function RoofToggler() {
    const snap = useSnapshot(state)
    return (
        <div
            className="xzibit"
            onPointerDown={(e) => {
                e.stopPropagation;
                state.visibility.wheels = !snap.visibility.wheels;
            }}
        >
            <img src="/xzibit.jpg"/>
            <h2>Pimp my ride!</h2>
        </div>
    )
}

export default function App() {
    return (
        <>
            <Picker />
            <Canvas>
                <ambientLight intensity={0.1} />
                <spotLight
                    intensity={0.1}
                    position={[2, 10, 1]}
                    angle={0.2}
                    penumbra={1}
                />
                <Suspense fallback={null}>
                    <Mini />
                    <Environment files="royal_esplanade_1k.hdr" />
                    <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.4, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={1} />
                </Suspense>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
            <RoofToggler />
        </>
    )
}
