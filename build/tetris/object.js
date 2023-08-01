import { itemsY } from "./constants.js";
import { applyGravityToItems, areTwoItemssCollided, itemsMaxDepth } from "./items.js";
export const objectMaxDepth = (object) => {
    return itemsMaxDepth(object.items);
};
export const hasObjectReachedBottom = (object) => {
    return objectMaxDepth(object) + 1 === itemsY;
};
export const applyGravityToObject = (object) => {
    applyGravityToItems(object.items);
};
const hasObjectCollidedToOtherObjects = ({ objects, object }) => {
    for (let toCheckObject of objects) {
        if (areTwoItemssCollided(toCheckObject.items, (applyGravityToItems(structuredClone(object.items))))) {
            return true;
        }
    }
    return false;
};
export const checkCollisionForObject = ({ objects, object, onCollision }) => {
    if (hasObjectReachedBottom(object) || hasObjectCollidedToOtherObjects({ object, objects })) {
        onCollision();
    }
};
