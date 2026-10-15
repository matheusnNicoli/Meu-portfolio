import { useRef, useState, useMemo, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useInView } from 'motion/react'

function OrbitalSystem({ paused }) {
  const rig = useRef()
  const core = useRef()
  const satellites = useRef()
  const [expanded, setExpanded] = useState(false)
  const particles = useMemo(() => {
    const data = new Float32Array(180 * 3)
    for (let i = 0; i < 180; i++) {
      const angle = i * 2.399963
      const radius = 2.2 + (i % 17) * 0.12
      data[i * 3] = Math.cos(angle) * radius
      data[i * 3 + 1] = Math.sin(angle) * radius
      data[i * 3 + 2] = ((i % 23) / 23 - 0.5) * 3.8
    }
    return data
  }, [])
  useFrame(({ clock, pointer }, delta) => {
    if (paused) return
    const t = clock.getElapsedTime()
    rig.current.rotation.y = THREE.MathUtils.damp(rig.current.rotation.y, pointer.x * 0.45, 3, delta)
    rig.current.rotation.x = THREE.MathUtils.damp(rig.current.rotation.x, -pointer.y * 0.3, 3, delta)
    core.current.rotation.set(t * 0.14, t * 0.2, 0.22)
    satellites.current.rotation.z = t * 0.12
    rig.current.position.y = Math.sin(t * 0.65) * 0.12
    rig.current.scale.setScalar(THREE.MathUtils.damp(rig.current.scale.x, expanded ? 1.12 : 1, 4, delta))
  })
  return <group ref={rig} rotation={[0.18, -0.15, 0.1]}>
    <group ref={core} onClick={() => setExpanded(!expanded)}>
      <mesh><icosahedronGeometry args={[0.95, 1]} /><meshPhysicalMaterial color="#9e94f7" metalness={0.5} roughness={0.2} clearcoat={1} /></mesh>
      <mesh scale={1.025}><icosahedronGeometry args={[0.95, 1]} /><meshBasicMaterial color="#d4d0ff" wireframe transparent opacity={0.45} /></mesh>
    </group>
    {[0, 1, 2].map((n) => <group key={n} rotation={[n * Math.PI / 3, n * 0.65, n * 0.4]}>
      <mesh><torusGeometry args={[1.54 + n * 0.14, 0.025, 12, 100]} /><meshStandardMaterial color={n === 1 ? '#b8f0d1' : '#8474de'} metalness={0.75} roughness={0.25} /></mesh>
    </group>)}
    <group ref={satellites}>{Array.from({ length: 6 }, (_, i) => {
      const angle = i * Math.PI / 3
      return <mesh key={i} position={[Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, Math.sin(angle * 2) * 0.6]} rotation={[i, i * 0.8, i]}>
        <octahedronGeometry args={[i % 2 ? 0.13 : 0.2]} /><meshStandardMaterial color={i % 2 ? '#bee8d6' : '#b4abff'} metalness={0.45} roughness={0.28} />
      </mesh>
    })}</group>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[particles, 3]} /></bufferGeometry><pointsMaterial size={0.018} color="#b8b1f8" transparent opacity={0.55} sizeAttenuation /></points>
  </group>
}

class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? <div className="scene-fallback" aria-hidden="true"><div /><span>MC</span></div> : this.props.children }
}

export default function Scene({ paused }) {
  const container = useRef()
  const inView = useInView(container, { margin: '100px' })
  const stopped = paused || !inView
  return <div ref={container} className="scene-container"><SceneBoundary><Canvas aria-hidden="true" tabIndex={-1} camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]} frameloop={stopped ? 'demand' : 'always'} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} fallback={<div className="scene-fallback" aria-hidden="true"><div /><span>MC</span></div>}>
    <ambientLight intensity={1.2} />
    <directionalLight position={[3, 4, 5]} intensity={3} color="#dedaff" />
    <pointLight position={[-3, -2, 3]} intensity={22} color="#7761ee" />
    <pointLight position={[2, -2, -1]} intensity={12} color="#bdffe5" />
    <OrbitalSystem paused={stopped} />
  </Canvas></SceneBoundary></div>
}
