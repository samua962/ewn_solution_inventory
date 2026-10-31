import { ArrowRight, BarChart3, BellRing, Compass, PackageCheck, ShieldCheck, TrendingUp } from 'lucide-react';
import { features } from '../data';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { ButtonLink, Eyebrow, FeatureCard, FinalCta, SectionHeading } from '../components/ui';

export function HomePage() {
  const benefits = [
    { title: 'Track stock', icon: PackageCheck },
    { title: 'See stock levels', icon: Compass },
    { title: 'Plan orders', icon: TrendingUp },
    { title: 'View reports', icon: BarChart3 },
  ];
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Eyebrow>EWN Inventory</Eyebrow>
            <h1>Know what oil and parts are in stock.</h1>
            <p className="hero-lead">A simple stock system for car oil and spare-parts shops.</p>
            <div className="hero-actions">
              <ButtonLink to="/demo">Explore the demo <ArrowRight size={17} /></ButtonLink>
              <ButtonLink to="/features" variant="secondary">See features</ButtonLink>
            </div>
            <p className="hero-promise"><ShieldCheck size={16} /> Easy to see and easy to use.</p>
            <span className="hero-prototype">Dashboard preview</span>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <DashboardPreview />
            <div className="floating-note"><span className="floating-note-icon"><BellRing size={17} /></span><span><b>Stock to review</b><small>5W-30 oil</small></span></div>
          </div>
        </div>
      </section>

      <section className="benefit-strip">
        <div className="container benefit-grid">
          {benefits.map(({ title, icon: Icon }) => <div className="benefit-item" key={title}><Icon size={20} /><span>{title}</span></div>)}
        </div>
      </section>

      <section className="section section-gray">
        <div className="container section-padded">
          <SectionHeading eyebrow="Main features" title="The tools you need." text="Made for daily stock work." />
          <div className="feature-grid">{features.slice(0, 3).map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
          <div className="section-center"><ButtonLink to="/features" variant="secondary">See all features <ArrowRight size={16} /></ButtonLink></div>
        </div>
      </section>

      <section className="section section-bluewash">
        <div className="container section-padded landing-workflow">
          <SectionHeading eyebrow="How it works" title="Three simple steps." />
          <div className="landing-steps">
            <div><span>1</span><p><strong>Add products</strong><br />Add oil types and parts.</p></div>
            <div><span>2</span><p><strong>Track stock</strong><br />Record what comes in and goes out.</p></div>
            <div><span>3</span><p><strong>Review</strong><br />Plan the next replenishment.</p></div>
          </div>
          <div className="section-center"><ButtonLink to="/how-it-works" variant="text">See the workflow <ArrowRight size={16} /></ButtonLink></div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
