Utils = {

  getRandom: function( min, max ) {
      var range = (max - min);
      var rand = Math.random();
      var res = (rand * range) + min;
      return res;
  },

  getCenter: function( element ) {
    var mainHeight = element.outerHeight();
    var mainWidth = element.outerWidth();
    var windowHeight = window.innerHeight;
    var offsetHeight = (windowHeight-mainHeight)/2;
    offsetHeight = ( offsetHeight > 0 )? offsetHeight + "px" : 50 + "px";
    var windowWidth = window.innerWidth;
    var offsetWidth = (windowWidth-mainWidth)/2 + "px";
    return { left: offsetWidth, top: offsetHeight };
  },

  centerElement: function( element ) {
    var center = this.getCenter(element);
    element.css('top', center.top);
    element.css('left', center.left);
  },

  loadingScreen: undefined,

  getLoadingScreen: function() {
    if( typeof this.loadingScreen == "undefined" ) {
      this.loadingScreen = $(".overlay");
      this.loadingScreen.css("opacity", 1);
      var message = this.loadingScreen.find(".message");
      this.centerElement(message);
    }
    return this.loadingScreen;
  },

  showLoadingScreen: function(animated) {
    var screen = this.getLoadingScreen().stop();
    screen.css("z-index", 11000);
    screen.css("display", "block");
    screen.animate( { opacity: 1 }, 500 );
  },

  hideLoadingScreen: function(animated) {
    var screen = this.getLoadingScreen().stop();
    screen.css("z-index", -11000);
    if( animated ) {
      screen.animate( { opacity: 0 }, 500, function() { $(this).css("display", "none"); });
    }
    else {
      $(".overlay").css("opacity", 0)
                   .css("display", "none");
    }
  }

};

if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = ( function() {
            return window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.oRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
                      window.setTimeout( callback, 1000 / 60 );
                   };
        } )();
}
