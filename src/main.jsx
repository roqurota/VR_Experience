import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import Experience from './Experience'

const store = createXRStore()

function App() {
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          <Experience />
        </XR>
      </Canvas>
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)