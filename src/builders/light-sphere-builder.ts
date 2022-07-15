import {Mesh, MeshBasicMaterial, SphereGeometry} from 'three';
import {SphereBuilder} from './base';

/**
 * Concrete implementation of a sphere builder used to create
 * a sphere used to represent a light bulb.
 *
 * @implements BoxBuilder
 */
export class LightSphereBuilder implements SphereBuilder {
  private mesh: Mesh | undefined;
  private geometry: SphereGeometry | undefined;
  private material: MeshBasicMaterial | undefined;

  /**
   * Creates an instance of a LightSphereBuilder.
   */
  constructor() {
    this.reset();
  }

  /**
   * Resets the box properties.
   *
   * @returns {void}
   */
  reset(): void {
    this.material = undefined;
    this.geometry = undefined;
    this.mesh = undefined;
  }

  /**
   * Creates the geometry used by the sphere.
   *
   * Uses the SphereGeometry class to build a fixed geometry for the sphere.
   *
   * @returns {void}
   */
  createGeometry(): void {
    this.geometry = new SphereGeometry(0.05, 24, 24);
  }

  /**
   * Sets the material to draw the sphere.
   *
   * The material to be used can be instanciated with a set of options
   * such as color, please check the THREE documentation for more
   * information.
   *
   * @param {object} options The material options.
   * @returns {void}
   */
  setMaterial(options: Object): void {
    this.material = new MeshBasicMaterial(options);
  }

  /**
   * Creates a Mesh representing the polygon mesh of a sphere.
   *
   * @throws {Error} Throws if there is not a defined geometry.
   * @throws {Error} Throws if there is not a defined material.
   * @returns {void}
   */
  createMesh(): void {
    if (!this.geometry) {
      throw new Error('The geometry has not been created.');
    }

    if (!this.material) {
      throw new Error('The material has not been set yet.');
    }

    this.mesh = new Mesh(this.geometry, this.material);
  }

  /**
   * Return the polygon mesh representation of a basic box.
   *
   * @throws {Error} Throws if there is not a defined Mesh
   * @returns {Mesh} The mesh representation of a box.
   */
  getResult(): Mesh {
    if (!this.mesh) {
      throw new Error('The mesh has not been created.');
    }

    const result: Mesh = this.mesh;

    this.reset();

    return result;
  }
}
