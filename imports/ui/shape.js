import { WIDTH,HEIGHT } from "./globals"
export class Shape {
    constructor(objkey) {
        this.key = objkey;
        this.time = new Date();
        this.x = Math.random()*WIDTH - WIDTH / 2;
        this.y = Math.random()*HEIGHT - HEIGHT / 2;
        this.d = 10;
        this.color = "blue";
    }
}