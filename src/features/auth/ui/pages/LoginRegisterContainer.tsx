import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginRegisterContainer.css';
import './register-yellow-gradient-btn.css';
import './login-orange-blue-btn.css';
import './greeting-bg.css';
import { API_BASE_URL } from '@infrastructure/config';
import { useAuth } from '../../data/context/AuthContext';
export default function LoginRegisterContainer() {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginInProgress(true);
    
    if (!loginEmail?.trim()) {
      setLoginError('Будь ласка, введіть email');
      setLoginInProgress(false);
      return;
    }
    
    if (!loginPassword) {
      setLoginError('Будь ласка, введіть пароль');
      setLoginInProgress(false);
      return;
    }
    
    try {
      let response;
      const requestBody = {
        email: loginEmail.trim(),
        password: loginPassword
      };
      
      const loginUrl = `${API_BASE_URL}/auth/login`;
      const startTime = Date.now();
      let loginResponse;
      
      try {
        loginResponse = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestBody),
          credentials: 'include',
          mode: 'cors'
        });
        
        const responseTime = Date.now() - startTime;
        
        let responseData;
        try {
          responseData = await loginResponse.json();
        } catch (parseError) {
          throw new Error('Некоректна відповідь від сервера. Спробуйте ще раз.');
        }
        
        if (!loginResponse.ok) {
          const errorMessage = responseData?.error || responseData?.message || 
                              `Помилка сервера: ${loginResponse.status} ${loginResponse.statusText}`;
          
          const error = new Error(errorMessage);
          (error as any).response = {
            status: loginResponse.status,
            data: responseData
          };
          throw error;
        }
        
        if (!responseData.token) {
          throw new Error('Не вдалося отримати токен авторизації');
        }
        
        response = { data: responseData };
        
      } catch (err: unknown) {
        const error = err as any;
        
        if (error?.name === 'TypeError' && error?.message?.includes('Failed to fetch')) {
          throw new Error('Не вдалося з\'єднатися з сервером. Перевірте підключення до Інтернету.');
        }
        
        if (error?.response?.status === 401) {
          throw new Error('Невірний email або пароль. Будь ласка, спробуйте ще раз.');
        }
        
        if (error?.response?.data) {
          const serverMessage = error.response.data.error || error.response.data.message;
          if (serverMessage) {
            throw new Error(serverMessage);
          }
        }
        
        throw error?.message ? error : new Error('Сталася невідома помилка. Спробуйте ще раз.');
      }
      if (response && response.data && response.data.token) {
        const { token, role } = response.data;
        
        try {
          await login(token, role);
          const redirectPath = role === 'ADMIN' ? '/admindashboard' : '/dashboard';
          navigate(redirectPath, { replace: true });
          
          setLoginError('');
          return;
        } catch (authError) {
          throw new Error('Помилка оновлення стану автентифікації');
        }
      } else {
        throw new Error('Некоректна відповідь від сервера: відсутній токен аутентифікації');
      }
    } catch (error: unknown) {
      let errorMessage = 'Сталася невідома помилка під час входу. Спробуйте ще раз.';
      
      const err = error as any;
      if (err?.message) {
        if (err.message.includes('401') || err.message.includes('Unauthorized')) {
          errorMessage = 'Невірний email або пароль. Спробуйте ще раз.';
        } else if (err.message.includes('Network')) {
          errorMessage = 'Помилка з\'єднання з сервером. Перевірте підключення до інтернету.';
        } else {
          errorMessage = err.message;
        }
      } else if (err?.response?.data) {
        const { data } = err.response;
        errorMessage = data.message || data.error || JSON.stringify(data);
      }
      
      setLoginError(errorMessage);
    } finally {
      setLoginInProgress(false);
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess(false);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: registerData.password
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Помилка реєстрації');
      }
      setRegisterSuccess(true);
      setTimeout(() => {
        setRegisterSuccess(false);
        setRightPanelActive(false);
      }, 3000);
      
    } catch (e: unknown) {
      const error = e as any;
      setRegisterError(error?.message || 'Сталася помилка під час реєстрації');
    }
  };
  return (
    <div className="auth-bg loginreg-bg modern-bg">
      <svg className="login-bg-waves" viewBox="0 0 1440 320">
        <path fill="#EAF3FF" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,186.7C384,149,480,107,576,117.3C672,128,768,192,864,197.3C960,203,1056,149,1152,154.7C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
      <div className="loginreg-container modern-shadow">
        {!isRightPanelActive ? (
          <>
            <div className="form-container sign-in-container modern-animate">
              <form onSubmit={handleLogin} autoComplete="off">
                <h2 className="auth-title">Вхід</h2>
                <div className="input-group">
                  <input 
                    className="modern-input" 
                    type="email" 
                    id="login-email"
                    name="email"
                    placeholder="Email" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)} 
                    required 
                    autoComplete="username email"
                  />
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                </div>
                <div className="input-group">
                  <input 
                    className="modern-input" 
                    type="password" 
                    id="login-password"
                    name="password"
                    placeholder="Пароль" 
                    value={loginPassword} 
                    onChange={e => setLoginPassword(e.target.value)} 
                    required 
                    autoComplete="current-password"
                  />
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                </div>
                <div className="login-options">
                  <label>
                    <input 
                      type="checkbox" 
                      id="remember-me" 
                      name="remember-me" 
                      value="remember-me"
                      autoComplete="off"
                    /> Запам'ятати мене
                  </label>
                  <Link to="/forgot" className="forgot-link">Забули пароль?</Link>
                </div>
                <button className="starbucks-cta btn-theme" type="submit" style={{marginBottom:8}}>
                  Увійти
                </button>
                {loginError && <div className="alert alert-danger" style={{marginTop:8}}>{loginError}</div>}
              </form>
            </div>
            <div className="text-container modern-animate">
              <div style={{width:240,height:240,backgroundColor:'#e3f2fd',borderRadius:8,margin:'0 auto 10px auto'}} />
              <h2 className="auth-title" style={{fontSize:'1.5rem', marginBottom:'15px'}}>
                Навчайся, коли зручно — стартуй вже сьогодні!
              </h2>
              <div className="auth-subtitle" style={{fontSize:'0.95rem'}}>
                <b>Новий користувач?</b> Створюй обліковий запис та розпочни власний шлях до знань!
              </div>
              <button 
                className="starbucks-cta btn-theme register-yellow-gradient-btn" 
                onClick={() => setRightPanelActive(true)}
              >
                Зареєструватися
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-container sign-up-text modern-animate">
              <div className="inner-glass"></div>
              <div className="greeting-bg">
                <div style={{width:240,height:240,backgroundColor:'#fff9c4',borderRadius:8,margin:'0 auto 10px auto'}} />
                <h2 className="auth-title" style={{fontSize:'1.5rem', marginBottom:'15px'}}>Привіт, Друже!</h2>
                <div className="auth-subtitle" style={{fontSize:'0.95rem'}}>
                  <b>Вже з нами?</b> Заходь у свій акаунт і продовжуй навчатися із задоволенням.
                </div>
                <button 
                  className="starbucks-cta btn-theme login-orange-blue-btn" 
                  onClick={() => setRightPanelActive(false)}
                >
                  Увійти
                </button>
              </div>
            </div>
            <div className="form-container sign-up-container modern-animate">
              <form onSubmit={handleRegister} autoComplete="off">
                <h2 className="auth-title">Реєстрація</h2>
                <div style={{display:'flex',gap:10}}>
                  <div className="input-group">
                    <input 
                      className="modern-input" 
                      type="text" 
                      id="register-firstname"
                      name="firstName"
                      placeholder="Ім'я" 
                      value={registerData.firstName} 
                      onChange={e => setRegisterData(d=>({...d,firstName:e.target.value}))} 
                      required 
                      style={{flex:1}} 
                      autoComplete="given-name"
                    />
                  </div>
                  <div className="input-group">
                    <input 
                      className="modern-input" 
                      type="text" 
                      id="register-lastname"
                      name="lastName"
                      placeholder="Прізвище" 
                      value={registerData.lastName} 
                      onChange={e => setRegisterData({...registerData, lastName: e.target.value})} 
                      required 
                      style={{flex:1}} 
                      autoComplete="family-name"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <input 
                    className="modern-input" 
                    type="email" 
                    id="register-email"
                    name="email"
                    placeholder="Email" 
                    value={registerData.email} 
                    onChange={e => setRegisterData(d=>({...d,email:e.target.value}))} 
                    required 
                  />
                  <span className="input-icon"><i className="fas fa-envelope"></i></span>
                </div>
                <div className="input-group">
                  <input 
                    className="modern-input" 
                    type="password" 
                    id="register-password"
                    name="password"
                    placeholder="Пароль" 
                    value={registerData.password} 
                    onChange={e => setRegisterData(d=>({...d,password:e.target.value}))} 
                    minLength={8} 
                    required 
                  />
                  <span className="input-icon"><i className="fas fa-lock"></i></span>
                </div>
                <button className="starbucks-cta btn-theme" type="submit" style={{marginBottom: 16}}>
                  Зареєструватися
                </button>
                {registerError && <div className="alert alert-danger" style={{marginTop: 8}}>{registerError}</div>}
                {registerSuccess && <div className="alert alert-success" style={{marginTop: 8}}>Успішна реєстрація! Тепер увійдіть.</div>}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}