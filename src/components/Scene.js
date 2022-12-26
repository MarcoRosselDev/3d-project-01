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

    // Sphere
    const textureLoader = new THREE.TextureLoader();
    const matcapMetalic = textureLoader.load(
      "./textures/D0CCCB_524D50_928891_727581.png"
    );

    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshMatcapMaterial({
      matcap: matcapMetalic,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    sphere.position.x = 2;

    // Torus
    const marcapGolding = textureLoader.load("./textures/golden-texture.png");
    const torusGeometry = new THREE.TorusKnotGeometry(0.4, 0.1, 100, 16);

    const torusMaterialSilver = new THREE.MeshMatcapMaterial({
      matcap: marcapGolding,
      flatShading: true,
    });

    const torusKnot = new THREE.Mesh(torusGeometry, torusMaterialSilver);
    scene.add(torusKnot);
    torusKnot.position.x = 0;

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
