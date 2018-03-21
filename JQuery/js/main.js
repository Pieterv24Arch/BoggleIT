import $ from 'jquery'
import '../styles/style.scss'

let dice = [
  ['R', 'I', 'F', 'O', 'B', 'X'],
  ['I', 'F', 'E', 'H', 'E', 'Y'],
  ['D', 'E', 'N', 'O', 'W', 'S'],
  ['U', 'T', 'O', 'K', 'N', 'D'],
  ['H', 'M', 'S', 'R', 'A', 'O'],
  ['L', 'U', 'P', 'E', 'T', 'S'],
  ['A', 'C', 'I', 'T', 'O', 'A'],
  ['Y', 'L', 'G', 'K', 'U', 'E'],
  ['Q', 'B', 'M', 'J', 'O', 'A'],
  ['E', 'H', 'I', 'S', 'P', 'N'],
  ['V', 'E', 'T', 'I', 'G', 'N'],
  ['B', 'A', 'L', 'I', 'Y', 'T'],
  ['E', 'Z', 'A', 'V', 'N', 'D'],
  ['R', 'A', 'L', 'E', 'S', 'C'],
  ['U', 'W', 'I', 'L', 'R', 'G'],
  ['P', 'A', 'C', 'E', 'M', 'D']
]

let board = [
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined
]

let selected = []

let lastSquare = -1

const makeBoard = () => {
  for (let i = 0; i < dice.length; i++) {
    let random = Math.floor((Math.random() * 6))
    board[i] = dice[i][random]
  }
}

const drawBoardLetters = () => {
  for (let i = 0; i < board.length; i++) {
    $('#' + i + ' p').text(board[i])
    // $('#' + i + ' p').text(i)
  }
}

const drawTiles = () => {
  for (let i = 0; i < board.length; i++) {
    $('#' + i).removeClass(['valid', 'invalid', 'pressed'])
    if (selected.includes(i)) {
      $('#' + i).addClass('pressed')
    }
  }
}

const getValidSquares = (id) => {
  let coord = idToCoords(id)

  let validIds = []
  if (isValidCoord(coord)) {
    if (isValidCoord([coord[0] + 1, coord[1]])) {
      validIds.push(coordsToId([coord[0] + 1, coord[1]]))
    }
    if (isValidCoord([coord[0] + 1, coord[1] - 1])) {
      validIds.push(coordsToId([coord[0] + 1, coord[1] - 1]))
    }
    if (isValidCoord([coord[0], coord[1] - 1])) {
      validIds.push(coordsToId([coord[0], coord[1] - 1]))
    }
    if (isValidCoord([coord[0] - 1, coord[1] - 1])) {
      validIds.push(coordsToId([coord[0] - 1, coord[1] - 1]))
    }
    if (isValidCoord([coord[0] - 1, coord[1]])) {
      validIds.push(coordsToId([coord[0] - 1, coord[1]]))
    }
    if (isValidCoord([coord[0] - 1, coord[1] + 1])) {
      validIds.push(coordsToId([coord[0] - 1, coord[1] + 1]))
    }
    if (isValidCoord([coord[0], coord[1] + 1])) {
      validIds.push(coordsToId([coord[0], coord[1] + 1]))
    }
    if (isValidCoord([coord[0] + 1, coord[1] + 1])) {
      validIds.push(coordsToId([coord[0] + 1, coord[1] + 1]))
    }
  }

  return validIds
}

const isValidSquare = (id) => {
  if (id >= 0 && id < 16) {
    if (lastSquare === -1) {
      return true
    }
    let validSquares = getValidSquares(lastSquare)

    return validSquares.includes(Number(id)) && !selected.includes(Number(id))
  }
}

const isValidCoord = (coord) => {
  if (coord[0] >= 0 && coord[0] < 4 && coord[1] >= 0 && coord[1] < 4) {
    return true
  }

  return false
}

const idToCoords = (id) => {
  let x = id % 4
  let y = Math.floor(id / 4)

  return [x, y]
}

const coordsToId = (coords) => {
  let id = coords[1] * 4
  id += coords[0]

  return id
}

const drawWord = () => {
  let word = ''
  for (let letter in selected) {
    word += board[selected[letter]]
  }
  $('.boggle-word p').text(word)
}

const markValidSquares = (id) => {
  let valid = getValidSquares(id)

  for (let val in valid) {
    if (!$('#' + valid[val]).hasClass('pressed')) {
      $('#' + valid[val]).addClass('valid')
    }
  }
}

const registerClickEvents = () => {
  for (let i = 0; i < board.length; i++) {
    $('#' + i).click(function () {
      if (isValidSquare(this.id)) {
        selected.push(Number(this.id))
        lastSquare = this.id
        drawTiles()
        markValidSquares(lastSquare)
        drawWord()
      } else if (!$(this).hasClass('pressed')) {
        drawTiles()
        $(this).addClass('invalid')
        markValidSquares(lastSquare)
      } else if ($(this).hasClass('pressed') && Number(this.id) === Number(lastSquare)) {
        selected.pop()
        if (selected.length > 0) {
          lastSquare = selected[selected.length - 1]
        } else {
          lastSquare = -1
        }
        drawTiles()
        markValidSquares(lastSquare)
        drawWord()
      }
    })
  }
}

$(document).ready(() => {
  makeBoard()
  drawBoardLetters()
  registerClickEvents()
})
