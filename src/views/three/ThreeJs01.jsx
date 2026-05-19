
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Text } from '@react-three/drei';


// 3D 큐브 컴포넌트 (동일하게 유지)
function Box() {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);


  // Z-fighting(면이 겹쳐서 깜빡이는 현상)을 막기 위한 미세한 오프셋 값
  const offset = 0.51; 
  const halfPi = Math.PI / 2; // 90도

/* 움직임..
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
*/
  return (
    <mesh
      ref={meshRef}
      scale={1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'blue' : 'red'} />


      {/* 1. 앞면 (Front) */}
      <Text position={[0, 0, offset]} fontSize={0.15} color="white">
        Front
      </Text>

      {/* 2. 뒷면 (Back) - Y축으로 180도 회전 */}
      <Text position={[0, 0, -offset]} rotation={[0, Math.PI, 0]} fontSize={0.15} color="white">
        Back
      </Text>

      {/* 3. 우측면 (Right) - Y축으로 90도 회전 */}
      <Text position={[offset, 0, 0]} rotation={[0, halfPi, 0]} fontSize={0.15} color="white">
        Right
      </Text>

      {/* 4. 좌측면 (Left) - Y축으로 -90도 회전 */}
      <Text position={[-offset, 0, 0]} rotation={[0, -halfPi, 0]} fontSize={0.15} color="white">
        Left
      </Text>

      {/* 5. 윗면 (Top) - X축으로 -90도 회전 */}
      <Text position={[0, offset, 0]} rotation={[-halfPi, 0, 0]} fontSize={0.15} color="white">
        Top
      </Text>

      {/* 6. 아랫면 (Bottom) - X축으로 90도 회전 */}
      <Text position={[0, -offset, 0]} rotation={[halfPi, 0, 0]} fontSize={0.15} color="white">
        Bottom
      </Text>
    </mesh>
  );
}


function ThreeJs01() {

  return (
    <>
     {/* 3D 화면이 잘 보이도록 전체 화면 크기의 영역을 잡아줍니다 */}
      <div style={{ width: '100%', height: '100vh', backgroundColor: '#1a1a1a' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          {/* 은은한 전체 조명 */}
          <ambientLight intensity={0.5} /> 
          
          {/* 그림자와 입체감을 줄 직사광선 */}
          <directionalLight position={[10, 10, 5]} intensity={1} /> 
          
          {/* 3D 큐브 */}
          <Box />
          
          {/* 마우스 드래그로 화면 돌려보기 활성화 */}
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );



  
}

export default ThreeJs01;