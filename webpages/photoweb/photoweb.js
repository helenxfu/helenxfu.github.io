function navOpen() {
  document.getElementById("myNavbar").style.transform = "translateY(0px)";
}
function navClose() {
  document.getElementById("myNavbar").style.transform = "translateY(-254px)";
}
setTimeout(() => navClose(), 1000);

let currentPage = 1;

let catPhotos = document.getElementById("catPhotos");
let pageButton = document.getElementById("pageButton");
let paginationButton = document.getElementsByClassName("paginationButton");
let gridbox = document.getElementsByClassName("gridbox");
let cell;

const catData = [
  {
    name: "The Original",
    source: "../../assets/cats/base.png",
    description: "The ancestor of all cats."
  },
  {
    name: "Sporty Cat",
    source: "../../assets/cats/baseball.png",
    description: "Loves outdoors."
  },
  {
    name: "Gothic Princess",
    source: "../../assets/cats/butterfly.png",
    description: "Loves cute things."
  },
  {
    name: "From Canada",
    source: "../../assets/cats/canada.png",
    description: "Thanks for mentioning us!"
  },
  {
    name: "Dancer",
    source: "../../assets/cats/dancer.png",
    description: "Got the moves like Jagger"
  },
  {
    name: "Karate Master",
    source: "../../assets/cats/fighter.png",
    description: "Mike neko of Japan"
  },
  {
    name: "The Glutton",
    source: "../../assets/cats/fish.png",
    description: "Only if food didn't have calories..."
  },
  {
    name: "Glasses",
    source: "../../assets/cats/geek.png",
    description: "Harry Potter with no scar."
  },
  {
    name: "Slytherin",
    source: "../../assets/cats/greenscarf.png",
    description: "Best house if it wasn't for you-know-who"
  },
  {
    name: "Hero",
    source: "../../assets/cats/hero.png",
    description: "Odd-eyed superhero"
  },
  {
    name: "The Dashing",
    source: "../../assets/cats/indian.png",
    description: "Fashionable"
  },
  {
    name: "Karupin",
    source: "../../assets/cats/karupin.png",
    description: "Tennis loving Himalayan Persian"
  },
  {
    name: "Lady",
    source: "../../assets/cats/lady.png",
    description: "Classy, refined, polite, and well-spoken"
  },
  {
    name: "Mexican",
    source: "../../assets/cats/mexican.png",
    description: "Al mal tiempo, buena cara!"
  },
  {
    name: "Savvy & Hip",
    source: "../../assets/cats/nit.png",
    description: "Who doesn't like nits?"
  },
  {
    name: "Panda Cat",
    source: "../../assets/cats/panda.png",
    description: "Popular around the world"
  },
  {
    name: "The Princess",
    source: "../../assets/cats/princess.png",
    description: "has a human sidekick"
  },
  {
    name: "Gryffindor",
    source: "../../assets/cats/redscarf.png",
    description: "Dumbledore's favorites"
  },
  {
    name: "From the North",
    source: "../../assets/cats/russian.png",
    description: "Winter is coming"
  },
  {
    name: "The Movie Star",
    source: "../../assets/cats/star.png",
    description: "Leader in fashion"
  },
  {
    name: "Yakuza",
    source: "../../assets/cats/sunglasses.png",
    description: "Fearless in battle"
  },
  {
    name: "The Gentleman",
    source: "../../assets/cats/tuxedo.png",
    description: "Chivalrous, courteous, and honourable"
  },
  {
    name: "Artist",
    source: "../../assets/cats/artist.png",
    description: "Is also a master of Photoshop and Illustrator"
  }
];

let displayCount = 8;
let pagination = Math.ceil(catData.length / displayCount);
let catCount;

function catRender() {
  catData.map(x => {
    cell = document.createElement("div");
    cell.innerHTML = `<img src="${x.source}" alt=""><h5 class="name">${
      x.name
    }</h5><p class="subtext">${x.description}</p>`;
    cell.classList.add("gridbox");
    catPhotos.appendChild(cell);
  });

  for (let i = 1; i <= pagination; i++) {
    cell = document.createElement("button");
    cell.innerHTML = i;
    cell.onclick = () => displayPage(i);
    cell.classList.add("paginationButton");
    pageButton.appendChild(cell);
  }
}
catRender();

function plusPage(x) {
  displayPage(currentPage + x);
}
function displayPage(n) {
  if (n > pagination) {
    currentPage = pagination;
    return;
  } else if (n < 1) {
    currentPage = 1;
    return;
  } else {
    paginationButton[currentPage].classList.remove("activate");
    currentPage = n;
  }

  paginationButton[currentPage].classList.add("activate");

  //display none all gridphotos
  for (let i = 0; i < gridbox.length; i++) {
    gridbox[i].style.display = "none";
  }
  //display the needed photos
  if (currentPage === pagination) {
    catCount = catData.length % displayCount;
  } else {
    catCount = displayCount;
  }
  for (let i = 0; i < catCount; i++) {
    gridbox[i + (currentPage - 1) * displayCount].style.display = "block";
  }
}
displayPage(1);
