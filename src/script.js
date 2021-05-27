import * as dat from "dat.gui";
import * as THREE from "three";
import "./style.css";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Objects
const geometry = new THREE.SphereGeometry(20, 100, 100);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/world.jpg");

// Materials
const material = new THREE.MeshLambertMaterial({
  map: texture,
});

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.x = 20;
pointLight.position.y = 20;
pointLight.position.z = 60;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.x = 10;
camera.position.y = 10;
camera.position.z = 60;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
