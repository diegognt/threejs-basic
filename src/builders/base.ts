import {Mesh} from 'three';

/**
 * An interface specifiying the methods for creating the different shape builders.
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
 * An interface specifiying the methods for creating the different box builders.
 *
 * @interface
 */
export interface BoxBuilder extends ShapeBuilder {
  createGeometry(width: number, height: number, depth: number): void;
  allowsToCastShadow(): void;
}

/**
 * An interface specifiying the methods for creating the different sphere builders.
 *
 * @interface
 */
export interface SphereBuilder extends ShapeBuilder {
  createGeometry(): void;
}
