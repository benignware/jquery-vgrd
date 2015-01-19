(function($, window) {
  
  var pluginName = "vgrd";
  var defaults = {
    container: '.row',
    cssPrefix: 'vg-', 
    unitRatio: 0.08333333333333, 
    bindResize: true, 
    helperPrefix: 'visible-', 
    computeHeight: null, 
    breakpoints: ['xs', 'sm', 'md', 'lg']
  };
  
  function Vgrd(elem, options) {
    
    var 
      instance = this, 
      $elem = $(elem),
      _opts = $.extend({}, defaults, options);
    
    function resizeHandler(e) {
      instance.resize();
    }
    
    this.resize = function(options) {
      
      // merge options
      _opts = $.extend({}, defaults, _opts, options);
      var opts = _opts;
      
      // resize
      var vgElems = $elem.find("*[class*='" + opts.cssPrefix + "']");
      
      
      var breakpoints = opts.breakpoints, helper, breakpoint, i, helpers = {}, activeBreakpoint;
      for (i = 0, breakpoint; breakpoint = breakpoints[i]; i++) {
        var helperClass = opts.helperPrefix + breakpoint;
        helper = $("body > *[class='" + helperClass + "']").first();
        if (!helper.length) {
          helper = $('<div class="' + helperClass + '"></div>"');
          $('body').append(helper);
        }
        helpers[breakpoint] = helper;
        if (helper.is(":visible")) {
          activeBreakpoint = breakpoint;
        }
      }
      
      var unitRatio = opts.unitRatio;
      
      vgElems.each(function() {
        var container = opts.container ? $(this).parents(opts.container)[0] : $elem;
        if (!$elem.has(container) && !$elem.is(container)) {
          // Element is outside of hierarchy
          console.log("elem is outside of hierarchy");
          return;
        }
        var $container = $(container);
        var containerWidth = $container.outerWidth(true) - ($container.outerWidth(true) - $container.width());
        var vh = containerWidth * unitRatio;
        var string = this.className;
        var pattern = "" + opts.cssPrefix + "(?:(" + breakpoints.join("|") + ")-)?(\\d+)";
        var regex = new RegExp(pattern);
        var match = null;
        var helper, breakpoint;
        var values = {};
        var patternValue = null;
        while (match = regex.exec(string, "g")) {
          patternValue = parseFloat(match[2]);
          breakpoint = match[1];
          if (breakpoint) {
            values[breakpoint] = patternValue;
          } else {
            values["_"] = patternValue;
          }
          string = string.substring(match.index + match[0].length);
        }
        patternValue = values["_"] || null;
        delete values["_"];
        var matchBreakpoint = null;
        for (i = 0, breakpoint; breakpoint = breakpoints[i]; i++) {
          if (typeof values[breakpoint] != "undefined") {
            patternValue = values[breakpoint];
            matchBreakpoint = breakpoint;
          }
          if (breakpoint === activeBreakpoint) {
            break;
          }
        }
        if (typeof patternValue == 'number') {
          var computedHeight = patternValue * vh;
          if (typeof opts.computeHeight == 'function') {
            var computedHeight = opts.computeHeight.call($elem, this, computedHeight, containerWidth, unitRatio, patternValue);
            if (typeof computedHeight == 'number') {
              height = computedHeight;
            }
          }
          // apply calculated height
          $(this).outerHeight(computedHeight);
        } else {
          $(this).css({
            height: ""
          });
        }
      });
    };
    
    // resize handler
    $(window).off('resize', resizeHandler);
    if (_opts.bindResize) {
      $(window).on('resize', resizeHandler);
    }
    
    // initial resize
    this.resize(options);
    
  };
  
  
  var pluginClass = Vgrd;
  jQuery.fn[pluginName] = function(options) {
    return this.each(function() {
      var instance = $(this).data(pluginName);
      if (!instance) {
        instance = $(this).data(pluginName, new Vgrd(this, options));
      } else {
        instance.resize(options);
      }
      return $(this);
    });
  };
  
})(jQuery, window);