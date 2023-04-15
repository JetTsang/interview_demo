export function throttle(fn, delay) {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.call(this, ...args)
        }, delay)
    }
}

export const getAssetsFile = (url) => { return new URL(`${url}`, import.meta.url).href }