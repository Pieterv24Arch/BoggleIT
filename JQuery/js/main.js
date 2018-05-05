import $ from 'jquery'
import validator from 'validator'
import '../styles/style.scss'

let apiAddress = 'http://localhost:52964'

// let dice = [
//   ['R', 'I', 'F', 'O', 'B', 'X'],
//   ['I', 'F', 'E', 'H', 'E', 'Y'],
//   ['D', 'E', 'N', 'O', 'W', 'S'],
//   ['U', 'T', 'O', 'K', 'N', 'D'],
//   ['H', 'M', 'S', 'R', 'A', 'O'],
//   ['L', 'U', 'P', 'E', 'T', 'S'],
//   ['A', 'C', 'I', 'T', 'O', 'A'],
//   ['Y', 'L', 'G', 'K', 'U', 'E'],
//   ['Q', 'B', 'M', 'J', 'O', 'A'],
//   ['E', 'H', 'I', 'S', 'P', 'N'],
//   ['V', 'E', 'T', 'I', 'G', 'N'],
//   ['B', 'A', 'L', 'I', 'Y', 'T'],
//   ['E', 'Z', 'A', 'V', 'N', 'D'],
//   ['R', 'A', 'L', 'E', 'S', 'C'],
//   ['U', 'W', 'I', 'L', 'R', 'G'],
//   ['P', 'A', 'C', 'E', 'M', 'D']
// ]

let boardId = ''
let board = [
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined,
  undefined, undefined, undefined, undefined
]
let score = 0

let selected = []

let lastSquare = -1

const makeBoard = (id) => {
  // for (let i = 0; i < dice.length; i++) {
  //   let random = Math.floor((Math.random() * 6))
  //   board[i] = dice[i][random]
  // }
  if (id && validateGuid(id)) {
    $.ajax(apiAddress + '/api/board/' + id, {
      method: 'GET'
    }).then(p => {
      boardId = p.stateId
      board = p.board
      score = p.score
      drawBoardLetters()
      updateScore()
      updateWords()
    }).catch(error => {
      console.log(error)
      if (error.status === 404) {
        window.location.search = ''
      }
    })
  } else {
    $.ajax(apiAddress + '/api/board', {
      method: 'GET'
    }).then(p => {
      boardId = p.stateId
      board = p.board
      score = p.score
      updateUrlId(p.stateId)
      // drawBoardLetters()
    }).catch(error => {
      console.log(error.statusText)
    })
  }
}

const updateUrlId = (id) => {
  let url = new URL(window.location)

  if (getQueryStringParams('id')) {
    url.searchParams.set('id', id)
  } else {
    url.searchParams.append('id', id)
  }

  window.location.search = url.search
}

const updateBoard = () => {
  $.ajax(apiAddress + '/api/board/' + boardId, {
    method: 'GET'
  }).then(p => {
    boardId = p.stateId
    board = p.board
    score = p.score
    drawBoardLetters()
    updateScore()
    updateWords()
  }).catch(error => {
    console.log(error)
    if (error.status === 404) {
      window.location.search = ''
    }
  })
}

const newGame = () => {
  window.location.search = ''
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

const updateScore = () => {
  $('#score p').text('Score: ' + score)
}

const updateWords = () => {
  $.ajax(apiAddress + '/api/word/' + boardId, {
    method: 'GET'
  }).then(p => {
    if (p instanceof Array) {
      let wordList = $('.word-list')
      wordList.empty()
      console.log(wordList)
      p.forEach(element => {
        console.log(element)
        wordList.append('<p>' + element.word.toLowerCase() + '</p>')
      })
    }
  }).catch(error => {
    console.log(error)
  })
}

const getWord = () => {
  let word = ''
  for (let letter in selected) {
    word += board[selected[letter]]
  }

  return word
}

const markValidSquares = (id) => {
  let valid = getValidSquares(id)

  for (let val in valid) {
    if (!$('#' + valid[val]).hasClass('pressed')) {
      $('#' + valid[val]).addClass('valid')
    }
  }
}

const playWord = () => {
  if (boardId) {
    $.ajax(apiAddress + '/api/word/' + boardId, {
      method: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({
        word: getWord(),
        letterOrder: selected
      })
    }).then(a => {
      console.log(a)
      selected = []
      lastSquare = -1
      drawTiles()
      drawWord()
      updateBoard()
    }).catch(e => {
      console.log(e)
    })
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

  $('#play-button').click(() => {
    console.log(selected)
    playWord()
  })

  $('#new-game-button').click(() => {
    newGame()
  })
}

const getQueryStringParams = (param) => {
  let queryUrl = window.location.search.substring(1)
  let urlVars = queryUrl.split('&')
  for (let i = 0; i < urlVars.length; i++) {
    var urlParam = urlVars[i].split('=')
    if (urlParam[0] === param) {
      return urlParam[1]
    }
  }
}

const validateGuid = (guid) => {
  return validator.isUUID(guid)
}

$(document).ready(() => {
  console.log(getQueryStringParams('id'))
  makeBoard(getQueryStringParams('id'))
  registerClickEvents()
})
