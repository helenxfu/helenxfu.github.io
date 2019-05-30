let borad
let PLAYER = 'O'
let COM = 'X'
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const cells = document.querySelectorAll('.cell')
startGame()

function selectSym(sym) {
  PLAYER = sym
  COM = sym === 'O' ? 'X' : 'O'
  board = Array.from(Array(9).keys()) //creates 9 slots and uses its keys
  for (var i = 0; i<cells.length; i++){
    cells[i].addEventListener('click', turnClick, false)
  }
  if (COM === 'X') {
    turn(bestSpot(), COM)
  }
  document.querySelector('.selectSym').style.display = "none"
}

function startGame() {
  document.querySelector(".endgame").style.display = "none"
  document.querySelector('.selectSym').style.display = "block"
  for (var i = 0; i<cells.length; i++){
    cells[i].innerText = '';
    cells[i].style.removeProperty("background-color")
  }
}

function turnClick(square) {
  if (typeof board[square.target.id] === 'number'){
    turn(square.target.id, PLAYER)
    if (!checkWin(board, PLAYER) && !checkTie()) {
      turn(bestSpot(), COM)
    }
  }
}

function turn(squareId, player) {
  board[squareId] = player
  document.getElementById(squareId).innerText = player
  let gameWin = checkWin(board, player)
  if (gameWin) gameOver(gameWin)
  checkTie()
}

function checkWin(board, player) {
  let plays = board.reduce((accumulator, element, index) => (element === player) ? accumulator.concat(index) : accumulator, []) 
  let gameWin = null
  for (let [index, win] of winCombos.entries()){
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWin = {index: index, player: player}
      break
    }
  }
  return gameWin
}

function gameOver(gameWin){
  for (let index of winCombos[gameWin.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWin.player === PLAYER ? "blue" : "red"
  }
  for (let i = 0; i<cells.length; i++) {
    cells[i].removeEventListener('click', turnClick, false)
  }
  declareWinner(gameWin.player === PLAYER ? "You win!" : "You lose!")
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block"
  document.querySelector(".text").innerText = who
}

function emptySquares() {
  return board.filter((elm, i) => i===elm) //elm is symbol, i is index
}

function bestSpot() {
  return minimax(board, COM).index
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of cells) {
      cell.style.backgroundColor = "rgba(121, 0, 145, 0.3)"
      cell.removeEventListener('click', turnClick, false)
    }
    declareWinner("Tie Game!")
    return true
  }
  return false
}

function minimax(newBoard, player) {
  var availSpots = emptySquares() 

  if (checkWin(newBoard, PLAYER)) {
    return {score: -10}
  } else if (checkWin(newBoard, COM)) {
    return {score: 10}
  } else if (availSpots.length === 0) {
    return {score: 0}
  }
  var moves = []
  for (let i = 0; i < availSpots.length; i++) {
    var move = {} //why inside the for?
    move.index = newBoard[availSpots[i]]
    newBoard[availSpots[i]] = player

    if (player === COM) {
      move.score = minimax(newBoard, PLAYER).score
    } else {
      move.score = minimax(newBoard, COM).score
    }
    newBoard[availSpots[i]] = move.index
    if ((player === COM && move.score === 10) || (player === PLAYER && move.score === -10)) {
      return move
    }
    else{
      moves.push(move)
    }
  }

  let bestMove, bestScore
  if(player === COM) {
    bestScore = -1000
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  } else {
    bestScore = 1000
    for (var i = 0; i < moves.length; i++) {
      if(moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}