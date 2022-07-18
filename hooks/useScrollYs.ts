import useScrollPosition from "@react-hook/window-scroll"
import * as R from "rambda"
import * as React from "react"

export type UseScrollYsOptions = {
  startThreshold?: number
  downThreshold?: number
  upThreshold?: number
  frameRate?: number
  stackLength?: number
}

export function useScrollYs(options: UseScrollYsOptions = {}): [number[], -1 | 0 | 1] {
  const {
    // FIDELITY
    frameRate = 5,           // -- slow scrolling
    stackLength = 10,        // -- slow scrolling
    startThreshold = 16 * 5, // -- start area
    downThreshold = 16 * 10, // -- fast scrolling
    upThreshold = 16 * 20,   // -- fast scrolling
    // ^ Intentionally different default constants for scrolling UP and DOWN
    // E.g. menu height increase is expensive while decrease isn't (position: static)
    // The fidelity is decreased 2x for scrolling UP.
  } = options

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
    if (scrollY < startThreshold) {
      return [ys, -1]
    }
    // For slow scrolling
    if (sortedYs.length == 10 && R.equals(ys, sortedYs)) {
      return [ys, 1]
    } else if (sortedYs.length == 10 && R.equals(ys, sortedYsRev)) {
      return [ys, -1]
    }
    // For fast scrolling
    if (scrollY - min > downThreshold) {
      scrollLogRef.current = []
      return [ys, 1]
    } else if (max - scrollY > upThreshold) {
      scrollLogRef.current = []
      return [ys, -1]
    }
    return [ys, 0]
  } else {
    return [ys, 0]
  }
}

export function useScrollDirection(options: UseScrollYsOptions = {}): -1 | 0 | 1 {
  const [_, direction] = useScrollYs(options)
  return direction
}
