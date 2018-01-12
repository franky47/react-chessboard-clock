import React from 'react'
import PropTypes from 'prop-types'

import './Clock.css'

const Clock = ({ time }) => (
  <div className='clock'>
    { time.split('').map((c, i) => <span className='digit' key={i}>{c}</span>)}
  </div>
)

Clock.propTypes = {
  time: PropTypes.string
}

export default Clock
