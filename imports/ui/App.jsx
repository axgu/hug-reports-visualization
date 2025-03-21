import React from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { ThanksCollection } from '../api/ThanksCollection';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { WIDTH, HEIGHT, CTIME } from './globals';
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
    p5.setup = () => p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(256);
      p5.noStroke();

      thanks.map((message) => {
        const objkey = message._id._str;
        if (!shapes.has(objkey)) {
          shapes.set(objkey, new Shape(objkey));
        }
        const s = shapes.get(objkey);
        const elapsed = Date.now() - s.time.getTime();
        const color = s.updateColor();
        p5.fill(color);
        /* p5.circle(s.x, s.y, s.radius*(1+elapsed / (1000 * 60 * 10))); */
        p5.beginShape();
        s.pointArray.map((point) => {
          p5.curveVertex(point[0], point[1]);
        });
        p5.endShape();
      });
      


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
