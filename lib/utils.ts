// byCreatedAtDesc
type ObjectWithCreatedAt = {
  createdAt : string
}

export function byCreatedAtDesc(a: ObjectWithCreatedAt, b: ObjectWithCreatedAt) : -1 | 0 | 1 {
  const aDate = new Date(a.createdAt)
  const bDate = new Date(b.createdAt)
  return aDate > bDate ? -1 : aDate < bDate ? 1 : 0
  // return compareDesc(new Date(a.date), new Date(b.date))
}
