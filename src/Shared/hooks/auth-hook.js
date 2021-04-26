import { useState, useCallback, useEffect } from 'react'

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const login = useCallback((uid, token, expiration) => {
    setToken(token);
    
    const tokenExpirationdate = expiration || new Date(new Date().getTime() + 1000 * 60 * 60);
    setExpirationDate(tokenExpirationdate);
    localStorage.setItem("userData", JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationdate.toISOString()
    }));
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  

  useEffect(() => {
    if(token && expirationDate) {
      const remainigTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainigTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, expirationDate])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token && new Date(data.expiration) > new Date()) {
      login( data.userId, data.token, new Date(data.expiration));
    }
  }, [login]);

  return { login, logout, userId, token };
}