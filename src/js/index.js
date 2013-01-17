/*

    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    Caution: shameful code ahead.
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

*/

$(document).ready(function(){

  function get_url( path ) {
    if( path.indexOf("http") == 0 ) 
      return path;
    var url = window.location.href;
    return  url.substring(0, url.length-1) + path;
  }


  var myClick = function(event){
    event.effect('bounce', {times:10}, 1000)
  }
  var myLinkLeave = function(event){
    $("#my").stop();
    var myHeight = $("#my").height();
    $("#my").animate({
      top: '-600px'
    }, 500, 'easeOutBack', function(){
    });

  }	

  var myLinkOver = function(event){
    $("#my").stop(true);
    var origY = ($("#my").position().top);
    var myY = event.currentTarget.offsetTop;	
    if(origY==-300){
      $("#my").animate({
        top: myY + "px"
      }, 700, 'easeOutBounce', function(){});
    } else {	
      $("#my").animate({
      top: myY + "px"
      }, 600, 'easeOutElastic', function(){});
    }	
  }

  var connectLinkOver = function(event)
  {
      event.animate({
      margin:  '100px'
      }, 600, 'easeOutElastic', function(){});
  }

  function getDocHeight() {
    var _docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    return _docHeight;
  }
  var increment = 1;
  var scrollOne = function() {
    var pageYOffset = document.body.scrollTop;
    var height = getDocHeight();
    if( pageYOffset + window.innerHeight >= height) {
      increment = -1;
    } else if ( pageYOffset <= 0) {
      increment = 1;
    }
    window.scrollTo(0, pageYOffset + increment);
  }

  function randomize( ul ) {
    ul.each(function() {
      var $ul = $(this);
      var $liArr = $ul.children("li");
      $liArr.sort( function(a, b){
        var temp = parseInt( Math.random() * 10 );
        var odd = temp%2;
        var pos = temp>5 ? 1: -1;
        return odd * pos;
      })
      .appendTo($ul);
    });
  }

  function animate_background() {
    var $bg_ul = $(".delicious-cloud");
    var container_height = $(".delicious-cloud").height();
    var top_px = "0px";
    var easing = 'linear';
    var rate = 0.10;
    var duration = container_height / rate;
    //duration = 6000;
    var bottom_px = ((container_height - window.innerHeight) * -1) + "px";
    $bg_ul.animate(
        { 
          top: bottom_px 
        }, 
        duration, 
        easing,
        function() {
          $bg_ul.animate(
            { 
              top: top_px
            },
            duration,
            easing,
            animate_background
          );
        }
    );
  }


  var last_ajax_time = 0;
  function switch_to_about( animated ) {
    //history.pushState({ path: this.path }, '', this.href );
    var about_div;
    $.ajax({
      url: "about.html",
      success: function( data ) {
        var current_time = (new Date()).getTime();
        if( current_time - last_ajax_time < 500 ) {
            return;
        }
        mpq.track("About click");
        last_ajax_time = current_time;
        about_div = $(data);
        about_div.find("#back").click( switch_to_main );
        about_div.css("opacity", "0");
        $("body").append( about_div );
        var centers = get_center( about_div );
        about_div.css("top", centers.top );
        about_div.css("left", centers.left );
        $("#del-wrapper").css('opacity', 0);

        if( animated ) {
            $("canvas").animate( {opacity: 0}, 500 );
            about_div.animate( 
              {
                opacity: 1,
              }, 
              750, 
              'swing', 
              function() {
                $(".post ul li a").tipsy({ gravity: 'w', fade: true});
              }
            );
        } else {
            $("canvas").css("opacity", 0);
            about_div.css("opacity", 1); 
        }

        $(".post ul li a").tipsy({ gravity: 'w', fade: true});
      }
    });
  }

  var currentAnchor = null;
  function checkAnchor() {
    if( currentAnchor != document.location.hash ) {
        currentAnchor = document.location.hash;
        if( currentAnchor == "#!/about/" ) {
          switch_to_about( false );
        } else {
          switch_to_main();
        }
    }
  }

  $(window).bind('popstate', function() {
    checkAnchor();
  });

  function switch_to_main() {
    var about_div = $(".post");
    if( about_div.length != 0 ) {
      $("canvas").animate( {opacity: 1}, 500 );
      $("#del-wrapper").css('opacity', 1);
      about_div.animate({
          opacity: 0,
      }, 500, 'swing', function() {
        $(this).remove();
        about_div = null;
      });
    }
  }

  function center( element ) {
		var mainHeight = element.outerHeight();
		var mainWidth = element.outerWidth();
		var windowHeight = window.innerHeight;
		var offsetHeight = (windowHeight-mainHeight)/2;
		offsetHeight = offsetHeight + "px";
    element.css('top', offsetHeight);

		var windowWidth = window.innerWidth;
		var offsetWidth = (windowWidth-mainWidth)/2 + "px";
    element.css('left', offsetWidth);
  }
  
  function get_center( element ) {
		var mainHeight = element.outerHeight();
		var mainWidth = element.outerWidth();
		var windowHeight = window.innerHeight;
		var offsetHeight = (windowHeight-mainHeight)/2;
    offsetHeight = ( offsetHeight > 0 )? offsetHeight + "px" : 50 + "px";
		var windowWidth = window.innerWidth;
		var offsetWidth = (windowWidth-mainWidth)/2 + "px";
    return { left: offsetWidth, top: offsetHeight };
  }

  function animate_intro() {
    setTimeout( function() {
      $("#main").removeClass("small-hidden").addClass("show-normal");
      setTimeout( function() {
        $("#del-wrapper").css("opacity",1);
      }, 700);
    }, 200 );
  }

	if( jQuery ){
    checkAnchor();
		$("#main").prepend('<div id="my">My</div>');
    center( $("#main") );

    $("#links li").hover(myLinkOver, null);
		$("#links").hover(null, myLinkLeave);

    $("#del-wrapper").css("height", window.innerHeight + "px" );
    randomize($(".delicious-cloud"));
    //animate_background();
    
    $("a#story").click( function() {
      switch_to_about( true );  
    });

    animate_intro();
    // setInterval( checkAnchor, 1500);

    if( navigator.userAgent.indexOf("Mac")!= -1 
        || navigator.userAgent.indexOf("MSIE")!= -1 ) {
        $("#switcher").css("top", "-36px");
    }
    if( navigator.userAgent.indexOf("Firefox")!= -1 ) {
        $("#switcher").css("top", "-38px");
    }
    // css hack

    //scroll_interval = setInterval( scrollOne, 50);
	} else {
		alert("Oh, sorry! Looks like I'm using features that your browser doesnt have. Please try Firefox, Chrome, Safari, or Opera.");
	}	
});
