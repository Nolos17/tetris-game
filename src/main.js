import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')
const $finalScore = document.querySelector('#final-score')
const $modal = document.querySelector('#game-over-modal')
const $restartButton = document.querySelector('#restart-button')
const $restartButton1 = document.querySelector('#restart-button1')

const BLOCK_SIZE = 20
const BOARD_WIDTH = 14
const BOARD_HEIGHT = 26
let SCORE = 0
let FINALSCORE = 0
canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

function createBoard(width, height) {
  return Array(height).fill().map(() => Array(width).fill(0))
}

const PIECES = [
  { shape: [[1, 1], [1, 1]], color: '#FFFF00' }, // O - Amarillo
  { shape: [[0, 1, 0], [1, 1, 1]], color: '#800080' }, // T - Púrpura
  { shape: [[1, 1, 0], [0, 1, 1]], color: '#00FF00' }, // S - Verde
  { shape: [[0, 1, 1], [1, 1, 0]], color: '#FF0000' }, // Z - Rojo
  { shape: [[1, 0], [1, 0], [1, 1]], color: '#FFA500' }, // L - Naranja
  { shape: [[0, 1], [0, 1], [1, 1]], color: '#0000FF' }, // J - Azul
  { shape: [[1, 1, 1, 1]], color: '#00FFFF' } // I - Cian
];

const piece = {
  position: { x: 6, y: 0 },
  shape: PIECES[0].shape,
  color: PIECES[0].color,
  pieceIndex: 0,
};

let dropCounter = 0
let lastTime = 0

function update(time = 0) {
  const deltaTime = time - lastTime
  lastTime = time
  dropCounter += deltaTime
  if (dropCounter > 200) {
    piece.position.y++
    dropCounter = 0
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  draw()
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  // Dibujar la cuadrícula
  context.strokeStyle = '#ccc'
  context.lineWidth = 0.05
  for (let x = 0; x < BOARD_WIDTH; x++) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, BOARD_HEIGHT)
    context.stroke()
  }
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(BOARD_WIDTH, y)
    context.stroke()
  }

  // Dibujar el tablero (bloques fijos)
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        if (value - 1 < PIECES.length) {
          context.fillStyle = PIECES[value - 1].color
          context.fillRect(x, y, 1, 1)
          context.strokeStyle = 'black'
          context.lineWidth = 0.05
          context.strokeRect(x, y, 1, 1)
        } else {
          console.error(`Valor inválido en board[${y}][${x}]: ${value}`)
        }
      }
    })
  })

  // Dibujar la pieza actual
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 1) {
        context.fillStyle = piece.color
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
        context.strokeStyle = 'black'
        context.lineWidth = 0.05
        context.strokeRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })

  $score.innerText = SCORE

}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }
  if (event.key === 'ArrowUp') {
    const rotated = []
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value !== 0 &&
        (y + piece.position.y >= BOARD_HEIGHT ||
          x + piece.position.x < 0 ||
          x + piece.position.x >= BOARD_WIDTH ||
          board[y + piece.position.y]?.[x + piece.position.x] > 0)
      )
    })
  })
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value == 1) {
        board[y + piece.position.y][x + piece.position.x] = piece.pieceIndex + 1
      }
    })
  })

  const newPieceIndex = Math.floor(Math.random() * PIECES.length)
  const newPiece = PIECES[newPieceIndex]
  piece.position = { x: 6, y: 0 }
  piece.shape = newPiece.shape
  piece.color = newPiece.color
  piece.pieceIndex = newPieceIndex

  console.log('Tablero después de solidificar:', board)

  if (checkCollision()) {
    $finalScore.innerText = SCORE // Pasar SCORE a final-score
    $modal.classList.remove('hidden')
    console.log('Game Over - Puntuación:', SCORE) // Depuración
    board.forEach(row => row.fill(0))
    SCORE = 0
  }

  function resetGame() {
    console.log('Reiniciando juego')
    board.forEach(row => row.fill(0))
    SCORE = 0
    $score.innerText = SCORE // Actualizar la puntuación en pantalla
    const newPieceIndex = Math.floor(Math.random() * PIECES.length)
    const newPiece = PIECES[newPieceIndex]
    piece.position = { x: 6, y: 0 }
    piece.shape = newPiece.shape
    piece.color = newPiece.color
    piece.pieceIndex = newPieceIndex
    $modal.classList.add('hidden')
  }
  
  $restartButton.addEventListener('click', resetGame)
  $restartButton1.addEventListener('click', resetGame)
}

function removeRows() {
  const rowsToRemove = []
  board.forEach((row, y) => {
    if (row.every(value => value > 0)) {
      rowsToRemove.push(y)
    }
  })
  rowsToRemove.forEach(y => {
    board.splice(y, 1)
    const newRow = Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
    SCORE += 10
  })
}

update()