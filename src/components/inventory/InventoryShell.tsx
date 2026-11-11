import { useEffect, useRef, useState, type FormEvent } from 'react';
import { BarChart3, Bell, Bot, Boxes, ChevronRight, CircleGauge, Download, LockKeyhole, Menu, Minus, PackagePlus, Plus, Printer, RotateCcw, Search, Send, ShoppingCart, Sparkles, Trash2, Users, X } from 'lucide-react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { useInventory, type Product } from './InventoryStore';
import { useNavigate } from 'react-router-dom';
import { demoUsers, type UserRole } from './InventoryStore';
import { useLanguage } from '../../i18n';

const navItems = [
  { to: '/app/dashboard', label: 'Overview', icon: CircleGauge },
  { to: '/app/products', label: 'Products', icon: Boxes },
  { to: '/app/movements', label: 'Stock movements', icon: PackagePlus },
  { to: '/app/orders', label: 'Purchase orders', icon: ShoppingCart },
  { to: '/app/reports', label: 'Reports', icon: BarChart3 },
  { to: '/app/sales', label: 'New sale', icon: ShoppingCart },
  { to: '/app/users', label: 'Users', icon: Users },
  { to: '/app/assistant', label: 'AI assistant', icon: Sparkles },
];

function statusFor(product: Product) {
  if (product.stock === 0) return 'Out of stock';
  if (product.stock <= product.reorderLevel) return 'Low stock';
  return 'In stock';
}

type AssistantMessage = { sender: 'assistant' | 'user'; text: string };

function roleLabel(role: UserRole) {
  if (role === 'admin') return 'Admin';
  if (role === 'manager') return 'Store Manager';
  return 'Sales Person';
}

function assistantReply(question: string, role: UserRole, t: (text: string) => string) {
  const prompt = question.toLowerCase();
  if (prompt.includes('role') || prompt.includes('permission') || prompt.includes('access')) {
    const access = role === 'admin'
      ? t('You can manage products, stock movements, purchase orders, reports, sales, and users.')
      : role === 'manager'
        ? t('You can manage products, stock movements, purchase orders, and reports. User management and sales are not available to your role.')
        : t('You can view the overview and products, and complete sales. Stock movements, purchasing, reports, and user management are not available to your role.');
    return `${t('Your current role is')} ${t(roleLabel(role))}. ${access}`;
  }
  if (prompt.includes('low stock') || prompt.includes('alert') || prompt.includes('reorder')) {
    return t('Low-stock items appear in the Overview and Products screens when their quantity reaches the product’s low-stock level. Open Products to review the current quantity and status.');
  }
  if (prompt.includes('movement') || prompt.includes('stock') || prompt.includes('receive') || prompt.includes('adjust')) {
    if (role === 'sales') return t('Your Sales Person role can’t record stock movements. Ask an Admin or Store Manager to open Stock movements, choose the product and movement type, enter the quantity, and save it.');
    return t('Open Stock movements from the menu. Choose a product, select Stock received, Stock sold, or Stock adjusted, enter the quantity, then select Save movement. The history records who made the change.');
  }
  if (prompt.includes('sale') || prompt.includes('checkout')) {
    if (role === 'manager') return t('Sales aren’t available for your Store Manager role. An Admin or Sales Person can open New sale, add products to the cart, choose a payment method, and complete the sale.');
    return t('Open New sale, search for a product or code, and select products to add them to the cart. Confirm payment details and choose Complete sale. Stock updates automatically.');
  }
  if (prompt.includes('report') || prompt.includes('export')) {
    if (role === 'sales') return t('Reports aren’t available for your Sales Person role. Ask an Admin or Store Manager to open Reports and export the stock report as CSV or PDF.');
    return t('Open Reports to review stock and sales totals. Use the Daily or Weekly selector, then choose Export CSV or Export PDF to download a report.');
  }
  if (prompt.includes('user') || prompt.includes('team member')) {
    if (role !== 'admin') return t('User management is only available to Admins. Ask an Admin to open Users to add or update team access.');
    return t('Open Users to see team accounts, add a user, assign a role, or enable and disable access.');
  }
  return t('I can guide you through stock movements, sales, low-stock alerts, reports, and role access. Your current role is') + ` ${t(roleLabel(role))}. ` + t('Choose a suggestion or ask me about one of these tasks.');
}

