import { ArrowRight, ClipboardCheck, Compass } from 'lucide-react';
import { features, learningStages } from '../data';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { ButtonLink, Eyebrow, FeatureCard, FinalCta, PageHero, PrototypeNotice, SectionHeading } from '../components/ui';

export function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Features" title="Keep stock work simple." description="Add products, track stock, and see what needs attention." >
        <ButtonLink to="/demo">Try the demo <ArrowRight size={16} /></ButtonLink>
        <ButtonLink to="/contact" variant="secondary">Contact us</ButtonLink>
      </PageHero>
      <section className="section section-padded">
        <div className="container feature-page-intro">
          <div><Eyebrow>For daily work</Eyebrow><h2>Find the information you need.</h2><p>Keep products and stock movements in one place.</p></div>
          <PrototypeNotice>Choose the tools that fit the way your team works.</PrototypeNotice>
        </div>
        <div className="container feature-grid feature-grid-expanded">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
      </section>
      <section className="section section-gray section-padded">
        <div className="container showcase-intro"><div><Eyebrow>Sample screen</Eyebrow><h2>See stock at a glance.</h2></div><p>These numbers are only examples.</p></div>
        <div className="container"><DashboardPreview large /></div>
      </section>
      <section className="section section-padded">
        <div className="container two-column-value">
          <article><span className="value-icon"><Compass size={21} /></span><h2>For owners</h2><p>Check stock and plan your next order.</p></article>
          <article><span className="value-icon"><ClipboardCheck size={21} /></span><h2>For staff</h2><p>Add stock movements and find products quickly.</p></article>
        </div>
      </section>
      <section className="section section-bluewash section-padded"><div className="container learning-intro"><SectionHeading eyebrow="Guided demo" title="Learn one step at a time." text="Try inventory tasks in a sample shop." /><div className="stage-row">{learningStages.map((stage, index) => <div className="stage-item" key={stage}><span>0{index + 1}</span><b>{stage}</b></div>)}</div><div className="section-center"><ButtonLink to="/demo">View the demo <ArrowRight size={16} /></ButtonLink></div></div></section>
      <FinalCta />
    </>
  );
}
