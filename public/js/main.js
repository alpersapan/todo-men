$("#content").hide();
$("#content").fadeIn("slow");

$(document).ready(function () {
  $(window).on("scroll", function () {
    var s = $(window).scrollTop(),
      d = $(document).height(),
      c = $(window).height();

    var scrollPercent = (s / (d - c)) * 100;

    $("#progressBar").css({
      width: scrollPercent + "%",
    });
  });
});
