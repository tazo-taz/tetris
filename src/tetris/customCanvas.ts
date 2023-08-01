import { drawRect, drawStroke, drawStrokeProps, drawRectProps } from "./canvas.js";
import { borderColor, itemSize } from "./constants.js";

export const drawPrimaryStroke = ({ ctx, lineWidth, width, x, y, height }: Omit<drawStrokeProps, "color">) =>
    drawStroke({ ctx, lineWidth, width, x, y, height, color: borderColor })

export const drawItemSizeRect = ({ ctx, color, x, y }: Omit<drawRectProps, "width" | "height">) =>
    drawRect({ ctx, color, x, y, width: itemSize, height: itemSize })