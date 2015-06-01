(function () {
  'use strict';

  var onWindowScroll = function(e) {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var top = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    console.log(Velocity)

    // bg slow scroll
    var dy = 0;
    /*if (top * 0.1 > $('.bg').height() - window.innerHeight) {
      $bg.addClass('fixed');
      TweenLite.to('.bg', 0, { y: 0 });

      $('.footer').addClass('visible');

      $backToHome.addClass('last');
    } else {
      dy = top * 0.1;
      $bg.removeClass('fixed');
      TweenLite.to('.bg', 0, { y: -dy });

      $('.footer').removeClass('visible');

      $backToHome.removeClass('last');
    }*/
  };

  $(document).ready(function() {
    window.addEventListener('scroll', onWindowScroll);
  });

})();
