import {PlaneGeometry, MeshPhongMaterial} from 'three';
import {AbstractShapeBuilder, PlaneBuilder} from './base';

/**
 * A concrete implementation of a PlaneBuilder use to create
 * a basic plane.
 */
export class BasicPlaneBuilder
  extends AbstractShapeBuilder
  implements PlaneBuilder
{
  /**
   * Creates an instance of a BasicPlaneBuilder.
   */
  constructor() {
    super();
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
}
