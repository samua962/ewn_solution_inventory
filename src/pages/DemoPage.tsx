import { ArrowRight, Check, Sparkles, Warehouse } from 'lucide-react';
import { learningStageDetails } from '../data';
import { Eyebrow, PageHero } from '../components/ui';

export function DemoPage() {
  return (
    <>
      <PageHero eyebrow="5E learning demo" title="Run an oil shop with clear stock." description="Follow five short stages from the first question to the next order." >
        <a className="button button-primary" href="#demo-overview">Begin demo <ArrowRight size={16} /></a>
      </PageHero>
      <section className="section section-padded" id="demo-overview">
        <div className="container demo-page-grid">
          <div className="demo-main-card">
            <div className="demo-shop-banner"><span><Warehouse size={23} /></span><div><small>YOUR SCENARIO</small><h2>Selam Auto Parts Shop</h2></div><span className="fictional-tag">Sample shop</span></div>
            <p>Selam’s shop sells engine oil, filters, and car parts. The shop needs to know which items are in stock and which need to be ordered.</p>
            <div className="demo-stat-grid"><div><span>Products</span><strong>248</strong><small>Sample count</small></div><div><span>Items to review</span><strong>12</strong><small>Sample alerts</small></div><div><span>Stock value</span><strong>ETB 184.5k</strong><small>Sample value</small></div></div>
            <div className="demo-learning"><h3>In this demo</h3><ul><li><Check size={16} /> Engine oil and vehicle parts</li><li><Check size={16} /> Stock received and sold</li><li><Check size={16} /> Low-stock alerts</li><li><Check size={16} /> Stock reports and orders</li></ul></div>
          </div>
          <aside className="demo-side-card"><Eyebrow>The 5E model</Eyebrow><h2>Learn in five steps.</h2><div className="demo-stage-list">{learningStageDetails.map((stage, index) => <div className={`demo-stage${index === 0 ? ' stage-current' : ''}`} key={stage.title}><span>{index + 1}</span><div><b>{stage.title}</b><small>{stage.text}</small></div>{index === 0 && <span className="stage-dot" />}</div>)}</div><div className="demo-continue"><span><Sparkles size={17} /></span><p>Start with a clear problem, then practice, reflect, and apply it.</p></div></aside>
        </div>
      </section>
    </>
  );
}
