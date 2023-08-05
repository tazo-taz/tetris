import { initialFramesObjectSpawn, minFramesObjectSpawn } from "./constants.js"

export const randomNumber = (number: number) => {
    return Math.floor(Math.random() * number)
}

export const random = <T>(arr: T[]): T => {
    const randomIndex = randomNumber(arr.length)
    return arr[randomIndex]
}



export function* newFramesGegerator(points: number): Generator<number, void, unknown> {
    while (true) {
        if (points > minFramesObjectSpawn) {
            points -= 2;
        } else {
            points = minFramesObjectSpawn;
        }
        yield points;
    }
}

export function getLevel(frames: number) {
    return Array.from({ length: (initialFramesObjectSpawn - minFramesObjectSpawn + 1) }, (_, index) => initialFramesObjectSpawn - index)
        .filter(num => num % 2 === 0).findIndex((num) => num === frames)
}