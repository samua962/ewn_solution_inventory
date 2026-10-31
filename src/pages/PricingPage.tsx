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
      <PageHero eyebrow="Pricing" title="Simple plans for your business." description="Choose the tools and support you need today.">
        <ButtonLink to="/contact">Ask a question <ArrowRight size={16} /></ButtonLink>
      </PageHero>
      <section className="section section-padded"><div className="container"><PrototypeNotice>All plans include secure cloud storage and regular product updates.</PrototypeNotice><div className="pricing-grid pricing-page-grid">{pricingPlans.map((plan) => <PricingCard key={plan.name} plan={plan} />)}</div><p className="pricing-footnote">Monthly prices in ETB. Taxes may apply.</p></div></section>
      <section className="section section-gray section-padded"><div className="container faq-layout"><div><Eyebrow>Questions</Eyebrow><h2>About EWN Inventory.</h2></div><FaqAccordion /></div></section>
      <FinalCta />
    </>
  );
}
