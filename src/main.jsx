import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, XROrigin, createXRStore, useXRInputSourceStateContext, DefaultXRController } from '@react-three/xr'
import { useState } from 'react'
import Experience from './Experience'
import './App.css'
import { KeyboardControls } from '@react-three/drei'

const store = createXRStore()

function App() {
  return (
    <>
      <button onClick={() => store.enterVR()}>Enter VR</button>
      <KeyboardControls 
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        ]}
      >
        <Canvas camera={{ position:[6, 6, 6] }}>
          <XR store={store}>
            <Experience />
          </XR>
        </Canvas>
      </ KeyboardControls>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)