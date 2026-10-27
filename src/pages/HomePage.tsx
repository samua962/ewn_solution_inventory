import { ArrowRight, BarChart3, BellRing, Check, Compass, PackageCheck, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { businessCategories, features, pricingPlans } from '../data';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { ButtonLink, Eyebrow, FeatureCard, FinalCta, PricingCard, SectionHeading } from '../components/ui';

export function HomePage() {
  const benefits = [
    { title: 'Easy stock tracking', icon: PackageCheck },
    { title: 'Clear inventory visibility', icon: Compass },
    { title: 'Smarter replenishment', icon: TrendingUp },
    { title: 'Simple reporting', icon: BarChart3 },
  ];
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>Introducing EWN Inventory</Eyebrow>
            <h1>Take Control of Your Inventory. <span>Grow Your Business.</span></h1>
            <p className="hero-lead">Manage products, monitor stock levels, track inventory movements, and make smarter purchasing decisions with a simple inventory management experience built for growing businesses.</p>
            <div className="hero-actions">
              <ButtonLink to="/demo">Explore the demo <ArrowRight size={17} /></ButtonLink>
              <ButtonLink to="/features" variant="secondary">Explore features</ButtonLink>
            </div>
            <p className="hero-promise"><ShieldCheck size={16} /> Less guesswork. Better stock visibility. Smarter decisions.</p>
            <span className="hero-prototype">A proposed product concept · sample data only</span>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <DashboardPreview />
            <div className="floating-note"><span className="floating-note-icon"><BellRing size={17} /></span><span><b>Stock to review</b><small>Sample alert · Cooking oil</small></span></div>
          </div>
        </div>
      </section>

      <section className="benefit-strip">
        <div className="container benefit-grid">
          {benefits.map(({ title, icon: Icon }) => <div className="benefit-item" key={title}><Icon size={20} /><span>{title}</span></div>)}
        </div>
      </section>

      <section className="section section-padded">
        <div className="container problem-grid">
          <div className="problem-copy">
            <Eyebrow>Less friction, more clarity</Eyebrow>
            <h2>Inventory shouldn’t be guesswork.</h2>
            <p>When stock information is hard to find, everyday decisions become harder than they need to be. A clear view of what comes in, what goes out, and what needs attention can help teams stay organized.</p>
            <ButtonLink to="/how-it-works" variant="text">See a clearer workflow <ArrowRight size={16} /></ButtonLink>
          </div>
          <div className="problem-list">
            {[
              ['01', 'Unexpected stockouts', 'A product runs out before anyone notices.'],
              ['02', 'Money tied up in excess stock', 'Over-ordering can make cash flow harder to manage.'],
              ['03', 'Scattered records', 'Manual notes and spreadsheets are difficult to keep aligned.'],
              ['04', 'Unclear stock movements', 'It can be difficult to understand how inventory changed.'],
            ].map(([number, title, text]) => <div className="problem-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container section-padded">
          <SectionHeading eyebrow="Built around everyday work" title="Everything you need to stay in control." text="A proposed set of inventory tools designed to make routine stock tasks easier to understand." />
          <div className="feature-grid">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
          <div className="section-center"><ButtonLink to="/features" variant="secondary">Explore all features <ArrowRight size={16} /></ButtonLink></div>
        </div>
      </section>

      <section className="section section-padded showcase-section">
        <div className="container">
          <div className="showcase-intro">
            <div><Eyebrow>A clearer view of your stock</Eyebrow><h2>Make the details easier to see.</h2></div>
            <p>This product preview uses fictional sample data to show how a future inventory workspace could bring key information together.</p>
          </div>
          <DashboardPreview large />
        </div>
      </section>

      <section className="section section-bluewash">
        <div className="container section-padded">
          <SectionHeading eyebrow="A simple starting point" title="How it works" text="A proposed workflow that takes your team from product setup to more informed replenishment." />
          <div className="steps-grid">
            {[
              ['01', 'Organize your products', 'Create a clear catalog with the details your team needs.'],
              ['02', 'Track every movement', 'Record incoming and outgoing stock as it changes.'],
              ['03', 'Make better decisions', 'Review stock levels and identify what may need attention.'],
            ].map(([number, title, text]) => <article className="step-card" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <div className="section-center"><ButtonLink to="/how-it-works" variant="text">See the proposed workflow <ArrowRight size={16} /></ButtonLink></div>
        </div>
      </section>

      <section className="section section-padded">
        <div className="container audience-grid">
          <div><Eyebrow>Made for growing businesses</Eyebrow><h2>A practical fit for everyday retail.</h2><p>Explore how a thoughtful inventory workflow could support teams with different kinds of products and business needs.</p></div>
          <div className="audience-cards">{businessCategories.map((item) => <article className="audience-card" key={item.title}><span><Check size={16} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section demo-band">
        <div className="container demo-band-inner">
          <div className="demo-icon"><Sparkles size={24} /></div>
          <div><span className="demo-overline">A guided learning experience</span><h2>Learn by doing. Manage with confidence.</h2><p>Explore a guided experience that introduces inventory management through realistic business scenarios and practical tasks.</p></div>
          <ButtonLink to="/demo">Start guided demo <ArrowRight size={16} /></ButtonLink>
        </div>
      </section>

      <section className="section section-padded">
        <div className="container">
          <SectionHeading eyebrow="Transparent by design" title="Proposed pricing concepts" text="Illustrative prototype pricing, subject to validation. No subscriptions are available for purchase." />
          <div className="pricing-grid">{pricingPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div>
          <p className="pricing-footnote">All prices shown in Ethiopian Birr (ETB) are illustrative only and are not active offers.</p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
