import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, noEvents, PointerEvents } from '@react-three/xr'
import { Suspense, useState } from 'react'
import Experience from './Experience'
import './App.css'
import { KeyboardControls } from '@react-three/drei'
import Checkers from './Checkers'
import RightHand from './RightHand'
import LeftHand from './LeftHand'

const store = createXRStore({
  secondaryInputSources: true,
  controller: {
    left: () => {
      return <LeftHand />
    },
    right: () => {
      return <RightHand />
    }
  },
  hand: false
});

function App() {
  return (
    <>
      <button  onClick={() => store.enterVR()}>Enter VR</button>
      <KeyboardControls 
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        ]}
      >
        
        <Canvas camera={{ position:[5, 4, 0] }} events={noEvents}>
          <PointerEvents />
          <Suspense>
            <XR store={store}>
              {/* <Experience /> */}
              <Checkers />
            </XR>
          </Suspense>
        </Canvas>
      </ KeyboardControls>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)