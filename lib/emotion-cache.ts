import type {StylisPlugin, StylisElement} from '@emotion/cache'
import createCache from "@emotion/cache"

// flexStartEndPlugin
const isFlex = (element: StylisElement): boolean => {
  if (
    element.parent && typeof element.parent == "object"  &&
    element.parent.children  && typeof element.parent.children == "object"
  ) {
    for (const child of element.parent.children) {
      if (child && typeof child == "object" && child.value == "display:flex;") {
        return true
      }
    }
  }
  return false
}

const flexStartEndPlugin = (propName: string): StylisPlugin => (element) => {
  const {type, props, children} = element
  if (type == "decl") {
    if (props == propName) {
      if (children == "end" || children == "right") {
        if (isFlex(element)) {
          element.return = `${propName}: flex-end;`
        }
      } else if (children == "start" || children == "left") {
        if (isFlex(element)) {
          element.return = `${propName}: flex-start;`
        }
      }
    }
  }
}

// cache
const cache = createCache({
  key: "q",
  stylisPlugins: [flexStartEndPlugin("align-items"), flexStartEndPlugin("justify-content")]
})
cache.compat = true

export {cache}
