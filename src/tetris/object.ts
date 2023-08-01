import { itemsX, itemsY } from "./constants.js";
import { currentObjectType, objectType } from "./index";
import {
  applyGravityToItems,
  areTwoItemssCollided,
  isItemOutsideOfSides,
  itemsMaxXCoord,
  itemsMaxYCoord,
  removableYcoords,
  removeByYCoord,
} from "./items.js";
import { coordType } from "./types.js";

type onlyItemsInObject = Pick<objectType, "items">;

export const objectMaxYCoord = (object: onlyItemsInObject) => {
  return itemsMaxYCoord(object.items);
};

export const objectMaxXCoord = (object: onlyItemsInObject) => {
  return itemsMaxXCoord(object.items);
};

export const hasObjectReachedBottom = (object: onlyItemsInObject) => {
  return objectMaxYCoord(object) + 1 === itemsY;
};

export const hasObjectReachedSides = (object: onlyItemsInObject) => {
  return objectMaxXCoord(object) + 1 === itemsX;
};

export const applyGravityToObject = (object: onlyItemsInObject) => {
  applyGravityToItems(object.items);
};

const hasObjectCollidedToOtherObjects = ({
  objects,
  object,
}: {
  objects: objectType[];
  object: onlyItemsInObject;
}) => {
  for (let toCheckObject of objects) {
    if (
      areTwoItemssCollided(
        toCheckObject.items,
        applyGravityToItems(structuredClone(object.items))
      )
    ) {
      return true;
    }
  }
  return false;
};

export const checkCollisionForObject = ({
  objects,
  object,
  onCollision,
}: {
  objects: objectType[];
  object: objectType;
  onCollision?: () => void;
}) => {
  let hasCollided = false;

  if (
    hasObjectReachedBottom(object) ||
    hasObjectCollidedToOtherObjects({ object, objects })
  ) {
    hasCollided = true;
    onCollision && onCollision();
  }
  return hasCollided;
};

export const checkFullCollisionForObject = ({
  objects,
  object,
}: {
  objects: objectType[];
  object: onlyItemsInObject;
}) => {
  return (
    hasObjectReachedBottom(object) ||
    hasObjectCollidedToOtherObjects({ object, objects }) ||
    isItemOutsideOfSides(object.items)
  );
};

export const rotateObject = ({
  object,
  objects,
}: {
  object: currentObjectType;
  objects: objectType[];
}) => {
  const newRotateIndex =
    (object.rotateIndex + 1) % object.rotationFunctions.length;
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

const moveObjectProvider = ({
  object,
  objects,
  itemCb,
}: {
  object: onlyItemsInObject;
  objects: objectType[];
  itemCb: (item: coordType) => coordType;
}) => {
  let items: coordType[] = structuredClone(object.items);
  items = items.map(itemCb);
  const hasCollided = checkFullCollisionForObject({
    object: { items },
    objects,
  });

  if (!hasCollided) {
    object.items = items;
  }
};

export const moveObjectLeft = (props: {
  object: onlyItemsInObject;
  objects: objectType[];
}) =>
  moveObjectProvider({
    ...props,
    itemCb: (item) => {
      item.x = item.x - 1;
      return item;
    },
  });

export const moveObjectRight = (props: {
  object: onlyItemsInObject;
  objects: objectType[];
}) =>
  moveObjectProvider({
    ...props,
    itemCb: (item) => {
      item.x = item.x + 1;
      return item;
    },
  });

export const moveObjectDown = (props: {
  object: onlyItemsInObject;
  objects: objectType[];
}) =>
  moveObjectProvider({
    ...props,
    itemCb: (item) => {
      item.y = item.y + 1;
      return item;
    },
  });

export const removeLineFromObjects = (objects: objectType[]) => {
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
};