export function InventoryShell() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { products } = useInventory();
  const lowStockProducts = products.filter((product) => product.stock <= product.reorderLevel);
  const savedUser = localStorage.getItem('ewn-demo-user');
  const user = savedUser ? JSON.parse(savedUser) as { name: string; role: UserRole } : null;
  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }
  const canManageStock = user.role !== 'sales';
  const visibleNav = navItems.filter((item) => item.to === '/app/assistant' || (user.role === 'sales'
    ? item.to === '/app/dashboard' || item.to === '/app/products' || item.to === '/app/sales'
    : (item.to !== '/app/sales' || user.role === 'admin') && (item.to !== '/app/users' || user.role === 'admin')));
  return (
    <div className="inventory-app">
      <aside className={`inventory-sidebar${menuOpen ? ' is-open' : ''}`}>
        <div className="inventory-brand"><span>EW</span><div><strong>EWN Inventory</strong><small>Selam Auto Parts</small></div></div>
        <button className="inventory-close" type="button" onClick={() => setMenuOpen(false)} aria-label={t('Close menu')}><X /></button>
        <nav>
          {visibleNav.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setMenuOpen(false)}><Icon size={19} /><span>{t(label)}</span></NavLink>)}
        </nav>
        <a className="inventory-team-link" href="/"><Users size={18} /><span>{t('Back to website')}</span></a>
      </aside>

      <div className="inventory-main">
        <header className="inventory-topbar">
          <button type="button" onClick={() => setMenuOpen(true)} aria-label={t('Open menu')}><Menu /></button>
          <div><strong>Selam Auto Parts Shop</strong><small>{t('Inventory workspace')}</small></div>
          <div className="inventory-notifications">
            <button className="notification-button" type="button" aria-label={t('Open notifications')} aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
              <Bell size={21} />
              {lowStockProducts.length > 0 && <span className="notification-count">{lowStockProducts.length}</span>}
            </button>
            {notificationsOpen && (
              <div className="notification-panel">
                <div className="notification-panel-head"><strong>{t('Notifications')}</strong><span>{lowStockProducts.length} {t('alerts')}</span></div>
                {lowStockProducts.length ? lowStockProducts.slice(0, 5).map((product) => (
                  <button key={product.id} type="button" className="notification-item" onClick={() => { setNotificationsOpen(false); navigate('/app/products'); }}>
                    <span className="notification-dot" />
                    <span><strong>{product.name}</strong><small>{product.stock === 0 ? t('Out of stock') : `${product.stock} ${t('units remaining')}`}</small></span>
                  </button>
                )) : <p className="notification-empty">{t('No new stock alerts.')}</p>}
              </div>
            )}
          </div>
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
            <Route path="users" element={user.role === 'admin' ? <UsersPage /> : <Navigate to="/app/dashboard" replace />} />
            <Route path="assistant" element={<AssistantPage userName={user.name} role={user.role} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function AssistantPage({ userName, role }: { userName: string; role: UserRole }) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages]);

  function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { sender: 'user', text: trimmed },
      { sender: 'assistant', text: assistantReply(trimmed, role, t) },
    ]);
    setInput('');
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  function resetConversation() {
    setMessages([]);
    setInput('');
  }

  const permissions = [
    { label: t('Overview'), to: '/app/dashboard', available: true },
    { label: t('Products'), to: '/app/products', available: true },
    { label: t('Stock movements'), to: '/app/movements', available: role !== 'sales' },
    { label: t('Purchase orders'), to: '/app/orders', available: role !== 'sales' },
    { label: t('Reports'), to: '/app/reports', available: role !== 'sales' },
    { label: t('New sale'), to: '/app/sales', available: role !== 'manager' },
    { label: t('Users'), to: '/app/users', available: role === 'admin' },
  ];

  return (
    <div className="assistant-page">
      <div className="assistant-page-intro">
        <div><span className="assistant-intro-label"><Sparkles size={14} /> {t('EWN HELP CENTER')}</span><h1>{t('How can we help?')}</h1><p>{t('Get guidance for everyday tasks and learn what’s available in your role.')}</p></div>
        <span className="assistant-intro-badge"><span /> {t('Guided help preview')}</span>
      </div>
      <div className="assistant-page-layout">
        <section className="assistant-chat-card">
          <header className="assistant-page-header">
            <span className="assistant-avatar"><Bot size={22} /></span>
            <div className="assistant-heading"><strong>{t('EWN assistant')}</strong><small>{t('Product and workflow guide')}</small></div>
            {messages.length > 0 && <button className="assistant-reset-button" type="button" onClick={resetConversation}><RotateCcw size={14} /> {t('New chat')}</button>}
          </header>
          <div className="assistant-page-conversation" aria-live="polite">
            <div className="assistant-welcome">
              <span className="assistant-welcome-icon"><Sparkles size={18} /></span>
              <div><strong>{t('Hi')} {userName.split(' ')[0]}! {t('What can I help you with?')}</strong><p>{t('Pick a question to get started, or type your own below.')}</p></div>
            </div>
            {messages.length === 0 && (
              <div className="assistant-suggestions">
                <span>{t('POPULAR QUESTIONS')}</span>
                <div className="assistant-suggestion-grid">
                  {['How do I record a stock movement?', 'What can I do with my role?', 'How do I check low-stock items?', 'How do I create a sale?'].map((suggestion) => (
                    <button type="button" key={suggestion} onClick={() => { setMessages([{ sender: 'user', text: t(suggestion) }, { sender: 'assistant', text: assistantReply(suggestion, role, t) }]); }}>{t(suggestion)}<ChevronRight size={16} /></button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div className={`assistant-message assistant-message-${message.sender}`} key={`${message.sender}-${index}`}>
                {message.sender === 'assistant' && <span className="assistant-message-avatar"><Bot size={16} /></span>}
                <p>{message.text}</p>
              </div>
            ))}
            <div ref={conversationEndRef} />
          </div>
          <form className="assistant-composer" onSubmit={submit}>
            <input aria-label={t('Ask the assistant')} placeholder={t('Ask about products, stock, reports...')} value={input} onChange={(event) => setInput(event.target.value)} />
            <button type="submit" disabled={!input.trim()} aria-label={t('Send message')}><Send size={18} /></button>
          </form>
          <div className="assistant-prototype-note">{t('Preview only · answers are sample guidance, not live AI responses')}</div>
        </section>
        <aside className="assistant-access-card">
          <div className="assistant-access-icon"><Users size={20} /></div>
          <span className="assistant-access-eyebrow">{t('YOUR ACCESS')}</span>
          <h2>{t(roleLabel(role))}</h2>
          <p>{t('Your role determines which parts of the workspace you can open.')}</p>
          <ul>
            {permissions.map((permission) => (
              <li key={permission.to} className={permission.available ? '' : 'is-unavailable'}>
                {permission.available
                  ? <><span className="assistant-access-check">✓</span><NavLink to={permission.to}>{permission.label}<ChevronRight size={14} /></NavLink></>
                  : <><span className="assistant-access-lock"><LockKeyhole size={13} /></span><span>{permission.label}</span></>}
              </li>
            ))}
          </ul>
          <div className="assistant-access-footnote">{t('Need more access? Contact your workspace Admin.')}</div>
        </aside>
      </div>
    </div>
  );
}

function PageTitle({ title, text }: { title: string; text: string }) {
  const { t } = useLanguage();
  return <div className="inventory-page-title"><div><h1>{t(title)}</h1><p>{t(text)}</p></div></div>;
}

function Dashboard() {
  const { language, setLanguage, t } = useLanguage();
  const { products, movements } = useInventory();
  const stockValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);
  const lowStock = products.filter((product) => product.stock <= product.reorderLevel).length;
  return (
    <>
      <div className="inventory-page-title dashboard-title"><div><h1>{t('Overview')}</h1><p>{t('Today’s stock at a glance.')}</p></div><div className="language-picker" role="group" aria-label={t('Choose language')}><span>{t('Language')}</span><button type="button" className={language === 'en' ? 'active' : ''} aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>English</button><button type="button" className={language === 'am' ? 'active' : ''} aria-pressed={language === 'am'} onClick={() => setLanguage('am')}>አማርኛ</button></div></div>
      <div className="inventory-stat-grid">
        <article><span>{t('Products')}</span><strong>{products.length}</strong><small>{t('Active products')}</small></article>
        <article><span>{t('Stock value')}</span><strong>ETB {stockValue.toLocaleString()}</strong><small>{t('Current value')}</small></article>
        <article><span>{t('Low stock')}</span><strong>{lowStock}</strong><small>{t('Items to review')}</small></article>
        <article><span>{t('Movements')}</span><strong>{movements.length}</strong><small>{t('Recent records')}</small></article>
      </div>
      <section className="inventory-panel">
        <div className="inventory-panel-head"><div><h2>{t('Stock that needs attention')}</h2><p>{t('Products at or below their reorder level.')}</p></div></div>
        <InventoryTable products={products.filter((product) => product.stock <= product.reorderLevel)} />
      </section>
      <section className="inventory-panel">
        <div className="inventory-panel-head"><div><h2>{t('Recent movements')}</h2><p>{t('Latest stock activity.')}</p></div></div>
        <div className="inventory-movement-list">
          {movements.slice(0, 5).map((movement) => {
            const product = products.find((item) => item.id === movement.productId);
            return <div key={movement.id}><span className={`movement-dot ${movement.type === 'Stock sold' ? 'sold' : ''}`} /><div><strong>{product?.name ?? t('Product')}</strong><small>{t(movement.type)} · {t('by')} {movement.performedBy ?? t('Not recorded')}</small></div><b>{movement.type === 'Stock sold' ? '-' : '+'}{movement.quantity}</b><time>{t(movement.date)}</time></div>;
          })}
        </div>
      </section>
    </>
  );
}

