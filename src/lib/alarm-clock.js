import Modal from './modal';
import DigitalClock from './digital-clock';
import Alarm from './alarm';

export default class AlarmClock {
  constructor(el) {
    this.alarm = null;

    this.container = el;
    this.addAlarmBtn = this.container.querySelector('.btn');

    this.clock = new DigitalClock(el.querySelector('.clock'));

    this.setAlarmModal = new Modal(document.getElementById('set-alarm-modal'));
    this.ringAlarmModal = new Modal(document.getElementById('ring-alarm-modal'));
    this.ringAlarmModal.on('close', this.handleAlarmClose.bind(this));

    this.clock.on('tick', this.checkTime.bind(this));

    this.addAlarmBtn.addEventListener('click', this.handleAlarmAdd.bind(this));

    let form = document.getElementById('set-alarm-form');
    form.addEventListener('submit', this.handleSave.bind(this));
  }

  handleAlarmAdd(e) {
    this.setAlarmModal.open();
  }

  handleAlarmClose() {
    let sound = this.alarm.audio;
    sound.pause();
    sound.currentTime = 0;
    if (this.alarm.daysActive.length === 0) {
      this.alarm.isActive = false;
    }
  }

  handleSave(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let days = [];

    let time = {
      hours: +formData.get('hour'),
      minutes: +formData.get('minute'),
      seconds: 0
    };

    this.alarm = new Alarm(time, days);
    this.setAlarmModal.close();
  }

  checkTime({ day, hours, minutes, seconds }) {
    let { ringAlarmModal, alarm } = this;
    if (alarm && alarm.isActive) {
      if (
        alarm.time.hours === hours &&
        alarm.time.minutes === minutes &&
        alarm.time.seconds === seconds
      ) {
        ringAlarmModal.open();
        alarm.audio.play();
      }
    }
  }

  destroy() {
    this.ringAlarmModal.off('close', this.handleAlarmClose.bind(this));
    this.clock.off('tick', this.checkTime.bind(this));
  }
}
