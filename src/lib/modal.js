import EventEmitter from 'events'

export default class Modal extends EventEmitter {
  constructor(el) {
    super()
    this.element = el
    this.saveBtn = el.querySelector('.modal__save')
    this.closeBtn = el.querySelector('.modal__close')

    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', this.save.bind(this))
    }

    this.closeBtn.addEventListener('click', this.close.bind(this))
  }

  getElement() {
    return this.element
  }

  open() {
    this.element.classList.add('open')
    this.emit('open')
  }

  close() {
    this.element.classList.remove('open')
    this.emit('close')
  }

  save() {
    this.emit('save')
  }
}
