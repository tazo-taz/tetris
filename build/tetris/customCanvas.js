import { drawRect, drawStroke } from "./canvas.js";
import { borderColor, itemSize } from "./constants.js";
export const drawPrimaryStroke = ({ ctx, lineWidth, width, x, y, height }) => drawStroke({ ctx, lineWidth, width, x, y, height, color: borderColor });
export const drawItemSizeRect = ({ ctx, color, x, y }) => drawRect({ ctx, color, x, y, width: itemSize, height: itemSize });
