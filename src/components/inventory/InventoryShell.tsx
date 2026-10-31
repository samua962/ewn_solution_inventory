import { useState, type FormEvent } from 'react';
import { BarChart3, Boxes, ChevronRight, CircleGauge, Menu, Minus, PackagePlus, Plus, Search, ShoppingCart, Trash2, Users, X } from 'lucide-react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useInventory, type Product } from './InventoryStore';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from './InventoryStore';

const navItems = [
  { to: '/app/dashboard', label: 'Overview', icon: CircleGauge },
  { to: '/app/products', label: 'Products', icon: Boxes },
  { to: '/app/movements', label: 'Stock movements', icon: PackagePlus },
  { to: '/app/orders', label: 'Purchase orders', icon: ShoppingCart },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
  { to: '/app/sales', label: 'New sale', icon: ShoppingCart },
];

function statusFor(product: Product) {
  if (product.stock === 0) return 'Out of stock';
  if (product.stock <= product.reorderLevel) return 'Low stock';
  return 'In stock';
}

export function InventoryShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const savedUser = localStorage.getItem('ewn-demo-user');
  const user = savedUser ? JSON.parse(savedUser) as { name: string; role: UserRole } : null;
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }
  const canManageStock = user.role !== 'sales';
  const visibleNav = navItems.filter((item) => user.role === 'sales'
    ? item.to === '/app/dashboard' || item.to === '/app/products' || item.to === '/app/sales'
    : item.to !== '/app/sales' || user.role === 'admin');
  return (
    <div className="inventory-app">
      <aside className={`inventory-sidebar${menuOpen ? ' is-open' : ''}`}>
        <div className="inventory-brand"><span>EW</span><div><strong>EWN Inventory</strong><small>Selam Auto Parts</small></div></div>
        <button className="inventory-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        <nav>
          {visibleNav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}><Icon size={19} /><span>{label}</span></NavLink>)}
        </nav>
        <a className="inventory-team-link" href="/"><Users size={18} /><span>Back to website</span></a>
      </aside>

      <div className="inventory-main">
        <header className="inventory-topbar">
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <div><strong>Selam Auto Parts Shop</strong><small>Inventory workspace</small></div>
          <span className="inventory-avatar">{user.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}</span>
        </header>
        <main>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="movements" element={canManageStock ? <MovementsPage /> : <Navigate to="/app/dashboard" replace />} />
            <Route path="orders" element={canManageStock ? <OrdersPage /> : <Navigate to="/app/dashboard" replace />} />
            <Route path="reports" element={user.role === 'admin' || user.role === 'manager' ? <ReportsPage /> : <Navigate to="/app/dashboard" replace />} />
            <Route path="sales" element={user.role !== 'manager' ? <SalesPage /> : <Navigate to="/app/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function PageTitle({ title, text }: { title: string; text: string }) {
  return <div className="inventory-page-title"><div><h1>{title}</h1><p>{text}</p></div></div>;
}

function Dashboard() {
  const { products, movements } = useInventory();
  const stockValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);
  const lowStock = products.filter((product) => product.stock <= product.reorderLevel).length;
  return (
    <>
      <PageTitle title="Overview" text="Today’s stock at a glance." />
      <div className="inventory-stat-grid">
        <article><span>Products</span><strong>{products.length}</strong><small>Active products</small></article>
        <article><span>Stock value</span><strong>ETB {stockValue.toLocaleString()}</strong><small>Current value</small></article>
        <article><span>Low stock</span><strong>{lowStock}</strong><small>Items to review</small></article>
        <article><span>Movements</span><strong>{movements.length}</strong><small>Recent records</small></article>
      </div>
      <section className="inventory-panel">
        <div className="inventory-panel-head"><div><h2>Stock that needs attention</h2><p>Products at or below their reorder level.</p></div></div>
        <InventoryTable products={products.filter((product) => product.stock <= product.reorderLevel)} />
      </section>
      <section className="inventory-panel">
        <div className="inventory-panel-head"><div><h2>Recent movements</h2><p>Latest stock activity.</p></div></div>
        <div className="inventory-movement-list">
          {movements.slice(0, 5).map((movement) => {
            const product = products.find((item) => item.id === movement.productId);
            return <div key={movement.id}><span className={`movement-dot ${movement.type === 'Stock sold' ? 'sold' : ''}`} /><div><strong>{product?.name ?? 'Product'}</strong><small>{movement.type}</small></div><b>{movement.type === 'Stock sold' ? '-' : '+'}{movement.quantity}</b><time>{movement.date}</time></div>;
          })}
        </div>
      </section>
    </>
  );
}

