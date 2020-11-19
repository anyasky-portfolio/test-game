 namespace Easing {
    export function inOutQuad (t) {
        t *= 2
        if (t < 1) return 0.5*t*t
        return - 0.5*(--t * ( t - 2 ) - 1)
    }
}
  
export default Easing
