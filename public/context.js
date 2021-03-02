import React, { useReducer, useEffect, useContext } from 'react';
import { authenticationService } from './services/authenticationService';
import { useIdleTimer } from 'react-idle-timer';
import history from './services/history';
import { dispatch } from 'rxjs/internal/observable/pairs';

const AppContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }

    case 'SHOW_ALERT': {
      const { type, message } = action.payload;
      return {
        ...state,
        alert: {
          type,
          message,
        },
        showAlert: true,
      };
    }

    case 'HIDE_ALERT': {
      return { ...state, alert: null, showAlert: false };
    }

    default: {
      return state;
    }
  }
};

const defaultState = {
  user: null,
  alert: null,
  showAlert: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleOnIdle = (e) => {
    authenticationService
      .logout()
      .then(() => {
        console.log('show postiive message');
        history.push('/login');
      })
      .catch((err) => console.log('sth went wrong'));
  };

  const handleOnActive = (e) => {};

  const handleOnAction = (e) => {};

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  const login = (body) => {
    authenticationService
      .login(body)
      .then((d) => {
        dispatch({ type: 'LOGIN', payload: d });
        dispatch({
          type: 'SHOW_ALERT',
          payload: { type: 'success', message: 'User logged in.' },
        });
        setTimeout(() => {
          dispatch({ type: 'HIDE_ALERT' });
        }, 3000);
      })
      .catch((err) => console.error(err));
    history.push('/');
  };

  const logout = () => {
    authenticationService
      .logout()
      .then(() => {
        console.log('show postiive message');
        history.push('/login');
      })
      .catch((err) => console.log('sth went wrong'));
  };

  const signup = (body) => {
    authenticationService
      .signup(body)
      .then((t) => console.log('then show positive message'))
      .catch((err) => console.log('show negative message, sth went wrong?'));

    // dispatch({ type: 'SIGN_UP', payload: body });
  };

  const confirmSignup = (token) => {
    authenticationService
      .confirmSignup(token)
      .then((t) => console.log('then show positive message'))
      .catch((err) => console.log('show negative message, sth went wrong?'));

    // dispatch({ type: 'CONFIRM_SIGN_UP', payload: token });
  };

  const sendPasswordReset = (body) => {
    authenticationService
      .sendPasswordReset(body)
      .then((t) => console.log('then show positive message'))
      .catch((err) => console.log('show negative message, sth went wrong?'));
    // dispatch({ type: 'SEND_PASSWORD_RESET', payload: body });
  };

  const resetPassword = (body, token) => {
    authenticationService
      .resetPassword(body, token)
      .then((d) => {
        dispatch({ type: 'LOGIN', payload: d });
      })
      .catch((err) => console.error(err));
    history.push('/');
  };

  useEffect(() => {
    authenticationService.user.subscribe((x) =>
      dispatch({ type: 'LOGIN', payload: x })
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        alert: state.alert,
        showAlert: state.showAlert,
        login,
        logout,
        signup,
        confirmSignup,
        sendPasswordReset,
        resetPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