function InventoryTable({ products }: { products: Product[] }) {
  const { t } = useLanguage();
  if (!products.length) return <p className="inventory-empty">{t('No products need attention.')}</p>;
  return (
    <div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>{t('Product')}</th><th>{t('Category')}</th><th>{t('Code')}</th><th>{t('Stock')}</th><th>{t('Status')}</th></tr></thead><tbody>
      {products.map((product) => {
        const status = statusFor(product);
        const statusLabel = status === 'Low stock' ? t('Low stock status') : t(status);
        return <tr key={product.id}><td><strong>{product.name}</strong></td><td>{t(product.category)}</td><td>{product.sku}</td><td>{product.stock}</td><td><span className={`stock-status status-${status.toLowerCase().replace(/ /g, '-')}`}>{statusLabel}</span></td></tr>;
      })}
    </tbody></table></div>
  );
}

function ProductsPage() {
  const { t } = useLanguage();
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
      <div className="inventory-page-title"><div><h1>{t('Products')}</h1><p>{t('Manage oils, filters, and parts.')}</p></div>{canManageProducts && <button className="inventory-primary" onClick={() => setShowForm((open) => !open)}><PackagePlus size={18} /> {t('Add product')}</button>}</div>
      {showForm && canManageProducts && <form className="inventory-form inventory-panel" onSubmit={submit}>
        <label>{t('Product name')}<input value={name} onChange={(event) => setName(event.target.value)} required /></label>
        <label>{t('Category')}<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="Engine oil">{t('Engine oil')}</option><option value="Filters">{t('Filters')}</option><option value="Brake parts">{t('Brake parts')}</option><option value="Accessories">{t('Accessories')}</option></select></label>
        <label>{t('Product code')}<input value={sku} onChange={(event) => setSku(event.target.value)} required /></label>
        <label>{t('Opening stock')}<input type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} /></label>
        <label>{t('Low-stock level')}<input type="number" min="0" value={reorderLevel} onChange={(event) => setReorderLevel(event.target.value)} /></label>
        <label>{t('Price (ETB)')}<input type="number" min="0" value={price} onChange={(event) => setPrice(event.target.value)} /></label>
        <button className="inventory-primary" type="submit">{t('Save product')}</button>
      </form>}
      <section className="inventory-panel"><InventoryTable products={products} /></section>
    </>
  );
}

