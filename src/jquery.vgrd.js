(function($, window) {
  
  var pluginName = "vgrd";
  var defaults = {
    cssPrefix: 'vg-', 
    unitRatio: '0.09', 
    bindResize: true, 
    computeHeight: null
  };
  
  function Vgrd(elem, options) {
    
    var instance = this, $elem = $(elem);
    this.elem = elem;
    var opts = this.options = $.extend({}, defaults, options);
    
    function resizeHandler(e) {
      instance.resize();
    }
    
    this.resize = function(options) {
      
      // merge options
      var opts = this.options = $.extend({}, defaults, this.options, options);
      
      // resize
      var vgElems = $elem.find("*[class*='" + opts.cssPrefix + "']");
      
      var u = opts.unitRatio;
      var w = $elem.width();
      var vh = w * u;
      
      vgElems.each(function() {
        var value = null;
        var regex = new RegExp("" + opts.cssPrefix + "(\\d+)");
        var match = regex.exec(this.className);
        if (match) {
          value = parseFloat(match[1]);
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
	  if (opts.bindResize) {
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