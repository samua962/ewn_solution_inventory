import { useState, type FormEvent } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/layout/Layout';
import { Eyebrow, FormField } from '../components/ui';
import { demoUsers, type UserRole } from '../components/inventory/InventoryStore';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setMessage('Enter a valid email address to continue.');
      return;
    }
    if (!password) {
      setMessage('Enter a password to continue.');
      return;
    }
    const user = demoUsers.find((account) => account.email === email.trim().toLowerCase() && account.password === password);
    if (!user) {
      setMessage('The demo email or password is not correct.');
      return;
    }
    localStorage.setItem('ewn-demo-user', JSON.stringify(user));
    setMessage(`Welcome, ${user.name}.`);
    setPassword('');
    navigate('/app/dashboard');
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-brand"><Logo /></div>
        <Eyebrow>Welcome back</Eyebrow>
        <h1>Sign in</h1>
        <p className="auth-intro">Choose a demo account and sign in.</p>
        {message && <div className="form-message" role="status">{message}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField id="login-email" label="Email address"><input id="login-email" type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} required /></FormField>
          <FormField id="login-password" label="Password"><div className="password-wrap"><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setMessage(''); }} required /><button type="button" className="password-toggle" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></FormField>
          <div className="demo-account-list">
            {demoUsers.map((account) => (
              <button key={account.email} type="button" className={role === account.role ? 'active' : ''} onClick={() => { setRole(account.role); setEmail(account.email); setPassword(account.password); setMessage(''); }}>
                <strong>{account.role === 'admin' ? 'Admin' : account.role === 'manager' ? 'Store Manager' : 'Sales Person'}</strong>
                <small>{account.email}</small>
              </button>
            ))}
          </div>
          <div className="auth-options"><label className="checkbox-label"><input type="checkbox" /> Remember me</label><Link to="/contact">Forgot password?</Link></div>
          <button type="submit" className="button button-primary auth-submit">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="auth-privacy"><ShieldCheck size={15} /> Demo login — no real account details are needed.</p>
        <div className="auth-links"><Link to="/">Back to website</Link><span>·</span><Link to="/demo">Explore the demo</Link></div>
      </div>
    </section>
  );
}
