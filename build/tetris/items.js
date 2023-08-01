import { itemSize } from "./constants.js";
export const getItemCoords = (x, y) => {
    return [
        x * itemSize,
        y * itemSize,
    ];
};
export const itemsMaxDepth = (items) => {
    return items.reduce((max, item) => max < item.y ? item.y : max, -Infinity);
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
    for (let item of items) {
        item.y++;
    }
    return items;
};
