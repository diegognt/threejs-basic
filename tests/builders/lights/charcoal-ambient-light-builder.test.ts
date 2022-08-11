import {AmbientLight} from 'three';
import {assertConstructorBuilder} from '../helpers/builder-test';
import {CharcoalAmbienLightBuilder} from '../../../src/builders/lights/charcoal-ambient-light-builder';

jest.mock('three');
let builder: CharcoalAmbienLightBuilder;

describe('The CharcoalAmbienLightBuilder class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('the constructor', () => {
    it('The constructor should reset the private variables', () => {
      const spy = jest.spyOn(CharcoalAmbienLightBuilder.prototype, 'reset');

      // Atc
      builder = new CharcoalAmbienLightBuilder();

      //Assert
      assertConstructorBuilder(builder, spy);
    });
  });

  describe('the `reset` method', () => {
    beforeEach(() => {
      builder = new CharcoalAmbienLightBuilder();
    });

    it('should call the `AmbientLight` constructor with `rgb(54,69,79)` string as argument', () => {
      // Act
      builder.reset();

      // Assert
      expect(AmbientLight).toHaveBeenCalledWith('rgb(54,69,79)');
    });
  });

  describe('the `getResult` method', () => {
    beforeEach(() => {
      builder = new CharcoalAmbienLightBuilder();
    });

    it('should call the `reset` method.', () => {
      // Prepare
      const spy = jest.spyOn(CharcoalAmbienLightBuilder.prototype, 'reset');

      //Act
      const act = () => builder.getResult();

      // Assert
      expect(act).not.toThrowError();
      expect(spy).toHaveBeenCalled();
    });
  });
});
