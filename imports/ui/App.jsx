import React from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { ThanksCollection } from '../api/ThanksCollection';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { WIDTH, HEIGHT, RADII, OFFSET, CTIME, NUMPOINTS, NDIFF } from './globals';
import { Shape } from './shape';

const shapes = new Map();
export const App = () => {
  
  const loading = useSubscribe("thanks");
  const thanks = useTracker(() => 
    ThanksCollection.find({timestamp:{$lte:new Date(), $gte: new Date( Date.now() - 1000 * 60 * 30)}}).fetch()
  );
  console.log(thanks);

  function clearShapes() {
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


  function sketch(p5) {
    function updateCenter(shape) {
      let noiseLevel = 200;

      // Scale the input coordinate.
      let nt = p5.frameCount * shape.noiseFrame;

      let noisex = p5.noise(nt);
      let noisey = p5.noise(nt);

      // Compute the noise values.
      shape.updateCenter(noiseLevel, noisex, noisey);
    }
    p5.setup = () => p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(256);
      p5.noStroke();

      thanks.map((message) => {
        const objkey = message._id._str;
        if (!shapes.has(objkey)) {
          /* make a new shape */
          const radius = RADII + Math.random()*OFFSET - OFFSET/2;
          const points = NUMPOINTS + Math.floor(Math.random()*NDIFF - NDIFF/2);
          shapes.set(objkey, new Shape(objkey, radius, points));
        }

        /* draw shape for message */
        const s = shapes.get(objkey);
        const elapsed = Date.now() - s.time.getTime();
        const color = s.updateColor();
        p5.fill(color);
        
        p5.beginShape();
        s.pointArray.map((point) => {
          p5.curveVertex(point[0], point[1]);
        });
        p5.endShape();
      });

      shapes.forEach((shape, key) => {
        shape.radius = shape.start_radius + shape.max_r * p5.sin(shape.theta);
        shape.theta += .02;
        shape.pointArray = shape.makePoints();
        updateCenter(shape);
      })

      clearShapes();
    };
    
    console.log("done drawing");
  }

  return (
    <div>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
