export const randomNumber = (number: number) => {
    return Math.floor(Math.random() * number)
}

export const random = <T>(arr: T[]): T => {
    const randomIndex = randomNumber(arr.length)
    return arr[randomIndex]
}