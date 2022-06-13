import {
  BoxGeometry,
  Camera,
  DoubleSide,
  FogExp2,
  Material,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Renderer,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import './style.css';

const scene: Scene = new Scene();
const box: Mesh = getBox(1, 1, 1);
const plane: Mesh = getPlane(20);
const camera: Camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const renderer: WebGLRenderer = new WebGLRenderer();

// Addinf fog to the scene.
scene.fog = new FogExp2(0xffffff, 0.2);

// Placing objects to the scene.
scene.add(box);
scene.add(plane);

//Box positionnig, let's put it above the plane.
box.position.y = (box.geometry as BoxGeometry).parameters.height / 2;

//Plane rotation for better looking due camera perspective.
plane.rotation.x = Math.PI / 2;

//Camera position.
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
camera.lookAt(new Vector3(0, 0, 0));

// Rendering the scene.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.getElementById('app')?.appendChild(renderer.domElement);
renderScene(renderer, scene, camera);

function renderScene(renderer: Renderer, scene: Scene, camera: Camera): void {
  renderer.render(scene, camera);

  requestAnimationFrame(() => {
    renderScene(renderer, scene, camera);
  });
}

/**
 * Returns a Box.
 *
 * @param {number} width The box width.
 * @param {number} height The box height.
 * @param {number} depth The box depth.
 */
function getBox(width: number, height: number, depth: number): Mesh {
  const geometry: BoxGeometry = new BoxGeometry(width, height, depth);
  const material: Material = new MeshBasicMaterial({
    color: 0x00ff00,
  });

  return new Mesh(geometry, material);
}

/**
 * Returns a square plane.
 *
 * @param {number} size The plane size.
 */
function getPlane(size: number): Mesh {
  const geometry: PlaneGeometry = new PlaneGeometry(size, size);
  const material: Material = new MeshBasicMaterial({
    color: 0xff0000,
    side: DoubleSide,
  });

  return new Mesh(geometry, material);
}
