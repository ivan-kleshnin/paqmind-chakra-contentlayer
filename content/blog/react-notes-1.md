---
title: "React Notes I: a framework or a library?"
createdAt: 2018-03-05
editedAt: 2018-03-05
tags: [React]
intro: |
  React is officially a "library" but has been repeatedly called a framework. 
  Who's right and what is this tool, really? The article evaluates arguments of all sides,
  compares objective facts, and shows why, eventually, it's more than a purely pedandic question.
---

In this series I'd like to share my thoughts about React, its story, ecosystem, and some peculiarities
I never saw mentioned anywhere. Given the significant presence of Facebook in the industry, I think
it should be useful to discuss a thing or two. As always, I'm going to drop some medical doses of
skepticism. Which never hurts in the atmosphere of excitement about frameworks and everything.

**What is React?** to begin with. Most developers will tell you, without a second of delay, that it's
a "view library". The current positioning is clear:

> A JavaScript library for building user interfaces<br/>
> [reactjs.org](https://reactjs.org/)

Now I don't say it's a completely false claim. I'm just thinking there's more to that.
What if told you that, few things being different, you'd have a *sure image* of React being
a "framework"? Or even a "platform"?

I guess we should start from definitions. There are no "official" ones, so I'll put my own.
With all reservations, and in general:

#### Frameworks

1. Represent an unfinished, blank state application. A blueprint.
2. Are more high-level, compared to library alternatives.
3. Are therefore more opinionated.
4. Are not compatible <small>(one framework per app, unless stacked)</small>.
5. Have lower reusability <small>(used to build apps, rarely – other frameworks)</small>.
6. Often require some *out of the code* contracts <small>(like file/folder layout)</small>.
7. Can introduce and promote additional conventions <small>("best-practices")</small>.
8. Hold and/or describe an application state/context.
9. Often provide an additional tooling: loggers, debuggers, etc.
10. Never provide "system"-level hooks for error handling, persistence, etc.
11. Can ship additional libraries within.
12. Usually form their own ecosystems <small>(of compatible libraries)</small>.

#### Libraries

1. Represent some code solution to a problem. A building block.
2. Are more low-level, compared to framework alternatives.
3. Are therefore less opinionated.
4. Are compatible <small>(unlimited libraries per app)</small>.
5. Have higher reusability <small>(used to build apps, frameworks and other libs)</small>.
6. Don't require *out of the code* contracts. API is the only contract you follow.
7. Rarely introduce additional conventions <small>("best-practices")</small>.
8. Don't hold or describe an application state.
9. Rarely provide an additional tooling: loggers, debuggers, etc.
10. Never provide "system"-level hooks for error handling, persistence, etc.
11. Don't ship additional libraries within.
12. Don't form their own ecosystems <small>(belong to more general one)</small>.

Both lists are approximate. While it's certainly possible to find some exceptions –
it won't refute the point. Express is a framework yet there are some [frameworks](https://expressjs.com/en/resources/frameworks.html)
built on top of it. And there are libraries so thick and obtrusive you have to basically wrap your
whole app around them. The conclusion, we're going to make right now, is that frameworks
and libraries are clearly different things and middleground is relatively rare, hence worth an attention.

We can also try to describe a less understood concept of **Platforms**.

#### Platforms

1. Represent some environment to run apps.
2. Usually sit in the lowest logic level, though can provide some high-level APIs.
3. Are highly opinionated, all platforms are very different.
4. Not composable. Provide a structure to run or compose apps.
5. Are used to build apps, frameworks and other libs on top of them.
6. Usually require additional contracts: file extensions, folders, etc.
7. Often introduce additional conventions <small>("best-practices")</small>.
8. Don't hold or describe an application state.
9. Almost always provide an additional tooling: loggers, debuggers, etc.
10. Provide "system"-level hooks for error handling, persistence, etc.
11. Ship additional *standard* libraries within.
12. Always form their own ecosystems.

As you can see, Platforms are quite interesting beasts. Having the lowest level of all three,
they share surprisingly many commonalities with Frameworks. Don't ask me why – I'm also puzzled!

We can certainly find more differences and similarities. With libraries, for example,
you tend to develop your main (glue) code bottom-up. With frameworks it goes top-down.
It's an engineering, paradigmal and even cultural shift – to go from one to another.
So the question of "where X belongs" is quite important in my opinion.

Two minutes of subjectivity. What do I think about frameworks vs libraries personally.
There is a statement, I like a lot:

> Everything should be built top-down, except the first time
> &mdash; [Yogi Berra](http://www.azquotes.com/quote/1235348)

The problem with frameworks is the violation of the "first time" part. You may think that other people
did something close to your app in the past, so it's a shame not to reuse their code.
Which may be partially true, but...

The higher is the code level, the less is a chance of its successful reuse. Compare those functional helpers
in Ramda with your CSS rules, to get an idea. And there's a downward trend, when you consider a
natural code evolution. Different business requirements, target audiences, management rules
will cause different architectural decisions, performance tradeoffs, vendor choices, etc.
Your project matures by absorbing unique features. So frameworks fit generic, learning, sandbox apps
the best. Not something we're most concerned about.

There is another cool quote:

> Framework – A product with the business logic removed, but all of the assumptions left in
> &mdash; [Devil's Dictionary of Programming](https://programmingisterrible.com/post/65781074112/devils-dictionary-of-programming)

Sad truth is that some frameworks don't even bother to remove that "business logic". They ship it
proudly.

Personally, I prefer libraries over frameworks because the apps I develop tend to be quite unique.
Every time it's like the first time in some sense, and only the flexibility of libraries allows me to
achieve the architecture I want without compromises.

Just an opinion. Your experience and preferences may vary, of course, – I have nothing against that.

## Framework or Library

Let's try to objectively assess React against the qualification points we've listed above.
Framework, Library, and Platform "scores" are shown correspondingly as `number:number:number` below.
As some of attributes coincide, you should probably treat that scores as percentages.
It doesn't pretend to be scientific or statistically accurate, so don't call me out on that.

1\. React components clearly try to be an alternative to Web Components which were designed to
represent composable applications. `0:0:1`

2\. React components are high-level units. They always include render (View part) but also
can hold state (Model part) and hooks (Controller part). `1:0:1`

3\. React is very opinionated. Components span multiple layers of logic, you can't create your own hooks,
even damn JSX is optional only in theory. `2:0:2`

4\. React is compatible with other frameworks and libraries. `2:1:2`

5\. React components aren't usable outside of React. `3:1:3`

6\. React components don't require non-code contracts. `3:2:3`

7\. React introduces a lot of conventions: `components` folder, `jsx` extension, capitalized
file names, etc. `4:2:4`

8\. React components can contain application state. `5:2:4`

9\. React provides an additional tooling: devtools, etc (see below). `6:2:5`

10\. React 16.2 got a hook for error handling. `6:2:6`

11\. React used to ship `prop-types` (internal type system!).  Don't forget JSX, GraphQL
(another type system)... `7:2:7`

12\. React definitely has its own ecosystem.

Now, not all the points share the same significance, of course, but there are too many framework and platform
attributes in React to simply ignore them. Facebook's own definition of React being a Library does
not pass our reality check.

The same goes for React being "just a V in MVC". React obviously has features of all three. Try to argue,
for example, that `this.state` isn't a Model or lifecycle events aren't a part of Controller.

Looking back at the points, I find the 8-th one most important. Whenever your app state is described,
held, and managed inside React's component – you deal with a framework, hands down. Still even
with state being extracted to Redux, Mobx, etc, you have `6:3:7` implying a mixture of everything.
The 10-th is also notable because it confirms React devs clearly see its components as
micro-apps (MVC my dude).

Wait, is it even possible for a software to be a framework, a library, and a platform at the same time?
Maybe we got some premises wrong? Well, no. Take a look at [Elm project](http://elm-lang.org/)
which positions itself as a Language. Is it only a language though?

Everybody seems to agree that Elm is a language, a platform, and (since "Elm architecture") a framework as well.
PureScript is arguably a language with some platform signs. Don't know about you, but I definitely
feel a trend to blur the established boundaries between those definitions. Well, Erlang was big on
that a long ago – nothing new under the sun.

I think we should take a brief historical overlook to see how React and the whole ecosystem changed
over years. It will add a few notes to our discussion, and I'm going to refer to some milestones later.

## React in retrospective

**Year 2013.** Everyone is obsessed with Web Components and praises Google's Polymer.
People count days until they're able to switch to this "New Era of Web Development" :) Then,
*suddenly*, Facebook releases React... Its components are named so to antagonize Web Components.
Its architecture and the whole approach screams "Framework". Now everyone is intrigued by Framework Battle.

Polarized opinions about JSX and everything rapidly change each other. Closer to the end of the year,
some common ground is set: "View problem" is finally solved, thanks to VDOM, yet something is
broken about the state handling in React. As component state is obscure you have tons of problems
with testing, scaling, etc.

**Year 2014.** Facebook begins to sneakingly reposition React as "just a library for the View layer".
Flux appears. It's so terrible, people immediately jump into writing their own implementations.
Fluxxor, Flummox, Fluxible, Fluxify, Fluxury, Reflux... Some people suggest RxJS and
[reactive programming](https://www.youtube.com/watch?v=1zj7M1LnJV4) which Facebook devs reject as
"too hard". *Calm down* – they say – *React is not even reactive. We had to name it differently...*

Similar processes take place in other communities. Clojure's Om, Reagent and Quiscent
gain a significant traction. Instead of reactivity they bet on the old-school CSP to "Solve the Async".
Things don't go nearly as smooth as they claim, yet, taking advantage of the moment, David Nolan and co.
are able to convert some newbies to the LISP Church. At the first time in history, JS community
gets an interest to something other than *frameworks*, namely *state management* tools.

**Year 2015.** Situation with Fluxes spirals out of control. A guy, named Dan Abramov, succeeds to port
a part of Elm architecture to JavaScript. The library is named Redux. At the moment,
Dan is already an authoritative React developer with two mainstream React libraries in portfolio. So
Facebook's HR picks him. They obviously promote Redux as "an improved Flux", like if they had something
in common ;)

People keep experimenting with state management tools. Many claim something like "React solved View,
my lib gonna solve Model!". Inspired by Clojure and Elm toolkit, Baobab, Cerebral and some other
state management solutions are created. Andre Staltz makes a few historical [speeches](https://staltz.com/blog.html)
about the frontend architecture.

**Year 2016.** Redux starts to dominate React ecosystem, obsoleting the "Flux line" of competitors.
Its ecosystem absorbs more and more weirdly named and strangely purposed libraries. The anti-pattern of
patching a broken composition with specialized libraries (popularized by Gulp) destabilizes Redux
ecosystem. Now you have to juggle Action Types, Middlewares, Creators, Thunks, Sagas, Dispatchers and
whatnot at the same time to make your TODO app :)

Meanwhile, in Google, twice beaten and humiliated by Facebook, devs become desperate. Angular is almost
a negative meme at the moment – slow, overcomplicated, ridiculous. Articles like ["Why I switched
from Angular to React"](https://medium.com/@jrwebdev/migrating-an-angular-1-application-to-react-8891ec73d462)
turns into a new genre. To counter that, "novel and improved" Angular-2 is released. Just as with
Flux and Redux it barely resembles its predecessor. Community splits in half, with many people
feeling devastated about their skills dropped to zero.

**Year 2017.** Redux is winning and stagnating at the same time. GraphQL + Relay slowly gain exposure
and some big players, e.g. GitHub are switching, making some people question their Redux choice.
Disappointed by clunky and overcomplicated Redux ecosystem, developers pay attention to alternatives
again. Some old-school frameworks, like VueJS grow massively, capturing the "renegades" of React.
MVC is going through another renaissance with the next wave of Elm clones and everything.

Angular-2 kinda [fails](https://news.ycombinator.com/item?id=13081833). Angular-3 is never published.
Finally, Angular-4 is in the house with some improvements yet [without](https://medium.com/@chriscordle/why-angular-2-4-is-too-little-too-late-ea86d7fa0bae)
a strong reason to switch.

Anyway, the case of Big Four is established. Angular, jQuery, React, and VueJS now have a significant
inertia to dominate an industry for a year or two, at least.

**Year 2018.** The history is to be written.

**Update**: React devs reveal they want to create a
["React Compiler"](https://twitter.com/trueadm/status/944908776896978946). Not a surprise, recalling
that Angular and Ember did a few steps into the same direction. Alternative host language
(probably an entirely new one) for CycleJS is a [consideration](https://github.com/cyclejs/cyclejs/wiki/Roadmap)
as well. Which confirms some of our previous paragraphs.

May sound extreme today, but I think "React language", "Angular language", etc. have higher than zero
[possibility](https://twitter.com/sebmarkbage/status/964677876879536129). Don't be too excited though.
For you, as a developer, it will mostly mean more ecosystem fragmentation, impenetrable vendor lock-ins,
and even more corporate influence over you career.

**Update**: at JSConf2018 Dan Abramov announces a bunch of changes to React internals (context and fetch
APIs) which may obsolete Redux.

**Update**: looks like Redux repeats the history of Flux, as were predicted:

> Rematch is Redux best practices without the boilerplate. No more action types, action creators, switch statements, sagas or thunks.<br/>
> [https://github.com/rematch/rematch](https://github.com/rematch/rematch)

> A React-Compatible fork of Hyperapp, inspired by Elmish, Elm, Redux, etc. Working with any vdom library!
> After trying Fable + Elmish for several month, I need to write a small web App in my company, for many
> reasons I cannot choose some fancy stuff like Fable + Elmish, simply speaking, I need to use the
> mainstream JS stack but don't want to bear Redux's cumbersome, complex toolchain anymore.<br/>
> [https://github.com/hydux/hydux](https://github.com/hydux/hydux)

---

What follows from that overview?

1\. The perception of any software product (any product really) depends on its positioning.
React, in particular, could be positioned in either of 3 ways quite reasonably.

2\. Perception may change over time. I personally believe Facebook's own perception of React
changed dramatically in those five years.

3\. Your usage patterns of a software product are determined by your perception.
A wrong perception will probably lead you intro troubles.

So, let's say, we can use React mostly as a library or mostly as a framework.
Both ways have their pros and cons. What happens when you lose the distinction between two?
[Component-based state management](http://jamesknelson.com/component-based-state-management-react/)
and grotesques like that. *React is a view layer!* – you say? So how did you start to code your
app in XML, my friend?

An unclear positioning leads to a wrong perception. There is no problem with Erlang being a language,
a server, and whatever else at the same time, as Erlang users were aware of it and used to it from
the start. There is a big problem though, with React being a framework in disguise.

People are silently torn between *"React is just a view library"* and *"Structure your app around components"* mutually
exclusive points of view. They don't even see the problem, wasting their lifetimes on things that
will never be good. I'd like to shed some light on it, in particular, because I respect those people.

In the next article, we'll take a thorough look at React components which really are at the center
of the problem. Their critical exposure, I think, is a long overdue.

