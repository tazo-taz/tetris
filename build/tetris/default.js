export const randomNumber = (number) => {
    return Math.floor(Math.random() * number);
};
export const random = (arr) => {
    const randomIndex = randomNumber(arr.length);
    return arr[randomIndex];
};
