---
title: "React Notes II: hooks are a big deal!"
createdAt: 2018-11-01
editedAt: 2018-11-01
tags: [React, Vue]
intro: |
  React hooks are gonna be a dealbreaker. Here I overview the releases of React, predatings hooks. 
  Then I compare React and Vue and show why hooks are a better unit of composition than the lifecycle events.
  The final point is to see how all this is related to the FP paradigm.
---

React 16.7 is going to come up with something called [**Hooks**](https://reactjs.org/docs/hooks-faq.html).
This set of features, I believe, will not only change everything we know about this library, but will
ripple through the entire frontend ecosystem. Some people already use the "hype" word and we are only
at prerelease stage... As for *yours truly*, he finds both the idea and new API **epochal** in a few aspects at once.

By the way, I was pleasantly surprised by the tone of that announcement article. They clearly stated the problem
and took their own responsibility for the bad parts. Facebook was always good at diplomacy, of course,
but this time it felt different and honest. The community reaction was also much more friendly
and positive than one could expect. I guess we all grew up in recent years.

Thhe technical nuances of Hooks won't be covered here – the above link is comprehensive. As previously,
I simply record my purely subjective view on the evolution of React and its competitors.

## React vs Vue

Arguably, React didn't see a significant change since 16.0. Let's see briefly:

* 16.0 React Fiber, SSR streaming, error boundaries, arrays in `render`, portals
* 16.1 maintenance release
* 16.2 maintenance release
* 16.3 some `ref` improvements, new context API
* 16.4 maintenance release
* 16.5 maintenance release
* 16.6 maintenance release

16.0 was great but subsequent versions brought mostly bugfixes. Nothing interesting for a **year**!
Finally irritated by event renamings and the whole stagnation I even started to learn VueJS – not
with a goal to switch but to see how everything's going there.

In the [previous post](https://paqmind.com/blog/react-notes-1/) I argued that React looks
more like a framework than a library. And now I double down on that claim.
React has event handling, components, and virtual DOM. Vue has event handling, components, and
virtual DOM. React ships with state management and error boundaries. Vue ships with state management
and error boundaries. Both have similar concepts of props, default props, prop types, etc. Notice something?

I can even tell you this: Vue is more convenient, precise, and elaborate as a **View layer**. It has
tons of built-in helpers, and how React does not include [Classnames](https://github.com/JedWatson/classnames/pulls)
or its analogy is beyond my mind. Endless micro-imports are tiresome and auto-import magic is not safe.
I simply do not understand why a supposedly "View layer" should provide loading, caching, typing out
of the box and don't have those little necessary helpers built-in.

Back to the point. I never used Angular so I was sure Vue templates will become a barrier – I hated
the look. But, in just 10 or 15 minutes of reading the docs I kinda felt their old-school PHP-like appeal.

Vue team fully exploits the benefit of following the leader – they took into account which
solution worked well for React and which did not. I've heard a lot about Vue being more
polished and it was hard to believe that community-driven project will beat a corporate one ergonomically.
Yet it turned out to be true.

React docs are great but Vue docs are fantastic, maybe the best I have ever seen. The tooling is awesome.
Vue itself feels very Ruby-like: tons of special cases, exceptions, shortcuts. That's probably the reason why it's so
popular among rubyists. I'm not a huge fan of this style but I learned to appreciate its humanistic nature.
Our natural languages are full of exceptions, contradictions, duplications and there is nothing wrong
with that. For some reason we find artifical languages e.g [Toki Pona](https://en.wikipedia.org/wiki/Toki_Pona)
sinister and repulsive even when their authors tried their best to make them look nice and friendly.

Speaking of downsides, my opinion of Vue having like zero new ideas was confirmed. They clearly take
"no risk" path and put all their talent into implementation rather than invention. We naturally expect
smaller teams to be more, you know, *adventurous* than bigger (especially corporate) ones. Check
CycleJS, Hyperapp, Svelte. They all came with new (sometimes revolutionary) ideas. But that's
definitely not the case with VueJS devs which act more like wonderful imitators. And maybe that's the
actual recipe of success on a budget, so I don't blame them at all.

To underline, React and Vue are on par and the whole fact that a community-funded project got so far
is nothing short of amazing. But this Hooks thing changes everything... React team is going to reestablish
their leadership and Vue has nothing to answer, except of that old copy-paste trick.

## FP breakthrough

Lifecycle events were always terrible, probably the worst part of React. The amount of code repetition
and composition problems they cause is tremendous. I could find my comment from like 4 years ago, at
the dawn of React era, where we discussed lifecycle events and I said this architecture won't last
longer than 5 years. To be fair, I thought one of competitors will pick that up as I didn't believe it was possible to
recover from the architectural damage.

I think React team made a mistake announcing the Suspense API before Hooks. At first, I was unpleasantly
amazed with those "effects in render". Taken out of context, it clearly sounded like a bad idea and
saddened me for a few days. In the context of **render removal** hovewer, it all started to come together.
As soon as I took a look at 16.7 drafts, I changed my negative opinion about the Suspense.

Now Hooks are going to reshape a lot of things in React and the related ecosystem.
I sympathise Inferno, Preact and other React clones – those guys should be out of their
minds. Poor Inferno devs only managed to implement fragments (very long ticket) and now this...
Something tells me React cloning will go out of fashion.

Hooks may seem global and magical but they are not – like I said [on Twitter](https://twitter.com/IvanKleshnin/status/1056127938750570497)
"the magic is exposed, not added". For me, the best part of Hooks is that they are getting us one
step closer to pure FP with its testability and predictability. We're not ready yet but I won't
be surprised to see alrebraic effect in React in the future. [ForgeFX](https://github.com/briancavalier/forgefx),
[FolkTale](https://github.com/origamitower/folktale/issues/176) and other (very smart) people are already
exploring the possibilities.

It's remarkable how frontend community replayed almost the whole history of programming in just a
few years. We started procedurally with jQuery, switched to OOP and components, struggled  with mixins,
discussed multiple inheritance, argued about types vs tests. And now we're moving to functional and
logic programming.

All that reminds me of [Recapitulation theory](https://en.wikipedia.org/wiki/Recapitulation_theory),
which is largely debunked but still holds a lot of truth. I'm curious why it happens exactly in the
frontend industry. Mobile and blockchain devs seem to enjoy their *precious* OOP. Strange.

The bad news (as if we need them) are that Haskell is stuck with its design decisions and heavy legacy,
and Haskell-like languages (Elm, PureScript) are kinda stagnating and show little growth.
So Scala remains the mainstream FP and its eye bleeding, inline syntax is reproduced in TypeScript
and ReasonML. I'm not sure how we'll be able to overcome this.

---

In the next article I'd like to compare the approaches to create reusable React components. All
articles I checked on this topic don't draw a line between different types of code (like logic and
presentation), which is a big overlook in my opinion. And, of course, those articles were written before
Hooks so their state of the art thing was **Render Prop**.

Hooks will certainly be a superior solution to share logic but it's not immediately clear
which solution one should apply dealing with mixes of multiple domains. At which point one should
adopt render prop, layout pattern or extract hooks? I'm thrilled with the opportunity to investigate
all that and you're, probably, too. Thanks for the reading!