function MovementsPage() {
  const { t } = useLanguage();
  const { products, movements, addMovement } = useInventory();
  const savedUser = localStorage.getItem('ewn-demo-user');
  const user = savedUser ? JSON.parse(savedUser) as { name?: string } : null;
  const [productId, setProductId] = useState(String(products[0]?.id ?? ''));
  const [type, setType] = useState<MovementType>('Stock received');
  const [quantity, setQuantity] = useState('1');

  function submit(event: FormEvent) {
    event.preventDefault();
    addMovement({ productId: Number(productId), type, quantity: Number(quantity), date: 'Just now', performedBy: user?.name ?? 'Unknown user' });
    setQuantity('1');
  }

  return <>
    <PageTitle title="Stock movements" text="Record stock received, sold, or adjusted." />
    <form className="inventory-form inventory-panel" onSubmit={submit}>
      <label>{t('Product')}<select value={productId} onChange={(event) => setProductId(event.target.value)}>{products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}</select></label>
      <label>{t('Movement')}<select value={type} onChange={(event) => setType(event.target.value as MovementType)}><option value="Stock received">{t('Stock received')}</option><option value="Stock sold">{t('Stock sold')}</option><option value="Stock adjusted">{t('Stock adjusted')}</option></select></label>
      <label>{t('Quantity')}<input type="number" min="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} /></label>
      <button className="inventory-primary" type="submit">{t('Save movement')}</button>
    </form>
    <section className="inventory-panel"><div className="inventory-panel-head"><div><h2>{t('Movement history')}</h2></div></div><div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>{t('Product')}</th><th>{t('Movement')}</th><th>{t('Quantity')}</th><th>{t('Performed by')}</th><th>{t('Date')}</th></tr></thead><tbody>{movements.map((movement) => <tr key={movement.id}><td>{products.find((product) => product.id === movement.productId)?.name ?? t('Product')}</td><td>{t(movement.type)}</td><td>{movement.quantity}</td><td>{movement.performedBy ?? t('Not recorded')}</td><td>{t(movement.date)}</td></tr>)}</tbody></table></div></section>
  </>;
}

