# Quest for a good UI library

Quick notes for myself.

### MUI

- Emotion based :memo:
- Large ecosystem :thumbsup:
- A lot of components :thumbsup:
- Also hooks and utils :thumbsup:
- The most overused UI in history :fearful:
- Typography handling is abysmal. Single component for every text piece = tons of tag noise :fearful:
- Propose to bundle a markup parser to style markdown- or html-sourced tags :scream:
- Text components are composable :thumbsup:
- Typed props :thumbsup:

### Mantine

- Emotion based :memo:
- Some ecosystem :neutral_face:
- A lot of components :thumbsup:
- Also hooks and utils :thumbsup:
- Fresh look, no focus borders :thumbsup:
- Provides the `Typography` wrapper which is a proper way to solve MUI's problem :thumbsup:
- Component styles are inconsistent, a lot of minor visual bugs :disappointed:
- Text components are not composable :scream:
- Theme API feels unfinished, different hacks are necessary to override different pieces :thumbsdown:
- Typed props :thumbsup:
- A lot of bugs caused by multiple style-passing modes `sx`, `style`, `styles`. 
Sometimes props are merged, sometimes – completely replace defaults. In the same circumstances, without any visible system. :fearful:

### Tailwind

- No deps :thumbsup:
- Large ecosystem :thumbsup:
- Simple working model, upfront compatible with every new framework :thumbsup:
- Abysmal API, class soup :vomiting_face:
- All CSS props are renamed to fit class-based system, have to learn hundreds of new names and shortcuts (instead of 10-20 components) :fearful:
- Unlike props, classes are just untyped strings :thumbsdown:

### Chakra

- Emotion based :memo:
- Some ecosystem :neutral_face:
- Simple component-based API (the best of the above IMO) :thumbsup:
- Typed props :thumbsup:
- ...Exploration in progress...

## Hatelist

1. Non-composable text components. For example when `<Code><Anchor href="#">test</Anchor></Code>` produces
a link with non-monospaced font. `Anchor` should NOT set font weight, font family, etc! Mantine suffers from 
this issue.

2. Bloated theme objects. Everything high-level gets very subjective. E.g. the library forces you to
define `textFontFamily`, `headerFontFamily` but then you need a different blockquote font family
and it's now defined in the component (at best) so it's styled differently from other typographic pieces
and it 100% will cause bugs are waste your time at some point in the future. The less assumption UI library
makes about theme structure – the better. Remember React-Bootstrap where you could only style buttons as `danger | sucess | info | warning`.
Yes, you could select 1 of 4 predefined constants and good luck if you needed something else! This is the same problem of type abuse that make
system rigid and non-adaptable to the custom conventions (which exist in every project!)

3. When spacing or numeric constants are required. Mantine suffers from it. Why people prefer `size={16}`
or (worse) `size="sm"` over `size="1rem"`?! The latter is universally readable, auto-scalable and
extendable. If at some point you realize you need `1.25rem` size – you just use it. With constants
you'll have to extend scale table and then, potentially replace thousands of values like `sm -> md`
because the list was shifted :scream: At the end you'll end up with shitty names like `5xl` or `xxxxl`.
MUI and Chakra partially suffer from it as well.

4. Overriden `Flex` and `Grid`. Library authors, I beg you not to substitute standard CSS layout names
with your own ~smarter~ stupid components `Grid columns={4}` – if this `Grid` does not support `templateRows="repeat(4, 1fr)`.
You can make a higher-level `Grid` component with simple API. Just don't call it `Grid.` MUI and Mantine suffer from it. 
:vomiting_face: Same goes for flex-based grids. Wake up, it's 2022 and flex `gap` is supported almost everywhere!

5. MUI-like typography with a single `Typography` component.

Compare "outdated":

```
<h1>Title</h1>
<p>
  First paragraph with <strong>bold text</strong>
</p>
```

and "improved" versions:

```
<Typography variant="h1" component="h1">Title</Typography>
<Typography component="p">
  First paragraph with <Typography component="strong" variant="bold">bold text</Typography>
</Typography>
```

Only a sociopath could invent (and promote) something like this, looking at you MUI authors. Mantine solves this particular problem properly:

```
<Typography>
  <h1>Title</h1>
  <p>
    First paragraph with <strong>bold text</strong>
  </p>
</Typography>
```

Unfortunately, Mantine is full of bugs so the following will look differently:

```
<Typography>
  <Title>Title</h1>
  <Text component="p">
    First paragraph with <strong>bold text</strong>
  </Text>
</Typography>
```

with misplaced distances between `h1` and `p`, etc. 🤷‍♂️
