import { generateNewBlock, rotationFunctionsType } from "./blocks.js";
import { clearCanvas } from "./canvas.js";
import { initialFramesObjectSpawn, itemSize, itemsAndSidebarGap, itemsX, itemsY, minFramesObjectSpawn, newLevelEveryForObjects, sidebarSize } from "./constants.js";
import { drawItemSizeRect, drawPrimaryStroke } from "./customCanvas.js";
import { getLevel, newFramesGegerator } from "./default.js";
import { getItemCoords, itemsMinYCoord, moveItemsToLeftSideMap } from "./items.js";
import {
  applyGravityToObject,
  checkCollisionForObjectWithGravity,
  moveObjectDown,
  moveObjectLeft,
  moveObjectRight,
  removeLineFromObjects,
  rotateObject
} from "./object.js";
import { coordType, itemsType } from "./types.js";

interface TetrisProps {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  onScore?: (score: number) => void
  onLevelUp?: (score: number) => void
}

export type objectType = {
  color: string;
  items: coordType[];
};

export type currentObjectType = objectType & {
  rotationFunctions: rotationFunctionsType;
  rotateIndex: number;
  frames: number
};


const frames = newFramesGegerator(initialFramesObjectSpawn)

export default class Tetris {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  items: itemsType;
  currentObject: currentObjectType;
  nextObject: currentObjectType;
  objects: objectType[];
  animationFrame: number;
  points: number
  objectsCreatedCount: number
  frames: number
  onScore?: (score: number) => void
  onLevelUp?: (score: number) => void

  constructor({ ctx, canvas, onScore, onLevelUp }: TetrisProps) {
    this.ctx = ctx;
    this.canvas = canvas;

    this.items = this.generateItems();
    this.currentObject = generateNewBlock();
    this.nextObject = generateNewBlock();
    this.objects = [];
    this.animationFrame = 0;
    this.points = 0
    this.objectsCreatedCount = 0
    this.frames = initialFramesObjectSpawn
    this.onScore = onScore
    this.onLevelUp = onLevelUp
  }

  styleCanvas() {
    const [canvasWidth, canvasHeight] = getItemCoords(itemsX + sidebarSize + itemsAndSidebarGap, itemsY);
    const [gridWidth] = getItemCoords(itemsX, itemsY);
    const [sidebarWidth, sidebarHeight] = getItemCoords(sidebarSize, sidebarSize);
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    drawPrimaryStroke({
      ctx: this.ctx,
      x: 0,
      y: 0,
      width: gridWidth,
      height: canvasHeight,
      lineWidth: 5,
    });

    drawPrimaryStroke({
      ctx: this.ctx,
      x: gridWidth + itemsAndSidebarGap * itemSize,
      y: 0,
      width: sidebarWidth,
      height: sidebarHeight,
      lineWidth: 5,
    });
  }

  updateLevel() {
    this.onLevelUp && this.onLevelUp(getLevel(this.frames))
  }

  newObjectGenerator() {
    this.objectsCreatedCount++
    this.currentObject = this.nextObject
    this.nextObject = generateNewBlock();
    if (this.objectsCreatedCount % newLevelEveryForObjects === 0) {
      const newFrame = frames.next().value || minFramesObjectSpawn
      if (newFrame !== this.frames) {
        this.frames = newFrame
        this.updateLevel()
      }
    }
  }

  generateItems() {
    const items: itemsType = [];
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

  drawSidebarBorder() {
    const [gridWidth] = getItemCoords(itemsX, itemsY);

    for (let y = 0; y < sidebarSize; y++) {
      for (let x = 0; x < sidebarSize; x++) {
        const [itemX, itemY] = getItemCoords(x, y);
        drawPrimaryStroke({
          ctx: this.ctx,
          width: itemSize,
          height: itemSize,
          lineWidth: 1,
          x: gridWidth + itemsAndSidebarGap * itemSize + itemX,
          y: itemY,
        });
      }
    }
  }

  drawItem({ color, x, y }: { color: string; x: number; y: number }) {
    const [itemsX, itemsY] = getItemCoords(x, y);
    drawItemSizeRect({ ctx: this.ctx, color, x: itemsX, y: itemsY });
  }

  drawSidebarItem({ color, x, y }: { color: string; x: number; y: number }) {
    const [gridWidth] = getItemCoords(itemsX, itemsY);
    const [rectX, rectY] = getItemCoords(x, y);

    drawItemSizeRect({
      ctx: this.ctx,
      color,
      x: gridWidth + itemsAndSidebarGap * itemSize + rectX,
      y: rectY
    });
  }

  drawObject({
    color,
    items,
    drawer = this.drawItem.bind(this)
  }: {
    color: string;
    items: { x: number; y: number }[];
    drawer?: ({ color, x, y }: {
      color: string;
      x: number;
      y: number;
    }) => void
  }) {
    for (let item of items) {
      const { x, y } = item;
      drawer({ color, x, y });
    }
  }

  drawGameObjects() {
    const objects = [...this.objects, this.currentObject];
    for (let object of objects) {
      this.drawObject(object);
    }
    this.drawObject({ color: this.nextObject.color, items: moveItemsToLeftSideMap(this.nextObject.items), drawer: this.drawSidebarItem.bind(this) })
  }

  removeLine() {
    const removedLines = removeLineFromObjects(this.objects);
    this.points += removedLines
    this.onScore && this.onScore(this.points)
  }

  currentObjectCollidedToObjects = () => {
    this.objects.push(this.currentObject);
    this.newObjectGenerator()
    if (itemsMinYCoord(this.objects.map((items) => items.items).flat()) === 0) {
      clearInterval(this.animationFrame)
      setTimeout(() => {
        alert("You lose")
      })
    }
  };

  applyMotionToObject() {
    this.currentObject.frames % this.frames === 0 && applyGravityToObject(this.currentObject);
    checkCollisionForObjectWithGravity({
      objects: this.objects,
      object: this.currentObject,
      onCollision: this.currentObjectCollidedToObjects,
    });
    this.currentObject.frames++
  }

  startPlaying() {
    clearInterval(this.animationFrame);
    this.keyboardEvents();
    this.playingAnimation();
    this.updateLevel()
  }

  playingAnimation() {
    this.animationFrame = setInterval(() => {
      clearCanvas({ ctx: this.ctx, canvas: this.canvas });
      this.styleCanvas();
      this.drawItemsBorder();
      this.drawSidebarBorder()
      this.drawGameObjects();

      this.applyMotionToObject();
      this.removeLine();
    }, 1000 / 60);
  }

  keyboardEvents() {
    window.removeEventListener("keydown", (e) =>
      this.keyboardEventsFunction(e)
    );
    window.addEventListener("keydown", (e) => this.keyboardEventsFunction(e));
  }
  keyboardEventsFunction({ key }: KeyboardEvent) {
    if (key === " ") {
      rotateObject({ object: this.currentObject, objects: this.objects });
    } else if (key === "a") {
      moveObjectLeft({ object: this.currentObject, objects: this.objects });
    } else if (key === "d") {
      moveObjectRight({ object: this.currentObject, objects: this.objects });
    } else if (key === "s") {
      moveObjectDown({ object: this.currentObject, objects: this.objects });
    }
  }
}
