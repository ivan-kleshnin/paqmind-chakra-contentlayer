---
title: Disappointment in Go
createdAt: 2022-06-15
tags: [Go, Deno]
intro: | 
  Some reflections on my week of experience learning Go. It's far worse than I expected and 
  I'm not going to continue. 
---

So I've spent about 5 days making myself familiar with Go. From what I heard before, 
I expected this language to be simple, somewhat limited but "fun to use".

Oh, the unfortunate reality! A lot of work was clearly put into the compiler, the toolkit. 
But Go itself feels like a draft, a sandbox of a language with weird conventions and a 
stunning lack of type safety. 

Capitalization is used to denote public-vs-private instead of universally idiomatic type-vs-value. 
Who would come up with such an idea? Like naming variables wasn't one of the hardest task already...

An example of a larger issue is that there's no way to mark object properties required. If omitted, 
the properties will be reset to "null values" for corresponding types. The official "solution" is 
to prevalidate or postvalidate (falling back to dynamic types). Or to make factory functions with 
positional args. Like, seriously? 

> This isn't something we need in the language.
> <cite>https://github.com/golang/go/issues/28348</cite>

Critics like to repeat a phrase that "Go denies decades of academic research". 
From a practical perspective I can tell that Go forbids a lot of things I use daily in TypeScript.

There're no type constants, no HO functions, no unions / sum types (omg), no tuples, no generics... 
And, sorry, I don't buy the argument that generics are an "Advanced Feature". Unlike HKTs or 
conditional types, generics is just an abstraction one level above the ground.

To not bloat the post I can share a good article from a guy who spent much more time learning Go:

> Golang is not a good language.
> <cite>https://xetera.dev/thoughts-on-go/</cite> 

I largely agree with the message except, maybe, the final recommendation to "use Rust" – as it's a language of a different niche.

I can see how Deno will expand and outcompete Go which, at this point, is just a more civilised Ruby. 
RoR developers switching to Go at least make sense (dynamic -> static types). It's much harder to 
imagine Deno devs doing the same.

Latest Deno releases are on par with Go performance and TypeScript is simply a better language with 
larger audience. It's good that the Go team finally started to listen to feedback and considers to 
add some of the above features. But it will be hard to do that now, in a backward compatible way. 

Speaking about architectures, I believe, it's easier to workaround CPU bottlenecks – that Node and 
Deno may suffer from – than crippling design limitations arising from a rudimentary type system of Go. 
No union types => different model & API design, it's hard to argue with that.

According to one resource, the expected "average salary" of Go developers is $75k in comparison to 
$55k of TS/Node. Considering the above it looks like a temporary glitch that will flatten relatively 
soon. Hence my advice to newcoming programmers (happen to read this, and interested in Backend / API 
development) would be to consider Node+TS or Deno.
