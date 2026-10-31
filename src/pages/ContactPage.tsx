import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow, FormField, PageHero, PrototypeNotice } from '../components/ui';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', business: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = 'Enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (!formData.subject.trim()) nextErrors.subject = 'Enter a subject.';
    if (!formData.message.trim()) nextErrors.message = 'Enter a message.';
    setErrors(nextErrors);
    setSubmitted(false);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  }

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: '' }));
    setSubmitted(false);
  }

  return (
    <>
      <PageHero eyebrow="Contact" title="Send us a message." description="Ask about EWN Inventory or the guided demo." />
      <section className="section section-padded section-gray">
        <div className="container contact-layout">
          <div className="contact-aside"><Eyebrow>Get in touch</Eyebrow><h2>How can we help?</h2><p>Tell us about your business and what you need from your inventory system.</p><PrototypeNotice>Our team will help you choose the right plan and answer your questions.</PrototypeNotice></div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitted && <div className="form-success" role="status"><Check size={18} /><span>Thank you. Your message has been prepared for review.</span></div>}
            <div className="form-row">
              <FormField id="contact-name" label="Full name" error={errors.name}><input id="contact-name" name="name" autoComplete="name" value={formData.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} required /></FormField>
              <FormField id="contact-email" label="Email address" error={errors.email}><input id="contact-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} required /></FormField>
            </div>
            <FormField id="contact-business" label="Business name (optional)"><input id="contact-business" name="business" autoComplete="organization" value={formData.business} onChange={(event) => updateField('business', event.target.value)} /></FormField>
            <FormField id="contact-subject" label="Subject" error={errors.subject}><input id="contact-subject" name="subject" value={formData.subject} onChange={(event) => updateField('subject', event.target.value)} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'contact-subject-error' : undefined} required /></FormField>
            <FormField id="contact-message" label="Message" error={errors.message}><textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={(event) => updateField('message', event.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} required /></FormField>
            <button type="submit" className="button button-primary">Send message <ArrowRight size={16} /></button>
          </form>
        </div>
      </section>
    </>
  );
}
