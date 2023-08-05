import { itemSize, itemsX, itemsY } from "./constants.js";
export const getItemCoords = (x, y) => {
    return [x * itemSize, y * itemSize];
};
export const itemsMaxYCoord = (items) => {
    return items.reduce((max, item) => (max < item.y ? item.y : max), -Infinity);
};
export const itemsMaxXCoord = (items) => {
    return items.reduce((max, item) => (max < item.x ? item.x : max), -Infinity);
};
export const itemsMinXCoord = (items) => {
    return items.reduce((min, item) => (min > item.x ? item.x : min), Infinity);
};
export const itemsMinYCoord = (items) => {
    return items.reduce((min, item) => (min > item.y ? item.y : min), Infinity);
};
export const isItemOutsideOfSides = (items) => {
    const maxXCoord = itemsMaxXCoord(items);
    const minXCoord = itemsMinXCoord(items);
    const minYCoord = itemsMinYCoord(items);
    return minXCoord < 0 || maxXCoord + 1 > itemsX || minYCoord < 0;
};
export const areTwoItemssCollided = (items1, items2) => {
    for (let item1 of items1) {
        for (let item2 of items2) {
            if (areTwoItemsCollided(item1, item2)) {
                return true;
            }
        }
    }
    return false;
};
export const areTwoItemsCollided = (item1, item2) => {
    return item1.x === item2.x && item1.y === item2.y;
};
export const applyGravityToItems = (items) => {
    const maxYCoord = itemsMaxYCoord(items);
    if (maxYCoord + 1 >= itemsY) {
        return items;
    }
    for (let item of items) {
        item.y++;
    }
    return items;
};
export const removableYcoords = (items) => {
    return Object.entries(items.reduce((obj, item) => {
        (obj[item.y] || (obj[item.y] = [])).push(item.x);
        return obj;
    }, {})).reduce((arr, [key, values]) => {
        if (values.length === itemsX) {
            return [...arr, +key];
        }
        return arr;
    }, []);
};
const removeByCoordProvider = (items, ys, coordType) => {
    return items.filter((item) => !ys.includes(item[coordType]));
};
export const removeByYCoord = (items, ys) => removeByCoordProvider(items, ys, "y");
export const moveItemsToLeftSideMap = (items) => {
    const newItems = structuredClone(items);
    const minX = itemsMinXCoord(items);
    newItems.forEach((item) => item.x -= minX);
    return newItems;
};
