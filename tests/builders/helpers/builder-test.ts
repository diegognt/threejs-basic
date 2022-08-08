import {LightBuilder} from '../../../src/builders/lights/base-light';
import {ShapeBuilder} from '../../../src/builders/shapes/base-shape';

export const assertShapeConstructorBuilder = (
  builder: ShapeBuilder | LightBuilder,
  spy: jest.SpyInstance
) => {
  expect(builder).toBeDefined();
  expect(spy).toHaveReturnedTimes(1);
};
