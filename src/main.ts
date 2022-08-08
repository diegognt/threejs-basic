import {GUI} from 'dat.gui';
import {
  AmbientLight,
  BoxGeometry,
  Camera,
  CameraHelper,
  Clock,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  PerspectiveCamera,
  Renderer,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {BasicBoxBuilder} from './builders/shapes/basic-box-builder';
import {BasicPlaneBuilder} from './builders/shapes/basic-plane-builder';
import {SimpleDirectionalLightBuilder} from './builders/lights/simple-directional-light-builder';
import {LightBulbSphereBuilder} from './builders/shapes/light-bulb-sphere-builder';
import './style.css';

const scene: Scene = new Scene();
const plane: Mesh = getPlane(20);
const boxGrid = getBoxGrid(10);
const camera: Camera = new PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
const renderer: WebGLRenderer = new WebGLRenderer({antialias: true});
const light = getDirectionalLight(1, 10);
const ambientLight: AmbientLight = getAmbientLight(1);
const gui: GUI = new GUI();
const cameraHelper: CameraHelper = new CameraHelper(light.shadow.camera);
const clock: Clock = new Clock();

//Adding a name to some elements of the scene.
boxGrid.name = 'box-grid';

// Placing objects to the scene.
scene.add(boxGrid);
scene.add(plane);
scene.add(light);
scene.add(ambientLight);
scene.add(cameraHelper);

//Plane rotation for better looking due camera perspective.
plane.rotation.x = Math.PI / 2;

//Placing the point light.
light.position.y = 4;

//Camera position.
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(new Vector3(0, 0, 0));

//Adding GUI controllers
gui.add(light, 'intensity', 0, 10);
gui.add(light.position, 'x', -15, 15);
gui.add(light.position, 'y', 2, 10);
gui.add(light.position, 'z', -15, 15);

// Rendering the scene.
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor('rgb(120, 120, 120)');
document.getElementById('app')?.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

renderScene(renderer, scene, camera, controls, clock);

/**
 * Renders a ThreeJS scene using the requestAnimationFrame API.
 *
 * @param {Renderer} renderer ThreeJS renderer instance.
 * @param {Scene} scene ThreeJS scene instance.
 * @param {Camera} camera ThreeJS camera instance.
 * @param {OrbitControls} controls ThreeJS OrbitControls instance.
 */
function renderScene(
  renderer: Renderer,
  scene: Scene,
  camera: Camera,
  controls: OrbitControls,
  clock: Clock
): void {
  renderer.render(scene, camera);
  controls.update();

  scene.getObjectByName('box-grid')?.children.forEach((child, index) => {
    child.scale.y = (Math.sin(clock.getElapsedTime() + index) + 1) / 2 + 0.001;
    child.position.y = child.scale.y;
  });

  requestAnimationFrame(() => {
    renderScene(renderer, scene, camera, controls, clock);
  });
}

/**
 * Returns a Box.
 *
 * @param {number} width The box width.
 * @param {number} height The box height.
 * @param {number} depth The box depth.
 * @returns {Mesh} The actual box.
 */
function getBox(width: number, height: number, depth: number): Mesh {
  const builder = new BasicBoxBuilder();
  builder.createGeometry(width, height, depth);
  builder.setMaterial({color: 'rgb(125, 125, 125)'});
  builder.createMesh();

  return builder.getResult();
}

/**
 * Returns a group of boxes arranged as a squared grid.
 *
 * @param {number} amount The amount of column and rows for the grid.
 * @param {number} separation The space used to separte the boxes.
 * @returns {Group} Gruop of boxes.
 */
function getBoxGrid(amount = 3, separation = 1.5): Group {
  const grid: Group = new Group();

  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      const box = getBox(1, 2, 1);

      box.position.x = x * separation;
      box.position.y = (box.geometry as BoxGeometry).parameters.height / 2;
      box.position.z = y * separation;
      grid.add(box);
    }
  }

  grid.position.x = -(separation * (amount - 1)) / 2;
  grid.position.z = -(separation * (amount - 1)) / 2;

  return grid;
}

/**
 * Returns a square plane.
 *
 * @param {number} size The plane size.
 * @returns {Mesh} The actual plane
 */
function getPlane(size: number): Mesh {
  const builder = new BasicPlaneBuilder();

  builder.createGeometry(size, size);
  builder.setMaterial({
    color: 'rgb(120, 120, 120)',
    side: DoubleSide,
  });
  builder.createMesh();
  builder.allowsToReceiveShadow();

  return builder.getResult();
}

/**
 * Returns a DirectionalLight casting shadows.
 *
 * @param {number} intensity The initial point of light intensity.
 * @param {number} fieldOfView The field of view used to cast shadows.
 * @returns {DirectionalLight} A instanciated object of the DirectionalLight class
 */
function getDirectionalLight(
  intensity: number,
  fieldOfView: number
): DirectionalLight {
  const builder = new SimpleDirectionalLightBuilder();

  builder.setColor('rgb(255, 255, 255)');
  builder.setIntensity(intensity);
  builder.setLightView(fieldOfView);
  builder.setMapSize(4096, 4096);
  builder.allowsToCastShadow();
  builder.addLightSource(getLightSphere());

  return builder.getResult();
}

/**
 * Returns an AmbientLight.
 *
 * @param {number} intensity The initial point of light intensity.
 * @returns {AmbientLight} A instanciated object of the AmbientLight class
 */
function getAmbientLight(intensity: number): AmbientLight {
  const light: AmbientLight = new AmbientLight('rgb(54, 69, 79)', intensity);

  return light;
}

/**
 * Returns a LightSphere.
 *
 * @returns {Mesh} The actual sphere.
 */
function getLightSphere(): Mesh {
  const builder = new LightBulbSphereBuilder();

  builder.createGeometry();
  builder.setMaterial({color: 'rgb(255, 255, 255)'});
  builder.createMesh();

  return builder.getResult();
}
