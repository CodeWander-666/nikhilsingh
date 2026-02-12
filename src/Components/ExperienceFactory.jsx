import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { PROFILE } from "../data";

// 1. Reusable Component: A section of the conveyor belt
const BeltSegment = ({ position }) => (
  <group position={position}>
    {/* The main belt platform */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[5, 10]} />
      <meshStandardMaterial color="#111" roughness={0.4} metalness={0.8} />
    </mesh>
    {/* Neon Guide Rails on the sides */}
    <mesh position={[-2.6, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[0.2, 10, 0.2]} />
      <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
    </mesh>
    <mesh position={[2.6, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[0.2, 10, 0.2]} />
      <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
    </mesh>
  </group>
);

// 2. Reusable Component: Floating 3D Text Labels
const FloatingLabel = ({ text, subtext, position, color = "#ffffff" }) => (
  <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
    <group position={position}>
      <Text
        font="https://fonts.gstatic.com/s/robotomono/v22/L0x5DF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3v_7.ttf"
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
      >
        {text}
        <meshBasicMaterial toneMapped={false} />
      </Text>
      {subtext && (
        <Text position={[0, -0.5, 0]} fontSize={0.2} color="#aaaaaa">
          {subtext}
        </Text>
      )}
    </group>
  </Float>
);

export default function ExperienceFactory() {
  const scroll = useScroll();
  
  useFrame((state) => {
    // SCROLL LOGIC: Move camera along Z-axis based on scroll percentage
    // The factory is roughly 35 units long.
    const targetZ = -scroll.offset * 35; 
    
    // Smoothly interpolate the camera position
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 12 + targetZ, 0.08);
    
    // Add slight camera sway based on mouse movement for realism
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 4 + (state.pointer.y * 0.5), 0.05);
  });

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={1.5} color="#00f3ff" />
      
      {/* --- ZONE 1: ENTRY (Raw Data) --- */}
      <BeltSegment position={[0, 0, 10]} />
      <FloatingLabel 
        position={[0, 3, 10]} 
        text={PROFILE.name} 
        subtext="Ready for Processing" 
        color="#00f3ff"
      />

      {/* --- ZONE 2: SKILLS (Processing) --- */}
      <BeltSegment position={[0, 0, 0]} />
      {PROFILE.skills.map((skill, i) => (
         <group key={i} position={[i % 2 === 0 ? -2 : 2, 1.5, 5 - (i * 2.5)]}>
            <Float speed={4} rotationIntensity={2}>
              <mesh>
                <octahedronGeometry args={[0.6]} />
                <meshStandardMaterial color={skill.color} wireframe />
              </mesh>
            </Float>
            <Text position={[0, 0.9, 0]} fontSize={0.25} color="white">
              {skill.name}
            </Text>
         </group>
      ))}
      <FloatingLabel position={[0, 4, 2]} text="SKILL EXTRACTION" color="#ff0055" />

      {/* --- ZONE 3: PROJECTS (Assembly) --- */}
      <BeltSegment position={[0, 0, -10]} />
      
      {/* Project 1: SEOMAN */}
      <group position={[-2.5, 1, -8]} rotation={[0, 0.5, 0]}>
         <mesh>
           <boxGeometry args={[3, 2, 0.2]} />
           <meshStandardMaterial color="#222" />
         </mesh>
         <Text position={[0, 0, 0.15]} fontSize={0.3} color="#00f3ff">{PROFILE.projects[0].title}</Text>
      </group>

      {/* Project 2: NOVUSFACE */}
      <group position={[2.5, 1, -12]} rotation={[0, -0.5, 0]}>
         <mesh>
           <boxGeometry args={[3, 2, 0.2]} />
           <meshStandardMaterial color="#222" />
         </mesh>
         <Text position={[0, 0, 0.15]} fontSize={0.3} color="#ff0055">{PROFILE.projects[1].title}</Text>
      </group>

      <FloatingLabel position={[0, 4, -10]} text="PROJECT ASSEMBLY" color="#00ff00" />
      
      {/* Floor Grid for reference */}
      <gridHelper args={[100, 100, 0x333333, 0x111111]} position={[0, -0.1, 0]} />
    </>
  );
}
