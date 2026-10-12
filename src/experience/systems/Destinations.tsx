import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';
export function Destinations() {
  const navigate = useNavigate();
  return (
    <group>
      {projects.map((p) => (
        <mesh
          key={p.slug}
          position={[p.position[0], 4, p.position[2]]}
          onClick={(event) => {
            event.stopPropagation();
            navigate('/work/' + p.slug);
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = '';
          }}
        >
          <boxGeometry args={[12, 10, 10]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}
