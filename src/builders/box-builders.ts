import {BoxGeometry, Mesh, MeshPhongMaterial} from 'three';

/**
 * An interface specifiying the methods for creating the different box builders.
 *
 * @interface
 */
interface BoxBuilder {
  createGeometry(width: number, height: number, depth: number): void;
  setMaterial(options: Object): void;
  createMesh(): void;
  allowsToCastShadow(): void;
  getResult(): Mesh;
  reset(): void;
}

/**
 * Concrete implementation of a Box builder used to create a basic box.
 *
 * @implements BoxBuilder
 */
export class BasicBoxBuilder implements BoxBuilder {
  private mesh: Mesh | undefined;
  private geometry: BoxGeometry | undefined;
  private material: MeshPhongMaterial | undefined;

  /**
   * Creates an instance of the BasicBoxBuilder.
   *
   * @constructor
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
   * Creates the geometry used by the box.
   *
   * @param {number} width The geometry width.
   * @param {number} height The geometry height.
   * @param {number} depth The geometry depth.
   * @returns {void}
   */
  createGeometry(width: number, height: number, depth: number): void {
    this.geometry = new BoxGeometry(width, height, depth);
  }

  /**
   * Sets the material that makes the box shiny.
   *
   * The material to be used can be created with a set of options
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
   * Creates a Mesh representing the polygon mesh of a box.
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
   * Allows the box to cast shadows.
   *
   * @throws {Error} Throws if there is not a defined Mesh
   * @returns {void}
   */
  allowsToCastShadow(): void {
    if (!this.mesh) {
      throw new Error('The Mesh has not been created.');
    }

    this.mesh.castShadow = true;
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
