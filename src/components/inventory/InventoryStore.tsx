import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'manager' | 'sales';
export type RoleUser = { name: string; email: string; password: string; role: UserRole };

export const demoUsers: RoleUser[] = [
  { name: 'Admin User', email: 'admin@ewn.com', password: 'admin123', role: 'admin' },
  { name: 'Store Manager', email: 'manager@ewn.com', password: 'manager123', role: 'manager' },
  { name: 'Sales Person', email: 'sales@ewn.com', password: 'sales123', role: 'sales' },
];

export type Product = {
  id: number;
  name: string;
  category: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  price: number;
};

export type Movement = {
  id: number;
  productId: number;
  type: 'Stock received' | 'Stock sold' | 'Stock adjusted';
  quantity: number;
  date: string;
};

export type Sale = { id: number; productId: number; quantity: number; total: number; date: string };

const initialProducts: Product[] = [
  { id: 1, name: 'Engine oil 5W-30 · 4 L', category: 'Engine oil', sku: 'EO-5304', stock: 18, reorderLevel: 12, price: 3450 },
  { id: 2, name: 'Oil filter · Toyota', category: 'Filters', sku: 'FL-T001', stock: 64, reorderLevel: 20, price: 850 },
  { id: 3, name: 'Brake pads · front', category: 'Brake parts', sku: 'BR-F101', stock: 8, reorderLevel: 10, price: 4200 },
  { id: 4, name: 'Engine oil 10W-40 · 1 L', category: 'Engine oil', sku: 'EO-1041', stock: 112, reorderLevel: 30, price: 980 },
];

const initialMovements: Movement[] = [
  { id: 1, productId: 2, type: 'Stock received', quantity: 24, date: 'Today, 10:42' },
  { id: 2, productId: 1, type: 'Stock sold', quantity: 8, date: 'Today, 09:18' },
  { id: 3, productId: 4, type: 'Stock received', quantity: 36, date: 'Yesterday' },
];

type InventoryContextValue = {
  products: Product[];
  movements: Movement[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addMovement: (movement: Omit<Movement, 'id'>) => void;
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id'>) => void;
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ewn-products');
    return saved ? JSON.parse(saved) as Product[] : initialProducts;
  });
  const [movements, setMovements] = useState<Movement[]>(() => {
    const saved = localStorage.getItem('ewn-movements');
    return saved ? JSON.parse(saved) as Movement[] : initialMovements;
  });
  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('ewn-sales');
    return saved ? JSON.parse(saved) as Sale[] : [];
  });

  useEffect(() => localStorage.setItem('ewn-products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('ewn-movements', JSON.stringify(movements)), [movements]);
  useEffect(() => localStorage.setItem('ewn-sales', JSON.stringify(sales)), [sales]);

  function addProduct(product: Omit<Product, 'id'>) {
    setProducts((current) => [...current, { ...product, id: Date.now() }]);
  }

  function addMovement(movement: Omit<Movement, 'id'>) {
    setMovements((current) => [{ ...movement, id: Date.now() }, ...current]);
    setProducts((current) => current.map((product) => {
      if (product.id !== movement.productId) return product;
      const change = movement.type === 'Stock sold' ? -movement.quantity : movement.quantity;
      return { ...product, stock: Math.max(0, product.stock + change) };
    }));
  }

  function addSale(sale: Omit<Sale, 'id'>) {
    setSales((current) => [{ ...sale, id: Date.now() }, ...current]);
    setProducts((current) => current.map((product) => product.id === sale.productId
      ? { ...product, stock: Math.max(0, product.stock - sale.quantity) }
      : product));
    setMovements((current) => [{
      id: Date.now(),
      productId: sale.productId,
      type: 'Stock sold',
      quantity: sale.quantity,
      date: 'Just now',
    }, ...current]);
  }

  return <InventoryContext.Provider value={{ products, movements, sales, addProduct, addMovement, addSale }}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used inside InventoryProvider');
  return context;
}
