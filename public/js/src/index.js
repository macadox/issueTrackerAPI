import '@babel/polyfill';
import { authForm } from './authForm';
import { MultiselectFactory } from './Multiselect';
import { FormTemplate } from './FormTemplate';
import { logout } from './logout';

const logoutBtn = document.querySelector('.menu__link--logout');
const multiSelects = document.querySelectorAll('.multiselect');
const formTemplate = document.querySelector('.form-template');

if (multiSelects.length > 0) {
  multiSelects.forEach((multiselect) => {
    MultiselectFactory.create('UserMultiselect', multiselect);
  });
}

if (formTemplate) {
  const form = new FormTemplate(formTemplate);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

customElements.define('login-form', authForm.loginForm, { extends: 'form' });
customElements.define('signup-form', authForm.signupForm, { extends: 'form' });
customElements.define('forgot-password-form', authForm.forgotPasswordForm, {
  extends: 'form',
});
customElements.define('reset-password-form', authForm.resetPasswordForm, {
  extends: 'form',
});
