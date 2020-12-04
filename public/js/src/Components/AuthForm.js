import { Alert } from './Alert';

export class AuthForm extends HTMLFormElement {
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
      console.log(resData);
      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }

      new Alert('success', successMessage).showMessage();

      if (callbackFunc && typeof callbackFunc === 'function') {
        callbackFunc();
      }
    } catch (err) {
      console.log(err);
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

// class LoginForm extends AuthForm {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.addEventListener('submit', (e) => {
//       e.preventDefault();

//       this.login(this.email.value, this.password.value);
//     });
//   }

//   async login(email, password) {
//     try {
//       const res = await fetch(
//         `${window.location.protocol}/api/v1/users/login`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       const resData = await res.json();
//       if (!res.ok) {
//         const alert = new Alert('error', resData.message);
//         return alert.showMessage();
//       }
//       new Alert(
//         'success',
//         `Logged in as: ${resData.data.user.name}`
//       ).showMessage();
//       setTimeout(() => location.assign('/'), 2000);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// class SignupForm extends AuthForm {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.addEventListener('submit', (e) => {
//       e.preventDefault();

//       this.sendConfirmationToken({
//         email: this.email.value,
//         name: this.name.value,
//         password: this.password.value,
//         confirmPassword: this.confirmPassword.value,
//       });
//     });
//   }

//   async sendConfirmationToken(data) {
//     try {
//       // Button animation
//       const button = this.querySelector('.form__button--send');
//       const buttonText = button.textContent;
//       button.innerHTML = `<div class="spinner"></div>`;
//       // FETCH
//       const res = await fetch(
//         `${window.location.protocol}/api/v1/users/signup`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       const resData = await res.json();
//       button.innerHTML = buttonText;

//       if (!res.ok) {
//         return new Alert('error', resData.message).showMessage();
//       }
//       new Alert(
//         'success',
//         'Success, please confirm your email address'
//       ).showMessage();
//     } catch (err) {
//       new Alert('error', err).showMessage();
//     }
//   }
// }

// class ForgotPasswordForm extends AuthForm {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.addEventListener('submit', (e) => {
//       e.preventDefault();

//       this.sendResetLink(this.email.value);
//     });
//   }

//   async sendResetLink(email) {
//     try {
//       // Button anim
//       const button = this.querySelector('.form__button--send');
//       const buttonText = button.textContent;
//       button.innerHTML = `<div class="spinner"></div>`;
//       // FETCH
//       const res = await fetch(
//         `${window.location.protocol}/api/v1/users/forgotPassword`,
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email }),
//         }
//       );
//       const resData = await res.json();
//       button.innerHTML = buttonText;

//       if (!res.ok) {
//         return new Alert('error', resData.message).showMessage();
//       }
//       new Alert('success', 'Reset token has been sent!').showMessage();
//     } catch (err) {
//       new Alert('error', err).showMessage();
//     }
//   }
// }

// class ResetPasswordForm extends AuthForm {
//   constructor() {
//     super();
//   }

//   connectedCallback() {
//     this.addEventListener('submit', (e) => {
//       e.preventDefault();

//       this.resetPassword(
//         this.password.value,
//         this.confirmPassword.value,
//         this.dataset.token
//       );
//     });
//   }

//   async resetPassword(password, confirmPassword, token) {
//     try {
//       const res = await fetch(
//         `${window.location.protocol}/api/v1/users/resetPassword/${token}`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             password,
//             confirmPassword,
//           }),
//         }
//       );

//       const resData = await res.json();

//       if (!res.ok) {
//         return new Alert('error', resData.message).showMessage();
//       }
//       new Alert('success', 'Password reset successfully!').showMessage();
//       setTimeout(() => location.assign('/'), 2000);
//     } catch (err) {
//       new Alert('error', err).showMessage();
//     }
//   }
// }