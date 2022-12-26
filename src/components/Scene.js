import { useRef, useEffect } from "react";
import * as THREE from "three";
import scene from "./scene.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

    // Sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshMatcapMaterial({
      color: 0x3f7b9d,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = 2;

    // Torus
    const torusGeometry = new THREE.TorusKnotGeometry(0.4, 0.1, 100, 16);

    const torusMaterialSilver = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
      flatShading: true,
    });

    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterialSilver);
    scene.add(torusKnot);
    torusKnot.position.x = -2;

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

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default Scene;
