import { BehaviorSubject } from 'rxjs';

const userSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('user'))
);

export const authenticationService = {
  login,
  logout,
  signup,
  confirmSignup,
  resetPassword,
  sendPasswordReset,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

async function login(body) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/login`,
    {
      method: 'POST',
      credentials: 'include',
      body,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.error) {
        const user = data.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        userSubject.next(user);
      }
      return data;
    })
    .catch((err) => console.error(err));
}

async function signup(body) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/signup`,
    {
      method: 'POST',
      body,
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function confirmSignup(token) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/signup/${token}`,
    {
      method: 'GET',
    }
  ).catch((err) => console.error(err));
}

async function sendPasswordReset(body) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/forgotPassword`,
    {
      method: 'POST',
      body,
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function resetPassword(body, token) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/resetPassword/${token}`,
    {
      method: 'PATCH',
      credentials: 'include',
      body,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      const user = data.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      userSubject.next(user);
      return data;
    })
    .catch((err) => console.error(err));
}

async function logout() {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/logout`,
    {
      method: 'GET',
    }
  )
    .then((res) => {
      // remove user from local storage to log user out
      localStorage.removeItem('user');
      userSubject.next(null);
      return res.json();
    })
    .catch((err) => console.error(err));
}
