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
  performedBy?: string;
  orderNumber?: string;
};

export type Sale = { id: number; productId: number; quantity: number; total: number; date: string; performedBy?: string };
export type PurchaseOrderItem = { productId: number; quantity: number; unitCost: number };
export type PurchaseOrder = {
  id: number;
  number: string;
  supplier: string;
  items: PurchaseOrderItem[];
  expectedDate: string;
  notes: string;
  status: 'Draft' | 'Ordered' | 'Received';
  createdAt: string;
  createdBy: string;
  receivedAt?: string;
};

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

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 1048,
    number: 'PO-1048',
    supplier: 'Addis Auto Supply',
    items: [{ productId: 2, quantity: 24, unitCost: 720 }, { productId: 3, quantity: 4, unitCost: 3700 }],
    expectedDate: '2026-11-18',
    notes: '',
    status: 'Ordered',
    createdAt: '2026-11-12',
    createdBy: 'Store Manager',
  },
  {
    id: 1042,
    number: 'PO-1042',
    supplier: 'Mekonnen Oils',
    items: [{ productId: 1, quantity: 12, unitCost: 2900 }, { productId: 4, quantity: 20, unitCost: 760 }],
    expectedDate: '2026-11-10',
    notes: '',
    status: 'Received',
    createdAt: '2026-11-08',
    createdBy: 'Admin User',
  },
];

type InventoryContextValue = {
  products: Product[];
  movements: Movement[];
  categories: string[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addCategory: (name: string) => boolean;
  renameCategory: (currentName: string, nextName: string) => boolean;
  deleteCategory: (name: string) => void;
  addMovement: (movement: Omit<Movement, 'id'>) => void;
  sales: Sale[];
  addSale: (sale: Omit<Sale, 'id'>) => void;
  purchaseOrders: PurchaseOrder[];
  createPurchaseOrder: (order: Omit<PurchaseOrder, 'id' | 'number' | 'createdAt'>) => void;
  placePurchaseOrder: (id: number) => void;
  receivePurchaseOrder: (id: number, performedBy: string) => void;
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ewn-products');
    return saved ? JSON.parse(saved) as Product[] : initialProducts;
  });
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('ewn-categories');
    if (saved) return JSON.parse(saved) as string[];
    const savedProducts = localStorage.getItem('ewn-products');
    const currentProducts = savedProducts ? JSON.parse(savedProducts) as Product[] : initialProducts;
    return [...new Set(currentProducts.map((product) => product.category).filter(Boolean))];
  });
  const [movements, setMovements] = useState<Movement[]>(() => {
    const saved = localStorage.getItem('ewn-movements');
    return saved ? JSON.parse(saved) as Movement[] : initialMovements;
  });
  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem('ewn-sales');
    return saved ? JSON.parse(saved) as Sale[] : [];
  });
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(() => {
    const saved = localStorage.getItem('ewn-purchase-orders');
    return saved ? JSON.parse(saved) as PurchaseOrder[] : initialPurchaseOrders;
  });

  useEffect(() => localStorage.setItem('ewn-products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('ewn-categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('ewn-movements', JSON.stringify(movements)), [movements]);
  useEffect(() => localStorage.setItem('ewn-sales', JSON.stringify(sales)), [sales]);
  useEffect(() => localStorage.setItem('ewn-purchase-orders', JSON.stringify(purchaseOrders)), [purchaseOrders]);

  function addProduct(product: Omit<Product, 'id'>) {
    setProducts((current) => [...current, { ...product, id: Date.now() }]);
  }

  function addCategory(name: string) {
    const cleanName = name.trim();
    if (!cleanName || categories.some((category) => category.toLowerCase() === cleanName.toLowerCase())) return false;
    setCategories((current) => [...current, cleanName]);
    return true;
  }

  function renameCategory(currentName: string, nextName: string) {
    const cleanName = nextName.trim();
    if (!cleanName || categories.some((category) => category !== currentName && category.toLowerCase() === cleanName.toLowerCase())) return false;
    if (cleanName === currentName) return true;
    setCategories((current) => current.map((category) => category === currentName ? cleanName : category));
    setProducts((current) => current.map((product) => product.category === currentName ? { ...product, category: cleanName } : product));
    return true;
  }

  function deleteCategory(name: string) {
    if (products.some((product) => product.category === name)) return;
    setCategories((current) => current.filter((category) => category !== name));
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
      performedBy: sale.performedBy,
    }, ...current]);
  }

  function createPurchaseOrder(order: Omit<PurchaseOrder, 'id' | 'number' | 'createdAt'>) {
    const id = Date.now();
    const number = `PO-${String(id).slice(-6)}`;
    setPurchaseOrders((current) => [{ ...order, id, number, createdAt: new Date().toISOString() }, ...current]);
  }

  function placePurchaseOrder(id: number) {
    setPurchaseOrders((current) => current.map((order) => order.id === id && order.status === 'Draft'
      ? { ...order, status: 'Ordered' }
      : order));
  }

  function receivePurchaseOrder(id: number, performedBy: string) {
    const order = purchaseOrders.find((entry) => entry.id === id);
    if (!order || order.status !== 'Ordered') return;

    const receivedAt = new Date().toISOString();
    setPurchaseOrders((current) => current.map((entry) => entry.id === id && entry.status === 'Ordered'
      ? { ...entry, status: 'Received', receivedAt }
      : entry));
    setProducts((current) => current.map((product) => {
      const receivedQuantity = order.items
        .filter((item) => item.productId === product.id)
        .reduce((sum, item) => sum + item.quantity, 0);
      return receivedQuantity ? { ...product, stock: product.stock + receivedQuantity } : product;
    }));
    setMovements((current) => [
      ...order.items.map((item, index) => ({
        id: Date.now() + index,
        productId: item.productId,
        type: 'Stock received' as const,
        quantity: item.quantity,
        date: 'Just now',
        performedBy,
        orderNumber: order.number,
      })),
      ...current,
    ]);
  }

  return <InventoryContext.Provider value={{ products, movements, categories, sales, addProduct, addCategory, renameCategory, deleteCategory, addMovement, addSale, purchaseOrders, createPurchaseOrder, placePurchaseOrder, receivePurchaseOrder }}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used inside InventoryProvider');
  return context;
}
