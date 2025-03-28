import { WIDTH,HEIGHT,COLORS,CTIME } from "./globals"
export class Shape {
    constructor(objkey) {
        this.key = objkey;
        this.time = new Date();
        this.x = Math.random()*WIDTH - WIDTH / 2;
        this.y = Math.random()*HEIGHT - HEIGHT / 2;
        this.radius = 20;
        this.color_palette = COLORS[Math.floor(Math.random()*COLORS.length)];
        this.color = '#' + this.color_palette[0];
        this.pointArray = this.makeShape2();
        this.direction;
    }

    makeShape2() {
      const numpoints = 6;
      let pointArray = [];
      let x_rad;
      let y_rad;
      let scale = 1.5;
      for (let i = 0; i < numpoints; i++) {
        for (let j = 0; j < 4; j++) {
          const radians = 2* (i*4+j) * Math.PI / (numpoints * 4);
          console.log(i*4+j);
          if (j == 0) {
            x_rad = this.radius + Math.random()*scale;
            y_rad = this.radius + Math.random()*scale;
          } else if (j == 1) {
            x_rad = this.radius + Math.random()*scale + scale;
            y_rad = this.radius + Math.random()*scale + scale;
          } else if (j == 2) {
            x_rad = this.radius + Math.random()*scale;
            y_rad = this.radius + Math.random()*scale;
          } else {
            x_rad = this.radius - Math.random()*scale - scale;
            y_rad = this.radius - Math.random()*scale - scale;
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