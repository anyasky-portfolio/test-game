import '@/styles/index.scss'
import '@/app/common'

import RendererState from './RendererState'
import Grid from './Grid'
import state from './state'

const rendererState = state.rendererState = new RendererState({
    worldSize: state.gridSize,
    worldPadding: 20,
})

const { world } = rendererState
const grid = new Grid({world})

let savedTime = Date.now()
animate()
function animate() {
    const time = Date.now()
    const dt = (time-savedTime)*0.001
    savedTime = time

    grid.update(dt)
    rendererState.render()
    requestAnimationFrame(animate)
}
