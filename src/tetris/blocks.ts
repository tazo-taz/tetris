import { randomColor } from "./colors.js"
import { itemsX } from "./constants.js"
import { random, randomNumber } from "./default.js"
import { coordType } from "./types.js"

export type rotationFunctionsType = ((items: coordType[]) => {
    x: number;
    y: number;
}[])[]

const generateIBlock = (color: string) => {
    const x = randomNumber(itemsX - 3)
    return {
        color, items: [
            { x: x, y: 0 },
            { x: x + 1, y: 0 },
            { x: x + 2, y: 0 },
            { x: x + 3, y: 0 },
        ],
        rotationFunctions: [
            () => { },
            (items: coordType[]) => [
                {
                    x: items[0].x + 2,
                    y: items[0].y - 1
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y + 1
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y + 2
                },
            ],
            (items: coordType[]) => [
                {
                    x: items[0].x - 2,
                    y: items[0].y - 2
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y + 1
                },
                {
                    x: items[0].x + 2,
                    y: items[0].y + 2
                },
            ]
        ]
    }
}

const generateJBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color, items: [
            { x: x, y: 0 },
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: []
    }
}

const generateLBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color,
        items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
            { x: x + 2, y: 0 },
        ],
        rotationFunctions: []
    }
}

const generateSBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color, items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 1, y: 0 },
            { x: x + 2, y: 0 },
        ],
        rotationFunctions: []
    }
}

const generateTBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color, items: [
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
            { x: x + 1, y: 0 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: []
    }
}

const generateZBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color, items: [
            { x: x, y: 0 },
            { x: x + 1, y: 0 },
            { x: x + 1, y: 1 },
            { x: x + 2, y: 1 },
        ],
        rotationFunctions: []
    }
}

const generateOBlock = (color: string) => {
    const x = randomNumber(itemsX - 2)
    return {
        color, items: [
            { x: x, y: 0 },
            { x: x + 1, y: 0 },
            { x: x, y: 1 },
            { x: x + 1, y: 1 },
        ],
        rotationFunctions: []
    }
}



export const generateNewBlock = () => {
    const blockFunctions = [
        generateIBlock,
        // generateJBlock,
        // generateLBlock,
        // generateSBlock,
        // generateTBlock,
        // generateZBlock,
        // generateOBlock
    ]
    const generateBlock = random(blockFunctions)
    return { ...generateBlock(randomColor()), rotateIndex: 0 }
}