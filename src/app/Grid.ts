import Gem from './Gem'
import * as helpers from './helpers'
import state from './state'
import InputController from './InputController'

export default class Grid {
    readonly world: PIXI.Container
    readonly view: PIXI.Container
    readonly graphics: PIXI.Graphics

    private gems: Gem[][]

    constructor ({world}) {
        const {
            gridSize: size,
        } = state

        const view = this.view = new PIXI.Container()
        view.position.x = -size*0.5
        view.position.y = -size*0.5
        world.addChild(view)

        this.initGrid()
        this.initGems()

        new InputController({
            grid: this
        })
    }

    private initGrid () {
        const {
            cellSize,
            cellPadding: pad,
            cellsCount: count,
        } = state

        const graphics = new PIXI.Graphics()
        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count; ++j) {
                helpers.drawRect({
                    graphics,
                    x: i*(cellSize+pad),
                    y: j*(cellSize+pad),
                    w: cellSize,
                    h: cellSize,
                    color: 0xeeeeee,
                })
            }
        }
        this.view.addChild(graphics)
    }

    private initGems () {
        const {
            cellSize,
            cellPadding: pad,
            cellsCount: count,
        } = state

        const gems = this.gems = []
        for (let i = 0; i < count; ++i) {
            gems[i] = []
        }

        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count; ++j) {
                const gem = new Gem({
                    i,
                    j,
                    x: i*(cellSize+pad),
                    y: j*(cellSize+pad),
                })
                gems[i][j] = gem
                this.view.addChild(gem.sprite)
            }
        }
    }

    update (dt: number) {
        const {
            cellsCount: count,
        } = state

        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count; ++j) {
                this.gems[i][j].update(dt)
            }
        }
    }

    move (i1, j1, i2, j2) {
        const {
            cellSize,
            cellPadding: pad,
        } = state

        const gem1 = this.gems[i1][j1]
        const gem2 = this.gems[i2][j2]
        this.gems[i1][j1] = gem2
        this.gems[i2][j2] = gem1
        gem1.swapState = {
            time: 0,
            position: {
                x: gem1.sprite.position.x,
                y: gem1.sprite.position.y,
            },
            target: {
                x: i2*(cellSize+pad),
                y: j2*(cellSize+pad),
            }
        }
        gem2.swapState = {
            time: 0,
            position: {
                x: gem2.sprite.position.x,
                y: gem2.sprite.position.y,
            },
            target: {
                x: i1*(cellSize+pad),
                y: j1*(cellSize+pad),
            }
        }

    }
}