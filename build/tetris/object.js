import { itemsY } from "./constants.js";
import { applyGravityToItems, areTwoItemssCollided, isItemOutsideOfSides, itemsMaxYCoord, removableYcoords, removeByYCoord } from "./items.js";
export const objectMaxYCoord = (object) => {
    return itemsMaxYCoord(object.items);
};
export const hasObjectReachedBottom = (object) => {
    return objectMaxYCoord(object) + 1 >= itemsY;
};
export const applyGravityToObject = (object) => {
    return { ...object, items: applyGravityToItems(object.items) };
};
const hasItemsCollidedToOtherObjects = ({ objects, items, }) => {
    for (let toCheckObject of objects) {
        if (areTwoItemssCollided(toCheckObject.items, items)) {
            return true;
        }
    }
    return false;
};
export const checkCollisionForObject = ({ objects, object, onCollision, }) => {
    let hasCollided = false;
    if (hasObjectReachedBottom(object) ||
        hasItemsCollidedToOtherObjects({ items: object.items, objects })) {
        hasCollided = true;
        onCollision && onCollision();
    }
    return hasCollided;
};
export const checkCollisionForObjectWithGravity = ({ objects, object, onCollision, }) => {
    const items = applyGravityToItems(structuredClone(object.items));
    let hasCollided = false;
    if (hasObjectReachedBottom(object) ||
        hasItemsCollidedToOtherObjects({ items, objects })) {
        hasCollided = true;
        onCollision && onCollision();
    }
    return hasCollided;
};
export const checkFullCollisionForObject = ({ objects, object, }) => {
    return (hasObjectReachedBottom(object) ||
        hasItemsCollidedToOtherObjects({ items: object.items, objects }) ||
        isItemOutsideOfSides(object.items));
};
export const rotateObject = ({ object, objects, }) => {
    if (object.rotationFunctions.length === 0) {
        return;
    }
    const newRotateIndex = (object.rotateIndex + 1) % object.rotationFunctions.length;
    const newItems = object.rotationFunctions[newRotateIndex](object.items);
    const hasCollided = checkFullCollisionForObject({
        object: { items: newItems },
        objects,
    });
    if (!hasCollided) {
        object.items = newItems;
        object.rotateIndex = newRotateIndex;
    }
};
const moveObjectProvider = ({ object, objects, itemCb, }) => {
    let items = structuredClone(object.items);
    items = items.map(itemCb);
    const hasCollided = checkFullCollisionForObject({
        object: { items },
        objects,
    });
    if (!hasCollided) {
        object.items = items;
    }
};
export const moveObjectLeft = (props) => moveObjectProvider({
    ...props,
    itemCb: (item) => {
        item.x = item.x - 1;
        return item;
    },
});
export const moveObjectRight = (props) => moveObjectProvider({
    ...props,
    itemCb: (item) => {
        item.x = item.x + 1;
        return item;
    },
});
export const moveObjectDown = (props) => moveObjectProvider({
    ...props,
    itemCb: (item) => {
        item.y = item.y + 1;
        return item;
    },
});
export const removeLineFromObjects = (objects) => {
    const ys = removableYcoords(objects.map((object) => object.items).flat());
    for (let object of objects) {
        object.items = removeByYCoord(object.items, ys);
    }
    objects
        .map((object) => object.items)
        .flat()
        .map((item) => {
        if (ys.find((y) => y > item.y)) {
            item.y += ys.length;
        }
    });
    return ys.length;
};
