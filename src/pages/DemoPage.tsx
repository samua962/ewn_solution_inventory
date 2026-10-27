import { ArrowRight, Check, Sparkles, Warehouse } from 'lucide-react';
import { learningStages } from '../data';
import { Eyebrow, PageHero, PrototypeNotice } from '../components/ui';

export function DemoPage() {
  return (
    <>
      <PageHero eyebrow="EWN Inventory · guided demo" title="A small shop. A clearer view of stock." description="Step into a fictional neighborhood shop and explore how a thoughtful inventory workflow could help the team keep track of everyday products." >
        <a className="button button-primary" href="#demo-overview">Begin demo <ArrowRight size={16} /></a>
      </PageHero>
      <section className="section section-padded" id="demo-overview">
        <div className="container demo-page-grid">
          <div className="demo-main-card">
            <div className="demo-shop-banner"><span><Warehouse size={23} /></span><div><small>YOUR SCENARIO</small><h2>Selam Community Shop</h2></div><span className="fictional-tag">Fictional business</span></div>
            <p>Selam’s shop carries groceries and household essentials. The team wants a more organized way to know what is on the shelves, notice items running low, and prepare for the next delivery.</p>
            <div className="demo-stat-grid"><div><span>Products in sample</span><strong>248</strong><small>Illustrative count</small></div><div><span>Items to review</span><strong>12</strong><small>Sample alert count</small></div><div><span>Sample stock value</span><strong>ETB 184.5k</strong><small>Illustrative estimate</small></div></div>
            <div className="demo-learning"><h3>What you’ll explore</h3><ul><li><Check size={16} /> Organize a small product catalog</li><li><Check size={16} /> Follow a sample stock movement</li><li><Check size={16} /> Notice when an item may need replenishment</li><li><Check size={16} /> Reflect on a simple inventory summary</li></ul></div>
            <PrototypeNotice>This is a demo introduction for a future learning experience. No live products or inventory records are available here.</PrototypeNotice>
          </div>
          <aside className="demo-side-card"><Eyebrow>Your learning journey</Eyebrow><h2>Five stages, one practical scenario.</h2><div className="demo-stage-list">{learningStages.map((stage, index) => <div className={`demo-stage${index === 0 ? ' stage-current' : ''}`} key={stage}><span>{index + 1}</span><div><b>{stage}</b><small>{index === 0 ? 'You are here' : 'Planned stage'}</small></div>{index === 0 && <span className="stage-dot" />}</div>)}</div><div className="demo-continue"><span><Sparkles size={17} /></span><p>The interactive learning journey is planned for a future version of this concept.</p></div></aside>
        </div>
      </section>
    </>
  );
}
