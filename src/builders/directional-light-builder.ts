import {Color, DirectionalLight} from 'three';
import {DirectionalLightBuilder} from './base';

/**
 * A concrete implementation of a DirectionalLight builder used to create
 * an object that Directional Light.
 *
 * @implements DirectionalLightBuilder
 */
export class BasicDirectionalLightBuilder implements DirectionalLightBuilder {
  private light!: DirectionalLight;

  /**
   * Creates an instance of the BasicDirectionalLightBuilder
   */
  constructor() {
    this.reset();
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
   * Sets the light intensity.
   *
   * @param {number} intensity The intensity as numerical value.
   * @returns {void}
   */
  setIntensity(intensity: number): void {
    this.light.intensity = intensity;
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
    this.light.shadow.camera.left = fieldOfView * -1;
    this.light.shadow.camera.bottom = fieldOfView * -1;
    this.light.shadow.camera.right = fieldOfView;
    this.light.shadow.camera.top = fieldOfView;
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
   * Returns the directional light object representation.
   *
   * @returns {DirectionalLight} The directional light representation.
   */
  getResult(): DirectionalLight {
    const result = this.light;

    this.reset();

    return result;
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
