import React from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { ThanksCollection } from '../api/ThanksCollection';
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

  p5.draw = () => {
    p5.background(250);
    p5.normalMaterial();
    p5.push();
    p5.rotateZ(p5.frameCount * 0.01);
    p5.rotateX(p5.frameCount * 0.01);
    p5.rotateY(p5.frameCount * 0.01);
    p5.plane(100);
    p5.pop();
  };
}

export const App = () => {
  
  const loading = useSubscribe("thanks");
  const thanks = useTracker(() => {
    const handle = Meteor.subscribe("thanks");
    console.log(ThanksCollection.find().fetch());
    ThanksCollection.find().fetch()
  });

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
