import { WIDTH,HEIGHT,COLORS,CTIME } from "./globals"
export class Shape {
    constructor(objkey) {
        this.key = objkey;
        this.time = new Date();
        this.x = Math.random()*WIDTH - WIDTH / 2;
        this.y = Math.random()*HEIGHT - HEIGHT / 2;
        this.start_radius = 20;
        this.radius = 10;
        this.max_r = 3;
        this.theta = 0;
        this.color_palette = COLORS[Math.floor(Math.random()*COLORS.length)];
        this.color = '#' + this.color_palette[0];
        this.numpoints = 6;
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
      offArray.push(offArray[0]);
      console.log(offArray);
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
          pointArray.push([new_x, new_y])
        }
      }
      
      const x_off = this.offArray[24][0];
      const y_off = this.offArray[24][1];
      const x_rad = this.radius + x_off;
      const y_rad = this.radius + y_off;
      const new_x = this.x + x_rad * Math.cos(0);
      const new_y = this.y + y_rad * Math.sin(0);
      pointArray.push([new_x, new_y])
      
      return pointArray;
    }
    
    makeShape1() {
      const numpoints = 10;
      let pointArray = [];
      let x_rad= -1;
      let y_rad= -1;
      let offset = 1
      for (let i = 0; i < numpoints; i++) {
        for (let j = 0; j < 4; j++) {
          const radians = 2* (i*4+j) * Math.PI / (numpoints * 4);
          console.log(i*4+j);
          if (j == 0) {
            if (x_rad < 0) {
              x_rad = this.radius;
              y_rad = this.radius;
            } else {
              x_rad = x_rad + Math.random()*2+offset;
              y_rad = y_rad + Math.random()*2+offset;
            }
          } else if (j == 1) {
            x_rad = x_rad + Math.random()*2+offset - 2;
            y_rad = y_rad + Math.random()*2+offset - 2;
          } else if (j == 2) {
            x_rad = x_rad - Math.random()*2-offset;
            y_rad = y_rad - Math.random()*2-offset;
          } else {
            x_rad = x_rad - Math.random()*2 - offset;
            y_rad = y_rad - Math.random()*2 - offset;
          }
          const new_x = this.x + x_rad * Math.cos(radians);
          const new_y = this.y + y_rad * Math.sin(radians);
          pointArray.push([new_x, new_y]);
        }
      }
      const new_x = this.x + this.radius * Math.cos(0);
      const new_y = this.y + this.radius * Math.sin(0);
      pointArray.push([new_x, new_y]);
      console.log(pointArray);
      return pointArray;
    }

    makeShape() {
        const numpoints = 30;
        let pointArray = [];
        for (let i = 0; i < numpoints; i ++) {
          const radians = i * Math.PI / (numpoints / 2);
          const new_x = this.x + (this.radius + (Math.random()*4 - 2)) * Math.cos(radians);
          const new_y = this.y + (this.radius + (Math.random()*4 - 2)) * Math.sin(radians);
          pointArray.push([new_x, new_y]);
        }
        return pointArray;
      };
    updateColor() {
        const color_index = Math.min(this.color_palette.length - 1, Math.floor((Date.now() - this.time.getTime()) / CTIME));
        this.color = "#" + this.color_palette[color_index];
        return this.color
    };
}