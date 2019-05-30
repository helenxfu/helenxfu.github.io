let order = []
let playerOrder = []
let flash
let turn
let good
let compTurn
let intevalId
let strict = false
let noise = true
let on = false
let win

const turnCounter = document.querySelector("#turn");
const pizza = document.querySelectorAll("#topleft, #topright, #bottomleft, #bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

const baseColor = ["darkgreen", "darkred", "goldenrod", "darkblue"]
const lightColor = ["lightgreen", "tomato", "yellow", "lightskyblue"]
const audio = document.querySelectorAll(".clip")

strictButton.addEventListener("click", () => {
  strict = strictButton.checked
})

onButton.addEventListener("click", () => {
  on = onButton.checked
  if (on) {
    turnCounter.innerText = "-"
  } else {
    turnCounter.innerText = ""
    clearColor()
    clearInterval(intervalId)
  } 
})

startButton.addEventListener("click", ()=> {
  if (on || win) {
    play()
  }
})

function play() {
  win = false
  order = []
  playerOrder = []
  flash = 0
  intervalId = 0
  turn = 1
  turnCounter.innerHTML = 1
  good = true //correct play
  for (var i = 0; i<20; i++) {
    order.push(Math.floor(Math.random() * 4))
  }
  compTurn = true
  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  on = false //prevent clicking while COM is operating
  if (flash === turn) {
    clearInterval(intervalId)
    compTurn = false
    clearColor()
    on = true
  }
  if(compTurn) {
    clearColor()
    setTimeout(() =>{
      sing(order[flash]);
      flash++;
    }, 200)
  }
}

function sing(slice) {
  if (noise) {
    audio[slice].pause();
    audio[slice].currentTime = 0;
    audio[slice].play();
  }
  noise = true;
  pizza[slice].style.backgroundColor = lightColor[slice]
}

function clearColor() {
  for (let i= 0; i< pizza.length; i++) {
    pizza[i].style.backgroundColor = baseColor[i]
  }
}

function flashColor() {
  for (let i= 0; i< pizza.length; i++) {
    pizza[i].style.backgroundColor = lightColor[i]
  }
}

function playerPush(slice) {
  if (on) {
    playerOrder.push(slice);
    check();
    sing(slice)
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
}

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false
  if (playerOrder.length === 20 && good) {
    winGame()
  }
  if (good == false) {
    flashColor()
    turnCounter.innerText = "NO!"
    setTimeout(() => {
      turnCounter.innerText = turn
      clearColor()

      if (strict) {
        play()
      } else {
        compTurn = true
        flash = 0
        playerOrder = []
        good = true
        intervalId = setInterval(gameTurn, 800)
      }
    }, 800)

    noise = false
  }

  if (turn == playerOrder.length && good && !win) {
    turn++
    playerOrder = []
    compTurn = true
    flash = 0
    turnCounter.innerText = turn
    intervalId = setInterval(gameTurn, 800)
  }
}

function winGame() {
  flashColor()
  turnCounter.innerText = "WIN!"
  on = false
  win = true
}