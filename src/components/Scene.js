import { useRef, useEffect } from "react";
import * as THREE from "three";
import scene from "./scene.css";

const Scene = () => {
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

    // Cubo
    const cubo = new THREE.Mesh(
      new THREE.BoxBufferGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial()
    );
    scene.add(cubo);

    // Sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = 2;

    // Torus
    const torusGeometry = new THREE.TorusKnotGeometry(0.4, 0.1, 100, 16);
    const torusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterial);
    scene.add(torusKnot);
    torusKnot.position.x = -2;

    // Render the scene
    renderer.render(scene, camera);

    // clean up scene
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default Scene;
