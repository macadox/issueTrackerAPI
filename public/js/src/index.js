import '@babel/polyfill';
import { authForm } from './authForm';
import { logout } from './logout';

const logoutBtn = document.querySelector('.menu__link--logout');

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

customElements.define('login-form', authForm.loginForm, { extends: 'form' });
customElements.define('signup-form', authForm.signupForm, { extends: 'form' });
customElements.define('forgot-password-form', authForm.forgotPasswordForm, { extends: 'form' });
customElements.define('reset-password-form', authForm.resetPasswordForm, { extends: 'form' });
