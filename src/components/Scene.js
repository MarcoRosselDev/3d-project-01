import { useRef, useEffect } from "react";
import * as THREE from "three";

const Scene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
  }, []);

  return (
    <div
      className="container3d"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    >
      <h1>Hola mundo</h1>
    </div>
  );
};

export default Scene;
