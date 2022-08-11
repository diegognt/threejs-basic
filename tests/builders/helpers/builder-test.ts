import {ShapeBuilder} from '../../../src/builders/shapes/base-shape';
import {LightBuilder} from '../../../src/builders/lights/base-light';

type Builders = ShapeBuilder | LightBuilder;

export function assertConstructorBuilder<T extends Builders>(
  builder: T,
  spy: jest.SpyInstance
): void {
  expect(builder).toBeDefined();
  expect(spy).toHaveReturnedTimes(1);
}
