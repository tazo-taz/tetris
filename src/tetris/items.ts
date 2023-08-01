import { itemSize, itemsX, itemsY } from "./constants.js";
import { coordType } from "./types.js";

export const getItemCoords = (x: number, y: number) => {
  return [x * itemSize, y * itemSize];
};

export const itemsMaxYCoord = (items: coordType[]) => {
  return items.reduce((max, item) => (max < item.y ? item.y : max), -Infinity);
};

export const itemsMaxXCoord = (items: coordType[]) => {
  return items.reduce((max, item) => (max < item.x ? item.x : max), -Infinity);
};

export const itemsMinXCoord = (items: coordType[]) => {
  return items.reduce((min, item) => (min > item.x ? item.x : min), Infinity);
};

export const itemsMinYCoord = (items: coordType[]) => {
  return items.reduce((min, item) => (min > item.y ? item.y : min), Infinity);
};

export const isItemOutsideOfSides = (items: coordType[]) => {
  const maxXCoord = itemsMaxXCoord(items);
  const minXCoord = itemsMinXCoord(items);
  const minYCoord = itemsMinYCoord(items);

  return minXCoord < 0 || maxXCoord + 1 > itemsX || minYCoord < 0;
};

export const areTwoItemssCollided = (
  items1: coordType[],
  items2: coordType[]
) => {
  for (let item1 of items1) {
    for (let item2 of items2) {
      if (areTwoItemsCollided(item1, item2)) {
        return true;
      }
    }
  }
  return false;
};

export const areTwoItemsCollided = (item1: coordType, item2: coordType) => {
  return item1.x === item2.x && item1.y === item2.y;
};

export const applyGravityToItems = (items: coordType[]) => {
  const maxYCoord = itemsMaxYCoord(items);
  if (maxYCoord + 1 >= itemsY) {
    return items;
  }
  for (let item of items) {
    item.y++;
  }
  return items;
};

export const removableYcoords = (items: coordType[]) => {
  return Object.entries(
    items.reduce((obj: Record<number, number[]>, item) => {
      (obj[item.y] || (obj[item.y] = [])).push(item.x);
      return obj;
    }, {})
  ).reduce((arr: number[], [key, values]) => {
    if (values.length === itemsX) {
      return [...arr, +key];
    }
    return arr;
  }, []);
};

const removeByCoordProvider = (
  items: coordType[],
  ys: number[],
  coordType: "x" | "y"
) => {
  return items.filter((item) => !ys.includes(item[coordType]));
};

export const removeByYCoord = (items: coordType[], ys: number[]) =>
  removeByCoordProvider(items, ys, "y");
