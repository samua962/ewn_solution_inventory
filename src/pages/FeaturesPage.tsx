import { ArrowRight, ClipboardCheck, Compass } from 'lucide-react';
import { features, learningStages } from '../data';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { ButtonLink, Eyebrow, FeatureCard, FinalCta, PageHero, PrototypeNotice, SectionHeading } from '../components/ui';

export function FeaturesPage() {
  return (
    <>
      <PageHero eyebrow="Product capabilities" title="The building blocks of clearer inventory." description="Explore the capabilities planned for EWN Inventory, a proposed product experience for organizing products and understanding stock movements." >
        <ButtonLink to="/demo">Explore the demo <ArrowRight size={16} /></ButtonLink>
        <ButtonLink to="/contact" variant="secondary">Talk to our team</ButtonLink>
      </PageHero>
      <section className="section section-padded">
        <div className="container feature-page-intro">
          <div><Eyebrow>Designed around real tasks</Eyebrow><h2>Less time searching. More confidence in your next step.</h2><p>Inventory work touches purchasing, sales, and customer experience. A more organized view can help teams notice patterns and act with better context.</p></div>
          <PrototypeNotice>These are proposed capabilities for a product concept. They are not connected to a live service or database.</PrototypeNotice>
        </div>
        <div className="container feature-grid feature-grid-expanded">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
      </section>
      <section className="section section-gray section-padded">
        <div className="container showcase-intro"><div><Eyebrow>Product preview</Eyebrow><h2>Key stock information, brought together.</h2></div><p>The dashboard below is a visual prototype. All quantities and values are illustrative, not live business data.</p></div>
        <div className="container"><DashboardPreview large /></div>
      </section>
      <section className="section section-padded">
        <div className="container two-column-value">
          <article><span className="value-icon"><Compass size={21} /></span><h2>For business owners</h2><p>See sample stock summaries, notice areas for review, and explore how inventory information could support purchasing decisions.</p></article>
          <article><span className="value-icon"><ClipboardCheck size={21} /></span><h2>For inventory teams</h2><p>Imagine a consistent place to organize products and review incoming or outgoing stock without relying on scattered records.</p></article>
        </div>
      </section>
      <section className="section section-bluewash section-padded"><div className="container learning-intro"><SectionHeading eyebrow="Learning through a guided demo" title="Build familiarity, one step at a time." text="An introduction to inventory concepts using a fictional store and practical sample tasks." /><div className="stage-row">{learningStages.map((stage, index) => <div className="stage-item" key={stage}><span>0{index + 1}</span><b>{stage}</b></div>)}</div><div className="section-center"><ButtonLink to="/demo">View demo introduction <ArrowRight size={16} /></ButtonLink></div></div></section>
      <FinalCta />
    </>
  );
}
