import Clock from './clock'

const pad = n => (n < 10 ? `0${n}` : n)

export default class DigitalClock extends Clock {
  static HOUR_12 = '12-hour'
  static HOUR_24 = '24-hour'

  constructor(el, options = { displayFormat: DigitalClock.HOUR_12 }) {
    super(el, options)

    this.displayFormat = options.displayFormat

    this.hours = el.querySelector('.clock__hours')
    this.minutes = el.querySelector('.clock__minutes')
    this.seconds = el.querySelector('.clock__seconds')

    el.classList.add('clock--digital')

    if (this.displayFormat === DigitalClock.HOUR_12) {
      this.meridiem = document.createElement('small')
      this.meridiem.classList.add('clock__meridiem')
      el.appendChild(this.meridiem)
    }
  }

  getFormattedTime({ hours, minutes, seconds }) {
    let hrs, meridiem

    switch (this.displayFormat) {
      case DigitalClock.HOUR_24:
        hrs = hours
        meridiem = ''
        break
      case DigitalClock.HOUR_12:
      default:
        hrs = hours % 12 || 12
        meridiem = hours >= 12 ? 'PM' : 'AM'
        break
    }

    return {
      hours: pad(hrs),
      minutes: pad(minutes),
      seconds: pad(seconds),
      meridiem,
    }
  }

  render(time) {
    let { hours, minutes, seconds, meridiem } = this.getFormattedTime(time)

    this.hours.textContent = hours
    this.minutes.textContent = minutes
    this.seconds.textContent = seconds

    if (this.displayFormat === DigitalClock.HOUR_12) {
      this.meridiem.textContent = meridiem
    }
  }
}
