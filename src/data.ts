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
    description: 'Add oils, filters, parts, sizes, and codes.',
    icon: Boxes,
  },
  {
    title: 'Stock tracking',
    description: 'Track oil and parts received or sold.',
    icon: PackageCheck,
  },
  {
    title: 'Low-stock alerts',
    description: 'See oil and parts that are running low.',
    icon: BellRing,
  },
  {
    title: 'Supplier management',
    description: 'Keep supplier details in one place.',
    icon: Truck,
  },
  {
    title: 'Purchase orders',
    description: 'Order parts and oil before stock runs out.',
    icon: ShoppingBasket,
  },
  {
    title: 'Business reports',
    description: 'Read simple stock reports.',
    icon: BarChart3,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 'ETB 0',
    cadence: '/ month',
    summary: 'Try the basic stock tools.',
    features: ['Basic product list', 'Stock overview', 'Sample use'],
  },
  {
    name: 'Growth',
    price: 'ETB 999',
    cadence: '/ month',
    summary: 'For teams that manage stock every day.',
    features: ['Expanded product management', 'Stock alerts', 'Inventory reports'],
    recommended: true,
  },
  {
    name: 'Business',
    price: 'ETB 1,999',
    cadence: '/ month',
    summary: 'For larger inventory work.',
    features: ['More stock tools', 'Supplier management', 'Multiple locations'],
  },
];

export const inventoryProducts: InventoryProduct[] = [
  { name: 'Engine oil 5W-30 · 4 L', category: 'Engine oil', sku: 'EO-5304', stock: 18, status: 'Low stock' },
  { name: 'Oil filter · Toyota', category: 'Filters', sku: 'FL-T001', stock: 64, status: 'In stock' },
  { name: 'Brake pads · front', category: 'Brake parts', sku: 'BR-F101', stock: 0, status: 'Out of stock' },
  { name: 'Engine oil 10W-40 · 1 L', category: 'Engine oil', sku: 'EO-1041', stock: 112, status: 'In stock' },
];

export const stockMovements: StockMovement[] = [
  { product: 'Oil filter · Toyota', action: 'Stock received', quantity: '+24 units', date: 'Today, 10:42' },
  { product: 'Engine oil 5W-30 · 4 L', action: 'Stock issued', quantity: '−8 units', date: 'Today, 09:18' },
  { product: 'Engine oil 10W-40 · 1 L', action: 'Stock received', quantity: '+36 units', date: 'Yesterday' },
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
    answer: 'It means keeping track of products, stock received and used, and what needs to be ordered.',
  },
  {
    question: 'Can I try the demo?',
    answer: 'Yes. The demo uses a sample shop and sample data. It does not connect to a real stock system.',
  },
  {
    question: 'Are the prices final, and does the product support ETB?',
    answer: 'Prices are shown in Ethiopian Birr (ETB). Your final price will depend on the plan and selected number of locations.',
  },
  {
    question: 'Does the product support multiple users or locations?',
    answer: 'Yes. The Business plan supports multiple users and locations.',
  },
  {
    question: 'Is EWN Inventory available to purchase?',
    answer: 'Yes. Choose a plan and contact our team to set up your account.',
  },
];

export const learningStages = ['Excitement', 'Entry', 'Engagement', 'Exit', 'Extension'];

export const learningStageDetails = [
  { title: 'Excitement', text: 'Meet the shop and see the stock problem.' },
  { title: 'Entry', text: 'Add one product and set its stock level.' },
  { title: 'Engagement', text: 'Record a sale and receive new stock.' },
  { title: 'Exit', text: 'Check the result and low-stock alerts.' },
  { title: 'Extension', text: 'Use reports to plan the next order.' },
];
