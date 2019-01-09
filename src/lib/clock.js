import EventEmitter from 'events'

export default class Clock extends EventEmitter {
  constructor(el, options) {
    super()
    this.root = el
    this.addIntervalTimer()
  }

  getTime() {
    let date = new Date()

    let day = date.getDay()
    let month = date.getMonth()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()

    return { day, hours, minutes, seconds }
  }

  addIntervalTimer() {
    this.intervalId = setInterval(() => {
      let time = this.getTime()
      this.emit('tick', time)
      this.render(time)
    }, 500)
  }

  render() {}
}
