import Layout from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { DemoPage } from './pages/DemoPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { InventoryShell } from './components/inventory/InventoryShell';
import { InventoryProvider } from './components/inventory/InventoryStore';

export default function App() {
  return (
    <Routes>
      <Route path="/app/*" element={<InventoryProvider><InventoryShell /></InventoryProvider>} />
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}
