import {Color, DirectionalLight, Mesh} from 'three';
import {AbstractLightBuilder, DirectionalLightBuilder} from './base-light';

/**
 * A concrete implementation of a DirectionalLight builder used to create
 * an object that Directional Light.
 *
 * @implements DirectionalLightBuilder
 */
export class SimpleDirectionalLightBuilder
  extends AbstractLightBuilder
  implements DirectionalLightBuilder
{
  /**
   * Creates an instance of the BasicDirectionalLightBuilder
   */
  constructor() {
    super();
  }

  addLightSource(source: Mesh): void {
    this.light.add(source);
  }

  /**
   * Sets the color used by the light.
   *
   * @param {string} color the color in `rgb()` format.
   * @returns {void}
   */
  setColor(color: string): void {
    this.light.color = new Color(color);
  }

  /**
   * Allows to the light cast dynamic shadows.
   *
   * @returns {void}
   */
  allowsToCastShadow(): void {
    this.light.castShadow = true;
  }

  /**
   * Sets the light view of the world.
   *
   * This is used to generate a depth map of the scene;
   * objects behind other objects from the light's perspective will be in
   * shadow.
   *
   * @param {number} fieldOfView The value to used as field of view.
   * @returns {void}
   */
  setLightView(fieldOfView: number): void {
    (this.light as DirectionalLight).shadow.camera.left = fieldOfView * -1;
    (this.light as DirectionalLight).shadow.camera.bottom = fieldOfView * -1;
    (this.light as DirectionalLight).shadow.camera.right = fieldOfView;
    (this.light as DirectionalLight).shadow.camera.top = fieldOfView;
  }

  /**
   * Sets the size used by light shadow map.
   *
   * Higher values give better quality shadows at the cost of computation time.
   *
   * @param {number} width The width of the shadow map.
   * @param {number} height The height of the shadow map.
   */
  setMapSize(width: number, height: number): void {
    this.light.shadow.mapSize.width = width;
    this.light.shadow.mapSize.height = height;
  }

  /**
   * Returns the light object representation.
   *
   * @returns {DirectionalLight} The light representation.
   */
  getResult(): DirectionalLight {
    const result = this.light;

    this.reset();

    return result as DirectionalLight;
  }

  /**
   * Resets the light properties.
   *
   * @returns {void}
   */
  reset(): void {
    this.light = new DirectionalLight();
  }
}
