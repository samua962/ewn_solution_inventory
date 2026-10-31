import { type ReactNode, useEffect, useState } from 'react';
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navigationLinks } from '../../data';
import { ButtonLink } from '../ui';
import ewnLogo from '../../../asset/ewn_solution_logo.jpg';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand${light ? ' brand-light' : ''}`} to="/" aria-label="EWN Solutions home">
      <img className="brand-image" src={ewnLogo} alt="EWN Solutions — EWN Inventory" />
    </Link>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="nav-wrap container">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav
          className={`primary-nav${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          {navigationLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="nav-actions">
            <Link
              className={`nav-signin${location.pathname === '/login' ? ' active' : ''}`}
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Sign in
            </Link>
            <ButtonLink to="/demo" className="nav-cta">
              Explore demo <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Simple digital tools for daily business work.</p>
          <span className="footer-tagline">Smart Solutions. Better Business.</span>
          <div className="footer-socials" aria-label="EWN Solutions social links">
            <a href="mailto:hello@ewnsolutions.com" aria-label="Email EWN Solutions"><Mail size={18} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="EWN Solutions on LinkedIn"><Linkedin size={18} /></a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="EWN Solutions on Facebook"><Facebook size={18} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="EWN Solutions on Instagram"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/features">Features</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/demo">Guided demo</Link>
        </div>
        <div>
          <h2>Company</h2>
          <Link to="/about">About EWN</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Sign in</Link>
        </div>
        <div className="footer-note">
          <span className="footer-product">Featured product</span>
          <strong>EWN Inventory</strong>
          <p>A sample stock management product.</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} EWN Solutions</span>
        <span>Smart stock for growing businesses</span>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const metadata: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'EWN Solutions — Smart Solutions. Better Business.',
      description: 'EWN Solutions builds simple digital tools for daily business work. Explore the EWN Inventory demo.',
    },
    '/features': {
      title: 'Features — EWN Solutions',
      description: 'See EWN Inventory features for products, stock, orders, and reports.',
    },
    '/how-it-works': {
      title: 'How It Works — EWN Solutions',
      description: 'Follow the simple stock process from product setup to the next order.',
    },
    '/pricing': {
      title: 'Pricing — EWN Solutions',
      description: 'Compare EWN Inventory plans and choose the option that fits your business.',
    },
    '/about': {
      title: 'About — EWN Solutions',
      description: 'Learn about EWN Solutions and the simple digital tools we want to build.',
    },
    '/contact': {
      title: 'Contact — EWN Solutions',
      description: 'Contact EWN Solutions about EWN Inventory or the demo.',
    },
    '/login': {
      title: 'Sign In — EWN Solutions',
      description: 'Sign in to your EWN Inventory account.',
    },
    '/demo': {
      title: 'Guided Demo — EWN Inventory',
      description: 'Follow the 5E learning model in a sample car oil and parts shop.',
    },
  };
  const currentMetadata = metadata[location.pathname] ?? {
    title: 'Page Not Found — EWN Solutions',
    description: 'The requested page could not be found. Return to EWN Solutions to explore EWN Inventory.',
  };
  useEffect(() => {
    document.title = currentMetadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', currentMetadata.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', currentMetadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', currentMetadata.description);
  }, [currentMetadata.description, currentMetadata.title]);
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
