import React, { useState } from 'react';
import './LoginRegister.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '@infrastructure/config';
function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  React.useEffect(() => {
    const confirmInput = document.getElementById('confirmPassword') as HTMLInputElement;
    if (confirmInput) {
      if (password !== confirm) {
        confirmInput.setCustomValidity('Паролі не співпадають');
      } else {
        confirmInput.setCustomValidity('');
      }
    }
  }, [password, confirm]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (password !== confirm) {
      setError('Паролі не співпадають');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      if (!res.ok) throw new Error('Не вдалося зареєструватися');
      const data = await res.json();
      if (data.token) localStorage.setItem('jwtToken', data.token);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1000);
    } catch (e: unknown) {
      const error = e as any;
      setError(error?.message || 'Сталася помилка при реєстрації');
    }
  };
  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Створити акаунт</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">Ім'я</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">Прізвище</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={8}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
              required
            />
            <div className="form-text" style={{ fontSize: '0.88rem' }}>
              Пароль має містити мінімум 8 символів, хоча б одну велику і одну малу літеру, та одну цифру.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Підтвердження пароля</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100" type="submit">Зареєструватися</button>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {success && <div className="alert alert-success mt-2">Успішна реєстрація!</div>}
        </form>
        <Link className="switch-link" to="/login">Вже маєте акаунт? Увійти</Link>
      </div>
    </div>
  );
}
export default RegisterPage;
