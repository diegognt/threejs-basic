import {MeshBasicMaterial, SphereGeometry} from 'three';
import {AbstractShapeBuilder, SphereBuilder} from './base';

/**
 * A concrete implementation of a sphere builder used to create
 * a sphere used that represents a light bulb.
 *
 * @implements BoxBuilder
 */
export class LightBulbSphereBuilder
  extends AbstractShapeBuilder
  implements SphereBuilder
{
  /**
   * Creates an instance of a LightSphereBuilder.
   */
  constructor() {
    super();
  }

  /**
   * Creates the geometry used to by the sphere.
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
}
