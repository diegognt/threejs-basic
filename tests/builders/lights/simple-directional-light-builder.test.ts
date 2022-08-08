import {Color, DirectionalLight} from 'three';
import {SimpleDirectionalLightBuilder} from '../../../src/builders/lights/simple-directional-light-builder';

jest.mock('three', () => {
  const actualThree = jest.requireActual('three');

  return {
    ...actualThree,
    Color: jest.fn(),
  };
});

describe('The SimpleDirectionalLightBuilder', () => {
  let builder: SimpleDirectionalLightBuilder;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('the constructor', () => {
    it('should call the `reset` method.', () => {
      // Prepare
      const spy = jest.spyOn(SimpleDirectionalLightBuilder.prototype, 'reset');

      // Act
      const act = () => new SimpleDirectionalLightBuilder();

      // Assert
      expect(act).not.toThrowError();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('the `setColor` method', () => {
    beforeEach(() => {
      builder = new SimpleDirectionalLightBuilder();
    });

    it('should assing the color using an instance of the THREE `Color` class.', () => {
      // Prepare
      const color = 'rgb(130, 130, 130)';

      // Act
      builder.setColor(color);

      // Assert
      expect(Color).toHaveBeenCalledWith(color);
    });
  });

  describe('the `getResult` method', () => {
    beforeEach(() => {
      builder = new SimpleDirectionalLightBuilder();
    });

    it('should have called the `reset` method', () => {
      // Prepare
      const spy = jest.spyOn(SimpleDirectionalLightBuilder.prototype, 'reset');

      // Act
      const act = () => builder.getResult();

      // Assert
      expect(act).not.toThrowError();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('the result', () => {
    beforeEach(() => {
      builder = new SimpleDirectionalLightBuilder();
    });

    it('should be an instance of the `DirectionalLight` class.', () => {
      // Act
      const result = builder.getResult();

      //Assert
      expect(result).toBeInstanceOf(DirectionalLight);
    });

    it('should have a defined intensity for the light.', () => {
      // Prepare
      builder.setIntensity(3);

      // Act
      const result = builder.getResult();

      //Assert
      expect(result).toHaveProperty('intensity', 3);
    });

    it('should be able to cast shadow.', () => {
      // Prepare
      builder.allowsToCastShadow();

      //Act
      const result = builder.getResult();

      //Assert
      expect(result).toHaveProperty('castShadow', true);
    });

    it('should be able to set the light view of the world.', () => {
      // Prepare
      const lightView = 3;

      builder.setLightView(lightView);

      //Act
      const result = builder.getResult();

      // Assert
      expect(result).toHaveProperty('shadow.camera.left', lightView * -1);
      expect(result).toHaveProperty('shadow.camera.bottom', lightView * -1);
      expect(result).toHaveProperty('shadow.camera.right', lightView);
      expect(result).toHaveProperty('shadow.camera.top', lightView);
    });

    it('should be able to set the map size of its shadow', () => {
      // Prepare
      const shadowMapSizeWidth = 1500;
      const shadowMapSizeHeight = 1800;

      builder.setMapSize(shadowMapSizeWidth, shadowMapSizeHeight);

      // Act
      const result = builder.getResult();

      // Assert
      expect(result).toHaveProperty('shadow.mapSize.width', shadowMapSizeWidth);
      expect(result).toHaveProperty(
        'shadow.mapSize.height',
        shadowMapSizeHeight
      );
    });
  });

  describe('the `reset` method', () => {
    it('should set the default values to the light properties', () => {
      // Prepare
      const builder = new SimpleDirectionalLightBuilder();

      builder.setColor('rgb(130, 130, 130)');
      builder.setIntensity(3);

      let result = builder.getResult();

      // Act
      result = builder.getResult();

      // Assert
      expect(result).toHaveProperty('intensity', 1);
      expect(result.color.getHexString()).toBe('ffffff');
    });
  });
});
