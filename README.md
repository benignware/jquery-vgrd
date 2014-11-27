jquery-vgrd
===========

> Enhance fluid horizontal grids with a vertical pattern


Basic Usage
-----------

Initialize the plugin
```js
$(function() {
  $('.vgrd').vgrd({
    // aspect-ratio container-width
    unitRatio: 0.04751461988304
  });
})
```

Example markup using bootstrap
```html
<div class="container vgrd">
  <div class="row">
    <div class="col-md-3 col-sm-4">
      <div class="entry">
        <a class="thumbnail vg-md-3 vg-sm-4 vg-xs-12" href="#">
          <img src="holder.js/466x266"> 
        </a>
        <div class="entry-summary vg-md-3 vg-sm-4 vg-xs-4">
          <h3>Lorem ipsum</h3>
        </div>
      </div>
      <div class="entry">
        <a class="thumbnail vg-md-3 vg-sm-4 vg-xs-12" href="#">
          <img src="holder.js/466x266"> 
        </a>
      </div>
    </div>
    <div class="col-md-6 col-sm-4">
      <div class="entry">
        <a class="thumbnail vg-md-6 vg-sm-4 vg-xs-12" href="#">
          <img src="holder.js/933x532"> 
        </a>
        <div class="entry-summary vg-md-3 vg-sm-8 vg-xs-4">
          <h3>Lorem ipsum</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-4">
      <div class="entry">
        <a class="thumbnail vg-md-6 vg-sm-8 vg-xs-24" href="#">
          <img src="holder.js/466x532"> 
        </a>
        <div class="entry-summary vg-md-3 vg-sm-4 vg-xs-4">
          <h3>Lorem ipsum</h3>
        </div>
      </div>
    </div>
  </div>
</div>
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
      Hook into the calculation routine by returning a height. Arguments provided are: currently processed `element`, precalculated `height`, `containerWidth`, value of `unitRatio`-option and the `value` of the currently processed vg-pattern.
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