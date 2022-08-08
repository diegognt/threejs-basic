import {BoxGeometry, MeshPhongMaterial} from 'three';
import {AbstractShapeBuilder, BoxBuilder} from './base-shape';

/**
 * Concrete implementation of a Box builder used to create a basic box.
 *
 * @implements BoxBuilder
 */
export class BasicBoxBuilder
  extends AbstractShapeBuilder
  implements BoxBuilder
{
  /**
   * Creates an instance of the BasicBoxBuilder.
   *
   * @constructor
   */
  constructor() {
    super();
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
   * Sets the material to draw the box.
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
}
