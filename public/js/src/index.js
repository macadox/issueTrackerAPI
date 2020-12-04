import '@babel/polyfill';
import { FormTemplate } from './FormTemplate';
import { AuthForm } from './Components/AuthForm';
import { MultiselectFactory } from './Components/Multiselect';
import { NestedTableFactory } from './Components/NestedTable';
import { Checkbox } from './Components/Checkbox';
import { TabbedInterface } from './Components/TabbedInterface';
import { logout } from './logout';

// Components
const multiSelects = document.querySelectorAll('.multiselect--user');
const acTables = document.querySelectorAll('.nestedTable--ac');
const checkboxes = document.querySelectorAll('.checkbox');
const datePickerFields = document.querySelectorAll(
  '.form-template__input--date'
);
const tabsMe = document.querySelector('.tabs');
// form templates
const formTemplates = document.querySelectorAll('.form-template');
// auth forms
const loginForm = document.querySelector('.form__body--login');
const signupForm = document.querySelector('.form__body--signup');
const resetPasswordForm = document.querySelector('.form__body--reset-password');
const forgotPasswordForm = document.querySelector(
  '.form__body--forgot-password'
);
const updateMeForm = document.querySelector('.form__body--update-me');
const updatePasswordForm = document.querySelector('.form__body--update-password')
const logoutBtn = document.querySelector('.menu__link--logout');

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

if (tabsMe) {
  new TabbedInterface(tabsMe);
}

if (formTemplates.length > 0) {
  formTemplates.forEach((template) => {
    new FormTemplate(template);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend(
      {
        endpoint: `${window.location.protocol}/api/v1/users/login`,
        method: 'POST',
      },
      'User logged in',
      () => setTimeout(() => location.assign('/'), 2000)
    );
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend(
      {
        endpoint: `${window.location.protocol}/api/v1/users/signup`,
        method: 'POST',
        runSpinner: true,
      },
      'Success, please confirm your email address'
    );
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend(
      {
        endpoint: `${window.location.protocol}/api/v1/users/forgotPassword`,
        method: 'POST',
        runSpinner: true,
      },
      'Reset token sent, check your email'
    );
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend(
      {
        endpoint: `${window.location.protocol}/api/v1/users/resetPassword/${resetPasswordForm.dataset.token}`,
        method: 'PATCH',
      },
      'Password reset successfully',
      () => setTimeout(() => location.assign('/'), 2000)
    );
  });
}

if (updateMeForm) {
  updateMeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend({
      endpoint: `${window.location.protocol}/api/v1/users/updateDetails`,
      method: 'PATCH'
    },
    'User details updated',
    () => setTimeout(() => location.assign(location.pathname), 2000)
    )
  })
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    this.collectBodyAndSend({
      endpoint: `${window.location.protocol}/api/v1/users/updatePassword`,
      method: 'PATCH'
    },
    'Password changed',
    () => setTimeout(() => location.assign(location.pathname), 2000)
    )
  })
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}


customElements.define('auth-form', AuthForm, { extends: 'form' });
