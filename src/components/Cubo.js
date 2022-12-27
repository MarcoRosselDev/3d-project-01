import { useRef, useEffect } from "react";
import * as THREE from "three";
import cubo from "./cubo.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Cubo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    scene.add(camera);
    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);

    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Cubo
    const cubo = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x3f7b9d,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      })
    );
    scene.add(cubo);

    // Render the scene

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // clean up scene
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="Contenedor3D" ref={mountRef}></div>;
};

export default Cubo;
