export class Checkbox {
  constructor(element) {
    this.element = element;
    this._checked = this.element.getAttribute('aria-checked') === 'true';
    this.event = new Event('input', {
      bubbles: true,
      cancelable: true,
    })
    
    if (this._checked) {
      this.element.classList.add('checkbox--checked')
    }

    this.element.setAttribute('role', 'checkbox');
    this.element.setAttribute('tabindex', 0);

    this.element.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    this.checked = !this.checked;
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case 32: {
        e.preventDefault();
        console.log(this.checked);
        this.checked = !this.checked;
        break;
      }
    }
  }

  get checked() {
    return this._checked;
  }

  set checked(val) {
    this._checked = val;
    this.element.setAttribute('aria-checked', val);
    this.element.dispatchEvent(this.event);
    if (this._checked) {
      this.element.classList.add('checkbox--checked')
    } else {
      this.element.classList.remove('checkbox--checked')
    }
  }
}
