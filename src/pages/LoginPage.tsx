import { useState, type FormEvent } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/layout/Layout';
import { Eyebrow, FormField } from '../components/ui';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    setMessage('Sign-in is not available in this prototype. Your password has not been saved or sent.');
    setPassword('');
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-brand"><Logo /></div>
        <Eyebrow>Welcome back</Eyebrow>
        <h1>Sign in to your account</h1>
        <p className="auth-intro">The EWN Inventory account experience is a prototype and is not connected to authentication.</p>
        {message && <div className="form-message" role="status">{message}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField id="login-email" label="Email address"><input id="login-email" type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setMessage(''); }} required /></FormField>
          <FormField id="login-password" label="Password"><div className="password-wrap"><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setMessage(''); }} required /><button type="button" className="password-toggle" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></FormField>
          <div className="auth-options"><label className="checkbox-label"><input type="checkbox" /> Remember me</label><Link to="/contact">Forgot password?</Link></div>
          <button type="submit" className="button button-primary auth-submit">Sign in <ArrowRight size={16} /></button>
        </form>
        <p className="auth-privacy"><ShieldCheck size={15} /> Do not enter a real password. Nothing is stored.</p>
        <div className="auth-links"><Link to="/">Back to website</Link><span>·</span><Link to="/demo">Explore the demo</Link></div>
      </div>
    </section>
  );
}
