# EQ Sass

Basic responsive Sass framework including grid and breakpoint helpers.

## Installation

- Run `npm install eq-sass --save`.
- Let Sass know where to find it, eg. (using 'gulp-sass'):

```js
.pipe(sass({
    includePaths: [
      "./node_modules/eq-sass/"
    }
})
```

- See [node-sass docs](https://github.com/sass/node-sass#includepaths) for more info.
- Configure (see below).
- Import to your Sass the usual way `@import "eq-sass"`.

## Configuration

There are a number of variables to configure, or just use the defaults found in `_config.scss`. By default, the framework uses `px` values but rems/ems can also be used, we recommend [pxtorems](https://github.com/cuth/postcss-pxtorem) via postcss.

### Breakpoints

There are a number of pre-configured breakpoint defined in t-shirt style notation. You can use any key here and this will form the basis of your calls to `mq()` and your classes in the CSS.

```scss
$grid-bp: (
  xs: 300px,
  s: 500px,
  m: 740px,
  l: 980px,
  xl: 1300px,
  xxl: 1600px
);
```

### Grid

By default, the grid is in 12 columns with `20px` gutters. Configure as follows:

```scss
$grid-cols: 12;
$grid-gutters: 20px;
```

### Container width

The grid is enclosed within a `.container` which defines the `max-width` of the grid. Configure as follows:

```scss
$grid-max-width: 1300px;
```

### Responsive/fixed grid

The framework can output a responsive or fixed grid. This allows you to render a separate stylesheet for legacy browsers.

```scss
$responsive: true;
```

When using a fixed grid, define a breakpoint which will be rendered into that stylesheet. For example, using the default `m` option will result in all styles up to that width being output, anything above will be ignored.

```scss
$grid-bp-fixed: map-get($grid-bp, m);
```

## Using the grid


The grid is written in a 'declarative' style meaning that column breakpoints are declared in the markup. There are six main (default) breakpoints, written in 't-shirt size' notation:

Breakpoint   | Screen min width
-------------|----------------------
`xs`         | 300px
`s`          | 500px
`m`          | 740px
`l`          | 980px
`xl`         | 1300px
`xxl`        | 1600px

## Basic usage

This example will give a two column grid on viewports above 740px:

```html
<div class="container">
  <div class="grid">
    <div class="grid__col m-6">
      <p>Left column</p>
    </div>
    <div class="grid__col m-6">
      <p>Right column</p>
    </div>
  </div>
</div>
```

Columns (`.grid__col`) are `width: 100%` by default with columns being defined at the various breakpoints with `[breakpoint]-[columns]` notation.

### Nesting

Being percentage-based allows easy nesting of columns. In the example below, we can see a grid of two columns, one of which has a sub-grid of another two columns.

```html
<div class="grid">
  <div class="grid__col s-6">
    <p>This column is one-half at screen sizes above the small breakpoint. Nulla vitae elit libero, a pharetra augue. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p>
  </div>
  <div class="grid__col s-6">
    <p>This column is also one-half but has a sub-grid of another two columns of half-width.</p>
    <div class="grid">
      <div class="grid__col s-6">
        <p>Donec id elit non mi porta gravida at eget metus.</p>
      </div>
      <div class="grid__col s-6">
        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
      </div>
    </div>
  </div>
</div>

```
### Reversible

A reversed grid allows you change the source order of the markup and still keep a left-to-right layout. As you can see in the example below, the columns appear in the reverse order that they occur in the markup:

```html
<div class="grid  grid--reverse">
  <div class="grid__col m-4">
    <p>1st in the DOM</p>
  </div>
  <div class="grid__col m-8">
    <p>2nd in the DOM</p>
  </div>
</div>
```

### Push/Pull

Columns can be pushed or pulled in a particular direction at a specified breakpoint. To reset a push at a subsequent breakpoint, use the `nopush` feature. The following example shows three columns all pushed to the right by one column at the `m` breakpoint. At the `l` breakpoint, the first column has its push removed.

```html
<div class="grid">
  <div class="grid__col m-3 m-push-3 l-nopush">
    <p>Column</p>
  </div>
  <div class="grid__col m-3 m-push-3">
    <p>Column</p>
  </div>
  <div class="grid__col m-3 m-push-3">
    <p>Column</p>
  </div>
</div>
```

### Floats

Columns can be collapsed together so that one column will wrap around another—this is useful for maintaing sensible line lengths. In the following example, the text wraps around the image at the `m` breakpoint and then switches to a two-column layout at the `l` breakpoint.

__Note: To wrap a left column around a right column, the right column must come first in the DOM and the `grid--reverse` modifier used to switch them around.__

```html
<div class="grid grid--reverse">
  <div class="grid__col m-3 m-fr">
    <div class="avatar">
      <img src="http://imgsrc.me/200x200/4EA6B8/f3f3f3" width="200" height="200" class="avatar__img">
    </div>
  </div>
  <div class="grid__col m-12 l-3-4">
    <div>Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam quis risus eget urna mollis ornare vel eu leo. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Etiam porta sem malesuada magna mollis euismod. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor.</div>
  </div>
</div>
```

### Flex

__NOTE: This is an experimental feature and may not work consistently across all browsers.__

The grid can make use of CSS3 capabilities of modern browsers to solve layout problems that were previously unsolvable with CSS alone. A good example of this the ability to have equal-height columns via Flexbox. Simply add `.grid__flex` to any children that are required to be full-height.

```html
<div class="grid  grid--flex">
  <div class="grid__col grid__flex m-6">
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
  </div>
  <div class="grid__col grid__flex m-6">
    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum.</p>
  </div>
</div>
```

*/
