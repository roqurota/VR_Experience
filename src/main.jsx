import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, useXRInputSourceState, useXRInputSourceStateContext } from '@react-three/xr'
import { Suspense, useState } from 'react'
import Experience from './Experience'
import './App.css'
import { KeyboardControls } from '@react-three/drei'
import Checkers from './Checkers'

const store = createXRStore(
//   {
//   hand: {
//     right: () => {
//       const state = useXRInputSourceState('hand', 'right')

//       console.log(state)

//       return (
        
//           <mesh>
//             <boxGeometry />
//             <meshStandardMaterial color="red"/>
//           </mesh>
        
//       )
//     },
//   },
// }
);

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
        <Canvas camera={{ position:[6, 6, 6] }}>
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