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
        this.pointArray = this.makeShape();
        this.direction;
    }

    makeShape() {
        const numpoints = 20;
        let pointArray = [];
        for (let i = 0; i < numpoints; i ++) {
          const radians = i * Math.PI / (numpoints / 2);
          const new_x = this.x + (this.radius + (Math.random()*10 - 5)) * Math.cos(radians);
          const new_y = this.y + (this.radius + (Math.random()*10 - 5)) * Math.sin(radians);
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