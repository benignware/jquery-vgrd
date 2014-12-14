(function($, window) {
  
  var pluginName = "vgrd";
  var defaults = {
    cssPrefix: 'vg-', 
    unitRatio: '0.1', 
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
    
    /**
     * Checks if the specified breakpoint is currently active
     */
    this.activeBreakpoint = function(breakpoint) {
      var opts = _opts, breakpoints = opts.breakpoints, helper, breakpoint, i, helpers = {}, activeBreakpoint;
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
      return activeBreakpoint;
    };
    
    this.resize = function(options) {
      
      // merge options
      _opts = $.extend({}, defaults, _opts, options);
      var opts = _opts;
      
      // resize
      var vgElems = $elem.find("*[class*='" + opts.cssPrefix + "']");
      
      var unitRatio = opts.unitRatio;
      var containerWidth = $elem.width();
      var vh = containerWidth * unitRatio;
      
      vgElems.each(function() {
        var breakpoints = _opts.breakpoints;
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
        var activeBreakpoint = instance.activeBreakpoint();
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
          $(this).height(computedHeight);
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