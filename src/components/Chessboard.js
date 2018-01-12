import React from 'react'
import PropTypes from 'prop-types'

import './Chessboard.css'

export default class Chessboard extends React.PureComponent {
  render () {
    const { data } = this.props
    return (
      <div className='chessboard'>
        { data.map((row, y) => row.map((piece, x) => this.renderPiece(piece, x, y))) }
      </div>
    )
  }

  // --
  renderPiece (piece, x, y) {
    const key = y * 8 + x
    const color = key % 2 === (y % 2 ? 0 : 1) ? 'black' : 'white'
    if (!piece) {
      return <div className={`cell ${color}`} key={key} />
    }
    return (
      <div className={`cell ${color}`} key={key}>
        <img src={require(`./pieces/${piece}.svg`)} alt={piece} />
      </div>
    )
  }
}

Chessboard.propTypes = {
  data: PropTypes.array
}
