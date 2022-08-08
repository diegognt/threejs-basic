import {Mesh, MeshPhongMaterial, PlaneGeometry} from 'three';
import {assertShapeConstructorBuilder} from '../helpers/builder-test';
import {BasicPlaneBuilder} from '../../../src/builders/shapes/basic-plane-builder';

jest.mock('three');
let builder: BasicPlaneBuilder;

describe('The BasicPlaneBuilder class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('The constructor', () => {
    it('should called the `reset` method.', () => {
      // Prepare
      const spy = jest.spyOn(BasicPlaneBuilder.prototype, 'reset');

      // Act
      builder = new BasicPlaneBuilder();

      // Assert
      assertShapeConstructorBuilder(builder, spy);
    });
  });

  describe('The `createGeometry` method', () => {
    beforeEach(() => {
      builder = new BasicPlaneBuilder();
    });

    it('should be able to create a geometry using the `PlaneGeometry` class.', () => {
      // Act
      builder.createGeometry(2, 2);

      // Assert
      expect(PlaneGeometry).toHaveBeenCalledWith(2, 2);
    });
  });

  describe('The `setMatrial` method', () => {
    beforeEach(() => {
      builder = new BasicPlaneBuilder();
    });

    it('should be able to set material using the `MeshPhongMaterial` class.', () => {
      // Prepare
      const options = {color: 'rbg(255, 255, 255)'};

      // Act
      builder.setMaterial(options);

      // Assert
      expect(MeshPhongMaterial).toHaveBeenCalledWith(options);
    });
  });

  describe('the `createMesh method`', () => {
    beforeEach(() => {
      builder = new BasicPlaneBuilder();
    });

    it('should create a Mesh after the geometry have been created and the material have been setted.', () => {
      // Act
      builder.createGeometry(2, 2);
      builder.setMaterial({color: 'rgb(255, 255, 255)'});
      builder.createMesh();

      //Assert
      expect(Mesh).toHaveBeenCalled();
    });

    it('should throw an Error when tries to create a Mesh without having created a Geometry.', () => {
      // Prepare
      builder.setMaterial({color: 'rgb(255, 255, 255)'});

      // Act
      const act = () => builder.createMesh();

      // Assert
      expect(act).toThrowError();
    });

    it('should throw an Error when tries to create a Mesh without having setted a Material', () => {
      // Prepare
      builder.createGeometry(2, 2);

      // Act
      const act = () => builder.createMesh();

      // Assert
      expect(act).toThrowError();
    });
  });

  describe('the `getResult` method', () => {
    beforeEach(() => {
      builder = new BasicPlaneBuilder();
    });

    it('should return a Mesh representing a Basic Plane.', () => {
      // Prepare
      builder.createGeometry(2, 2);
      builder.setMaterial({});
      builder.createMesh();

      // Act
      const result = builder.getResult();

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Mesh);
    });

    it('should call the `reset` method after delivered a result.', () => {
      // Prepare
      const spy = jest.spyOn(BasicPlaneBuilder.prototype, 'reset');

      builder.createGeometry(2, 2);
      builder.setMaterial({});
      builder.createMesh();

      // Act
      const act = () => builder.getResult();

      //Assert
      expect(act).not.toThrowError();
      expect(spy).toHaveBeenCalled();
    });

    it('should throw and Error if there is no Mesh created.', () => {
      //Act
      const act = () => builder.getResult();

      //Assert
      expect(act).toThrowError();
    });
  });
});
