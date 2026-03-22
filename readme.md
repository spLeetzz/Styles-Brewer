# Styles Brewer

_Minimalist Tailwind clone._<br><br>
_Write Tailwind classes, Add one script, CSS loaded._

## Installation

Add this to your HTML `<head>`:

```html
<script
  src="https://cdn.jsdelivr.net/gh/spLeetzz/Styles-Brewer@master/src/main.min.js"
  type="module"
></script>
```

## How it works

1. Loads Tailwind preflight CSS.
2. Walks through each element, retrieving CSS classes.
3. Generates CSS for supported classes.
4. Pushes generated CSS into a `<style>` element.

---

## All supported utilities

`text` `bg` `font` `p` `px` `py` `pt` `pr` `pb` `pl` `m` `mx` `my` `mt` `mr` `mb` `ml` `w` `h` `min-w` `min-h` `max-w` `max-h` `gap` `gap-x` `gap-y` `border` `rounded` `block` `inline` `inline-block` `hidden` `table` `flex` `inline-flex` `grid` `inline-grid` `static` `relative` `absolute` `fixed` `sticky` `top` `right` `bottom` `left` `inset` `inset-x` `inset-y` `row` `col` `row-reverse` `col-reverse` `grow` `shrink` `basis` `items` `self` `content` `justify` `justify-items` `justify-self` `place-items` `place-self` `place-content` `col-span` `row-span`

```html
<!-- typography -->
<h1 class="text-3xl font-bold text-white text-balance">Heading</h1>
<p class="text-md font-normal text-slate-400 text-pretty">
  Body copy that reads well.
</p>
<code class="font-mono text-sm text-emerald-400">const x = 1</code>

<!-- layout -->
<div class="flex row items-center justify-between gap-4 px-6 py-4 bg-slate-900">
  <span class="font-semibold text-white">Logo</span>
  <nav class="flex gap-6">
    <a class="text-slate-400">Docs</a>
    <a class="text-slate-400">GitHub</a>
  </nav>
</div>

<!-- card grid -->
<div class="grid grid-cols-3 gap-6 p-8">
  <div
    class="bg-slate-800 border-1 border-solid border-slate-700 rounded-xl p-6"
  >
    <h2 class="text-lg font-semibold text-white mb-2">Card title</h2>
    <p class="text-sm text-slate-400">Supporting text goes here.</p>
  </div>
</div>

<!-- badge -->
<span
  class="inline-block bg-violet-600 text-white text-sm font-medium px-3 py-1 rounded-full"
>
  New
</span>

<!-- centered hero -->
<section
  class="flex col items-center justify-center gap-4 min-h-screen bg-slate-950"
>
  <h1 class="text-3xl font-bold text-white text-center text-balance">
    Build fast.
  </h1>
  <p class="text-lg text-slate-400 max-w-full text-center text-pretty">
    No build step.
  </p>
  <button class="bg-violet-600 text-white font-semibold px-6 py-3 rounded-lg">
    Get started
  </button>
</section>

<!-- pinned badge on avatar -->
<div class="relative w-12 h-12">
  <img class="rounded-full w-full h-full" />
  <span
    class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full"
  ></span>
</div>
```

---

## Examples

### Text Color — `text-{color}-{shade}`

```html
<p class="text-slate-200">light gray</p>
<p class="text-violet-500">violet</p>
<p class="text-rose-400">rose</p>
<p class="text-white">white</p>
<p class="text-current">inherits parent color</p>
```

Colors: `slate` `gray` `zinc` `neutral` `stone` `red` `orange` `amber` `yellow` `lime` `green` `emerald` `teal` `cyan` `sky` `blue` `indigo` `violet` `purple` `fuchsia` `pink` `rose`  
Shades: `50` `100` `200` `300` `400` `500` `600` `700` `800` `900` `950`  
Special: `text-white` `text-black` `text-transparent` `text-inherit` `text-current`

---

### Text Size — `text-{size}`

```html
<p class="text-sm">small</p>
<p class="text-md">base</p>
<p class="text-lg">large</p>
<p class="text-xl">xl</p>
<p class="text-2xl">2xl</p>
<p class="text-3xl">3xl</p>
```

---

### Text Align — `text-{align}`

```html
<p class="text-left">left</p>
<p class="text-center">center</p>
<p class="text-right">right</p>
<p class="text-justify">justify</p>
```

---

### Text Wrap — `text-{wrap}`

```html
<p class="text-balance">balanced — great for headings</p>
<p class="text-pretty">pretty — great for body copy</p>
<p class="text-nowrap">no wrapping</p>
```

---

### Font Weight — `font-{weight}`

```html
<p class="font-thin">thin</p>
<p class="font-light">light</p>
<p class="font-normal">normal</p>
<p class="font-medium">medium</p>
<p class="font-semibold">semibold</p>
<p class="font-bold">bold</p>
<p class="font-black">black</p>
```

---

### Font Family — `font-{family}`

```html
<p class="font-sans">sans-serif</p>
<p class="font-serif">serif</p>
<p class="font-mono">monospace</p>
```

---

### Background Color — `bg-{color}-{shade}`

```html
<div class="bg-slate-900">dark background</div>
<div class="bg-violet-600">violet</div>
<div class="bg-emerald-400">emerald</div>
<div class="bg-white">white</div>
<div class="bg-transparent">transparent</div>
```

Same colors and shades as `text-{color}` above.

---

### Padding — `p` `px` `py` `pt` `pr` `pb` `pl`

```html
<div class="p-4">all sides</div>
<div class="px-6 py-3">horizontal + vertical</div>
<div class="pt-8">top only</div>
<div class="pb-2">bottom only</div>
```

Values are multiples of `--spacing` (e.g. `p-4` → `calc(var(--spacing) * 4)`).

