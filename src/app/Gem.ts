import * as helpers from '@/app/helpers'
import Easing from './Easing'
import gemImage from '@/assets/gem.png'

export default class Gem {
    i: number
    j: number
    readonly sprite: PIXI.Sprite

    swapState: {
        time: number
        position: {
            x: number
            y: number
        }
        target: {
            x: number
            y: number
        }
    } = null

    constructor ({i, j, x, y}) {
        this.i = i
        this.j = j
        
        const sprite = this.sprite = PIXI.Sprite.from(gemImage)
        sprite.position.x = x
        sprite.position.y = y
        sprite.scale = new PIXI.Point(0.5, 0.5)
        sprite.tint = helpers.hslToColor(Math.random()*360, 50, 75)
    }

    update (dt: number) {
        this.updateSwap(dt)
    }

    updateSwap (dt: number) {
        if (!this.swapState) {
            return
        }

        const {
            sprite,
            swapState,
        } = this

        swapState.time += dt * 4
        if (swapState.time >= 1) {
            sprite.position.x = swapState.target.x
            sprite.position.y = swapState.target.y
            this.swapState = null
        } else {
            const dx = swapState.target.x - swapState.position.x
            const dy = swapState.target.y - swapState.position.y
    
            sprite.position.x = swapState.position.x + Easing.inOutQuad(swapState.time) * dx
            sprite.position.y = swapState.position.y + Easing.inOutQuad(swapState.time) * dy
        }
    }
}
