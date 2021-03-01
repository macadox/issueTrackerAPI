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

    case 'LOGOUT': {
      authenticationService.logout();
      return state;
    }

    case 'SIGN_UP': {
      authenticationService.signup(action.payload);
      return state;
    }

    case 'SEND_PASSWORD_RESET': {
      authenticationService.sendPasswordReset(action.payload);
      return state;
    }

    default: {
      return state;
    }
  }
};

const defaultState = {
  user: null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleOnIdle = (e) => {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
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
      })
      .catch((err) => console.error(err));
    history.push('/');
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  const signup = (body) => {
    dispatch({ type: 'SIGN_UP', payload: body });
  };

  const sendPasswordReset = (body) => {
    dispatch({ type: 'SEND_PASSWORD_RESET', payload: body });
  };

  const resetPassword = (body) => {
    authenticationService
      .resetPassword(body)
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
        login,
        logout,
        signup,
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
