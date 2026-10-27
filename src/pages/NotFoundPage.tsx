import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '../components/ui';

export function NotFoundPage() {
  return <section className="not-found"><span>404</span><h1>We can’t find that page.</h1><p>The page may have moved, or the address might be incorrect.</p><ButtonLink to="/">Back to home <ArrowRight size={16} /></ButtonLink></section>;
}
