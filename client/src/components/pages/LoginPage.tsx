import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../services/user.service';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      login(user);
      navigate('/main/claims', { replace: true });
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Login failed');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-visual">
          <div className="login-brand">
            <div className="login-brand-badge">
              <img src="/assets/setting.svg" alt="" />
            </div>
            <h1>Welcome back</h1>
            <p>
              Manage claims, updates, and team activity with a clean workflow built for
              your business.
            </p>
          </div>

          <div className="login-summary" aria-label="Platform stats">
            <div className="login-summary-item">
              <strong>5.4k</strong>
              <span>Claims</span>
            </div>
            <div className="login-summary-item">
              <strong>1.8k</strong>
              <span>Members</span>
            </div>
            <div className="login-summary-item">
              <strong>189</strong>
              <span>Online</span>
            </div>
          </div>
        </div>

        <div className="login-form-wrap">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-header">
              <span className="eyebrow">Access portal</span>
              <h2>Sign in</h2>
              <p className="login-subtitle">Use your account details to continue.</p>
            </div>

            {error && <div className="login-error">{error}</div>}

            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>

              <a href="#" className="login-forgot">Forgot password?</a>
            </div>

            <button type="submit" className="login-button" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="login-signup">
              Don’t have an account? <a href="#">Create one</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;