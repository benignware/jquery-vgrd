jquery-vgrd
===========

> Enhance fluid horizontal grids with a vertical pattern


Basic Usage
-----------

Initialize the plugin
```js
$(function() {
  $('.vgrd').vgrd({
    unitRatio: 0.04751461988304
  });
})
```

Example markup using bootstrap
```html
<div class="container">
  <div class="row">
    <div class="col-md-3">
      <div class="entry">
        <a class="thumbnail vg-3" href="#">
          <img src="holder.js/466x266"> 
        </a>
        <div class="entry-summary vg-3">
          <h3>Lorem ipsum</h3>
        </div>
      </div>
      <div class="entry">
        <a class="thumbnail vg-3" href="#">
          <img src="holder.js/466x266"> 
        </a>
      </div>
    </div>
    <div class="col-md-6">
      <div class="entry">
        <a class="thumbnail vg-6" href="#">
          <img src="holder.js/933x532"> 
        </a>
        <div class="entry-summary vg-3">
          <h3>Lorem ipsum</h3>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="entry">
        <div class="entry-summary vg-3">
          <h3>Lorem ipsum</h3>
        </div>
        <a class="thumbnail vg-6" href="#">
          <img src="holder.js/466x532"> 
        </a>
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
    <td>unitRatio</td>
    <td>Float</td>
    <td>
      Provides the measurement unit for vertical grid selector as proportion of container width. 
    </td>
  </tr>
  <tr>
    <td>cssPrefix</td>
    <td>String</td>
    <td>
      Specifies the prefix for vertical selector. Defaults to `vg-`.
    </td>
  </tr>
  <tr>
    <td>computeHeight</td>
    <td>Function</td>
    <td>
      Hook into the calculation routine by returning a height. Arguments provided are: currently processed `element`, precalculated `height`, `containerWidth`, value of `unitRatio`-option and least the `value` of the currently processed vg-pattern.
    </td>
  </tr>
  <tr>
    <td>bindResize</td>
    <td>Boolean</td>
    <td>
      Controls if layout is triggered automatically no window resize. Call `$('.vgrd').vgrd()` to resize manually. 
    </td>
  </tr>
</table>