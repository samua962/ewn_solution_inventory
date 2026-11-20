import { useState, type FormEvent } from 'react';
import { ArrowRight, BarChart3, Bot, Boxes, Compass, PackageCheck, Send, ShieldCheck, TrendingUp, Truck, X } from 'lucide-react';
import { features } from '../data';
import { DashboardPreview } from '../components/dashboard/DashboardPreview';
import { ButtonLink, Eyebrow, FeatureCard, FinalCta, SectionHeading } from '../components/ui';
import sholaMarketLogo from '../../asset/atlas-auto.svg';
import meseretPharmacyLogo from '../../asset/north-parts.svg';
import boleElectronicsLogo from '../../asset/green-valley.svg';
import addisHardwareLogo from '../../asset/vertex-supply.svg';

export function HomePage() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantInput, setAssistantInput] = useState('');
  const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'assistant' | 'user'; text: string }>>([
    { sender: 'assistant', text: 'Hello. I can help you learn about products, stock levels, sales, and reports.' },
  ]);
  const assistantOptions = [
    'How does stock work?',
    'Show inventory features',
    'How do purchase orders work?',
  ];

  function publicAssistantReply(question: string) {
    const prompt = question.toLowerCase();
    if (prompt.includes('stock') || prompt.includes('inventory') || prompt.includes('movement')) {
      return 'Track products and quantities in one place. Stock can be received, sold, adjusted, or reviewed through low-stock alerts and the inventory overview.';
    }
    if (prompt.includes('feature') || prompt.includes('product') || prompt.includes('tool')) {
      return 'EWN Inventory includes product management, stock tracking, purchase orders, sales, reports, and role-based team access.';
    }
    if (prompt.includes('purchase') || prompt.includes('order') || prompt.includes('supplier')) {
      return 'Create a purchase order with a supplier and product quantities. Save it as a draft, place the order, and receive it later to update stock automatically.';
    }
    if (prompt.includes('sale') || prompt.includes('sell') || prompt.includes('checkout')) {
      return 'Add products to a new sale, enter payment details, and complete the sale. Stock quantities update immediately in the prototype.';
    }
    if (prompt.includes('report') || prompt.includes('export')) {
      return 'Review stock value and movements in Reports. Choose a daily or weekly view, then export the report as CSV or PDF.';
    }
    if (prompt.includes('price') || prompt.includes('plan') || prompt.includes('cost')) {
      return 'You can compare the available prototype plans on the Pricing page. For this demo, the guided view is available without setup.';
    }
    if (prompt.includes('demo') || prompt.includes('try')) {
      return 'Open the guided demo to explore the complete inventory workflow, or sign in to the staff prototype with one of the sample accounts.';
    }
    return 'I can guide you through stock, products, sales, purchase orders, reports, pricing, or the guided demo. Choose an option or ask a question about one of these topics.';
  }

  function askAssistant(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setAssistantMessages((current) => [
      ...current,
      { sender: 'user', text: trimmed },
      { sender: 'assistant', text: publicAssistantReply(trimmed) },
    ]);
    setAssistantInput('');
  }

  function submitAssistant(event: FormEvent) {
    event.preventDefault();
    askAssistant(assistantInput);
  }
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
            <Eyebrow>Simple inventory software</Eyebrow>
            <h1>Take Control of Your Inventory. Grow Your Business.</h1>
            <p className="hero-lead">Manage products, monitor stock levels, track inventory movements, and make smarter purchasing decisions with a simple inventory management experience built for growing businesses.</p>
            <div className="hero-actions">
              <ButtonLink to="/demo">Explore the demo <ArrowRight size={17} /></ButtonLink>
              <ButtonLink to="/features" variant="secondary">See features</ButtonLink>
            </div>
            <p className="hero-promise"><ShieldCheck size={16} /> Easy to see and easy to use.</p>
            <span className="hero-prototype">Start with one store. Grow to more locations.</span>
          </div>
          <div className="hero-visual">
            <DashboardPreview />
          </div>
        </div>
      </section>

      <section className="benefit-strip">
        <div className="container benefit-grid">
          {benefits.map(({ title, icon: Icon }) => <div className="benefit-item" key={title}><Icon size={20} /><span>{title}</span></div>)}
        </div>
      </section>

      <section className="section excitement-section">
        <div className="container section-padded">
          <div className="excitement-grid">
            <div className="excitement-copy">
              <Eyebrow>One system, many businesses</Eyebrow>
              <h2>Manage every product with less work.</h2>
              <p>Retail shops, spare-parts stores, suppliers, and service businesses can keep products and stock in one place.</p>
              <div className="excitement-result"><strong>Less guesswork.</strong><span>See what is selling and what needs to be ordered.</span></div>
              <div className="excitement-highlights"><span>Product photos</span><span>Clear stock levels</span><span>Fast selling</span></div>
              <ButtonLink to="/demo" variant="secondary">See EWN Inventory <ArrowRight size={16} /></ButtonLink>
            </div>
            <div className="business-product-grid">
              <div><PackageCheck size={22} /><strong>Products</strong><span>Keep every item organized</span></div>
              <div><Boxes size={22} /><strong>Stock</strong><span>Know quantities at a glance</span></div>
              <div><TrendingUp size={22} /><strong>Sales</strong><span>See what customers buy</span></div>
              <div><Truck size={22} /><strong>Orders</strong><span>Restock before items run out</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="trusted-section" aria-label="Our customers and their products">
        <div className="container trusted-inner">
          <div className="customer-showcase-heading">
            <span>Our customers</span>
            <small>Everyday businesses, one simple system</small>
          </div>
          <div className="partner-logos customer-products" aria-label="Customer products">
            <strong><img src={sholaMarketLogo} alt="Shola Market logo" /><span>Shola Market<small>Food and groceries</small></span></strong>
            <strong><img src={meseretPharmacyLogo} alt="Meseret Pharmacy logo" /><span>Meseret Pharmacy<small>Medicine and care</small></span></strong>
            <strong><img src={boleElectronicsLogo} alt="Bole Electronics logo" /><span>Bole Electronics<small>Phones and devices</small></span></strong>
            <strong><img src={addisHardwareLogo} alt="Addis Hardware logo" /><span>Addis Hardware<small>Building materials</small></span></strong>
          </div>
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

      <button className={`assistant-button${assistantOpen ? ' is-open' : ''}`} type="button" onClick={() => setAssistantOpen((open) => !open)} aria-expanded={assistantOpen} aria-label={assistantOpen ? 'Close AI assistant' : 'Open AI assistant'}>
        {assistantOpen ? <X size={20} /> : <><Bot size={21} /><span>Ask AI assistant</span></>}
      </button>
      {assistantOpen && (
        <aside className="assistant-panel" aria-label="EWN AI assistant">
          <div className="assistant-head"><span><Bot size={19} /></span><div><strong>EWN Assistant</strong><small>Ready to help</small></div></div>
          <div className="assistant-conversation" aria-live="polite">
            {assistantMessages.map((message, index) => (
              <div className={`assistant-message assistant-message-${message.sender}`} key={`${message.sender}-${index}`}>{message.text}</div>
            ))}
          </div>
          <div className="assistant-chips">
            {assistantOptions.map((option) => (
              <button type="button" key={option} onClick={() => askAssistant(option)}>{option}</button>
            ))}
          </div>
          <form className="assistant-input" onSubmit={submitAssistant}>
            <input aria-label="Ask the assistant" placeholder="Type your question..." value={assistantInput} onChange={(event) => setAssistantInput(event.target.value)} />
            <button type="submit" disabled={!assistantInput.trim()} aria-label="Send question"><Send size={17} /></button>
          </form>
        </aside>
      )}

      <FinalCta />
    </>
  );
}
