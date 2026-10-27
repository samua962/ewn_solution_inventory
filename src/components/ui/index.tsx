import { type ReactNode } from 'react';
import { ArrowRight, Check, CircleHelp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Feature, PricingPlan } from '../../data';

export function ButtonLink({
  to,
  children,
  variant = 'primary',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  className?: string;
}) {
  return (
    <Link className={`button button-${variant} ${className}`} to={to}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow"><span />{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={`section-heading align-${align}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function FeatureCard({ title, description, icon: Icon }: Feature) {
  return (
    <article className="feature-card">
      <span className="feature-icon"><Icon size={21} strokeWidth={1.8} /></span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <article className={`pricing-card${plan.recommended ? ' pricing-featured' : ''}`}>
      {plan.recommended && <span className="recommended-label">Recommended concept</span>}
      <h3>{plan.name}</h3>
      <p>{plan.summary}</p>
      <div className="price">{plan.price}<span>{plan.cadence}</span></div>
      <ul>{plan.features.map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
      <ButtonLink to="/contact" variant={plan.recommended ? 'primary' : 'secondary'} className="pricing-action">
        Ask about this concept <ArrowRight size={16} />
      </ButtonLink>
    </article>
  );
}

export function PrototypeNotice({ children }: { children: ReactNode }) {
  return <div className="prototype-notice"><CircleHelp size={18} /><p>{children}</p></div>;
}

export function PageHero({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
        {children && <div className="page-hero-actions">{children}</div>}
      </div>
    </section>
  );
}

export function FormField({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label>{children}{error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}</div>;
}

export function FinalCta() {
  return (
    <section className="section final-cta">
      <div className="container final-cta-inner">
        <div><Eyebrow>Take the next step</Eyebrow><h2>Ready to bring clarity to your inventory?</h2><p>Explore how EWN Inventory could help your business stay organized and make better stock decisions.</p></div>
        <div className="final-cta-actions"><ButtonLink to="/demo">Explore the demo <ArrowRight size={16} /></ButtonLink><ButtonLink to="/contact" variant="secondary">Contact our team</ButtonLink></div>
      </div>
    </section>
  );
}
