import '@babel/polyfill';
import { FormTemplate } from './FormTemplate';
import { authForm } from './Components/AuthForm';
import { MultiselectFactory } from './Components/Multiselect';
import { NestedTableFactory } from './Components/NestedTable';
import { Checkbox } from './Components/Checkbox';
import { logout } from './logout';

const logoutBtn = document.querySelector('.menu__link--logout');
const multiSelects = document.querySelectorAll('.multiselect--user');
const acTables = document.querySelectorAll('.nestedTable--ac');
const checkboxes = document.querySelectorAll('.checkbox');
const formTemplate = document.querySelector('.form-template');
const datePickerFields = document.querySelectorAll(
  '.form-template__input--date'
);

if (multiSelects.length > 0) {
  multiSelects.forEach((multiselect) => {
    MultiselectFactory.create('UserMultiselect', multiselect);
  });
}

if (checkboxes.length > 0) {
  checkboxes.forEach((checkbox) => {
    new Checkbox(checkbox);
  });
}

if (acTables.length > 0) {
  acTables.forEach((table) => {
    NestedTableFactory.create('AcceptanceCriteriaTable', table);
  });
}

if (datePickerFields.length > 0) {
  datePickerFields.forEach((field) => {
    flatpickr(field, {
      dateFormat: 'm/d/Y',
    });
  });
}

if (formTemplate) {
  new FormTemplate(formTemplate);
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
