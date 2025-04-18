import { WIDTH,HEIGHT,COLORS,CTIME } from "./globals"
export class Shape {
    constructor(objkey, radius, numpoints) {
        this.key = objkey;
        this.time = new Date();
        this.x = Math.random()*WIDTH - WIDTH / 2;
        this.y = Math.random()*HEIGHT - HEIGHT / 2;
        this.start_radius = radius;
        this.radius = radius;
        this.max_r = radius * 0.15;
        this.theta = 0;
        this.color_palette = COLORS[Math.floor(Math.random()*COLORS.length)];
        this.color = '#' + this.color_palette[0];
        this.numpoints = numpoints;
        console.log(this.numpoints);
        this.offArray = this.makeRadii();
        this.pointArray = this.makePoints();
        this.direction;
    }

    makeRadii() {
      let offArray = [];
      let x_off;
      let y_off;
      let scale = 1.5;
      for (let i = 0; i < this.numpoints; i++) {
        for (let j = 0; j < 4; j++) {
          if (j == 0) {
            x_off = Math.random()*scale;
            y_off = Math.random()*scale;
          } else if (j == 1) {
            x_off = Math.random()*scale + scale;
            y_off = Math.random()*scale + scale;
          } else if (j == 2) {
            x_off = Math.random()*scale;
            y_off = Math.random()*scale;
          } else {
            x_off = -Math.random()*scale - scale;
            y_off = -Math.random()*scale - scale;
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
        const color_index = Math.min(this.color_palette.length - 1, Math.floor((Date.now() - this.time.getTime()) / CTIME));
        this.color = "#" + this.color_palette[color_index];
        return this.color
    };
}