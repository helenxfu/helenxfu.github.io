let myMusic = document.getElementById("myAudio");
let flowerContainer = document.getElementById("sakura");

function playAudio() {
  myMusic.play();
}
function pauseAudio() {
  myMusic.pause();
}
function stopAudio() {
  myMusic.pause();
  myMusic.currentTime = 0;
}

function changeRuby() {
  let furigana = document.getElementsByTagName("rt");
  if (furigana[0].style.color.match("transparent")) {
    for (let i = 0; i < furigana.length; i++) {
      furigana[i].style.color = "rgb(177, 137, 143)";
    }
  } else {
    for (let i = 0; i < furigana.length; i++) {
      furigana[i].style.color = "transparent";
    }
  }
}

function hideKanji() {
  let ruby = document.getElementsByTagName("ruby");
  if (ruby[0].style.color.match("transparent")) {
    for (let i = 0; i < ruby.length; i++) {
      ruby[i].style.color = "crimson";
    }
  } else if (ruby[0].style.color.match("crimson")) {
    for (let i = 0; i < ruby.length; i++) {
      ruby[i].style.color = "rgb(238, 222, 222)";
    }
  } else {
    for (let i = 0; i < ruby.length; i++) {
      ruby[i].style.color = "transparent";
    }
  }
}

function renderBB() {
  let k = 0;
  let valueTop = [];
  let valueLeft = [];
  let petalId = [];
  let valueGravity = [];
  let swingStart = [];
  let swingEnd = [];
  let petalCount = 40;

  for (let i = 0; i < petalCount; i++) {
    let randomColor = Math.floor(Math.random() * 9);
    let randomSize = (Math.floor(Math.random() * 6) + 6) / 10;
    let randomTimer = Math.floor(Math.random() * 8) + 3;
    let randomRotate = Math.floor(Math.random() * 360);
    let randomZ = Math.floor(Math.random() * 29) - 10;
    valueTop[i] = -Math.floor(Math.random() * 1000);
    valueLeft[i] = Math.floor(Math.random() * window.innerWidth);
    let cell = document.createElement("div");
    cell.innerHTML = `<div
        class="petals t${randomColor}"
      style="animation: rotateSakura ${randomTimer}s linear infinite alternate;"></div>`;
    cell.id = "petalID" + i;
    cell.classList.add("petalContainer");
    cell.setAttribute(
      "style",
      `z-index:${randomZ};top:${valueTop[i]}px;left:${
        valueLeft[i]
      }px; transform:scale(${randomSize}) rotate(${randomRotate}deg);`
    );
    flowerContainer.appendChild(cell);
    petalId[i] = document.getElementById("petalID" + i);
    swingEnd[i] = Math.random() * 40 + 5;
    valueGravity[i] = Math.random() * 5 + 2;
    swingStart[i] = 0;
  }

  setInterval(() => {
    for (let i = 0; i < petalCount; i++) {
      if (valueTop[i] < document.body.clientHeight + 40) {
        if (swingEnd[i] >= swingStart[i]) {
          //left
          valueLeft[i] = valueLeft[i] + 0.5 + Math.random() * 0.5; //increase left
        } else {
          valueLeft[i] = valueLeft[i] - 0.5 - Math.random() * 0.5; //decrease left
        }
        if (swingEnd[i] * 2 <= swingStart[i]) {
          //restart counter
          swingStart[i] = 0;
        }
      } else {
        valueTop[i] = -40;
        valueLeft[i] = Math.floor(Math.random() * window.innerWidth); //determine left position
      }

      //wind
      if (k >= 100 && k <= 105) {
        valueLeft[i] = valueLeft[i] + 1;
      } else if (k >= 106 && k <= 120) {
        valueLeft[i] = valueLeft[i] + 3;
      } else if (k >= 121 && k <= 290) {
        valueLeft[i] = valueLeft[i] + 6;
      } else if (k >= 291 && k <= 320) {
        valueLeft[i] = valueLeft[i] + 3;
      } else if (k >= 321 && k <= 330) {
        valueLeft[i] = valueLeft[i] + 1;
      } else if (k >= 500 && k <= 505) {
        valueLeft[i] = valueLeft[i] - 1;
      } else if (k >= 506 && k <= 520) {
        valueLeft[i] = valueLeft[i] - 3;
      } else if (k >= 521 && k <= 790) {
        valueLeft[i] = valueLeft[i] - 6;
      } else if (k >= 791 && k <= 820) {
        valueLeft[i] = valueLeft[i] - 3;
      } else if (k >= 821 && k <= 830) {
        valueLeft[i] = valueLeft[i] - 1;
      } else if (k >= 900) {
        k = 0;
      }

      valueTop[i] += valueGravity[i];
      petalId[i].style.top = valueTop[i] + "px";
      petalId[i].style.left = valueLeft[i] + "px";
      swingStart[i]++;
    }
    k++;
  }, 45);
}
renderBB();

//parallax

let ParallaxManager, ParallaxPart;

ParallaxPart = (function() {
  function ParallaxPart(num) {
    this.num = num;
    this.speed = parseFloat(this.num.getAttribute("data-parallax-speed"));
    this.maxScroll = parseInt(this.num.getAttribute("data-max-scroll"));
  }

  ParallaxPart.prototype.update = function(scrollY) {
    if (scrollY > this.maxScroll) {
      return;
    }
    let offset = -(scrollY * this.speed);
    this.setYTransform(offset);
  };

  ParallaxPart.prototype.setYTransform = function(value) {
    this.num.style.webkitTransform = "translate3d(0, " + value + "px, 0)";
    this.num.style.MozTransform = "translate3d(0, " + value + "px, 0)";
    this.num.style.OTransform = "translate3d(0, " + value + "px, 0)";
    this.num.style.transform = "translate3d(0, " + value + "px, 0)";
    this.num.style.msTransform = "translateY(" + value + "px)";
  };

  return ParallaxPart;
})();

ParallaxManager = (function() {
  ParallaxManager.prototype.parts = [];

  function ParallaxManager(elements) {
    this.elements = document.querySelectorAll(elements);
    this.elements = Array.prototype.slice.call(this.elements);

    for (let i in this.elements) {
      this.parts.push(new ParallaxPart(this.elements[i]));
    }
    for (let i in this.parts) {
      this.parts[i].update(0);
    }

    window.addEventListener("scroll", this.onScroll.bind(this));
  }

  ParallaxManager.prototype.onScroll = function() {
    window.requestAnimationFrame(this.scrollHandler.bind(this));
  };

  ParallaxManager.prototype.scrollHandler = function() {
    scrollY = window.pageYOffset;
    for (let i in this.parts) {
      this.parts[i].update(scrollY);
    }
  };

  return ParallaxManager;
})();

new ParallaxManager(".parallaxLayer");
