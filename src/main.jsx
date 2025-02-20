import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

function App() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  )
}

createRoot(document.getElementById('root')).render(<App />)