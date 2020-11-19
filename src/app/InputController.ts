import Grid from './Grid'
import state from './state'

export default class InputController {
    grid: Grid
    firstTap: {i: number, j: number}

    constructor ({grid}) {
        this.grid = grid
        
        window.addEventListener('touchstart', this.onTouchStart.bind(this))
        window.addEventListener('touchmove', this.onTouchMove.bind(this))
        window.addEventListener('touchend', this.onTouchEnd.bind(this))
        window.addEventListener('mousedown', this.onMouseDown.bind(this))
        window.addEventListener('mousemove', this.onMouseMove.bind(this))
        window.addEventListener('mouseup', this.onMouseUp.bind(this))
    }

    checkFirstTap ({x, y}) {
        const {
            cellsCount: count,
        } = state

        const i = this.transform(x)
        const j = this.transform(y)

        if (i == null || j == null) {
            this.firstTap = null
            return
        }
        if (i < 0 || i > count - 1) {
            this.firstTap = null
            return
        }
        if (j < 0 || j > count - 1) {
            this.firstTap = null
            return
        }

        this.firstTap = {i, j}
    }

    checkMove ({x, y}) {
        if (this.firstTap == null) {
            return
        }

        const {
            cellsCount: count,
        } = state

        const {
            firstTap,
        } = this

        const i = this.transform(x)
        const j = this.transform(y)

        if (i == null || j == null) {
            return
        }
        
        if (i == firstTap.i && j == firstTap.j) {
            return
        }
        if (i < 0 || i > count - 1) {
            return
        }
        if (j < 0 || j > count - 1) {
            return
        }
        
        this.firstTap = null
        this.grid.move(firstTap.i, firstTap.j, i, j)
    }
    
    transform (v: number) {
        const {
            cellSize,
            cellPadding: pad,
            cellsCount: count,
        } = state

        const pos = (v + (cellSize + pad) * count * 0.5) / (cellSize + pad)
        const relative = pos - Math.floor(pos)
        if (relative < pad*0.5/(cellSize + pad)) {
            return null
        }
        if (relative > (cellSize + pad*0.5)/(cellSize + pad)) {
            return null
        }
        return Math.floor(pos)
    }

    onTouchStart (e: TouchEvent) {
        const touch = e.touches[0]
        const pos = state.rendererState.screenToWorld(touch.clientX, touch.clientY)
        this.checkFirstTap(pos)
    }
    onTouchMove (e: TouchEvent) {
        const touch = e.touches[0]
        const pos = state.rendererState.screenToWorld(touch.clientX, touch.clientY)
        this.checkMove(pos)
    }
    onTouchEnd (e: TouchEvent) {
        this.firstTap = null
    }
    onMouseDown (e: MouseEvent) {
        const pos = state.rendererState.screenToWorld(e.clientX, e.clientY)
        this.checkFirstTap(pos)
    }
    onMouseMove (e: MouseEvent) {
        const pos = state.rendererState.screenToWorld(e.clientX, e.clientY)
        this.checkMove(pos)
    }
    onMouseUp (e: MouseEvent) {
        this.firstTap = null
    }
}
