// initializing sticky navbar
var sticky = UIkit.sticky("#sticky", {
  offset: 50,
  top: 100
});
// effects for the hero svg image
(function() {
  // Variables
  var $curve = document.getElementById("curve");
  var last_known_scroll_position = 0;
  var defaultCurveValue = 450;
  var curveRate = 3;
  var ticking = false;
  var curveValue;

  // Handle the functionality
  function scrollEvent(scrollPos) {
    if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
      curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
      $curve.setAttribute(
        "d",
        "M 800 300 Q 350 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z"
      );
    }
  }

  // Scroll Listener
  // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
  window.addEventListener("scroll", function(e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        scrollEvent(last_known_scroll_position);
        ticking = false;
      });
    }

    ticking = true;
  });
})();

// typed js on hero page
var typed = new Typed("#typed", {
  strings: [
    "WELCOME TO LANDMARK UNIVERSITY,",
    "WELCOME TO THE REVOLUTIONARY SQUAD,",
    "WELCOME TO THE COMPLIANT SQUAD..."
  ],
  smartBackspace: true,
  backSpeed: 50,
  loop: true,
  cursorChar: "_",
  // showCursor: false,
  loopCount: Infinity,
  typeSpeed: 100
});
