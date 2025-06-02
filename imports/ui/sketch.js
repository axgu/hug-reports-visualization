import { shapes, clearShapes } from "./shapes";
import { WIDTH, HEIGHT, RADII, OFFSET, NUMPOINTS, NDIFF } from "./globals";
export const sketch = (p5) => {
    p5.setup = () => p5.createCanvas(WIDTH, HEIGHT, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(256);
      p5.noStroke();
    

      shapes.forEach((s) => {
        if (s.p5 === null) {
          const radius = RADII + p5.random(OFFSET) - OFFSET/2;
          const points = NUMPOINTS + Math.floor(p5.random(NDIFF) - NDIFF/2);
          s.initShape(p5, radius, points);
        } 
        p5.fill(p5.color(s.color));
        
        p5.beginShape();
        s.pointArray.map((point) => {
          p5.curveVertex(point[0], point[1]);
        });
        p5.endShape();
    
        s.radius = s.start_radius + s.max_r * p5.sin(s.theta);
        s.theta += .02;
        s.pointArray = s.makePoints();
        s.updateColor();
        s.updateCenter();
      });

      clearShapes();
    };
    
    console.log("done drawing");
  }