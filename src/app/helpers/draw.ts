interface DrawRectParams {
    graphics: PIXI.Graphics
    x: number
    y: number
    w: number
    h: number
    color: number
}

export function drawRect ({graphics, x, y, w, h, color}: DrawRectParams) {
    if (color == null) {
        color = 0xffffff
    }

    graphics.beginFill(color)
    graphics.drawRect(x, y, w, h)
    graphics.endFill()
}
