import {
  BoxGeometry,
  Material,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
} from 'three';

/**
 * An interface specifiying the methods for creating the different shape
 * builders.
 *
 * @interface
 */
export interface ShapeBuilder {
  setMaterial(options: Object): void;
  createMesh(): void;
  getResult(): Mesh;
  reset(): void;
}

/**
 * An interface specifiying the methods for creating the different box
 * builders.
 *
 * @interface
 */
export interface BoxBuilder extends ShapeBuilder {
  createGeometry(width: number, height: number, depth: number): void;
  allowsToCastShadow(): void;
}

/**
 * An interface specifiying the methods for creating the different sphere
 * builders.
 *
 * @interface
 */
export interface SphereBuilder extends ShapeBuilder {
  createGeometry(): void;
}

/**
 * An interface specifiying the methods for creating the different plane
 * builders.
 *
 * @interface
 */
export interface PlaneBuilder extends ShapeBuilder {
  createGeometry(width: number, height: number): void;
  allowsToReceiveShadow(): void;
}

/**
 * An abstract class with the implementations of the common method for all the
 * shape builders.
 */
export abstract class AbstractShapeBuilder implements ShapeBuilder {
  protected geometry: PlaneGeometry | BoxGeometry | SphereGeometry | undefined;
  protected material: Material | undefined;
  protected mesh: Mesh | undefined;

  constructor() {
    this.reset();
  }

  /**
   * Sets the material to draw the sphere.
   *
   * @throws {Error} Throws if the method has not been implemented.
   */
  setMaterial(options: Object): void {
    throw new Error(`Method not implemented with ${options}.`);
  }

  /**
   * Creates a Mesh representing the polygon mesh of a shape.
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
   * Returns the polygon mesh representation of a shape.
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

  /**
   * Resets the shape properties.
   *
   * @returns {void}
   */
  reset(): void {
    this.material = undefined;
    this.geometry = undefined;
    this.mesh = undefined;
  }
}