---

### Margin — `m` `mx` `my` `mt` `mr` `mb` `ml`

```html
<div class="m-4">all sides</div>
<div class="mx-auto">center horizontally</div>
<div class="mt-8 mb-4">top and bottom</div>
<div class="ml-6">left only</div>
```

Supports `auto` in addition to numeric values.

---

### Width & Height — `w` `h` `min-w` `min-h` `max-w` `max-h`

```html
<div class="w-full h-screen">full viewport</div>
<div class="w-1/2 max-w-full">half width, capped</div>
<div class="w-16 h-16">fixed square</div>
<div class="min-h-screen">at least full height</div>
```

Values: numeric (`w-4`, `w-16` …), `px`, `full`, `screen`, `min`, `max`, `fit`, `auto`, `1/2`, `1/3`, `2/3`, `1/4`, `3/4`

---

### Gap — `gap` `gap-x` `gap-y`

```html
<div class="flex gap-4">even spacing</div>
<div class="grid grid-cols-3 gap-x-6 gap-y-2">column/row gap</div>
```

---

### Border — `border-{width}` `border-{style}` `border-{color}`

```html
<div class="border-1 border-solid border-slate-700">subtle border</div>
<div class="border-2 border-dashed border-violet-500">dashed violet</div>
<div class="border-t-4 border-cyan-400">top accent</div>
```

Widths: `border-{N}` sets `border-width: Npx`  
Sides: `border-t-{N}` `border-r-{N}` `border-b-{N}` `border-l-{N}`  
Styles: `border-solid` `border-dashed` `border-dotted` `border-double` `border-none`  
Colors: `border-{color}-{shade}` - same palette as text/bg

---

### Border Radius — `rounded-{size}`

```html
<div class="rounded-md">medium radius</div>
<div class="rounded-xl">extra large</div>
<div class="rounded-full">pill / circle</div>
<div class="rounded-none">no radius</div>
```

Sizes: `none` `sm` `md` `lg` `xl` `2xl` `3xl` `full`

---

### Display

```html
<div class="block">block</div>
<span class="inline-block px-3 py-1">inline-block badge</span>
<div class="hidden">not visible</div>
<div class="flex">flex container</div>
<div class="grid">grid container</div>
```

Values: `block` `inline` `inline-block` `table` `table-row` `table-cell` `hidden` `flex` `inline-flex` `grid` `inline-grid`

---

### Position & Offset

```html
<div class="relative">
  <span class="absolute top-2 right-2">badge</span>
</div>
<div class="absolute inset-0">full overlay</div>
<header class="sticky top-0">sticky nav</header>
<div class="fixed bottom-0 inset-x-0">bottom bar</div>
```

Position: `static` `relative` `absolute` `fixed` `sticky`  
Offset: `top-{v}` `right-{v}` `bottom-{v}` `left-{v}` `inset-{v}` `inset-x-{v}` `inset-y-{v}`

---

### Flexbox

```html
<!-- row, spaced apart, vertically centered -->
<nav class="flex row items-center justify-between gap-4">
  <span>Logo</span>
  <div class="flex gap-6">Links</div>
</nav>

<!-- vertical stack -->
<div class="flex col gap-3">
  <div>item 1</div>
  <div>item 2</div>
</div>

<!-- sidebar + growing content -->
<div class="flex row gap-4">
  <aside class="basis-64 shrink-0">sidebar</aside>
  <main class="grow">content</main>
</div>
```

Direction: `row` `col` `row-reverse` `col-reverse`  
Wrap: `flex-wrap` `flex-nowrap` `flex-wrap-reverse`  
Flex: `flex-1` `flex-auto` `flex-initial` `flex-none` `flex-{N}`  
Grow/shrink: `grow` `grow-{N}` `shrink` `shrink-{N}`  
Basis: `basis-{value}`

---

### Grid

```html
<!-- 3-column card grid -->
<div class="grid grid-cols-3 gap-4">
  <div>card</div>
  <div>card</div>
  <div>card</div>
</div>

<!-- featured item spans 2 columns -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">featured</div>
  <div>A</div>
  <div>B</div>
</div>

<!-- full-width banner inside grid -->
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-full">banner</div>
  <div>col 1</div>
  <div>col 2</div>
  <div>col 3</div>
</div>
```

Columns: `grid-cols-{1–12}` `grid-cols-none`  
Rows: `grid-rows-{1–12}` `grid-rows-none`  
Span: `col-span-{N}` `col-span-full` `row-span-{N}` `row-span-full`  
Line: `col-start-{N}` `col-end-{N}` `row-start-{N}` `row-end-{N}`  
Auto: `grid-auto-cols-auto/min/max/fr` `grid-auto-rows-auto/min/max/fr`  
Flow: `grid-flow-row` `grid-flow-col` `grid-flow-dense` `grid-flow-row-dense` `grid-flow-col-dense`

---

### Alignment

```html
<!-- center everything -->
<div class="flex items-center justify-center h-screen">centered</div>

<!-- grid shorthand -->
<div class="grid place-items-center h-screen">centered</div>

<!-- one child opts out -->
<div class="flex items-center gap-4">
  <div>aligned center</div>
  <div class="self-end">pinned to bottom</div>
</div>
```

`items-{v}` / `self-{v}` — `start` `end` `center` `baseline` `stretch`  
`justify-{v}` — `start` `end` `center` `between` `around` `evenly`  
`justify-items-{v}` / `justify-self-{v}` — `start` `end` `center` `stretch`  
`content-{v}` — `start` `end` `center` `between` `around` `evenly` `stretch` `baseline`  
`place-items-{v}` / `place-self-{v}` / `place-content-{v}` — shorthand for both axes

---
