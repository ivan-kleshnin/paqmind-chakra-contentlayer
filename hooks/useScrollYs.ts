import useScrollPosition from "@react-hook/window-scroll"
import * as R from "rambda"
import * as React from "react"

export function useScrollYs(): [number[], -1 | 0 | 1] {
  // Modifying the following constants will affect fidelity
  const frameRate = 5    // -- affects slow scrolling
  const stackLength = 10 // -- affects slow scrolling
  const thresholdDown = 16 * 10 // in px -- affects fast scrolling
  const thresholdUp = 16 * 20 // in px -- affects fast scrolling
  // Different constants for scrolling UP and DOWN
  // because menu height increase is expensive while decrease isn't (position: static)
  // The fidelity is 2x decreased for UP scrolls.

  // Algorithm
  const scrollY = useScrollPosition(frameRate)
  const scrollLogRef = React.useRef<number[]>([])

  scrollLogRef.current = scrollLogRef.current.length < stackLength
    ? [...scrollLogRef.current, scrollY]
    : [...scrollLogRef.current, scrollY].slice(1, stackLength + 1)

  const ys = scrollLogRef.current
  const sortedYs = R.sortBy(Number, ys)
  const sortedYsRev = R.reverse(R.sortBy(Number, ys))

  if (sortedYs.length > 0) {
    const min = R.reduce(R.min, Infinity, sortedYs) as number
    const max = R.reduce(R.max, 0, sortedYsRev) as number

    // Close to the top
    if (scrollY < thresholdDown) {
      return [ys, -1]
    }
    // For slow scrolling
    if (sortedYs.length == 10 && R.equals(ys, sortedYs)) {
      return [ys, 1]
    } else if (sortedYs.length == 10 && R.equals(ys, sortedYsRev)) {
      return [ys, -1]
    }
    // For fast scrolling
    if (scrollY - min > thresholdDown) {
      return [ys, 1]
    } else if (max - scrollY > thresholdUp) {
      return [ys, -1]
    }
    return [ys, 0]
  } else {
    return [ys, 0]
  }
}

export function useScrollDirection(): -1 | 0 | 1 {
  const [_, direction] = useScrollYs()
  return direction
}
