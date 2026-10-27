import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { faqs, pricingPlans } from '../data';
import { ButtonLink, Eyebrow, FinalCta, PageHero, PricingCard, PrototypeNotice } from '../components/ui';

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <article className={`faq-item${openIndex === index ? ' faq-open' : ''}`} key={faq.question}>
          <h3><button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>{faq.question}<ChevronDown size={19} /></button></h3>
          {openIndex === index && <p>{faq.answer}</p>}
        </article>
      ))}
    </div>
  );
}

export function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing concepts" title="Clear options. No surprises." description="These proposed plan examples are here to help communicate product direction. They are illustrative only and are not available for purchase." >
        <ButtonLink to="/contact">Ask a question <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded"><div className="container"><PrototypeNotice>Prototype notice: EWN Inventory is not currently available as a paid service. Pricing, features, and availability are subject to validation.</PrototypeNotice><div className="pricing-grid pricing-page-grid">{pricingPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div><p className="pricing-footnote">All prices are illustrative per-month examples in ETB. No payment gateway or checkout flow is connected.</p></div></section>
      <section className="section section-gray section-padded"><div className="container faq-layout"><div><Eyebrow>Common questions</Eyebrow><h2>What to know about the prototype.</h2><p>Answers about the proposed product, demo, and illustrative pricing.</p></div><FaqAccordion /></div></section>
      <FinalCta />
    </>
  );
}
