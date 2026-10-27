import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BellRing,
  Boxes,
  PackageCheck,
  ShoppingBasket,
  Truck,
} from 'lucide-react';

export type SiteLink = { label: string; to: string };
export type Feature = { title: string; description: string; icon: LucideIcon };
export type PricingPlan = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  recommended?: boolean;
};
export type InventoryProduct = {
  name: string;
  category: string;
  sku: string;
  stock: number;
  status: 'In stock' | 'Low stock' | 'Out of stock';
};
export type StockMovement = {
  product: string;
  action: 'Stock received' | 'Stock issued';
  quantity: string;
  date: string;
};

export const navigationLinks: SiteLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const features: Feature[] = [
  {
    title: 'Product management',
    description: 'Keep product names, categories, and reference details organized in one clear catalog.',
    icon: Boxes,
  },
  {
    title: 'Stock tracking',
    description: 'Understand what is on hand and review incoming and outgoing stock movements.',
    icon: PackageCheck,
  },
  {
    title: 'Low-stock alerts',
    description: 'Spot products that may need attention before they become unexpected stockouts.',
    icon: BellRing,
  },
  {
    title: 'Supplier management',
    description: 'Keep supplier information together to make purchasing workflows easier to follow.',
    icon: Truck,
  },
  {
    title: 'Purchase orders',
    description: 'Plan replenishment with a structured view of the products your business needs.',
    icon: ShoppingBasket,
  },
  {
    title: 'Business reports',
    description: 'Review simple summaries that help turn stock information into better decisions.',
    icon: BarChart3,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 'ETB 0',
    cadence: '/ month',
    summary: 'A simple place to explore the core inventory concept.',
    features: ['Basic product catalog', 'Stock overview', 'Limited sample usage'],
  },
  {
    name: 'Growth',
    price: 'ETB 999',
    cadence: '/ month',
    summary: 'For growing teams that need more day-to-day visibility.',
    features: ['Expanded product management', 'Stock alerts', 'Inventory reports'],
    recommended: true,
  },
  {
    name: 'Business',
    price: 'ETB 1,999',
    cadence: '/ month',
    summary: 'A proposed option for broader inventory workflows.',
    features: ['Advanced workflows', 'Supplier management', 'Proposed multi-location capability'],
  },
];

export const inventoryProducts: InventoryProduct[] = [
  { name: 'Sunflower cooking oil', category: 'Groceries', sku: 'GR-1042', stock: 18, status: 'Low stock' },
  { name: 'Laundry soap bar', category: 'Household', sku: 'HH-2081', stock: 64, status: 'In stock' },
  { name: 'Long-grain rice · 5 kg', category: 'Groceries', sku: 'GR-1106', stock: 0, status: 'Out of stock' },
  { name: 'Bottled water · 1 L', category: 'Beverages', sku: 'BV-3012', stock: 112, status: 'In stock' },
];

export const stockMovements: StockMovement[] = [
  { product: 'Laundry soap bar', action: 'Stock received', quantity: '+24 units', date: 'Today, 10:42' },
  { product: 'Sunflower cooking oil', action: 'Stock issued', quantity: '−8 units', date: 'Today, 09:18' },
  { product: 'Bottled water · 1 L', action: 'Stock received', quantity: '+36 units', date: 'Yesterday' },
];

export const businessCategories = [
  { title: 'Retail shops', text: 'Keep everyday products and stock movements easier to follow.' },
  { title: 'Electronics stores', text: 'Bring product references and stock visibility into one workflow.' },
  { title: 'General merchandise', text: 'Make a varied product assortment simpler to organize.' },
  { title: 'Growing businesses', text: 'Explore a clearer approach as inventory needs evolve.' },
];

export const faqs = [
  {
    question: 'What is inventory management?',
    answer: 'Inventory management is the process of organizing products, tracking stock changes, and planning replenishment. EWN Inventory is a proposed product concept designed around those everyday tasks.',
  },
  {
    question: 'Can I try the demo?',
    answer: 'Yes. The demo entry page introduces a guided learning experience with fictional sample data. It does not connect to a live inventory database.',
  },
  {
    question: 'Are the prices final, and does the product support ETB?',
    answer: 'The prices shown are illustrative prototype examples in Ethiopian Birr (ETB), not active offers. Product availability and future currency support have not yet been confirmed.',
  },
  {
    question: 'Does the product support multiple users or locations?',
    answer: 'Multi-user and multi-location capabilities are not implemented or confirmed. Multi-location is shown only as a proposed Business-plan capability.',
  },
  {
    question: 'Is EWN Inventory available to purchase?',
    answer: 'No. EWN Inventory is currently a prototype concept. This website has no checkout, subscription, authentication, or live inventory service.',
  },
];

export const learningStages = ['Excitement', 'Entry', 'Engagement', 'Exit', 'Extension'];
