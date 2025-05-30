import { WIDTH,HEIGHT,COLORS,CTIME,CSPEED,SCALE } from "./globals"
export class Shape {
    constructor(objkey, radius, numpoints) {
        this.key = objkey;
        this.time = new Date();
        this.noiseFrame = (Math.random()*16-8)/1000;
        this.x = Math.random()*WIDTH - WIDTH / 2;
        this.y = Math.random()*HEIGHT - HEIGHT / 2;
        this.orig_x = this.x;
        this.orig_y = this.y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.start_radius = radius;
        this.radius = radius;
        this.max_r = radius * 0.15;
        this.theta = 0;
        this.color_palette = COLORS[Math.floor(Math.random()*COLORS.length)];
        this.color_change = 0.0;
        this.color_idx = 0
        this.color = this.color_palette[this.color_idx];
        this.numpoints = numpoints;
        this.offArray = this.makeRadii();
        this.pointArray = this.makePoints();
    }

    makeRadii() {
      let offArray = [];
      let x_off;
      let y_off;
      for (let i = 0; i < this.numpoints; i++) {
        for (let j = 0; j < 4; j++) {
          if (j == 0) {
            x_off = Math.random()*SCALE;
            y_off = Math.random()*SCALE;
          } else if (j == 1) {
            x_off = Math.random()*SCALE + SCALE;
            y_off = Math.random()*SCALE + SCALE;
          } else if (j == 2) {
            x_off = Math.random()*SCALE;
            y_off = Math.random()*SCALE;
          } else {
            x_off = -Math.random()*SCALE - SCALE;
            y_off = -Math.random()*SCALE - SCALE;
          }
          offArray.push([x_off, y_off]);
        }
      }
      // repeat first three points of shape for curveVertex
      for (let i = 0; i < 3; i++) {
        offArray.push(offArray[i]);
      }
      return offArray;
    }

    makePoints() {
      let pointArray = [];
      for (let i = 0; i < this.numpoints; i++) {
        for (let j = 0; j < 4; j++) {
          const radians = 2* (i*4+j) * Math.PI / (this.numpoints * 4);
          const x_off = this.offArray[4*i + j][0];
          const y_off = this.offArray[4*i + j][1];
          const x_rad = this.radius + x_off;
          const y_rad = this.radius + y_off;
          
          const new_x = this.x + x_rad * Math.cos(radians);
          const new_y = this.y + y_rad * Math.sin(radians);
          pointArray.push([new_x, new_y]);
        }
      }
      // repeat first three points of shape for curveVertex
      for (let i = 0; i < 3; i++) {
        pointArray.push(pointArray[i]);
      }
      return pointArray;
    }
    
    updateColor() {
      if (this.color_idx < this.color_palette.length - 1) {
        const [r1, g1, b1] = this.color_palette[this.color_idx];
        const [r2, g2, b2] = this.color_palette[this.color_idx + 1];

        const r = r1 + (r2 - r1) * this.color_change;
        const g = g1 + (g2 - g1) * this.color_change;
        const b = b1 + (b2 - b1) * this.color_change;

        this.color = [r, g, b];

        this.color_change += CSPEED;
        if (this.color_change >= 1) {
          this.color_change = 0;
          this.color_idx++;
        }
      }
    };

    updateCenter(noiseLevel, noisex, noisey) {
      const proposedX = this.orig_x + noiseLevel * noisex;
      const proposedY = this.orig_y + noiseLevel * noisey;
    
      const maxOffset = this.radius + 2 * SCALE;
    
      const halfWidth = WIDTH / 2;
      const halfHeight = HEIGHT / 2;
    
      this.x = Math.min(halfWidth - maxOffset, Math.max(-halfWidth + maxOffset, proposedX));
      this.y = Math.min(halfHeight - maxOffset, Math.max(-halfHeight + maxOffset, proposedY));
    };
}