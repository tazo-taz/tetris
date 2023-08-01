import Tetris from "./tetris/index.js";

function init() {
    const canvas = document.querySelector("canvas")
    const ctx = canvas?.getContext("2d")

    if (ctx && canvas) {
        const tetris = new Tetris({ ctx, canvas })
        tetris.startPlaying()
    }
}

init()

