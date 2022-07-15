import {ShapeBuilder} from '../builders/base';

export const assertShapeConstructorBuilder = (
  builder: ShapeBuilder,
  spy: jest.SpyInstance
) => {
  expect(builder).toBeDefined();
  expect(spy).toHaveReturnedTimes(1);
};
