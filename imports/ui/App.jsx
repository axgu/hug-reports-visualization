import React from 'react';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { ThanksCollection } from '../api/ThanksCollection';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useEffect, useState } from 'react';
import { sketch } from './sketch';
import { shapes, updateShapes } from './shapes';

export const App = () => {
  
  const loading = useSubscribe("thanks");
  const thanks = useTracker(() => {
    const oneHourAgo = new Date().getTime() - 60 * 60 * 1000;
    return ThanksCollection.find().fetch().filter(msg => {
      const msgTimestamp = new Date(msg.timestamp).getTime();
      return msgTimestamp > oneHourAgo;
    });
  });
  
  useEffect(() => {
    thanks.forEach((message) => {
      const objkey = message._id._str;
      updateShapes(objkey);
    });
  }, [thanks]);

  return (
    <div>
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
};
