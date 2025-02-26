import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, XROrigin, createXRStore } from '@react-three/xr'
import { useState } from 'react'
import Experience from './Experience'
import './App.css'

const store = createXRStore()

function App() {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas camera={{ position:[1, 2, 2.5] }}>
        <XR store={store}>
          <Experience />
        </XR>
      </Canvas>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)