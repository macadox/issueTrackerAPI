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
        dispatch({
          type: 'SHOW_ALERT',
          payload: {
            type: 'success',
            message: 'Logged out because of inactivity',
          },
        });
        history.push('/login');
      })
      .catch((err) => dispatchErrorAlert(err));
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

  const dispatchAlertAndRedirectTo = (data, to) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: {
        type: data.status === 'success' ? 'success' : 'error',
        message: data.message,
      },
    });
    if (data.status === 'success') {
      history.push(to);
    }
    return data.status;
  };

  const dispatchErrorAlert = (err) => {
    console.error(err);
    dispatch({
      type: 'SHOW_ALERT',
      payload: {
        type: 'error',
        message: err,
      },
    });
  };

  const login = (body) => {
    return authenticationService
      .login(body)
      .then((d) => {
        dispatch({
          type: 'SHOW_ALERT',
          payload: {
            type: d.status === 'success' ? 'success' : 'error',
            message: d.message,
          },
        });
        if (d.status === 'success') {
          const user = d.data.user;
          dispatch({ type: 'LOGIN', payload: user });
          history.push('/');
        }
        return d.status;
      })
      .catch((err) => dispatchErrorAlert(err));
  };

  const logout = () => {
    return authenticationService
      .logout()
      .then((d) => dispatchAlertAndRedirectTo(d, '/login'))
      .catch((err) => dispatchErrorAlert(err));
  };

  const signup = (body) => {
    return authenticationService
      .signup(body)
      .then((d) => dispatchAlertAndRedirectTo(d, '/login'))
      .catch((err) => dispatchErrorAlert(err));
  };

  const confirmSignup = (token) => {
    return authenticationService
      .confirmSignup(token)
      .then((d) => dispatchAlertAndRedirectTo(d, '/login'))
      .catch((err) => dispatchErrorAlert(err));
  };

  const sendPasswordReset = (body) => {
    return authenticationService
      .sendPasswordReset(body)
      .then((d) => {
        dispatch({
          type: 'SHOW_ALERT',
          payload: {
            type: d.status === 'success' ? 'success' : 'error',
            message: d.message,
          },
        });

        return d.status;
      })
      .catch((err) => dispatchErrorAlert(err));
  };

  const resetPassword = (body, token) => {
    return authenticationService
      .resetPassword(body, token)
      .then((d) => dispatchAlertAndRedirectTo(d, '/'))
      .catch((err) => dispatchErrorAlert(err));
  };

  const hideAlert = () => {
    dispatch({ type: 'HIDE_ALERT' });
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
        hideAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
