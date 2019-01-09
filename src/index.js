import AlarmClock from './lib/alarm-clock'
import { ready } from './utils/dom'
import './app.css'

ready(() => {
  let alarmClock = new AlarmClock(document.querySelector('.alarm-clock'))
})
