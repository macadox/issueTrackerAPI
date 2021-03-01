import { Alert } from './Alert';

export class Form extends HTMLFormElement {
  constructor() {
    super();
    this.button = this.querySelector('.form__button--send');
    this.inputs = this.querySelectorAll('.form__input');
    this.inputs.forEach((input) => {
      this.handleLabels.call(input);

      input.addEventListener('input', this.handleLabels);
      input.addEventListener('focusin', function () {
        input.classList.add('form__input--float-label');
      });
      input.addEventListener('focusout', this.handleLabels);
    });
  }

  handleLabels() {
    if (this.value) {
      this.classList.add('form__input--float-label');
    } else {
      this.classList.remove('form__input--float-label');
    }
  }

  async collectBodyAndSend(options, successMessage, callbackFunc) {
    const formData = new FormData(this);
    let buttonText;
    // Append to formData
    // for (let element of this.elements) {
    //   if (element.hasAttribute('name')) {
    //     if (element.getAttribute('type') == 'file') {
    //       formData.append(
    //         element.getAttribute('name'),
    //         this[element.getAttribute('name')].files[0]
    //       );
    //     } else {
    //       formData.append(
    //         element.getAttribute('name'),
    //         this[element.getAttribute('name')].value
    //       );
    //     }
    //   }
    // }
    options.body = formData;
    // Animate button
    if (options.runSpinner) {
      buttonText = this.runSpinner();
    }
    // // Send request
    await this.sendAsync(options, successMessage, callbackFunc);
    // // Stop animate button
    if (options.runSpinner) {
      this.stopSpinner(buttonText);
    }
  }

  async sendAsync(options, successMessage, callbackFunc) {
    const { endpoint, method, body } = options;
    try {
      const res = await fetch(endpoint, {
        method,
        body,
      });

      const resData = await res.json();
      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }

      new Alert('success', successMessage).showMessage();

      if (callbackFunc && typeof callbackFunc === 'function') {
        callbackFunc();
      }
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }

  runSpinner() {
    const buttonText = this.button.textContent;
    this.button.innerHTML = `<div class="spinner"></div>`;

    return buttonText;
  }

  stopSpinner(buttonText) {
    this.button.innerHTML = buttonText;
  }
}