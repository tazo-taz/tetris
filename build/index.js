import Tetris from "./tetris/index.js";
function init() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
    const scoresLabel = document.querySelector("#scores");
    const levelsLabel = document.querySelector("#levels");
    if (ctx && canvas) {
        const tetris = new Tetris({
            ctx,
            canvas,
            onScore: (scores) => {
                scoresLabel && (scoresLabel.innerHTML = `${scores}`);
            },
            onLevelUp: (level) => {
                levelsLabel && (levelsLabel.innerHTML = `${level}`);
            }
        });
        tetris.startPlaying();
    }
}
init();