function InventoryTable({ products }: { products: Product[] }) {
  if (!products.length) return <p className="inventory-empty">No products need attention.</p>;
  return (
    <div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>Product</th><th>Category</th><th>Code</th><th>Stock</th><th>Status</th></tr></thead><tbody>
      {products.map((product) => <tr key={product.id}><td><strong>{product.name}</strong></td><td>{product.category}</td><td>{product.sku}</td><td>{product.stock}</td><td><span className={`stock-status status-${statusFor(product).toLowerCase().replace(/ /g, '-')}`}>{statusFor(product)}</span></td></tr>)}
    </tbody></table></div>
  );
}

function ProductsPage() {
  const { products, addProduct } = useInventory();
  const savedUser = localStorage.getItem('ewn-demo-user');
  const user = savedUser ? JSON.parse(savedUser) as { role: UserRole } : null;
  const canManageProducts = user?.role !== 'sales';
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Engine oil');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('0');
  const [reorderLevel, setReorderLevel] = useState('10');
  const [price, setPrice] = useState('0');

  function submit(event: FormEvent) {
    event.preventDefault();
    addProduct({ name, category, sku, stock: Number(stock), reorderLevel: Number(reorderLevel), price: Number(price) });
    setName('');
    setSku('');
    setStock('0');
    setShowForm(false);
  }

  return (
    <>
      <div className="inventory-page-title"><div><h1>Products</h1><p>Manage oils, filters, and parts.</p></div>{canManageProducts && <button className="inventory-primary" onClick={() => setShowForm((open) => !open)}><PackagePlus size={18} /> Add product</button>}</div>
      {showForm && canManageProducts && <form className="inventory-form inventory-panel" onSubmit={submit}>
        <label>Product name<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option>Engine oil</option><option>Filters</option><option>Brake parts</option><option>Accessories</option></select></label>
        <label>Product code<input value={sku} onChange={(event) => setSku(event.target.value)} required /></label>
        <label>Opening stock<input type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} /></label>
        <label>Low-stock level<input type="number" min="0" value={reorderLevel} onChange={(event) => setReorderLevel(event.target.value)} /></label>
        <label>Price (ETB)<input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} /></label>
        <button className="inventory-primary" type="submit">Save product</button>
      </form>}
      <section className="inventory-panel"><InventoryTable products={products} /></section>
    </>
  );
}

function MovementsPage() {
  const { products, movements, addMovement } = useInventory();
  const [productId, setProductId] = useState(String(products[0]?.id ?? ''));
  const [type, setType] = useState<MovementType>('Stock received');
  const [quantity, setQuantity] = useState('1');

  function submit(event: FormEvent) {
    event.preventDefault();
    addMovement({ productId: Number(productId), type, quantity: Number(quantity), date: 'Just now' });
    setQuantity('1');
  }

  return <>
    <PageTitle title="Stock movements" text="Record stock received, sold, or adjusted." />
    <form className="inventory-form inventory-panel" onSubmit={submit}>
      <label>Product<select value={productId} onChange={(event) => setProductId(event.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
      <label>Movement<select value={type} onChange={(event) => setType(event.target.value as MovementType)}><option>Stock received</option><option>Stock sold</option><option>Stock adjusted</option></select></label>
      <label>Quantity<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label>
      <button className="inventory-primary" type="submit">Save movement</button>
    </form>
    <section className="inventory-panel"><div className="inventory-panel-head"><div><h2>Movement history</h2></div></div><div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>Product</th><th>Movement</th><th>Quantity</th><th>Date</th></tr></thead><tbody>{movements.map((movement) => <tr key={movement.id}><td>{products.find((product) => product.id === movement.productId)?.name}</td><td>{movement.type}</td><td>{movement.quantity}</td><td>{movement.date}</td></tr>)}</tbody></table></div></section>
  </>;
}

type MovementType = 'Stock received' | 'Stock sold' | 'Stock adjusted';

function OrdersPage() {
  const orders = [
    { number: 'PO-1048', supplier: 'Addis Auto Supply', items: 4, date: '28 Oct 2026', total: 'ETB 38,500', status: 'Ordered' },
    { number: 'PO-1042', supplier: 'Mekonnen Oils', items: 3, date: '24 Oct 2026', total: 'ETB 21,800', status: 'Received' },
  ];
  return <>
    <div className="inventory-page-title"><div><h1>Purchase orders</h1><p>Track orders placed with suppliers.</p></div><button className="inventory-primary"><ShoppingCart size={18} /> New order</button></div>
    <section className="inventory-panel"><div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>Order</th><th>Supplier</th><th>Items</th><th>Date</th><th>Total</th><th>Status</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.number}><td><strong>{order.number}</strong></td><td>{order.supplier}</td><td>{order.items}</td><td>{order.date}</td><td>{order.total}</td><td><span className="stock-status status-in-stock">{order.status}</span></td><td><ChevronRight size={18} /></td></tr>)}</tbody></table></div></section>
  </>;
}

