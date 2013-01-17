$(function() {
	$(".post ul li a").tipsy({ gravity: 'w', fade: true});
  $(".post").animate({
    opacity: 1
  }, 500, undefined);

		var mainHeight = $(".post").outerHeight();
		var mainWidth = $(".post").outerWidth();
		var windowHeight = window.innerHeight;
		var offsetHeight = (windowHeight-mainHeight)/2;
		offsetHeight = offsetHeight + "px";
    $('.post').css('top', offsetHeight);

		var windowWidth = window.innerWidth;
		var offsetWidth = (windowWidth-mainWidth)/2 + "px";
    $('.post').css('left', offsetWidth);

    var email_backwords = $(".info .value").text();
    var email_forwards = "";
    for( var i =0; i < email_backwords.length; i++) {
      email_forwards += email_backwords[email_backwords.length - i - 1];
    }
    $(".info .value").text( email_forwards ).removeClass("rtl");
});
