export default class RendererState {
    readonly renderer: PIXI.Renderer
    readonly world: PIXI.Container
    readonly worldSize: number
    readonly worldPadding: number

    constructor ({worldSize, worldPadding}) {
        this.worldSize = worldSize
        this.worldPadding = worldPadding

        const renderer = this.renderer = PIXI.autoDetectRenderer({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x000000,
            antialias: true,
        })

        this.world = new PIXI.Container()

        this.updateRendererSize()
        window.addEventListener('resize', this.updateRendererSize.bind(this))
        document.body.appendChild(renderer.view)
    }
    
    updateRendererSize () {
        const { renderer, world } = this

        const w = window.innerWidth
        const h = window.innerHeight
        renderer.resize(w, h)

        world.position.x = w*0.5
        world.position.y = h*0.5
        const size = Math.min(w, h) - this.worldPadding
        const scale = size / this.worldSize
        world.scale.x = scale
        world.scale.y = -scale
    }

    screenToWorld (x: number, y: number) {
        const w = window.innerWidth
        const h = window.innerHeight
        x -= w*0.5
        y -= h*0.5
        y = -y
        const size = Math.min(w, h) - this.worldPadding
        const scale = size / this.worldSize
        x /= scale
        y /= scale

        return {x, y}
    }

    render () {
        this.renderer.render(this.world)
    }
}
