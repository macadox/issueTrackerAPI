export class Checkbox {
  constructor(element) {
    this.element = element;
    this.input = this.element.querySelector('input[type="checkbox"]');
    this.box = this.element.querySelector('.checkbox__box');

    this._checked = !!this.input.getAttribute(checked);

    this.box.setAttribute('role', 'checkbox');
    this.box.setAttribute('tabindex', 0);
    this.box.setAttribute('aria-checked', this._checked);

    this.box.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.box.addEventListener('click', this.handleClick.bind(this));
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
    this.box.setAttribute('aria-checked', val);
    this.input.setAttribute('checked', val)
  }
}
