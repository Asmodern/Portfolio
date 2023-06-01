document.addEventListener("scroll", function() {
    var elements = document.getElementsByClassName("hidden");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var position = element.getBoundingClientRect();
      // Si l'élément est dans la vue (partiellement ou totalement)
      if (position.top < window.innerHeight - 150) {
        element.classList.add("visible");
        console.log("inner height "+window.innerHeight);
        console.log("position top "+position.top);
      } else {
        element.classList.remove("visible");
      }
    }
  });