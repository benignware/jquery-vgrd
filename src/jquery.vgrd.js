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
  
  function computedOptions(elem, options) {
    return $.extend({}, options, {
      // override
      breakpoints: (function(breakpoints) {
        if (typeof breakpoints == 'object') {
          return breakpoints;
        }
        if (typeof breakpoints == 'string') {
          if (breakpoints == 'none') {
            return {};
          }  
        }
        
        // compute breakpoints
        var computedBreakpoints = {};
        for (var key in breakpoints) {
          if (typeof breakpoints[key] == 'function') {
            computedBreakpoints = breakpoints[key].call(elem, options);
          }
        }
         
      })(options.breakpoints)
    });
  }
  
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
      var opts = computedOptions(elem, _opts);
      
      // resize
      var vgElems = $elem.find("*[class*='" + opts.cssPrefix + "']");
      
      var u = opts.unitRatio;
      var w = $elem.width();
      var vh = w * u;
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
      
      vgElems.each(function() {
        var value = null;
        var string = this.className;
        var pattern = "" + opts.cssPrefix + "(?:(" + breakpoints.join("|") + ")-)?(\\d+)";
        var regex = new RegExp(pattern);
        var match = null;
        var helper, breakpoint;
        var values = {};
        while (match = regex.exec(string, "g")) {
          value = parseFloat(match[2]);
          breakpoint = match[1];
          if (breakpoint) {
            values[breakpoint] = value;
          } else {
            values["_"] = value;
          }
          string = string.substring(match.index + match[0].length);
        }
        value = values["_"] || null;
        delete values["_"];
        var matchBreakpoint = null;
        for (i = 0, breakpoint; breakpoint = breakpoints[i]; i++) {
          if (typeof values[breakpoint] != "undefined") {
            value = values[breakpoint];
            matchBreakpoint = breakpoint;
          }
          if (breakpoint === activeBreakpoint) {
            break;
          }
        }
        if (typeof value == 'number') {
          var height = value * vh;
          if (typeof opts.computeHeight == 'function') {
            var computedHeight = opts.computeHeight.call($elem, this, height, w, u, value);
            if (typeof computedHeight == 'number') {
              height = computedHeight;
            }
          }
          // apply calculated height
          $(this).height(height);
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