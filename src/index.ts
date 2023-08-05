import Tetris from "./tetris/index.js";

function init() {
    const canvas = document.querySelector("canvas")
    const ctx = canvas?.getContext("2d")
    const scoresLabel = document.querySelector("#scores")
    const levelsLabel = document.querySelector("#levels")

    if (ctx && canvas) {
        const tetris = new Tetris({
            ctx,
            canvas,
            onScore: (scores) => {
                scoresLabel && (scoresLabel.innerHTML = `${scores}`)
            },
            onLevelUp: (level: number) => {
                levelsLabel && (levelsLabel.innerHTML = `${level}`)
            }
        })
        tetris.startPlaying()
    }
}

init()

