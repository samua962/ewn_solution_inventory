import { ArrowRight, Package } from 'lucide-react';
import { ButtonLink, Eyebrow, FinalCta, PageHero, PrototypeNotice } from '../components/ui';

export function HowItWorksPage() {
  const steps = [
    ['01', 'Set up a business', 'Start with a workspace that reflects how your business organizes products.'],
    ['02', 'Add products', 'Create product entries with useful names, categories, and reference details.'],
    ['03', 'Record incoming stock', 'Capture an example delivery so there is a record of what came in.'],
    ['04', 'Record outgoing stock', 'Track stock issued or sold to understand how quantities change.'],
    ['05', 'Monitor low-stock alerts', 'Review products that may need attention based on a proposed threshold.'],
    ['06', 'Review reports', 'Look at simple summaries to understand sample inventory activity.'],
    ['07', 'Plan replenishment', 'Use what you have learned to prepare a more informed next order.'],
  ];
  return (
    <>
      <PageHero eyebrow="A proposed workflow" title="From product setup to better-informed decisions." description="EWN Inventory is designed around the everyday steps involved in keeping stock organized. Follow a sample journey below." >
        <ButtonLink to="/demo">Try the guided demo <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded">
        <div className="container workflow-layout">
          <div className="workflow-steps">{steps.map(([number, title, text], index) => <article className="workflow-step" key={number}><span className="workflow-number">{number}</span><div><h2>{title}</h2><p>{text}</p></div>{index < steps.length - 1 && <span className="workflow-connector" />}</article>)}</div>
          <aside className="example-card"><span className="example-label">A familiar example</span><div className="example-product"><div className="example-product-icon"><Package size={25} /></div><div><small>GROCERY · SAMPLE ITEM</small><h3>Sunflower cooking oil</h3><span>SKU GR-1042</span></div></div><div className="example-stock"><span>Sample stock on hand</span><strong>18 bottles</strong><small className="status-badge status-low-stock">Low stock · illustrative</small></div><p>A store records a delivery of 24 bottles, then tracks sales throughout the week. When the sample stock gets low, the team can consider including it in a future replenishment order.</p><div className="example-bottom"><ArrowRight size={16} /> Sample scenario only</div></aside>
        </div>
      </section>
      <section className="section section-gray section-padded"><div className="container feature-page-intro"><div><Eyebrow>Keep the context clear</Eyebrow><h2>This website is not a live inventory application.</h2><p>The steps above describe a proposed workflow. The sample values, alerts, and dashboard previews are static illustrations and do not update.</p></div><PrototypeNotice>No sign-in, product records, or inventory transactions are saved by this website.</PrototypeNotice></div></section>
      <FinalCta />
    </>
  );
}
