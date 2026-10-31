import { ArrowRight, Package, Warehouse } from 'lucide-react';
import { ButtonLink, Eyebrow, FinalCta, PageHero, SectionHeading } from '../components/ui';

export function AboutPage() {
  const values = [
    ['Practicality', 'Build useful tools that solve real work problems.'],
    ['Clarity', 'Make information easy to find and understand.'],
    ['Thoughtfulness', 'Pay attention to how people use our products.'],
    ['Progress', 'Learn, improve, and keep the work moving forward.'],
  ];
  return (
    <>
      <PageHero eyebrow="About us" title="We make work tools simple." description="We build useful products for everyday business work." >
        <ButtonLink to="/contact">Get in touch <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded"><div className="container mission-grid"><div className="mission-mark"><span><Warehouse size={54} strokeWidth={1.35} /></span><strong>Smart Solutions.<br />Better Business.</strong></div><div><Eyebrow>Our mission</Eyebrow><h2>Practical solutions for daily business.</h2><p>We create clear, approachable software that helps businesses work more effectively.</p><h3>Our vision</h3><p>Useful tools that grow with the people who rely on them.</p></div></div></section>
      <section className="section section-gray section-padded"><div className="container"><SectionHeading eyebrow="Our values" title="What guides our work." /><div className="values-grid">{values.map(([title, text], index) => <article className="value-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section-padded"><div className="container featured-product"><span className="featured-icon"><Package size={26} /></span><div><Eyebrow>Featured product</Eyebrow><h2>EWN Inventory</h2><p>One place to manage products, stock, and orders.</p></div><ButtonLink to="/features" variant="secondary">Explore the product <ArrowRight size={16} /></ButtonLink></div></section>
      <FinalCta />
    </>
  );
}
