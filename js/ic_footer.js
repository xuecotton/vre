
var h = document.documentElement.clientHeight || document.body.clientHeight;

var _h = h;
var _he = $("footer").offset().top;

if (_he < _h) {
  $("footer").css({
    width: "100%",
    position: "fixed",
    bottom: "0px",
    left: "0px"
  });
}

var sco_h = $(document).scrollTop();
if (sco_h > 200) {
  //距离顶部大于100px时
  $(".home_nav_top").addClass("top_head_act");
} else {
  $(".home_nav_top").removeClass("top_head_act");
}

$(document).scroll(function() {
  var scroH = $(document).scrollTop(); //滚动高度
  var viewH = $(window).height(); //可见高度
  var contentH = $(document).height(); //内容高度

  if (scroH > 200) {
    //距离顶部大于100px时
    $(".home_nav_top").addClass("top_head_act");
  } else {
    $(".home_nav_top").removeClass("top_head_act");
  };
});

