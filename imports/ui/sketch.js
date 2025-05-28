import { shapes, clearShapes } from "./shapes";
import { WIDTH, HEIGHT } from "./globals";
export const sketch = (p5) => {
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
      shapes.forEach((s) => {
        s.updateColor();
        p5.fill(p5.color(s.color));
        
        p5.beginShape();
        s.pointArray.map((point) => {
          p5.curveVertex(point[0], point[1]);
        });
        p5.endShape();
    
        s.radius = s.start_radius + s.max_r * p5.sin(s.theta);
        s.theta += .02;
        s.pointArray = s.makePoints();
        updateCenter(s);
      });

      clearShapes();
    };
    
    console.log("done drawing");
  }