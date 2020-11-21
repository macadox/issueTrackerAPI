export class Alert {
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }

  hideMessage() {
    const alert = document.querySelector('.alert');
    if (alert) alert.parentElement.removeChild(alert);
  }

  showMessage() {
    this.hideMessage();

    const alert = document.createElement('div');
    alert.setAttribute('role', 'alertdialog');
    alert.className = `alert alert--${this.type}`;
    alert.innerHTML = `<img class="alert__icon ${
      this.type == 'error' ? 'alert__icon--error' : ''
    }" ${
      this.type == 'error'
        ? 'src="/img/ui/close.svg" alt="error"'
        : this.type === 'success'
        ? 'src="/img/ui/tick.svg" alt="success"'
        : ''
    }><p class="alert__message">${this.message}</p>`;
    document.body.prepend(alert);

    alert.addEventListener('click', this.handleClick.bind(this));
    this.timeoutId = setTimeout(this.hideMessage, 2000);
  }

  handleClick() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.hideMessage();
  }
}