type MovementType = 'Stock received' | 'Stock sold' | 'Stock adjusted';

function OrdersPage() {
  const { t } = useLanguage();
  const orders = [
    { number: 'PO-1048', supplier: 'Addis Auto Supply', items: 4, date: '28 Oct 2026', total: 'ETB 38,500', status: 'Ordered' },
    { number: 'PO-1042', supplier: 'Mekonnen Oils', items: 3, date: '24 Oct 2026', total: 'ETB 21,800', status: 'Received' },
  ];
  return <>
    <div className="inventory-page-title"><div><h1>{t('Purchase orders')}</h1><p>{t('Track orders placed with suppliers.')}</p></div><button className="inventory-primary"><ShoppingCart size={18} /> {t('New order')}</button></div>
    <section className="inventory-panel"><div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>{t('Order')}</th><th>{t('Supplier')}</th><th>{t('Items')}</th><th>{t('Date')}</th><th>{t('Total')}</th><th>{t('Status')}</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.number}><td><strong>{order.number}</strong></td><td>{order.supplier}</td><td>{order.items}</td><td>{t(order.date)}</td><td>{order.total}</td><td><span className="stock-status status-in-stock">{t(order.status)}</span></td><td><ChevronRight size={18} /></td></tr>)}</tbody></table></div></section>
  </>;
}

type ManagedUser = { id: number; name: string; email: string; role: UserRole; status: 'Active' | 'Disabled'; lastLogin: string };

function UsersPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('sales');
  const [users, setUsers] = useState<ManagedUser[]>(() => {
    const saved = localStorage.getItem('ewn-managed-users');
    if (saved) return JSON.parse(saved) as ManagedUser[];
    return demoUsers.map((user, index) => ({
      id: index + 1,
      name: user.name,
      email: user.email,
      role: user.role,
      status: 'Active',
      lastLogin: index === 0 ? 'Today, 09:20' : index === 1 ? 'Yesterday' : 'Never',
    }));
  });

  function saveUsers(nextUsers: ManagedUser[]) {
    setUsers(nextUsers);
    localStorage.setItem('ewn-managed-users', JSON.stringify(nextUsers));
  }

  function addUser(event: FormEvent) {
    event.preventDefault();
    saveUsers([...users, { id: Date.now(), name: name.trim(), email: email.trim(), role, status: 'Active', lastLogin: 'Never' }]);
    setName('');
    setEmail('');
    setRole('sales');
    setShowForm(false);
  }

  const visibleUsers = users.filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase()));

  return <>
    <div className="inventory-page-title"><div><h1>{t('Users')}</h1><p>{t('Add team members and control what they can access.')}</p></div><button className="inventory-primary" type="button" onClick={() => setShowForm((open) => !open)}><Plus size={18} /> {t('Add user')}</button></div>
    {showForm && (
      <form className="inventory-form inventory-panel" onSubmit={addUser}>
        <label>{t('Full name')}<input required value={name} onChange={(event) => setName(event.target.value)} placeholder={t('Enter full name')} /></label>
        <label>{t('Email')}<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" /></label>
        <label>{t('Role')}<select value={role} onChange={(event) => setRole(event.target.value as UserRole)}><option value="admin">{t('Admin')}</option><option value="manager">{t('Store Manager')}</option><option value="sales">{t('Sales Person')}</option></select></label>
        <button className="inventory-primary" type="submit">{t('Save user')}</button>
      </form>
    )}
    <div className="users-toolbar"><label className="sales-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('Search users')} /></label><span>{visibleUsers.length} {t('users count')}</span></div>
    <section className="inventory-panel">
      <div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>{t('User')}</th><th>{t('Role')}</th><th>{t('Status')}</th><th>{t('Last login')}</th><th /></tr></thead><tbody>
        {visibleUsers.map((user) => (
          <tr key={user.id}>
            <td><strong>{user.name}</strong><small className="user-email">{user.email}</small></td>
            <td>{t(roleLabel(user.role))}</td>
            <td><span className={`stock-status ${user.status === 'Active' ? 'status-in-stock' : 'status-out-of-stock'}`}>{t(user.status)}</span></td>
            <td>{t(user.lastLogin)}</td>
            <td><button className="user-status-button" type="button" onClick={() => saveUsers(users.map((entry) => entry.id === user.id ? { ...entry, status: entry.status === 'Active' ? 'Disabled' : 'Active' } : entry))}>{t(user.status === 'Active' ? 'Disable' : 'Activate')}</button></td>
          </tr>
        ))}
      </tbody></table></div>
    </section>
  </>;
}

