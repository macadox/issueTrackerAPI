import React, { useReducer, useEffect, useContext } from 'react';
import { authenticationService } from './services/authenticationService';
import { useIdleTimer } from 'react-idle-timer';
import history from './services/history';

const AppContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return { ...state, user: action.payload };
    }

    case 'SHOW_ALERT': {
      const { type, message, persistent } = action.payload;
      return {
        ...state,
        alert: {
          type,
          message,
        },
        showAlert: true,
        alertPersistent: persistent || false,
      };
    }

    case 'HIDE_ALERT': {
      return {
        ...state,
        alert: null,
        alertPersistent: false,
        showAlert: false,
      };
    }

    case 'FINISH_AUTH': {
      return { ...state, authenticationComplete: !!state.user };
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
  alertPersistent: false,
  authenticationComplete: false,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleOnIdle = (e) => {
    if (!state.user) return;
    authenticationService
      .logout()
      .then(() => {
        dispatch({
          type: 'SHOW_ALERT',
          payload: {
            type: 'success',
            message: 'Logged out because of inactivity',
            persistent: true,
          },
        });
        history.push('/login');
      })
      .catch((err) => dispatchErrorAlert(err));
  };

  const handleOnActive = (e) => {};

  const handleOnAction = (e) => {};

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });

  const dispatchAlert = (data) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: {
        type: data.status === 'success' ? 'success' : 'error',
        message: data.message,
      },
    });
    return data.status;
  };

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

  const dispatchErrorAndRedirectTo = (err, to) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: {
        type: 'error',
        message: err,
      },
    });
    history.push(to);
  };

  const login = (body) => {
    return authenticationService
      .login(body)
      .then((d) => {
        dispatchAlert(d);
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
      .then((d) => dispatchAlertAndRedirectTo(d, '/'))
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

  const updateDetails = (body) => {
    return authenticationService
      .updateDetails(body)
      .then((d) => dispatchAlert(d))
      .catch((err) => dispatchErrorAlert(err));
  };

  const updatePassword = (body) => {
    return authenticationService
      .updatePassword(body)
      .then((d) => dispatchAlert(d))
      .catch((err) => dispatchErrorAlert(err));
  };

  useEffect(() => {
    authenticationService.user.subscribe((x) =>
      dispatch({ type: 'LOGIN', payload: x })
    );
  }, []);

  useEffect(() => {
    dispatch({ type: 'FINISH_AUTH' });
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        alert: state.alert,
        showAlert: state.showAlert,
        authenticationComplete: state.authenticationComplete,
        alertPersistent: state.alertPersistent,
        login,
        logout,
        signup,
        confirmSignup,
        sendPasswordReset,
        resetPassword,
        hideAlert,
        dispatchErrorAlert,
        dispatchErrorAndRedirectTo,
        dispatchAlertAndRedirectTo,
        updateDetails,
        updatePassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
