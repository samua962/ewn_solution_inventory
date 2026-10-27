import { ArrowRight, Package, Warehouse } from 'lucide-react';
import { ButtonLink, Eyebrow, FinalCta, PageHero, SectionHeading } from '../components/ui';

export function AboutPage() {
  const values = [
    ['Practicality', 'Focus on solving real, everyday problems with clear and useful digital tools.'],
    ['Clarity', 'Make information easier to understand so people can act with confidence.'],
    ['Thoughtfulness', 'Design with the needs and context of the people using a product in mind.'],
    ['Progress', 'Keep learning and improving as business needs and technology evolve.'],
  ];
  return (
    <>
      <PageHero eyebrow="About EWN Solutions" title="Technology should make work feel simpler." description="EWN Solutions creates practical digital products designed to help businesses solve everyday problems and work more effectively." >
        <ButtonLink to="/contact">Get in touch <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded"><div className="container mission-grid"><div className="mission-mark"><span><Warehouse size={54} strokeWidth={1.35} /></span><strong>Smart Solutions.<br />Better Business.</strong></div><div><Eyebrow>Our mission</Eyebrow><h2>Practical digital solutions for everyday business.</h2><p>Our mission is to create practical digital solutions that help businesses solve everyday problems and work more effectively.</p><h3>Our vision</h3><p>We envision useful, approachable software that brings more clarity to daily business operations and supports people as their needs grow.</p></div></div></section>
      <section className="section section-gray section-padded"><div className="container"><SectionHeading eyebrow="What guides us" title="Values behind the work." text="A thoughtful product begins with a clear understanding of the people and problems it is meant to serve." /><div className="values-grid">{values.map(([title, text], index) => <article className="value-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-padded"><div className="container featured-product"><span className="featured-icon"><Package size={26} /></span><div><Eyebrow>Initial featured solution</Eyebrow><h2>Meet EWN Inventory.</h2><p>A proposed inventory management experience exploring how growing businesses could organize products, monitor stock, and plan replenishment more clearly.</p></div><ButtonLink to="/features" variant="secondary">Explore the product <ArrowRight size={16} /></ButtonLink></div></section>
      <FinalCta />
    </>
  );
}
