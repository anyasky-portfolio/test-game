import RendererState from "./RendererState"

export default new class State {
    cellSize = 40
    cellPadding = 4
    cellsCount = 8
    gridSize: number

    rendererState: RendererState

    constructor () {
        const {
            cellSize,
            cellPadding,
            cellsCount: count,
        } = this

        this.gridSize = cellSize*count + cellPadding*(count-1)
    }
}
