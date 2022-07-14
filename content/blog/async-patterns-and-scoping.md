---
title: Async patterns and scoping
createdAt: 2016-11-03
editedAt: 2016-11-03
tags: [Async]
intro: |
  Andre Staltz gave a great talk at [GOTO Copenhagen 2016](https://www.youtube.com/watch?v=Tkjg179M-Nc&index=1&list=LLxMufKDeaXcDXtZ4WS-CRhw).
  He generally touches a lot of topics in his talks. In this one, among the other things, Andre mentioned a possibility of mixing Monadic and Streaming IOs.
  I'll take the opportunity to elaborate this one a bit. One post won't be enough but shouldn't we start
  somewhere?
---

Andre Staltz gave a great talk at [GOTO Copenhagen 2016](https://www.youtube.com/watch?v=Tkjg179M-Nc&index=1&list=LLxMufKDeaXcDXtZ4WS-CRhw).
He generally touches a lot of topics in his talks.
In this one, among the other things, Andre mentioned a possibility of mixing Monadic and Streaming IOs.
I'll take the opportunity to elaborate this one a bit. One post won't be enough but shouldn't we start
somewhere?

Callbacks and promises are buzzy but (strangely) I've seen no article
which would explore the scoping differences between alternative async approaches.
Yet there is a ground for comparison.

## Test 1

Basic sequence. The simplest case.

```
x = () => x
y = f(x)
z = g(y)
```

#### sync1.js

```js
// makeX :: () -> tx
export let makeX = () => "x"

// makeY :: tx -> ty
export let makeY = (x) => x + "y"

// makeZ :: ty -> tz
export let makeZ = (y) => y + "z"
```

#### monadic1.js

```js
// makeX :: () -> Promise tx
export let makeX = () => new Promise(resolve => {
  setTimeout(() => resolve("x"), 333)
})

// makeY :: tx -> Promise ty
export let makeY = (x) => new Promise(resolve => {
  setTimeout(() => resolve(x + "y"), 333)
})

// makeZ :: ty -> Promise tz
export let makeZ = (y) => new Promise(resolve => {
  setTimeout(() => resolve(y + "z"), 333)
})
```

#### streaming1.js

```js
let {Observable} = require("rxjs")

// makeX :: () -> Stream tx
export let makeX = () => Observable.interval(1000).mapTo("x")

// makeY :: tx -> Stream ty
export let makeY = (x) => Observable.of(x + "y")

// makeZ :: ty -> Stream tz
export let makeZ = (y) => Observable.of(y + "z")
```

#### test1.js

```js
// node --harmony-async-await test1.js

let s = require("./sync1")
let m = require("./monadic1")
let o = require("./streaming1")

// Sync API
let x = s.makeX()
let y = s.makeY(x)
let z = s.makeZ(y)
console.log(z)

// Monadic map API
// map alike
m.makeX()
  .then(s.makeY)
  .then(s.makeZ)
  .then(console.log)

// Monadic flatMap API
m.makeX()
  .then(m.makeY)
  .then(m.makeZ)
  .then(console.log)

// Monadic map with Async-Await
async function sample() {
  let x = await m.makeX()
  let y = s.makeY(x)
  return s.makeZ(y)
}
sample().then(console.log)

// Monadic flatMap API with Async-Await
async function sample() {
  let x = await m.makeX()
  let y = await m.makeY(x)
  return await m.makeZ(y)
}
sample().then(console.log)

// Streaming map API
o.makeX()
  .map(s.makeY)
  .map(s.makeZ)
  .subscribe(console.log)

// Streaming flatMap API
o.makeX()
  .flatMap(o.makeY)
  .flatMap(o.makeZ)
  .subscribe(console.log)
```

## Test 2

Branching sequence. +1 argument for 1 function...

```
x = () => x
y = f(x)
z = g(x, y)
```

#### Sanity check

```js
(new Promise((resolve) => {
  resolve("a", "b")
}))
  .then((...args) => {
    console.log(args) // no way
  })
```

#### sync2.js

```js
// makeX :: () -> tx
export let makeX = () => "x"

// makeY :: tx -> ty
export let makeY = (x) => x + "y"

// makeZ :: ty -> tz
export let makeZ = (x, y) => x + y + "z"
```

#### monadic2.js

```js
export let makeX = () => new Promise(resolve => {
  setTimeout(() => resolve("x"), 333)
})

// makeY :: tx -> Promise ty
export let makeY = (x) => new Promise(resolve => {
  setTimeout(() => resolve(x + "y"), 333)
})

// makeZ :: tx -> ty -> Promise tz
export let makeZ = (x, y) => new Promise(resolve => {
  setTimeout(() => resolve(x + y + "z"), 333)
})
```

#### streaming2.js

```js
let {Observable} = require("rxjs")

// makeX :: () -> Stream tx
export let makeX = () => Observable.interval(1000).mapTo("x")

// makeY :: tx -> Stream ty
export let makeY = (x) => Observable.of(x + "y")

// makeZ :: tx, ty -> Stream tz
export let makeZ = (x, y) => Observable.of(x + y + "z")
```

#### test2.js

```js
// node --harmony-async-await test2.js

let s = require("./sync2")
let m = require("./monadic2")
let o = require("./streaming2")

// Sync API
let x = s.makeX()
let y = s.makeY(x)
let z = s.makeZ(x, y)
console.log(z)

// Monadic map API
// v1: A+
m.makeX()
  .then((x) => [x, s.makeY(x)])    // :(
  .then(([x, y]) => s.makeZ(x, y)) //
  .then(console.log)

// v2: Bluebird
m.makeX()
  .then((x) => [x, s.makeY(x)]) // :|
  .spread(s.makeZ)              //
  .then(console.log)

// Monadic flatMap API
// v1: scoping hell
m.makeX()
  .then((x) => Promise.all([x, m.makeY(x)])) // :(
  .then(([x, y]) => m.makeZ(x, y))           //
  .then(console.log)

// v2: callback hell
m.makeX()
  .then(x => m.makeY(x).then(y => m.makeZ(x, y))) // :(
  .then(console.log)

// v3: combo hell
m.makeX()
  .then(x => m.makeY(x).then(y => [x, y])) // :(
  .then(([x, y]) => m.makeZ(x, y))         //
  .then(console.log)

// v4: splitting with A+
let py = m.makeX()
  .then(x => m.makeY(x))

let pz = Promise
  .all([px, py])
  .then(([x, y]) => m.makeZ(x, y)) // :(
  .then(console.log)

// v5: splitting with Bluebird
let py = m.makeX()
  .then(x => m.makeY(x))

let pz = Promise
  .all([px, py]) // almost ok
  .spread(m.makeZ) //
  .then(console.log)

// Monadic API with Async-Await
async function sample() {
  let x = await m.makeX()
  let y = await m.makeY(x)    // :)
  let z = await m.makeZ(x, y) //
}
sample().then(console.log)

// Streaming map API
// scoping hell
o.makeX()
  .map(x => [x, s.makeY(x)])      // :(
  .map(([x, y]) => s.makeZ(x, y)) //
  .subscribe(console.log)

// Streaming flatMap API
// v1: combo hell
o.makeX()
  .flatMap(x => o.makeY(x).map(y => [x, y])) // :(
  .flatMap(([x, y]) => o.makeZ(x, y))        //
  .subscribe(console.log)

// v2: callback hell
o.makeX()
  .flatMap(x => o.makeY(x).map(y => o.makeZ(x, y))) // :(
  .subscribe(console.log)

// v3: splitting
let x$ = o.makeX()
let y$ = x$.flatMap(o.makeY)
let z$ = y$.withLatestFrom(x$, o.makeZ).switch() // :|
z$.subscribe(console.log)
```

I hope it's clear why I use the "hell" noun. Described cases are not *that* unreadable
but they will grow cancerously each time new dependency arrives. I have no space
to prove it so I urge you to either do it yourself or take my word.

Observables and Bluebird promises really benefit from having extended API.
This API reduces the problem but you still need to manually marshal the variables
trough the scope.

The problem with splitting is that you are forced
to define streams or promises you normally wouldn't and pollute the outer scoping
with useless variables. For the benefit of fixing the inner.

## Test 3

Branching sequence again. Let's combine Monadic and Streaming APIs.

#### test3.js

```js
// node --harmony-async-await test3.js

let s = require("./sync2")
let o = require("./streaming2") // using o.makeX
let m = require("./monadic2")   // and m.makeY with m.makeZ

// Streaming + Monadic map API with Async-Await
// no scoping hell
o.makeX()
  .switchMap(x => {
    async function sample() {
      let y = s.makeY(x)   // :)
      return s.makeZ(x, y) //
    }
    return sample()
  })
  .subscribe(console.log)

// Streaming + Monadic flatMap API with Async-Await
// no scoping hell
o.makeX()
  .switchMap(x => {
    async function sample() {
      let y = await m.makeY(x)   // :)
      return await m.makeZ(x, y) //
    }
    return sample()
  })
  .subscribe(console.log)
```

## Discussion

It's possible to combine Streaming and Monadic APIs and it may relieve us
from a choice between scoping and callback hells. I apologize in advance for possible typos in the code
snippets above. I may have time to test it later.

Here and below, referring to Monadic API I will keep in mind Async-Await version because it's clearly superior
(among monadic ones).

What we gain and what we lose by S + M combination?

We lose reactive primitives (think `debounce`) inside of the dataflow.
But the thing is – we don't need them there!

Streaming API is perfect to combine inputs from many sources, debouncing and merging stuff.
It's not the best for data transformations because of demonstrated scoping complexity.

Transformational logic is better expressed with Monadic API.

I won't insist, but I'm also starting to think that imperative(-looking) code
expresses side-effects better than declarative. Do-syntax in Haskell is beautiful
and async-await is comparably clean.

Who is ~~guilty~~ proud of making the major volume of side-effectful code? DevOps guys... ~~Perl~~ Ruby guys.
Are we sure they are so stupid to constantly prefer imperative languages for their everyday tasks?

By S + M combination we keep **ok** and **error** Promise or Stream branches
and the corresponding logic in one place. It's not going to be scattered across the file(s).

We obviously need to separate logic and effects for testing purposes (at least).
The `sample` function is executed immediately and messes the separation:

```js
o.makeX()
  .switchMap(x => {
    async function sample() {
      let y = await m.makeY(x)   // :)
      return await m.makeZ(x, y) //
    }
    return sample()
  })
  .subscribe(console.log)
```

But this does not:

```js
o.makeX()
  .switchMap(x => async function() {
    let y = await m.makeY(x)   // :)
    return await m.makeZ(x, y) //
  })
  .subscribe(console.log)
```

A promise thunk can be delivered and executed whenever it fits.
It's much easier to cut the sink than mock every library with side-effects
for testing purposes.

Another possible way to fix scoping is language support. The are [experimental
languages](https://www.youtube.com/watch?v=R2Aa4PivG0g) where reactivity is not an afterthought.

I'm sure it's also possible to add syntactic sugar on top of observables.
Unfortunately, as the latter are not even standardized yet, it will be a question for a distant future.

The only project which explored S + M in depth was Elm. I say *was* because the current version of it is not about streams anymore.

Elm always had half-baked `Signals` which weren't [first-class](https://en.wikipedia.org/wiki/First-class_citizen) streams.
You couldn't return a `Signal` from a `Signal` so crucial `flatMap` functionality were missing.
Instead of adding it (and to "simplify things") it's authors decided to ditch extensible reactivity
alltogether.

Now Elm is basically Emitter API + Monadic API which is a weaker (yet arguably simpler) version of the predecessor.
Emitters arent that good for reactivity: they are not composable. Just as signals, they
are not first-class time-handling primitives.
