import React, { Component } from 'react'
import './App.css'
import Chessboard from './components/Chessboard'
import Clock from './components/Clock'
import Footer from './components/Footer'
import {
  dateToAscii,
  timeToAscii,
  generateChessboard
} from './utility'

class App extends Component {
  constructor (props) {
    super(props)

    const now = new Date()
    const date = dateToAscii(now)
    const time = timeToAscii(now)
    this.state = {
      date,
      time,
      chessboard: generateChessboard(date, time, null)
    }
  }

  componentDidMount () {
    this.timer = setInterval(this.tick.bind(this), 1000)
    this.tick()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { date, time, chessboard } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Chess Board Clock</h1>
        </header>
        <main>
          <Clock time={date} />
          <Chessboard data={chessboard} />
          <Clock time={time} />
        </main>
        <Footer />
      </div>
    )
  }

  tick () {
    const now = new Date()
    const date = dateToAscii(now)
    const time = timeToAscii(now)
    const chessboard = generateChessboard(date, time, this.state.chessboard)
    this.setState({ date, time, chessboard })
  }
}

export default App
