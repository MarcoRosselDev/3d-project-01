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
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial();
    const cubo = new THREE.Mesh(geometry, material);
    cubo.scale.set(2, 2, 2);
    scene.add(cubo);

    // luz
    const AO = new THREE.AmbientLight(0xffffff, 1);
    scene.add(AO);

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
