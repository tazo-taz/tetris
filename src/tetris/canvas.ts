
export type drawStrokeProps = {
    ctx: CanvasRenderingContext2D,
    color: string,
    lineWidth: number,
    x: number,
    y: number,
    width: number,
    height: number,
}

export type drawRectProps = {
    ctx: CanvasRenderingContext2D,
    color: string,
    x: number,
    y: number,
    width: number,
    height: number,
}


export const drawStroke = ({ ctx, color, lineWidth, width, x, y, height }: drawStrokeProps) => {
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.strokeRect(x, y, width, height);
}

export const drawRect = ({ ctx, color, x, y, width, height }: drawRectProps) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height);
}

export const clearCanvas = ({ ctx, canvas }: {
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
}) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}