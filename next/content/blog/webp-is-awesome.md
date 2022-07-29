---
title: WEBP is awesome
createdAt: 2019-09-09
editedAt: 2019-09-23
tags: [Performance]
intro: |
  I have long ignored the presence of WEBP format. *Yeah, sure, it would be good to have site images
  10% or 20% smaller...* – I thought. Considering WEBP had abysmal browser support
  back then, I didn't even bother to check it in more details. Boy, was I surprised yesterday!
---

I have long ignored the presence of WEBP format. *Yeah, sure, it would be good to have site images
10% or 20% smaller...* – I thought. Considering WEBP had abysmal browser support
back then, I didn't even bother to check it in more details. Boy, was I surprised yesterday!

It was hard to believe when I first saw the numbers. *There should be a mistake*
– I thought. You can't really take a compressed file like JPG or PNG and compress
it several times more without a huge quality drop. Or can you?

I performed a small suit of tests and the results are below in all their glory.
The wins aren't like 20% or even 30%. They are more like 80% to 90%, whatever it means.

As many others, I thought of WEBP as of a strictly lossless format.
In fact,  it can be lossy or lossless just like JPG or PNG.
The below tests are taken with [webp-converter.com](https://webp-converter.com/)
at 50, 75, 90, 95 and 99 leves if IQ (image quality). The original is JPG or PNG
at 100% IQ. Which, of course, is still a compressed image data.

## Texture

Let's start with the texture we use in the current site design.

### Quality 99%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/feathers.png" target="_blank">
      <img src="/blog/webp-is-awesome/feathers.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/feathers99.webp" target="_blank">
      <img src="/blog/webp-is-awesome/feathers99.webp"/>
    </a>
    <div>no visual difference<br/>166Kb &rarr; 62Kb</div>
  </div>
</SimpleGrid>

### Quality 95%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/feathers.png" target="_blank">
      <img src="/blog/webp-is-awesome/feathers.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/feathers95.webp" target="_blank">
      <img src="/blog/webp-is-awesome/feathers95.webp"/>
    </a>
    <div>no visual difference<br/>166Kb &rarr; 45Kb</div>
  </div>
</SimpleGrid>

### Quality 90%

<SimpleGrid spacing="2rem" columns={2}>
  <div >
    <a href="/blog/webp-is-awesome/feathers.png" target="_blank">
      <img src="/blog/webp-is-awesome/feathers.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/feathers90.webp" target="_blank">
      <img src="/blog/webp-is-awesome/feathers90.webp"/>
    </a>
    <div>no visual difference<br/>166Kb &rarr; 29Kb</div>
  </div>
</SimpleGrid>

### Quality 75%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/feathers.png" target="_blank">
      <img src="/blog/webp-is-awesome/feathers.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/feathers75.webp" target="_blank">
      <img src="/blog/webp-is-awesome/feathers75.webp"/>
    </a>
    <div>not usable<br/>166Kb &rarr; 5Kb</div>
  </div>
</SimpleGrid>

### Quality 50%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/feathers.png" target="_blank">
      <img src="/blog/webp-is-awesome/feathers.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/feathers50.webp" target="_blank">
      <img src="/blog/webp-is-awesome/feathers50.webp"/>
    </a>
    <div>not usable<br/>166Kb &rarr; 2Kb</div>
  </div>
</SimpleGrid>

My choice here is 90%. 166Kb &rarr; 29Kb: 83% leaner!

## Avatar

How the algorithm handles faces? Magnificently.

### Quality 99%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/avatar.png" target="_blank">
      <img src="/blog/webp-is-awesome/avatar.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/avatar99.webp" target="_blank">
      <img src="/blog/webp-is-awesome/avatar99.webp"/>
    </a>
    <div>no visual difference<br/>72Kb &rarr; 17Kb</div>
  </div>
</SimpleGrid>

### Quality 95%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/avatar.png" target="_blank">
      <img src="/blog/webp-is-awesome/avatar.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/avatar99.webp" target="_blank">
      <img src="/blog/webp-is-awesome/avatar95.webp"/>
    </a>
    <div>no visual difference<br/>72Kb &rarr; 13Kb</div>
  </div>
</SimpleGrid>

### Quality 90%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/avatar.png" target="_blank">
      <img src="/blog/webp-is-awesome/avatar.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/avatar90.webp" target="_blank">
      <img src="/blog/webp-is-awesome/avatar90.webp"/>
    </a>
    <div>no visual difference<br/>72Kb &rarr; 9Kb</div>
  </div>
</SimpleGrid>

### Quality 75%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/avatar.png" target="_blank">
      <img src="/blog/webp-is-awesome/avatar.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/avatar75.webp" target="_blank">
      <img src="/blog/webp-is-awesome/avatar75.webp"/>
    </a>
    <div>quality drops<br/>72Kb &rarr; 4Kb</div>
  </div>
</SimpleGrid>

### Quality 50%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/avatar.png" target="_blank">
      <img src="/blog/webp-is-awesome/avatar.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/avatar50.webp" target="_blank">
      <img src="/blog/webp-is-awesome/avatar50.webp"/>
    </a>
    <div>not usable<br/>72Kb &rarr; 3Kb</div>
    <div>not usable<br/>72Kb &rarr; 3Kb</div>
  </div>
</SimpleGrid>

My choice here is 90% as well. 72Kb &rarr; 9Kb. 87% decrease. Holy Moly!
By the way, playing with numbers a bit more, I was surprised that I was usually
able to see quality drops with textures earlier than with faces.

## Tile

One last example. Another texture tile.

### Quality 99%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/brown.png" target="_blank">
      <img src="/blog/webp-is-awesome/brown.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/brown99.webp" target="_blank">
      <img src="/blog/webp-is-awesome/brown99.webp"/>
    </a>
    <div>no visual difference<br/>36Kb &rarr; 9Kb</div>
  </div>
</SimpleGrid>

### Quality 95%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/brown.png" target="_blank">
      <img src="/blog/webp-is-awesome/brown.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/brown95.webp" target="_blank">
      <img src="/blog/webp-is-awesome/brown95.webp"/>
    </a>
    <div>quality drops<br/>36Kb &rarr; 5Kb</div>
  </div>
</SimpleGrid>

### Quality 90%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/brown.png" target="_blank">
      <img src="/blog/webp-is-awesome/brown.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/brown90.webp" target="_blank">
      <img src="/blog/webp-is-awesome/brown90.webp"/>
    </a>
    <div>not usable<br/>36Kb &rarr; 2Kb</div>
  </div>
</SimpleGrid>

### Quality 75%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/brown.png" target="_blank">
      <img src="/blog/webp-is-awesome/brown.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/brown75.webp" target="_blank">
      <img src="/blog/webp-is-awesome/brown75.webp"/>
    </a>
    <div>not usable<br/>36Kb &rarr; 0.32Kb</div>
  </div>
</SimpleGrid>

### Quality 50%

<SimpleGrid spacing="2rem" columns={2}>
  <div>
    <a href="/blog/webp-is-awesome/brown.png" target="_blank">
      <img src="/blog/webp-is-awesome/brown.png"/>
    </a>
    <div>original</div>
  </div>
  <div>
    <a href="/blog/webp-is-awesome/brown50.webp" target="_blank">
      <img src="/blog/webp-is-awesome/brown50.webp"/>
    </a>
    <div>not usable<br/>36Kb &rarr; 0.24Kb</div>
  </div>
</SimpleGrid>

My choice here is 99%. 36Kb &rarr; 9Kb. This little texture turned out to be a
toughie to compress, with its crisp pixel-wide lines. This time I've got *only*
75% of decrease.

Hats off to the geniuses of computer science who made this possible.
