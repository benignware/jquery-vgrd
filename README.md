jquery-vgrd
===========

> Enhance horizontal grids with a vertical pattern.

[Demo](http://benignware.github.io/jquery-vgrd)

## Usage

Include dependencies.

```html
<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet"/>
<script src="jquery.vgrd.min.js"></script>
```

Setup a grid with Bootstrap:

```html
<div class="row vgrd">
  <div class="col-md-3 col-sm-4">
    <div class="vg-md-3 vg-sm-4"><div class="box">Lorem ipsum</div></div>
    <div class="vg-md-6 vg-sm-8"><div class="box">Lorem ipsum</div></div>
  </div>
  <div class="col-md-6 col-sm-4">
    <div class="vg-md-6 vg-sm-8"><div class="box">Lorem ipsum</div></div>
    <div class="vg-md-3 vg-sm-4"><div class="box">Lorem ipsum</div></div>
  </div>
  <div class="col-md-3 col-sm-4">
    <div class="vg-md-3 vg-sm-4"><div class="box">Lorem ipsum</div></div>
    <div class="vg-md-6 vg-sm-8"><div class="box">Lorem ipsum</div></div>
  </div>
</div>
```

```css
.row.vgrd {
  margin-top: -15px;
  margin-bottom: -15px;
}

.row *[class*='vg-'] {
  padding-top: 15px;
  padding-bottom: 15px;
}

.box {
  height: 100%;
  padding: 15px;
  background: lightblue;
}
```

Initialize the plugin

```js
$('.vgrd').vgrd({
  // aspect-ratio container-width
  unitRatio: 0.04751461988304
});
```



Options
-------

<table>
  <tr>
    <th>Option</th><th>Type</th><th>Description</th>
  </tr>
  <tr>
    <td>bindResize</td>
    <td>Boolean</td>
    <td>
      Specify whether to trigger layout automatically on window resize. Call `$('.vgrd').vgrd()` to resize manually. Default: `true` 
    </td>
  </tr>
  <tr>
    <td>breakpoints</td>
    <td>Array</td>
    <td>
      Specifies breakpoint detection keys. Default: `['xs','sm','md','lg']`
    </td>
  </tr>
  <tr>
    <td>computeHeight</td>
    <td>Function</td>
    <td>
      Hook into the calculation routine by returning a height. Arguments: `element`, `calculatedHeight`, `containerWidth`, `unitRatio`, `patternValue`.
    </td>
  </tr>
  <tr>
    <td>container</td>
    <td>String</td>
    <td>
      Provide parent container class. Defaults to `.row`.
    </td>
  </tr>
  <tr>
    <td>cssPrefix</td>
    <td>String</td>
    <td>
      Specifies the prefix for vertical selector. Default: `vg-`
    </td>
  </tr>
  <tr>
    <td>helperPrefix</td>
    <td>String</td>
    <td>
      Specifies the prefix for the breakpoint-helper selector prefix. Default: `visible-`
    </td>
  </tr>
  <tr>
    <td>unitRatio</td>
    <td>Float</td>
    <td>
      Provides the measurement unit for vertical grid selector as proportion of container width. Default: `0.1`
    </td>
  </tr>
</table>