import {Mesh, MeshBasicMaterial, SphereGeometry} from 'three';
import {assertShapeConstructorBuilder} from '../helpers/builder-test';
import {SphereBuilder} from './base';
import {LightBulbSphereBuilder} from './light-bulb-sphere-builder';

jest.mock('three');
let builder: SphereBuilder;

describe('The LightSphere class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('The constructor', () => {
    it('should reset their properties', () => {
      // Prepare
      const spy = jest.spyOn(LightBulbSphereBuilder.prototype, 'reset');

      //Act
      builder = new LightBulbSphereBuilder();

      //Assert
      assertShapeConstructorBuilder(builder, spy);
    });
  });

  describe('The `createGeomtry` method', () => {
    beforeEach(() => {
      builder = new LightBulbSphereBuilder();
    });

    it('should be able to create a sphere geometry using the `SphereGeometry` class.', () => {
      //Act
      builder.createGeometry();

      // Assert
      expect(SphereGeometry).toHaveBeenCalledWith(0.05, 24, 24);
    });
  });

  describe('The `setMaterial` method', () => {
    beforeEach(() => {
      builder = new LightBulbSphereBuilder();
    });

    it('should be able to set a a material using the `MeshBasicMaterial` class.', () => {
      // Prepare
      const options = {color: 'rgb(255, 255, 255)'};

      //Act
      builder.setMaterial(options);

      // Assert
      expect(MeshBasicMaterial).toHaveBeenCalledWith(options);
    });
  });

  describe('the `createMesh` method', () => {
    beforeEach(() => {
      builder = new LightBulbSphereBuilder();
    });

    it('should be able to create a mesh after create a geometry a set a material using the `Mesh` class.', () => {
      //Act
      builder.createGeometry();
      builder.setMaterial({color: 'rgb(255, 255, 255)'});
      builder.createMesh();

      // Assert
      expect(Mesh).toHaveBeenCalled();
    });

    it('should throw an Error when tries to create a mesh without having created a geometry.', () => {
      // Prepare
      builder.setMaterial({color: 'rgb(255, 255, 255)'});

      // Act
      const act = () => builder.createMesh();

      //Assert
      expect(act).toThrowError();
    });

    it('should throw an Error when tries to create a Mesh without having setted a Material.t', () => {
      // Prepare
      builder.createGeometry();

      // Act
      const act = () => builder.createMesh();

      // Assert
      expect(act).toThrowError();
    });
  });

  describe('The `getResult` method', () => {
    beforeEach(() => {
      builder = new LightBulbSphereBuilder();
    });

    it('should return a mesh representing a light sphere.', () => {
      // Prepare
      builder.createGeometry();
      builder.setMaterial({});
      builder.createMesh();

      //Act
      const result = builder.getResult();

      //Assert
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Mesh);
    });

    it('should call the `reset` method after delivered a result.', () => {
      // Prepare
      const spy = jest.spyOn(LightBulbSphereBuilder.prototype, 'reset');

      builder.createGeometry();
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
