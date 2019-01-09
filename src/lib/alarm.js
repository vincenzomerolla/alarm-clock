import alarmSound from '../assets/sounds/loud_alarm_clock.mp3'

export default class Alarm {
  constructor(time, daysActive = []) {
    this.audio = new Audio(alarmSound)
    this.time = time
    this.daysActive = daysActive
    this.isActive = true
  }
}
