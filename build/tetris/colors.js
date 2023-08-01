import { random } from "./default.js";
export const randomColor = () => {
    return random([
        "red",
        "purple",
        "green",
        "yellow",
        "orange",
        "aqua",
    ]);
};
