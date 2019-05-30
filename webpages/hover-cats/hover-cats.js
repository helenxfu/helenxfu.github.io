let topCatImg = document.getElementById("topCat");
let catGrid = document.getElementById("catGrid");
let colorWindow = document.getElementById("colorWindow");
let rainbowButtons = document.getElementById("rainbowButtons");
let peekCat = document.getElementById("peekCat");

let cRed = document.getElementById("changeRed");
let cGreen = document.getElementById("changeGreen");
let cBlue = document.getElementById("changeBlue");
let outputR = document.getElementById("redValueText");
let outputG = document.getElementById("greenValueText");
let outputB = document.getElementById("blueValueText");

let cell;

let catData = [
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

const rainbow = [
  [255, 0, 0],
  [255, 127, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 0, 255],
  [75, 0, 130],
  [148, 0, 211]
];

const ROYGBIV = ["R", "O", "Y", "G", "B", "I", "V"];

const animateCat = [
  "translate(20px, 20px)",
  "translate(20px, -20px)",
  "translate(-20px, 20px)",
  "translate(-20px, -20px)",
  "translate(0, -20px)",
  "translate(0, 20px)",
  "translate(-20px, 0)",
  "translate(20px, 0)",
  "scale(1.2, 1.2)",
  "scale(0.8, 0.8)",
  "rotate(10deg)",
  "rotate(-10deg)"
];
const audioPlaylist = [
  "../../assets/Sound-Files/钢琴音色MP3/40-C  -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/42-D -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/44-E  -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/45-F   -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/47-G  -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/49-A  -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/51-B    -小字1组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/52-C    -小字2组.mp3",
  "../../assets/Sound-Files/钢琴音色MP3/39-B  -小字组.mp3",
  "../../assets/Sound-Files/fnaf-cheer.mp3",
  "../../assets/Sound-Files/clappingsfx.mp3"
];

let key = [];
for (let m = 0; m < audioPlaylist.length; m++) {
  key.push(new Audio(audioPlaylist[m]));
}

function renderCats() {
  catData.map(x => {
    cell = document.createElement("img");
    cell.classList.add("hoverCat");
    cell.src = x.source;
    cell.alt = "";
    cell.onmouseenter = () => hoverCatEnter();
    cell.onmouseleave = () => hoverCatLeave();
    catGrid.appendChild(cell);
  });
}
renderCats();

function renderButtons() {
  for (let i = 0; i < rainbow.length; i++) {
    cell = document.createElement("button");
    cell.onclick = () => {
      colorPass(...rainbow[i]);
    };
    cell.style.backgroundColor = `rgb(${rainbow[i]})`;
    cell.textContent = ROYGBIV[i];
    rainbowButtons.appendChild(cell);
  }
}
renderButtons();

function topCatMouseEnter() {
  topCatImg.style.transform = "translateY(80px) rotate(180deg)";
}
function topCatMouseLeave() {
  topCatImg.style.transform = "translateY(-80px) rotate(180deg)";
}

function randomNumberGenerator() {
  let randomArr = [];
  do {
    randomArr.push(Math.floor(Math.random() * 256));
  } while (randomArr.length < 3);
  [cRed.value, cGreen.value, cBlue.value] = randomArr;
  colorTest(...randomArr);
}

function colorTest(r, g, b) {
  colorWindow.style.backgroundColor = `rgb(${r},${g},${b})`;
  [outputR.textContent, outputG.textContent, outputB.textContent] = [
    cRed.value,
    cGreen.value,
    cBlue.value
  ];
}
function colorSet(r, g, b) {
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
}
function colorPass(r, g, b) {
  [cRed.value, cGreen.value, cBlue.value] = [r, g, b];
  colorTest(r, g, b);
  colorSet(r, g, b);
}
colorPass(255, 239, 170);

function playNotes(num) {
  key[num].pause();
  key[num].currentTime = 0;
  key[num].play();
}

document.onkeydown = function(e) {
  switch (e.which) {
    case 65:
      playNotes(8);
      break;
    case 83:
      playNotes(0);
      break;
    case 68:
      playNotes(1);
      break;
    case 70:
      playNotes(2);
      break;
    case 71:
      playNotes(3);
      break;
    case 72:
      playNotes(4);
      break;
    case 74:
      playNotes(5);
      break;
    case 75:
      playNotes(6);
      break;
    case 76:
      playNotes(7);
      break;
    case 81:
      playNotes(9);
      break;
    case 87:
      playNotes(10);
      break;
    default:
      break;
  }
};

function hoverCatEnter() {
  let randomAnimation = Math.floor(Math.random() * animateCat.length);
  let randomColor = Math.floor(Math.random() * 20);
  event.target.style.transform = animateCat[randomAnimation];
  randomColor < 7 &&
    (event.target.style.backgroundColor = `rgb(${rainbow[randomColor]})`);
}

function hoverCatLeave() {
  event.target.style.transform = "none";
  event.target.style.backgroundColor = "transparent";
}

function touchMeFunc() {
  peekCat.style.animationName = "frame" + Math.floor(Math.random() * 7);
}

function shuffleCats() {
  catGrid.innerHTML = `<img
    src="../../assets/cats/banner1.png"
    class="banner"
    onclick="shuffleCats()"
    alt=""
  />`;
  for (let i = catData.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [catData[i], catData[j]] = [catData[j], catData[i]];
  }
  renderCats();
}
