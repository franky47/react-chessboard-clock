import moment from 'moment'

export const dateToAscii = (date) => moment(date).format('YY-MM-DD')
export const timeToAscii = (time) => moment(time).format('HH:mm:ss')

export const toBinaryZeroPad = (value, numBits = 8) => {
  const str = value.toString(2)
  return Array(numBits - str.length).fill('0').join('') + str
}

export const flipBits = (value, width = 4) => {
  return parseInt(toBinaryZeroPad(value, width).split('').reverse().join(''), 2)
}

export const generateBinaryGrid = (date, time) => {
  const a = date.split('').map(c => (c.charCodeAt(0) & 0x0f))
  const b = time.split('').map(c => (c.charCodeAt(0) & 0x0f))
  return a
    .map((lsb, i) => (flipBits(lsb) << 4) | b[i])
    .map(x => toBinaryZeroPad(x))
    .map(x => x.split('').map(b => parseInt(b, 2)))
}

export const placePieces = (grid, previous) => {
  const pick = (x, y, color, grid) => {
    const has = (piece) => grid.find(row => row.includes(piece))
    y = color === 'w' ? 8 - y : y
    if (!has(`k${color}`)) {
      return 'k'
    }
    if (!has(`q${color}`)) {
      return 'q'
    }
    return 'p'
  }
  const color = (y) => y < 4 ? 'b' : 'w'
  const newPiece = (x, y, grid) => {
    const c = color(y)
    return `${pick(x, y, c, grid)}${c}`
  }

  if (previous === null) {
    previous = [
      ['rb', 'nb', 'bb', 'qb', 'kb', 'bb', 'nb', 'rb'],
      ['pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb', 'pb'],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      ['pw', 'pw', 'qw', 'pw', 'pw', 'kw', 'pw', 'pw'],
      ['rw', 'nw', 'bw', 'qw', 'rw', 'bw', 'nw', 'rw']
    ]
    // return grid.map((row, y) => row.map((cell, x) => cell === 1 ? newPiece(x, y) : null))
  }

  return grid.map((row, y) => row.map((cell, x) => {
    if (previous[y][x] === null) {
      return cell === 1 ? newPiece(x, y, previous) : null
    } else {
      return cell === 1 ? previous[y][x] : null
    }
  }))
}

export const transpose = (grid) => {
  return grid[0].map((col, i) => grid.map(row => row[i]))
}

export const generateChessboard = (date, time, previousGrid) => {
  const grid = transpose(generateBinaryGrid(date, time))
  return placePieces(grid, previousGrid)
}
