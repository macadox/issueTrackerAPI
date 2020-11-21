import { Alert } from './Alert';


class AuthForm extends HTMLFormElement {
  constructor() {
    super();
    this.inputs = this.querySelectorAll('.form__input');
    this.inputs.forEach((input) => {
      input.addEventListener('input', this.handleLabels);
      input.addEventListener('focusin', function () {
        input.classList.add('form__input--float-label');
      });
      input.addEventListener('focusout', this.handleLabels);
    });
  }

  handleLabels() {
    if (this.value.trim()) {
      this.classList.add('form__input--float-label');
    } else {
      this.classList.remove('form__input--float-label');
    }
  }
}

class LoginForm extends AuthForm {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('submit', (e) => {
      e.preventDefault();

      this.login(this.email.value, this.password.value);
    });
  }

  async login(email, password) {
    try {
      const res = await fetch(
        `${window.location.protocol}/api/v1/users/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const resData = await res.json();
      if (!res.ok) {
        const alert = new Alert('error', resData.message);
        return alert.showMessage();
      }
      new Alert('success', 'User logged in').showMessage();
      setTimeout(() => location.assign('/'), 2000);
    } catch (err) {
      console.log(err);
    }
  }
}

class SignupForm extends AuthForm {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('submit', (e) => {
      e.preventDefault();

      this.sendConfirmationToken({
        email: this.email.value,
        name: this.name.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value,
      });
    });
  }

  async sendConfirmationToken(data) {
    try {
      // Button animation
      const button = this.querySelector('.form__button');
      const buttonText = button.textContent;
      button.innerHTML = `<div class="spinner"></div>`;
      // FETCH
      const res = await fetch(
        `${window.location.protocol}/api/v1/users/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await res.json();
      button.innerHTML = buttonText;

      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }
      new Alert('success', 'Success, please confirm your email address').showMessage();
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }
}

class ForgotPasswordForm extends AuthForm {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('submit', (e) => {
      e.preventDefault();

      this.sendResetLink(this.email.value);
    });
  }

  async sendResetLink(email) {
    try {
      // Button anim
      const button = this.querySelector('.form__button');
      const buttonText = button.textContent;
      button.innerHTML = `<div class="spinner"></div>`;
      // FETCH
      const res = await fetch(
        `${window.location.protocol}/api/v1/users/forgotPassword`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      const resData = await res.json();
      button.innerHTML = buttonText;

      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }
      new Alert('success', 'Reset token has been sent!').showMessage();
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }
}

class ResetPasswordForm extends AuthForm {
  constructor() {
    super();
  }

  connectedCallback() {
    this.addEventListener('submit', (e) => {
      e.preventDefault();

      this.resetPassword(
        this.password.value,
        this.confirmPassword.value,
        this.dataset.token
      );
    });
  }

  async resetPassword(password, confirmPassword, token) {
    try {
      const res = await fetch(
        `${window.location.protocol}/api/v1/users/resetPassword/${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );

      const resData = await res.json();

      if (!res.ok) {
        return new Alert('error', resData.message).showMessage();
      }
      new Alert('success', 'Password reset successfully!').showMessage();
      setTimeout(() => location.assign('/'), 2000);
    } catch (err) {
      new Alert('error', err).showMessage();
    }
  }
}

export const authForm = {
  loginForm: LoginForm,
  forgotPasswordForm: ForgotPasswordForm,
  resetPasswordForm: ResetPasswordForm,
  signupForm: SignupForm,
};
