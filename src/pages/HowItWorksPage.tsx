import { ArrowRight, Package } from 'lucide-react';
import { ButtonLink, FinalCta, PageHero } from '../components/ui';

export function HowItWorksPage() {
  const steps = [
    ['01', 'Add products', 'Enter names, groups, and product codes.'],
    ['02', 'Add stock received', 'Enter products that arrived.'],
    ['03', 'Record stock used', 'Enter products sold or taken from stock.'],
    ['04', 'Check stock levels', 'See what is left and what is running low.'],
    ['05', 'Plan the next order', 'Choose what needs to be bought.'],
  ];
  return (
    <>
      <PageHero eyebrow="How it works" title="Five simple steps." description="Add products, record stock, and plan the next order." >
        <ButtonLink to="/demo">Try the guided demo <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded">
        <div className="container workflow-layout">
          <div className="workflow-steps">{steps.map(([number, title, text], index) => <article className="workflow-step" key={number}><span className="workflow-number">{number}</span><div><h2>{title}</h2><p>{text}</p></div>{index < steps.length - 1 && <span className="workflow-connector" />}</article>)}</div>
          <aside className="example-card"><span className="example-label">Example</span><div className="example-product"><div className="example-product-icon"><Package size={25} /></div><div><small>ENGINE OIL · 4 L</small><h3>5W-30 fully synthetic</h3><span>Code EO-5304</span></div></div><div className="example-stock"><span>Stock on hand</span><strong>18 cans</strong><small className="status-badge status-low-stock">Running low</small></div><p>The shop receives 24 cans, then records sales during the week. When stock gets low, the shop adds it to the next order.</p><div className="example-bottom"><ArrowRight size={16} /> Sample only</div></aside>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