function ReportsPage() {
  const { t } = useLanguage();
  const { products, movements, sales } = useInventory();
  const [period, setPeriod] = useState<'Daily' | 'Weekly'>('Daily');
  const totalUnits = products.reduce((sum, product) => sum + product.stock, 0);
  const stockValue = products.reduce((sum, product) => sum + product.stock * product.price, 0);

  function exportCsv() {
    const lines = [
      [t('Report'), t(period)],
      [t('Product'), 'SKU', t('Category'), t('Stock'), t('Price (ETB)'), t('Stock value')],
      ...products.map((product) => [
        product.name,
        product.sku,
        product.category,
        String(product.stock),
        String(product.price),
        String(product.stock * product.price),
      ]),
    ];
    const csv = lines.map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `ewn-${period.toLowerCase()}-stock-report.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const soldUnits = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const receivedUnits = movements.filter((movement) => movement.type === 'Stock received').reduce((sum, movement) => sum + movement.quantity, 0);
  const salesValue = sales.reduce((sum, sale) => sum + sale.total, 0);
  return <>
    <PageTitle title="Reports" text="A simple view of stock and orders." />
    <div className="report-toolbar">
      <div className="report-period" aria-label={t('Report period')}>
        <button className={period === 'Daily' ? 'active' : ''} type="button" onClick={() => setPeriod('Daily')}>{t('Daily')}</button>
        <button className={period === 'Weekly' ? 'active' : ''} type="button" onClick={() => setPeriod('Weekly')}>{t('Weekly')}</button>
      </div>
      <div className="report-actions">
        <button className="inventory-secondary" type="button" onClick={exportCsv}><Download size={16} /> {t('Export CSV')}</button>
        <button className="inventory-secondary" type="button" onClick={() => window.print()}><Printer size={16} /> {t('Export PDF')}</button>
      </div>
    </div>
    <div className="inventory-stat-grid">
      <article><span>{t(period)} {t('stock received')}</span><strong>{receivedUnits} {t('units')}</strong><small>{t('Current movement total')}</small></article>
      <article><span>{t(period)} {t('products sold')}</span><strong>{soldUnits} {t('units')}</strong><small>{t('Completed sales')}</small></article>
      <article><span>{t(period)} {t('sales')}</span><strong>ETB {salesValue.toLocaleString()}</strong><small>{t('Sale value')}</small></article>
    </div>
    <div className="inventory-stat-grid"><article><span>{t('Total units')}</span><strong>{totalUnits}</strong><small>{t('Across all products')}</small></article><article><span>{t('Stock value')}</span><strong>ETB {stockValue.toLocaleString()}</strong><small>{t('Current estimate')}</small></article><article><span>{t('Categories')}</span><strong>{new Set(products.map((product) => product.category)).size}</strong><small>{t('Product groups')}</small></article></div>
    <section className="inventory-panel"><div className="inventory-panel-head"><div><h2>{t('Stock report')}</h2><p>{t('Current product levels.')}</p></div></div><InventoryTable products={products} /></section>
  </>;
}

type SaleItem = { productId: number; quantity: number };

function SalesPage() {
  const { t } = useLanguage();
  const { products, sales, addSale } = useInventory();
  const savedUser = localStorage.getItem('ewn-demo-user');
  const user = savedUser ? JSON.parse(savedUser) as { name?: string } : null;
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
      addSale({ productId: item.productId, quantity: item.quantity, total: (product?.price ?? 0) * item.quantity, date: 'Just now', performedBy: user?.name ?? 'Unknown user' });
    });
    setCompleted(true);
    setItems([]);
    setAmountPaid('');
  }

  return (
    <>
      <PageTitle title="New sale" text="Find products and complete the sale." />
      {completed && <div className="sale-success" role="status">{t('Sale completed. Stock has been updated.')}</div>}
      <div className="sales-layout">
        <section className="sales-products">
          <label className="sales-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('Search product or code')} /></label>
          <div className="sales-product-grid">
            {visibleProducts.map((product) => (
              <button type="button" className="sales-product" key={product.id} onClick={() => addItem(product.id)}>
                <span>{t(product.category)}</span><strong>{product.name}</strong><small>{product.sku}</small><b>ETB {product.price.toLocaleString()}</b><em>{product.stock} {t('in stock')}</em>
              </button>
            ))}
          </div>
        </section>
        <aside className="sales-cart">
          <div className="sales-cart-title"><div><h2>{t('Current sale')}</h2><p>{items.length} {t(items.length === 1 ? 'item' : 'items')}</p></div>{items.length > 0 && <button type="button" aria-label={t('Clear sale')} onClick={() => setItems([])}><Trash2 size={17} /></button>}</div>
          <div className="sales-cart-items">
            {items.length === 0 && <p className="inventory-empty">{t('Select a product to begin.')}</p>}
            {items.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);
              if (!product) return null;
              return (
                <div className="sales-cart-item" key={item.productId}>
                  <div><strong>{product.name}</strong><small>ETB {product.price.toLocaleString()} {t('each')}</small></div>
                  <div className="sales-quantity"><button type="button" aria-label={t('Decrease quantity')} onClick={() => setItemQuantity(item.productId, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button type="button" aria-label={t('Increase quantity')} onClick={() => setItemQuantity(item.productId, item.quantity + 1)}><Plus size={14} /></button></div>
                  <b>ETB {(product.price * item.quantity).toLocaleString()}</b>
                </div>
              );
            })}
          </div>
          <div className="sales-payment">
            <label>{t('Payment method')}<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option value="Cash">{t('Cash')}</option><option value="Mobile payment">{t('Mobile payment')}</option><option value="Bank transfer">{t('Bank transfer')}</option></select></label>
            {paymentMethod === 'Cash' && <label>{t('Amount paid')}<input type="number" min="0" value={amountPaid} onChange={(event) => setAmountPaid(event.target.value)} placeholder={total.toString()} /></label>}
            <div className="sales-total"><span>{t('Total')}</span><strong>ETB {total.toLocaleString()}</strong></div>
            {paymentMethod === 'Cash' && <div className="sales-change"><span>{t('Change')}</span><strong>ETB {change.toLocaleString()}</strong></div>}
            {paymentMethod === 'Cash' && paid < total && items.length > 0 && <p className="sales-payment-error">{t('Amount paid is less than the total.')}</p>}
            <button className="inventory-primary sales-checkout" type="button" disabled={!items.length || (paymentMethod === 'Cash' && paid < total)} onClick={completeSale}>{t('Complete sale')}</button>
          </div>
          {sales.length > 0 && (
            <div className="sales-recent">
              <h3>{t('Recent sales')}</h3>
              {sales.slice(0, 3).map((sale) => (
                <div key={sale.id}>
                  <span>{products.find((product) => product.id === sale.productId)?.name ?? t('Product')}</span>
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
