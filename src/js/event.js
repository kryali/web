$(document).ready(function(){

  $("#github").click( function() {
    mpq.track("Github click");
  });

  $("#bookmarks").click( function() {
    mpq.track("Bookmark click");
  });

  $("ul.delicious-cloud li").click( function() {
    mpq.track("Background bookmark click");
  });

  $("#stackoverflow").click( function() {
    mpq.track("StackOverflow profile click");
  });

  $("#blog").click( function() {
    mpq.track("Blog click");
  });

});
