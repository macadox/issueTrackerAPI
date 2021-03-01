import { BehaviorSubject } from 'rxjs';

const userSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('user'))
);

export const authenticationService = {
  login,
  logout,
  signup,
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
    .then((res) => {
      if (!res.ok) {
        console.log('error', res.message);
      }
      return res.json();
    })
    .then((data) => {
      const user = data.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      userSubject.next(user);
      return user;
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
    .then((res) => {
      if (!res.ok) {
        console.log('error', res.message);
      }
      return res.json();
    })
    .catch((err) => console.error(err));
}

async function sendPasswordReset(body) {
  return fetch(
    `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/forgotPassword`,
    {
      method: 'POST',
      body,
    }
  )
    .then((res) => {
      if (!res.ok) {
        console.log('error', res.message);
      }
      return res.json();
    })
    .catch((err) => console.error(err));
}

async function resetPassword(body) {
  // return fetch(
  //   `${window.location.protocol}//${window.location.hostname}:9000/api/v1/users/login`,
  //   {
  //     method: 'POST',
  //     credentials: 'include',
  //     body,
  //   }
  // )
  //   .then((res) => {
  //     if (!res.ok) {
  //       console.log('error', res.message);
  //     }
  //     return res.json();
  //   })
  //   .then((data) => {
  //     const user = data.data.user;
  //     localStorage.setItem('user', JSON.stringify(user));
  //     userSubject.next(user);
  //     return user;
  //   })
  //   .catch((err) => console.error(err));
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  userSubject.next(null);
}
