import {BasicBoxBuilder} from '../../../src/builders/shapes/basic-box-builder';
import {BoxGeometry, Mesh, MeshPhongMaterial} from 'three';
import {assertShapeConstructorBuilder} from '../helpers/builder-test';

jest.mock('three');

describe('The BasicBoxBuilder class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('The constructor should reset the private variables', () => {
    const spy = jest.spyOn(BasicBoxBuilder.prototype, 'reset');

    // Atc
    const builder = new BasicBoxBuilder();

    //Assert
    assertShapeConstructorBuilder(builder, spy);
  });

  it('should be able to create the box Geometry', () => {
    // Prepare
    const builder = new BasicBoxBuilder();

    // Act
    builder.createGeometry(1, 1, 1);

    // Assert
    expect(BoxGeometry).toHaveBeenCalledWith(1, 1, 1);
  });

  it('should be able to set the box material', () => {
    // Prepare
    const builder = new BasicBoxBuilder();

    // Act
    builder.setMaterial({color: 'rgb(120, 120, 120)'});

    // Assert
    expect(MeshPhongMaterial).toHaveBeenCalledWith({
      color: 'rgb(120, 120, 120)',
    });
  });

  it('should be able to create the box mesh', () => {
    // Prepare
    const builder = new BasicBoxBuilder();

    //Act
    builder.createGeometry(1, 1, 1);
    builder.setMaterial({color: 'rgb(255, 255, 255)'});
    builder.createMesh();

    // Assert
    expect(Mesh).toHaveBeenCalled();
  });

  it('should throw an error when create the box mesh without a geometry', () => {
    // Prepare
    const builder = new BasicBoxBuilder();
    builder.setMaterial({color: 'rgb(100, 100, 100)'});

    //Act
    const act = () => builder.createMesh();

    // Assert
    expect(act).toThrowError();
  });

  it('should throw and error when create the box mesh without a material', () => {
    // Prepare
    const builder = new BasicBoxBuilder();
    builder.createGeometry(1, 1, 1);

    // Act
    const act = () => builder.createMesh();

    // Assert
    expect(act).toThrowError();
  });

  it('should throw and error gettting a result without a mesh', () => {
    const builder = new BasicBoxBuilder();
    const act = () => builder.getResult();

    expect(act).toThrowError();
  });

  it('should return a mesh representing a Basic Box', () => {
    // Prepare
    const builder = new BasicBoxBuilder();

    // Act
    builder.createGeometry(1, 1, 1);
    builder.setMaterial({color: 'rgb(255, 255, 255)'});
    builder.createMesh();
    const result = builder.getResult();

    //Assert
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Mesh);
  });

  it('should call the `reset` method after delivered the result', () => {
    // Prepare
    const spy = jest.spyOn(BasicBoxBuilder.prototype, 'reset');
    const builder = new BasicBoxBuilder();

    // Act
    builder.createGeometry(1, 1, 1);
    builder.setMaterial({color: 'rgb(255, 255, 255)'});
    builder.createMesh();
    const result = builder.getResult();

    //Assert
    expect(result).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
