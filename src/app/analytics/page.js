'use client';\nimport { useState } from 'react';\n\nexport default function AnalyticsPage() {\n  const [period, setPeriod] = useState('7d');\n\n  const stats = [\n    { label: 'Total Reach', value: '—', change: null },\n    { label: 'Engagement Rate', value: '—', change: null },\n    { label: 'New Followers', value: '—', change: null },\n    { label: 'Messages Sent', value: '—', change: null },\n  ];\n\n  const platformStats = [\n    { name: 'LinkedIn', color: '#0077b5', icon: 'in', followers: '—', posts: '—', engagement: '—' },\n    { name: 'Instagram', color: '#e1306c', icon: 'IG', followers: '—', posts: '—', engagement: '—' },\n    { name: 'Facebook', color: '#1877f2', icon: 'fb', followers: '—', posts: '—', engagement: '—' },\n    { name: 'Email', color: '#6c5ce7', icon: '✉', followers: '—', posts: '—', engagement: '—' },\n  ];\n\n  return (\n    <div>\n      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>\n        <div>\n          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Analytics</h1>\n          <p style={{ color: 'var(--text-secondary)' }}>Performance metrics across all platforms</p>\n        </div>\n        <div className="tab-bar">\n          {[\n            { key: '7d', label: '7 Days' },\n            { key: '30d', label: '30 Days' },\n            { key: '90d', label: '90 Days' },\n          ].map(t => (\n            <button key={t.key} className={`tab ${period === t.key ? 'active' : ''}`} onClick={() => setPeriod(t.key)}>\n              {t.label}\n            </button>\n          ))}\n        </div>\n      </div>\n\n      {/* Overview Stats */}\n      <div className="grid-4" style={{ marginBottom: 32 }}>\n        {stats.map((s, i) => (\n          <div key={i} className="stat-card">\n            <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>\n            <div style={{ fontSize: 32, fontWeight: 700 }}>{s.value}</div>\n            {s.change && <div style={{ fontSize: 12, color: s.change > 0 ? 'var(--green)' : 'var(--red)', marginTop: 4 }}>{s.change > 0 ? '+' : ''}{s.change}%</div>}\n          </div>\n        ))}\n      </div>\n\n      {/* Platform Breakdown */}\n      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Platform Breakdown</h2>\n      <div style={{ marginBottom: 32 }}>\n        <table className="table">\n          <thead>\n            <tr>\n              <th>Platform</th>\n              <th>Followers</th>\n              <th>Posts</th>\n              <th>Engagement</th>\n              <th>Status</th>\n            </tr>\n          </thead>\n          <tbody>\n            {platformStats.map((p, i) => (\n              <tr key={i}>\n                <td>\n                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>\n                    <div style={{ width: 32, height: 32, borderRadius: 8, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{p.icon}</div>\n                    <span style={{ fontWeight: 600 }}>{p.name}</span>\n                  </div>\n                </td>\n                <td>{p.followers}</td>\n                <td>{p.posts}</td>\n                <td>{p.engagement}</td>\n                <td><span className="badge badge-orange">Connect API</span></td>\n              </tr>\n            ))}\n          </tbody>\n        </table>\n      </div>\n\n      {/* Chart Placeholder */}\n      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Growth Over Time</h2>\n      <div className="card" style={{ padding: 48, textAlign: 'center' }}>\n        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>\n        <div style={{ fontWeight: 600, marginBottom: 8 }}>Connect your platforms to see analytics</div>\n        <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>\n          Once you connect your social accounts with API access, real-time analytics will appear here including follower growth, engagement rates, reach, and content performance.\n        </div>\n      </div>\n\n      {/* Top Posts */}\n      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>Top Performing Content</h2>\n      <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>\n        Your best-performing posts across platforms will show up here once connected.\n      </div>\n    </div>\n  );\n'use client';
import { useState } from 'react';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('7d');

  const stats = [
    { label: 'Total Reach', value: '—', change: null },
    { label: 'Engagement Rate', value: '—', change: null },
    { label: 'New Followers', value: '—', change: null },
    { label: 'Messages Sent', value: '—', change: null },
  ];

  const platformStats = [
    { name: 'LinkedIn', color: '#0077b5', icon: 'in', followers: '—', posts: '—', engagement: '—' },
    { name: 'Instagram', color: '#e1306c', icon: 'IG', followers: '—', posts: '—', engagement: '—' },
    { name: 'Facebook', color: '#1877f2', icon: 'fb', followers: '—', posts: '—', engagement: '—' },
    { name: 'Email', color: '#6c5ce7', icon: '✉', followers: '—', posts: '—', engagement: '—' },
  ];

  return (
    <div>      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Analytics</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Performance metrics across all platforms</p>
        </div>
        <div className="tab-bar">
          {[
            { key: '7d', label: '7 Days' },
            { key: '30d', label: '30 Days' },
            { key: '90d', label: '90 Days' },
          ].map(t => (
            <button key={t.key} className={`tab ${period === t.key ? 'active' : ''}`} onClick={() => setPeriod(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 12, color: s.change > 0 ? 'var(--green)' : 'var(--red)', marginTop: 4 }}>{s.change > 0 ? '+' : ''}{s.change}%</div>}
          </div>
        ))}
      </div>
      {/* Platform Breakdown */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Platform Breakdown</h2>
      <div style={{ marginBottom: 32 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Platform</th>
              <th>Followers</th>
              <th>Posts</th>
              <th>Engagement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {platformStats.map((p, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{p.icon}</div>
                    <span style={{ fontWeight: 600 }}>{p.name}</span>
                  </div>
                </td>
                <td>{p.followers}</td>
                <td>{p.posts}</td>
                <td>{p.engagement}</td>
                <td><span className="badge badge-orange">Connect API</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Chart Placeholder */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Growth Over Time</h2>
      <div className="card" style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Connect your platforms to see analytics</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>
          Once you connect your social accounts with API access, real-time analytics will appear here including follower growth, engagement rates, reach, and content performance.
        </div>
      </div>

      {/* Top Posts */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>Top Performing Content</h2>
      <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
        Your best-performing posts across platforms will show up here once connected.
      </div>
    </div>
  );
}
