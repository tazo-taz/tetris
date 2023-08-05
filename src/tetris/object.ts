import { itemsY } from "./constants.js";
import { currentObjectType, objectType } from "./index";
import {
  applyGravityToItems,
  areTwoItemssCollided,
  isItemOutsideOfSides,
  itemsMaxYCoord,
  removableYcoords,
  removeByYCoord
} from "./items.js";
import { coordType } from "./types.js";

type onlyItemsInObject = Pick<objectType, "items">;

export const objectMaxYCoord = (object: onlyItemsInObject) => {
  return itemsMaxYCoord(object.items);
};

export const hasObjectReachedBottom = (object: onlyItemsInObject) => {
  return objectMaxYCoord(object) + 1 >= itemsY;
};

export const applyGravityToObject = (object: onlyItemsInObject) => {
  return { ...object, items: applyGravityToItems(object.items) }
};

const hasItemsCollidedToOtherObjects = ({
  objects,
  items,
}: {
  objects: objectType[];
  items: coordType[];
}) => {
  for (let toCheckObject of objects) {
    if (
      areTwoItemssCollided(
        toCheckObject.items,
        items
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
  object: onlyItemsInObject;
  onCollision?: () => void;
}) => {
  let hasCollided = false;
  if (
    hasObjectReachedBottom(object) ||
    hasItemsCollidedToOtherObjects({ items: object.items, objects })
  ) {
    hasCollided = true;
    onCollision && onCollision();
  }
  return hasCollided;
};

export const checkCollisionForObjectWithGravity = ({
  objects,
  object,
  onCollision,
}: {
  objects: objectType[];
  object: objectType;
  onCollision?: () => void;
}) => {
  const items = applyGravityToItems(structuredClone(object.items))
  let hasCollided = false;
  if (
    hasObjectReachedBottom(object) ||
    hasItemsCollidedToOtherObjects({ items, objects })
  ) {
    hasCollided = true;
    onCollision && onCollision();
  }
  return hasCollided;
}

export const checkFullCollisionForObject = ({
  objects,
  object,
}: {
  objects: objectType[];
  object: onlyItemsInObject;
}) => {
  return (
    hasObjectReachedBottom(object) ||
    hasItemsCollidedToOtherObjects({ items: object.items, objects }) ||
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
  if (object.rotationFunctions.length === 0) {
    return
  }
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

  return ys.length
};
