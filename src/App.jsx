import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import ExperienceFactory from "./components/ExperienceFactory";
import Overlay from "./components/Overlay";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {/* Setup the 3D Canvas. 
         fov: Field of View (Camera lens width)
         position: Starting camera location
      */}
      <Canvas shadows camera={{ position: [0, 4, 15], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        
        {/* ScrollControls creates the virtual scroll bar.
           pages={4} means the scrollable area is 4 screens tall.
           damping={0.1} adds the smooth "weight" to the scroll.
        */}
        <ScrollControls pages={4} damping={0.2}>
          <ExperienceFactory />
          <Overlay />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
