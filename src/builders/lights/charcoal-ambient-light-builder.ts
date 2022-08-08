import {AmbientLight} from 'three';
import {AbstractLightBuilder, AmbientLightBuilder} from './base-light';

export class CharcoalAmbienLightBuilder
  extends AbstractLightBuilder
  implements AmbientLightBuilder
{
  constructor() {
    super();
  }

  /**
   * Returns the light object representation.
   *
   * @returns {Light} The light representation.
   */
  getResult(): AmbientLight {
    const result = this.light;

    this.reset();

    return result as AmbientLight;
  }
  /**
   * Resets the light properties.
   *
   * @returns {void}
   */
  reset(): void {
    this.light = new AmbientLight('rgb(54,69,79)');
  }
}
