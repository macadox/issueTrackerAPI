import { Alert } from './Components/Alert.js';

export const logout = async () => {
  try {
    const res = await fetch(`${window.location.protocol}/api/v1/users/logout`, {
      method: 'GET',
    });
    const resData = await res.json();
    new Alert('success', 'Logged out successfully').showMessage();
    setTimeout(() => location.assign('/'), 2000);
  } catch (err) {
    new Alert('error', 'Error logging out').showMessage();
  }
};