function ReportsPage() {
  const { products } = useInventory();
  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0);
  const stockValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);
  return <>
    <PageTitle title="Reports" text="A simple view of stock and orders." />
    <div className="inventory-stat-grid"><article><span>Total units</span><strong>{totalUnits}</strong><small>Across all products</small></article><article><span>Stock value</span><strong>ETB {stockValue.toLocaleString()}</strong><small>Current estimate</small></article><article><span>Categories</span><strong>{new Set(products.map((product) => product.category)).size}</strong><small>Product groups</small></article></div>
    <section className="inventory-panel"><div className="inventory-panel-head"><div><h2>Stock report</h2><p>Current product levels.</p></div></div><InventoryTable products={products} /></section>
  </>;
}

type SaleItem = { productId: number; quantity: number };

function SalesPage() {
  const { products, sales, addSale } = useInventory();
  const [search, setSearch] = useState('');
  const [items, setItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [completed, setCompleted] = useState(false);

  const visibleProducts = products.filter((product) =>
    `${product.name} ${product.sku}`.toLowerCase().includes(search.toLowerCase()) && product.stock > 0);
  const total = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
  const paid = Number(amountPaid || total);
  const change = Math.max(0, paid - total);

  function addItem(productId: number) {
    setCompleted(false);
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      const product = products.find((entry) => entry.id === productId);
      if (!product || product.stock === 0) return current;
      if (existing) return current.map((item) => item.productId === productId
        ? { ...item, quantity: Math.min(product.stock, item.quantity + 1) }
        : item);
      return [...current, { productId, quantity: 1 }];
    });
  }

  function setItemQuantity(productId: number, quantity: number) {
    const product = products.find((entry) => entry.id === productId);
    if (!product) return;
    setItems((current) => current.map((item) => item.productId === productId
      ? { ...item, quantity: Math.max(1, Math.min(product.stock, quantity)) }
      : item));
  }

  function completeSale() {
    if (!items.length) return;
    if (paymentMethod === 'Cash' && paid < total) return;
    items.forEach((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      addSale({ productId: item.productId, quantity: item.quantity, total: (product?.price ?? 0) * item.quantity, date: 'Just now' });
    });
    setCompleted(true);
    setItems([]);
    setAmountPaid('');
  }

  return (
    <>
      <PageTitle title="New sale" text="Find products and complete the sale." />
      {completed && <div className="sale-success" role="status">Sale completed. Stock has been updated.</div>}
      <div className="sales-layout">
        <section className="sales-products">
          <label className="sales-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search product or code" /></label>
          <div className="sales-product-grid">
            {visibleProducts.map((product) => (
              <button type="button" className="sales-product" key={product.id} onClick={() => addItem(product.id)}>
                <span>{product.category}</span><strong>{product.name}</strong><small>{product.sku}</small><b>ETB {product.price.toLocaleString()}</b><em>{product.stock} in stock</em>
              </button>
            ))}
          </div>
        </section>
        <aside className="sales-cart">
          <div className="sales-cart-title"><div><h2>Current sale</h2><p>{items.length} {items.length === 1 ? 'item' : 'items'}</p></div>{items.length > 0 && <button type="button" aria-label="Clear sale" onClick={() => setItems([])}><Trash2 size={17} /></button>}</div>
          <div className="sales-cart-items">
            {items.length === 0 && <p className="inventory-empty">Select a product to begin.</p>}
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div className="sales-cart-item" key={item.productId}>
                  <div><strong>{product.name}</strong><small>ETB {product.price.toLocaleString()} each</small></div>
                  <div className="sales-quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setItemQuantity(item.productId, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setItemQuantity(item.productId, item.quantity + 1)}><Plus size={14} /></button></div>
                  <b>ETB {(product.price * item.quantity).toLocaleString()}</b>
                </div>
              );
            })}
          </div>
          <div className="sales-payment">
            <label>Payment method<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option>Cash</option><option>Mobile payment</option><option>Bank transfer</option></select></label>
            {paymentMethod === 'Cash' && <label>Amount paid<input type="number" min="0" value={amountPaid} onChange={(event) => setAmountPaid(event.target.value)} placeholder={total.toString()} /></label>}
            <div className="sales-total"><span>Total</span><strong>ETB {total.toLocaleString()}</strong></div>
            {paymentMethod === 'Cash' && <div className="sales-change"><span>Change</span><strong>ETB {change.toLocaleString()}</strong></div>}
            {paymentMethod === 'Cash' && paid < total && items.length > 0 && <p className="sales-payment-error">Amount paid is less than the total.</p>}
            <button className="inventory-primary sales-checkout" type="button" disabled={!items.length || (paymentMethod === 'Cash' && paid < total)} onClick={completeSale}>Complete sale</button>
          </div>
          {sales.length > 0 && (
            <div className="sales-recent">
              <h3>Recent sales</h3>
              {sales.slice(0, 3).map((sale) => (
                <div key={sale.id}>
                  <span>{products.find((product) => product.id === sale.productId)?.name ?? 'Product'}</span>
                  <strong>ETB {sale.total.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
