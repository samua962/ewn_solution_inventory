import { ArrowDownRight, ArrowUpRight, BarChart3, BellRing, ClipboardCheck, Layers3, Package, Warehouse } from 'lucide-react';
import { inventoryProducts, stockMovements } from '../../data';

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = 'blue',
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Package;
  tone?: 'blue' | 'green' | 'amber';
}) {
  return (
    <div className="metric-card">
      <span className={`metric-icon tone-${tone}`}><Icon size={17} /></span>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="metric-detail">{detail}</span>
    </div>
  );
}

export function DashboardPreview({ large = false }: { large?: boolean }) {
  return (
    <section className={`dashboard-preview${large ? ' dashboard-large' : ''}`} aria-label="EWN Inventory dashboard preview">
      <div className="dashboard-sidebar">
        <div className="dashboard-logo"><span><Warehouse size={18} /></span><strong>ewn inventory</strong></div>
        <div className="dashboard-caption">WORKSPACE</div>
        <div className="dashboard-nav active"><Layers3 size={15} /> Overview</div>
        <div className="dashboard-nav"><Package size={15} /> Products</div>
        <div className="dashboard-nav"><ClipboardCheck size={15} /> Movements</div>
        <div className="dashboard-nav"><BarChart3 size={15} /> Reports</div>
        <div className="sidebar-bottom"><span className="avatar">EW</span><span><b>My store</b><small>Sample data</small></span></div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-topbar">
          <div>
            <span className="dashboard-kicker">OVERVIEW</span>
            <h3>Good morning</h3>
          </div>
          <span className="sample-pill"><span /> Sample data</span>
        </div>
        <div className="dashboard-date">A sample view of inventory at a glance</div>
        <div className="metric-grid">
          <MetricCard label="Total products" value="248" detail="Across 8 categories" icon={Package} />
          <MetricCard label="Inventory value" value="ETB 184,500" detail="Current value" icon={BarChart3} tone="green" />
          <MetricCard label="Low-stock items" value="12" detail="Review suggested" icon={BellRing} tone="amber" />
        </div>
        <div className="dashboard-content-grid">
          <div className="dashboard-panel chart-panel">
            <div className="panel-title"><span><b>Stock movement</b><small>Example activity · last 7 days</small></span><span className="panel-menu">•••</span></div>
            <div className="chart-area" aria-label="Bar chart showing stock activity">
              <div className="chart-y-labels"><span>80</span><span>60</span><span>40</span><span>20</span></div>
              <div className="chart-columns">
                {[42, 63, 49, 78, 57, 91, 67].map((height, index) => (
                  <div className="chart-col" key={height + index}>
                    <span className="bar-in" style={{ height: `${height * 0.62}%` }} />
                    <span className="bar-out" style={{ height: `${height * 0.36}%` }} />
                    <small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-panel movements-panel">
            <div className="panel-title"><span><b>Recent movements</b><small>Today</small></span><span className="panel-link">View all</span></div>
            {stockMovements.slice(0, 2).map((movement) => (
              <div className="movement-row" key={movement.product}>
                <span className={`movement-icon ${movement.action === 'Stock received' ? 'received' : 'issued'}`}>
                  {movement.action === 'Stock received' ? <ArrowDownRight size={15} /> : <ArrowUpRight size={15} />}
                </span>
                <span className="movement-detail"><b>{movement.product}</b><small>{movement.action} · {movement.date}</small></span>
                <strong className={movement.action === 'Stock received' ? 'amount-positive' : 'amount-neutral'}>{movement.quantity}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="dashboard-panel product-panel">
          <div className="panel-title"><span><b>Products to review</b><small>A few example items from the sample catalog</small></span><span className="panel-link">View catalog</span></div>
          <div className="product-table-wrap">
            <table className="product-table">
              <thead><tr><th>Product</th><th>SKU</th><th>In stock</th><th>Status</th></tr></thead>
              <tbody>
                {inventoryProducts.slice(0, large ? 4 : 3).map((product) => (
                  <tr key={product.sku}>
                    <td><span className="product-thumbnail"><Package size={14} /></span>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.stock} units</td>
                    <td><span className={`status-badge status-${product.status.toLowerCase().replace(/ /g, '-')}`}>{product.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="dashboard-disclaimer">Sample dashboard data</p>
      </div>
    </section>
  );
}
