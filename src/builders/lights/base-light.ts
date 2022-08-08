import {Light, Mesh} from 'three';

/**
 * An interface specifiying the methods for creating different light
 * builders.
 */
export interface LightBuilder {
  setIntensity(intensity: number): void;
  getResult(): Light;
}

/**
 * An interface specifiying the methods for creating different Ambient light
 * builders.
 *
 * @extends LightBuilder
 */
export interface AmbientLightBuilder extends LightBuilder {
  reset(): void;
}

/**
 * An interface specifiying the methods for creating different Directional
 * light builders.
 *
 * @extends LightBuilder
 */
export interface DirectionalLightBuilder extends LightBuilder {
  setColor(colo: string): void;
  allowsToCastShadow(): void;
  setLightView(fieldOfView: number): void;
  setMapSize(width: number, height: number): void;
  addLightSource(source: Mesh): void;
  reset(): void;
}

/**
 * An abstract class with the implementations of the common methods for all the
 * Light builders.
 *
 * @implements LightBuilder
 */
export abstract class AbstractLightBuilder implements LightBuilder {
  protected light!: Light;

  constructor() {
    this.reset();
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
   * Returns the light object representation.
   *
   * @returns {Light} The light representation.
   */
  getResult(): Light {
    const result = this.light;

    this.reset();

    return result;
  }

  /**
   * Resets the light properties.
   *
   * @returns {void}
   */
  protected reset(): void {
    throw new Error('The reset method needs to be implemented.');
  }
}
