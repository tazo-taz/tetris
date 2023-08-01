export const drawStroke = ({ ctx, color, lineWidth, width, x, y, height }) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
};
export const drawRect = ({ ctx, color, x, y, width, height }) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
};
export const clearCanvas = ({ ctx, canvas }) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
