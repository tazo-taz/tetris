import { itemsY } from "./constants.js"
import { objectType } from "./index"
import { applyGravityToItems, areTwoItemssCollided, itemsMaxDepth } from "./items.js"

export const objectMaxDepth = (object: objectType) => {
    return itemsMaxDepth(object.items)
}

export const hasObjectReachedBottom = (object: objectType) => {
    return objectMaxDepth(object) + 1 === itemsY
}

export const applyGravityToObject = (object: objectType) => {
    applyGravityToItems(object.items)
}

const hasObjectCollidedToOtherObjects = ({ objects, object }: { objects: objectType[], object: objectType }) => {
    for (let toCheckObject of objects) {
        if (areTwoItemssCollided(toCheckObject.items, (applyGravityToItems(structuredClone(object.items))))) {
            return true
        }
    }
    return false
}

export const checkCollisionForObject = (
    { objects, object, onCollision }:
        { objects: objectType[], object: objectType, onCollision: () => void }
) => {
    if (hasObjectReachedBottom(object) || hasObjectCollidedToOtherObjects({ object, objects })) {
        onCollision()
    }
}