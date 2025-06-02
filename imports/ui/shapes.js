import { RADII, NUMPOINTS, NDIFF, OFFSET } from "./globals";
import { Shape } from './shape';

export const shapes = new Map();

export const clearShapes = () => {
  for (const shape of shapes.values()) {
    const elapsed = Math.abs(Date.now() - shape.time.getTime());
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (elapsed > oneDayInMs) {
      shapes.delete(shape.key);
    } else {
      break;
    }
  }
};

export const updateShapes = (objkey) => {
    if (!shapes.has(objkey)) {
        shapes.set(objkey, new Shape(objkey));
    }
};