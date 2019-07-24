const slides = [
  {
    source: "./assets/index-banner/banner2.png",
    tab: "Hello World!",
    link: "./webpages/photoweb/photoweb.html",
    typewriter:
      "Welcome to my portfolio! Please take some time to have a look around! :)"
  },
  {
    source: "./assets/index-banner/banner1.png",
    tab: "click",
    link: "./webpages/calendar/calendar.html",
    typewriter: "Calendar coded in vanilla + 2 frameworks."
  },
  {
    source: "./assets/index-banner/banner3.png",
    tab: "Play!",
    link: "./webpages/hover-cats/hover-cats.html",
    typewriter:
      "Play with the buttons! Full of fun and color, movement, and sound."
  },
  {
    source: "./assets/index-banner/banner2.png",
    tab: "poke",
    link: "",
    typewriter:
      "Todo list with date countdown, importance, and completion filters for task organization, and language option."
  },
  {
    source: "./assets/index-banner/banner1.png",
    tab: "enjoy ;)",
    link: "",
    typewriter: "Contact me for freelance or for hire :)"
  }
];

const portfolio = [
  {
    title: "Calendar Collection",
    tools: "Javascript",
    description: "Calendar made in JS, React, and Vue. Designed with different themes. Assets (Sketchbook / Photoshop / Illustrator)",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/calendar/calendar.html"
  },
  {
    title: "Calendar Collection",
    tools: "Vue",
    description: "Vue Calendar",
    source: "./assets/cats/starcloudLogo.png",
    link: ""
  },
  {
    title: "Calendar Collection",
    tools: "React",
    description: "React Calendar",
    source: "./assets/cats/starcloudLogo.png",
    link: ""
  },
  {
    title: "Candy Jar: Task Manager",
    tools: "Vue / Vuex / Sass",
    description: "With date countdown, importance, and completion filters etc for task organization. Language options with i18n. Theming in Sass. SVG logo, assets (Illustrator).",
    source: "./assets/cats/starcloudLogo.png",
    link: ""
  },
  {
    title: "Chaldea Coffee",
    tools: "HTML / CSS",
    description: "Tribute page, designed with a coffee theme.",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/chaldea-coffee/chaldea-coffee.html"
  },
  {
    title: "Hover Cats",
    tools: "Javascript",
    description: "Designed with ideas of fun and color, full of movement, sound, and with a lot of buttons to play with. Graphic assets (Sketchbook / Photoshop)",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/hover-cats/hover-cats.html"
  },
  {
    title: "Starcloud Photos",
    tools: "Javascript",
    description: "Designed with a sophisticated, clean look to have more focus on photos. Assets (Sketchbook / Photoshop / Illustrator)",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/photoweb/photoweb.html"
  },
  {
    title: "Thousand Blossoms",
    tools: "Javascript, SVG, Parallax scrolling",
    description: "Tribute page to the song 「千本桜」 by 黒うさ. Design, piano cover(in-progress), art(in-progress).",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/thousand-blossoms/thousand-blossoms.html"
  },
  {
    title: "Lady Rosaline Collection",
    tools: "Javascript, scroll effect(PC)",
    description: "Inspired by magical girls transformation and Project Runway. Assets (Sketchbook), graphic editing (Photoshop). Logo (Illustrator).",
    source: "./assets/cats/starcloudLogo.png",
    link: "./webpages/ladyRosalineCollection/rosaline.html"
  }
]
let slideShow = document.getElementById("slideShow");
let heroImgContainer = document.getElementById("heroImgContainer");
let slideNumber = document.getElementById("slideNumber");
let slideTab = document.getElementById("slideTab");
let slideCaption = document.getElementById("slideCaption");
let slideList = document.getElementById("slideList");
let personalProjects = document.getElementById("personalProjects");
let cell;
let thumb;
let contactCat = document.getElementById("contactCat");
let contactCatImg = document.getElementsByClassName("contactCatAnimate")[0];

let activeTab = document.getElementsByClassName("slideThumb");
let activeSlide = document.getElementsByClassName("imgIndex");
let currentSlide = 1;
let timer;
let typeWrite;
let type;

let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
window.onscroll = function () {
  stickyLock();
};

function stickyLock() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}

function renderSlides() {
  for (let i = 0; i < slides.length; i++) {
    cell = document.createElement("div");
    cell.innerHTML = `<img src="${
      slides[i].source
      }" class="imgIndex hide fade" alt="">`;
    heroImgContainer.appendChild(cell);
    thumb = document.createElement("img");
    thumb.src = slides[i].source;
    thumb.onclick = () => activateSlide(i);
    thumb.classList.add("slideThumb");
    slideList.appendChild(thumb);
  }

  activateSlide(0);
}
renderSlides();

function renderPortfolio() {
  for (let i = 0; i < portfolio.length; i++) {
    cell = document.createElement("div");
    cell.classList.add("portfolioWorks");
    cell.innerHTML = `<img src="${portfolio[i].source}" alt="">
      <div class="cardText">
      <h4>${portfolio[i].title}</h4>
      <h5>${portfolio[i].tools}</h5>
      <p>${portfolio[i].description}</p></div>`
    cell.onclick = () => (location.href = portfolio[i].link);
    personalProjects.appendChild(cell);
  }
}
renderPortfolio();

function flipSlide(x) {
  let pass = currentSlide + x;
  if (pass < 0) {
    pass = slides.length - 1;
  }
  if (pass === slides.length) {
    pass = 0;
  }
  activateSlide(pass);
}

function activateSlide(num) {
  if (currentSlide === num) {
    return;
  }

  activeTab[currentSlide] = activeTab[currentSlide].classList.remove("active");
  activeSlide[currentSlide] = activeSlide[currentSlide].classList.add("hide");
  clearInterval(typeWrite);

  currentSlide = num;
  activeSlide[num].classList.remove("hide");
  slideNumber.textContent = num + 1 + "/" + slides.length;
  slideTab.textContent = slides[num].tab;
  slideTab.onclick = () => (location.href = slides[num].link);
  slideCaption.textContent = "";
  activeTab[num] = activeTab[num].classList.add("active");
  typeWriter(slides[num].typewriter);
  clearInterval(timer);
  setTimeout(() => startInterval(), 50);
}

function typeWriter(txt) {
  type = 0;
  typeWrite = setInterval(() => {
    slideCaption.textContent += txt.charAt(type);
    type++;
    if (type > txt.length) {
      clearInterval(typeWrite);
    }
  }, 50);
}

function startInterval() {
  timer = setInterval(() => flipSlide(1), 6000);
}

function scrolling(x) {
  let tag = document.getElementById(x);
  let position = tag.offsetTop + slideShow.offsetHeight;
  window.scrollTo({
    top: position,
    behavior: "smooth"
  });
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function catMouseEnter() {
  contactCat.style.transform = "translateY(-150px)";
  setTimeout(() => {
    contactCatImg.style.animationPlayState = "running";
  }, 1500);
}

function catMouseLeave() {
  contactCat.style.transform = "translateY(0)";
  contactCatImg.style.animationPlayState = "paused";
}
