import { randomColor } from "./colors.js";
import { itemsX } from "./constants.js";
import { random, randomNumber } from "./default.js";
const generateIBlock = (color) => {
    const x = randomNumber(itemsX);
    return {
        color,
        items: [
            { x, y: 0 },
            { x, y: 1 },
            { x, y: 2 },
            { x, y: 3 },
        ],
        rotationFunctions: [
            (items) => [
                {
                    x: items[0].x + 1,
                    y: items[0].y - 2,
                },
                {
                    x: items[1].x,
                    y: items[1].y - 1,
                },
                {
                    x: items[2].x - 1,
                    y: items[2].y,
                },
                {
                    x: items[3].x - 2,
                    y: items[3].y + 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 2,
                    y: items[0].y + 1,
                },
                {
                    x: items[1].x + 1,
                    y: items[1].y,
                },
                {
                    x: items[2].x,
                    y: items[2].y - 1,
                },
                {
                    x: items[3].x - 1,
                    y: items[3].y - 2,
                },
            ],
            (items) => [
                {
                    x: items[0].x - 1,
                    y: items[0].y + 2,
                },
                {
                    x: items[1].x,
                    y: items[1].y + 1,
                },
                {
                    x: items[2].x + 1,
                    y: items[2].y,
                },
                {
                    x: items[3].x + 2,
                    y: items[3].y - 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x - 2,
                    y: items[0].y - 1,
                },
                {
                    x: items[1].x - 1,
                    y: items[1].y,
                },
                {
                    x: items[2].x,
                    y: items[2].y + 1,
                },
                {
                    x: items[3].x + 1,
                    y: items[3].y + 2,
                },
            ],
        ],
    };
};
const generateJBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 0 },
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: [
            (item) => [
                {
                    x: item[0].x,
                    y: item[0].y - 2
                },
                {
                    x: item[1].x - 1,
                    y: item[1].y - 1
                },
                {
                    x: item[2].x,
                    y: item[2].y
                },
                {
                    x: item[3].x + 1,
                    y: item[3].y + 1
                },
            ],
            (item) => [
                {
                    x: item[0].x + 2,
                    y: item[0].y
                },
                {
                    x: item[1].x + 1,
                    y: item[1].y - 1
                },
                {
                    x: item[2].x,
                    y: item[2].y
                },
                {
                    x: item[3].x - 1,
                    y: item[3].y + 1
                },
            ],
            (item) => [
                {
                    x: item[0].x,
                    y: item[0].y + 2
                },
                {
                    x: item[1].x + 1,
                    y: item[1].y + 1
                },
                {
                    x: item[2].x,
                    y: item[2].y
                },
                {
                    x: item[3].x - 1,
                    y: item[3].y - 1
                },
            ],
            (item) => [
                {
                    x: item[0].x - 2,
                    y: item[0].y
                },
                {
                    x: item[1].x - 1,
                    y: item[1].y + 1
                },
                {
                    x: item[2].x,
                    y: item[2].y
                },
                {
                    x: item[3].x + 1,
                    y: item[3].y - 1
                },
            ],
        ],
    };
};
const generateLBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
            { x: x + 2, y: 0 },
        ],
        rotationFunctions: [
            (item) => [
                {
                    x: item[0].x - 1,
                    y: item[0].y - 1
                },
                {
                    x: item[1].x,
                    y: item[1].y
                },
                {
                    x: item[2].x + 1,
                    y: item[2].y + 1
                },
                {
                    x: item[3].x + 2,
                    y: item[3].y
                },
            ],
            (item) => [
                {
                    x: item[0].x + 1,
                    y: item[0].y - 1
                },
                {
                    x: item[1].x,
                    y: item[1].y
                },
                {
                    x: item[2].x - 1,
                    y: item[2].y + 1
                },
                {
                    x: item[3].x,
                    y: item[3].y + 2
                },
            ],
            (item) => [
                {
                    x: item[0].x + 1,
                    y: item[0].y + 1
                },
                {
                    x: item[1].x,
                    y: item[1].y
                },
                {
                    x: item[2].x - 1,
                    y: item[2].y - 1
                },
                {
                    x: item[3].x - 2,
                    y: item[3].y
                },
            ],
            (item) => [
                {
                    x: item[0].x - 1,
                    y: item[0].y + 1
                },
                {
                    x: item[1].x,
                    y: item[1].y
                },
                {
                    x: item[2].x + 1,
                    y: item[2].y - 1
                },
                {
                    x: item[3].x,
                    y: item[3].y - 2
                },
            ],
        ],
    };
};
const generateSBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 1, y: 0 },
            { x: x + 2, y: 0 },
        ],
        rotationFunctions: [
            (items) => [
                {
                    x: items[0].x - 1,
                    y: items[0].y - 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x + 1,
                    y: items[2].y - 1,
                },
                {
                    x: items[3].x + 2,
                    y: items[3].y,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 1,
                    y: items[0].y - 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x + 1,
                    y: items[2].y + 1,
                },
                {
                    x: items[3].x,
                    y: items[3].y + 2,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 1,
                    y: items[0].y + 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x - 1,
                    y: items[2].y + 1,
                },
                {
                    x: items[3].x - 2,
                    y: items[3].y,
                },
            ],
            (items) => [
                {
                    x: items[0].x - 1,
                    y: items[0].y + 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x - 1,
                    y: items[2].y - 1,
                },
                {
                    x: items[3].x,
                    y: items[3].y - 2,
                },
            ],
        ]
    };
};
const generateTBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 1, y: 0 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: [
            (items) => [
                {
                    x: items[0].x - 1,
                    y: items[0].y - 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x + 1,
                    y: items[2].y - 1,
                },
                {
                    x: items[3].x + 1,
                    y: items[3].y + 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 1,
                    y: items[0].y - 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x + 1,
                    y: items[2].y + 1,
                },
                {
                    x: items[3].x - 1,
                    y: items[3].y + 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 1,
                    y: items[0].y + 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x - 1,
                    y: items[2].y + 1,
                },
                {
                    x: items[3].x - 1,
                    y: items[3].y - 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x - 1,
                    y: items[0].y + 1,
                },
                {
                    x: items[1].x,
                    y: items[1].y,
                },
                {
                    x: items[2].x - 1,
                    y: items[2].y - 1,
                },
                {
                    x: items[3].x + 1,
                    y: items[3].y - 1,
                },
            ],
        ],
    };
};
const generateZBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 0 },
            { x: x + 1, y: 0 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: [
            (items) => [
                {
                    x: items[0].x,
                    y: items[0].y - 2,
                },
                {
                    x: items[1].x + 1,
                    y: items[1].y - 1,
                },
                {
                    x: items[2].x,
                    y: items[2].y,
                },
                {
                    x: items[3].x + 1,
                    y: items[3].y + 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x + 2,
                    y: items[0].y,
                },
                {
                    x: items[1].x + 1,
                    y: items[1].y + 1,
                },
                {
                    x: items[2].x,
                    y: items[2].y,
                },
                {
                    x: items[3].x - 1,
                    y: items[3].y + 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x,
                    y: items[0].y + 2,
                },
                {
                    x: items[1].x - 1,
                    y: items[1].y + 1,
                },
                {
                    x: items[2].x,
                    y: items[2].y,
                },
                {
                    x: items[3].x - 1,
                    y: items[3].y - 1,
                },
            ],
            (items) => [
                {
                    x: items[0].x - 2,
                    y: items[0].y,
                },
                {
                    x: items[1].x - 1,
                    y: items[1].y - 1,
                },
                {
                    x: items[2].x,
                    y: items[2].y,
                },
                {
                    x: items[3].x + 1,
                    y: items[3].y - 1,
                },
            ],
        ],
    };
};
const generateOBlock = (color) => {
    const x = randomNumber(itemsX - 2);
    return {
        color,
        items: [
            { x: x, y: 0 },
            { x: x + 1, y: 0 },
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
        ],
        rotationFunctions: [],
    };
};
export const generateNewBlock = () => {
    const blockFunctions = [
        generateIBlock,
        generateJBlock,
        generateLBlock,
        generateSBlock,
        generateTBlock,
        generateZBlock,
        generateOBlock
    ];
    const generateBlock = random(blockFunctions);
    return { ...generateBlock(randomColor()), rotateIndex: 0, frames: 0 };
};
