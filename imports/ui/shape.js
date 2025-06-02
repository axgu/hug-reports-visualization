import { WIDTH,HEIGHT,COLORS,CSPEED,SCALE } from "./globals"
export class Shape {

    constructor(objkey) {
        this.p5 = null;
        this.key = objkey;
        this.time = new Date();
        this.noiseFrame = 0;
        this.x = 0;
        this.y = 0;
        this.base = null;
        this.pos = null;
        this.nt = 0;
        this.wobbleAmp = 5;
        // this.orig_x = this.x;
        // this.orig_y = this.y;
        this.start_radius = 0;
        this.radius = 0;
        this.max_r = 0;
        this.theta = 0;
        this.color_palette = COLORS[Math.floor(Math.random()*COLORS.length)];
        this.color_change = 0.0;
        this.color_idx = 0
        this.color = this.color_palette[this.color_idx];
        this.numpoints = 0;
        this.offArray = [];
        this.pointArray = [];
    }
    initShape(p5, radius, numpoints) {
        this.p5 = p5;
        this.noiseFrame = (p5.random()*16-8)/1000;
        this.x = p5.random(WIDTH) - WIDTH / 2;
        this.y = p5.random(HEIGHT) - HEIGHT / 2;
        this.base = p5.createVector(this.x, this.y);
        this.pos = p5.createVector(this.x, this.y);
        this.nt = p5.random(1000);
        // this.orig_x = this.x;
        // this.orig_y = this.y;
        this.start_radius = radius;
        this.radius = radius;
        this.max_r = radius * 0.15;
        this.theta = 0;
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

          const new_x = this.pos.x + x_rad * Math.cos(radians);
          const new_y = this.pos.y + y_rad * Math.sin(radians);
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
    }

    updateCenter() {
      this.nt += 0.002;
      const noisex = (this.p5.noise(this.nt) - 0.5) * 2;
      const noisey = (this.p5.noise(this.nt + 500) - 0.5) * 2;
      this.base.x += noisex;
      this.base.y += noisey;

      const halfWidth = WIDTH / 2;
      const halfHeight = HEIGHT / 2;

      this.base.x = this.p5.constrain(this.base.x, -halfWidth, halfWidth);
      this.base.y = this.p5.constrain(this.base.y, -halfHeight, halfHeight);
      

      let wobbleX = this.p5.sin(this.nt * 10) * this.wobbleAmp;
      let wobbleY = this.p5.cos(this.nt * 8) * this.wobbleAmp;

      
      this.pos.x = this.base.x + wobbleX;
      this.pos.y = this.base.y + wobbleY;
    };
}