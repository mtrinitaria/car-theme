(function () {
  'use strict';

  var currentIndex = 0;
  var texts;
  var textsLi;

  var rotateTexts = function() {
    if (currentIndex >= textsLi.length - 3) {
      currentIndex = 0;
      texts.style.marginTop = '0px';
    }

    var dy = texts.offsetTop - textsLi[currentIndex].offsetTop;

    // texts.style.marginTop = (currentIndex * -85) + 'px';
    texts.style.marginTop = dy + 'px';
    textsLi[currentIndex].classList.remove('mid');
    try {
      textsLi[currentIndex + 1].classList.add('mid');
      textsLi[currentIndex + 2].classList.remove('mid');
    } catch (e) {}

    currentIndex += 1;
  };

  var textBannerInit = function() {
    // rotate texts list
    var ticker = setInterval(rotateTexts, 2000);
    rotateTexts();
  };

  $(document).ready(function() {
    texts = document.querySelector('.texts');
    textsLi = document.querySelectorAll('.texts li');

    // clone 1st 3 items
    texts.appendChild(textsLi[0].cloneNode(true));
    texts.appendChild(textsLi[1].cloneNode(true));
    texts.appendChild(textsLi[2].cloneNode(true));

    // reset textsLi
    textsLi = document.querySelectorAll('.texts li');

    // start animation
    textBannerInit();
  });

})();
