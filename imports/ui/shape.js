import { WIDTH,HEIGHT,COLORS,CTIME } from "./globals"
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
        this.color = '#' + this.color_palette[0];
        this.numpoints = numpoints;
        this.offArray = this.makeRadii();
        this.pointArray = this.makePoints();
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
        
          /*
          const centerX = this.orig_x + (this.offsetX || 0);
          const centerY = this.orig_y + (this.offsetY || 0);
          const new_x = centerX + x_rad * Math.cos(radians);
          const new_y = centerY + y_rad * Math.sin(radians);
          */
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
    
    /*
    updateCenter(noiseLevel, noisex, noisey) {
      this.offsetX = noiseLevel * noisex;
      this.offsetY = noiseLevel * noisey;
    }
    */

    
    updateCenter(noiseLevel, noisex, noisey) {
      this.x = this.orig_x + noiseLevel * noisex;
      this.y = this.orig_y + noiseLevel * noisey;
    }
}