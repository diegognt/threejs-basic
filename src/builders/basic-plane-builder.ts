import {Mesh, PlaneGeometry, MeshPhongMaterial} from 'three';
import {PlaneBuilder} from './base';

/**
 * A concrete implementation of a PlaneBuilder use to create
 * a basic plane.
 */
export class BasicPlaneBuilder implements PlaneBuilder {
  private geometry: PlaneGeometry | undefined;
  private material: MeshPhongMaterial | undefined;
  private mesh: Mesh | undefined;

  /**
   * Creates an instance of a BasicPlaneBuilder.
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
   * Creates the geometry to used by the plane.
   *
   * Uses the PlaneGeometry class to build a fixed geometry for the plane.
   *
   * @param {number} width The plane width.
   * @param {number} height The plane height.
   * @returns {void}
   */
  createGeometry(width: number, height: number): void {
    this.geometry = new PlaneGeometry(width, height);
  }

  /**
   * Allows the mesh to receive shadows.
   */
  allowsToReceiveShadow(): void {
    if (!this.mesh) {
      throw new Error('The Mesh has not been created.');
    }
    this.mesh.receiveShadow = true;
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
    this.material = new MeshPhongMaterial(options);
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
