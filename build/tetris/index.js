import { generateNewBlock } from "./blocks.js";
import { clearCanvas } from "./canvas.js";
import { itemSize, itemsX, itemsY } from "./constants.js";
import { drawItemSizeRect, drawPrimaryStroke } from "./customCanvas.js";
import { getItemCoords } from "./items.js";
import { applyGravityToObject, checkCollisionForObject, moveObjectDown, moveObjectLeft, moveObjectRight, removeLineFromObjects, rotateObject, } from "./object.js";
export default class Tetris {
    constructor({ ctx, canvas }) {
        this.moveCurrentObjectToObjects = () => {
            this.objects.push(this.currentObject);
            this.currentObject = generateNewBlock();
        };
        this.ctx = ctx;
        this.canvas = canvas;
        this.items = this.generateItems();
        this.currentObject = generateNewBlock();
        this.objects = [];
        this.animationFrame = 0;
    }
    styleCanvas() {
        const [x, y] = getItemCoords(itemsX, itemsY);
        this.canvas.width = x;
        this.canvas.height = y;
        drawPrimaryStroke({
            ctx: this.ctx,
            x: 0,
            y: 0,
            width: x,
            height: y,
            lineWidth: 5,
        });
    }
    generateItems() {
        const items = [];
        for (let y = 0; y < itemsY; y++) {
            items[y] = [];
            for (let x = 0; x < itemsX; x++) {
                items[y].push(null);
            }
        }
        return items;
    }
    drawItemsBorder() {
        for (let y = 0; y < itemsY; y++) {
            for (let x = 0; x < itemsX; x++) {
                const [itemX, itemY] = getItemCoords(x, y);
                drawPrimaryStroke({
                    ctx: this.ctx,
                    width: itemSize,
                    height: itemSize,
                    lineWidth: 1,
                    x: itemX,
                    y: itemY,
                });
            }
        }
    }
    drawItem({ color, x, y }) {
        const [itemsX, itemsY] = getItemCoords(x, y);
        drawItemSizeRect({ ctx: this.ctx, color, x: itemsX, y: itemsY });
    }
    drawObject({ color, items, }) {
        for (let item of items) {
            const { x, y } = item;
            this.drawItem({ color, x, y });
        }
    }
    drawGameObjects() {
        const objects = [...this.objects, this.currentObject];
        for (let object of objects) {
            this.drawObject(object);
        }
    }
    removeLine() {
        removeLineFromObjects(this.objects);
    }
    applyMotionToObject() {
        applyGravityToObject(this.currentObject);
        // for (let object of this.objects) {
        //   applyGravityToObject(object);
        // }
        checkCollisionForObject({
            objects: this.objects,
            object: this.currentObject,
            onCollision: this.moveCurrentObjectToObjects,
        });
    }
    startPlaying() {
        clearInterval(this.animationFrame);
        this.keyboardEvents();
        this.playingAnimation();
    }
    playingAnimation() {
        this.animationFrame = setInterval(() => {
            clearCanvas({ ctx: this.ctx, canvas: this.canvas });
            this.styleCanvas();
            this.drawItemsBorder();
            this.drawGameObjects();
            this.applyMotionToObject();
            //   this.removeLine();
        }, 300);
    }
    keyboardEvents() {
        window.removeEventListener("keydown", (e) => this.keyboardEventsFunction(e));
        window.addEventListener("keydown", (e) => this.keyboardEventsFunction(e));
    }
    keyboardEventsFunction({ key }) {
        if (key === " ") {
            rotateObject({ object: this.currentObject, objects: this.objects });
        }
        else if (key === "a") {
            moveObjectLeft({ object: this.currentObject, objects: this.objects });
        }
        else if (key === "d") {
            moveObjectRight({ object: this.currentObject, objects: this.objects });
        }
        else if (key === "s") {
            moveObjectDown({ object: this.currentObject, objects: this.objects });
        }
    }
}
