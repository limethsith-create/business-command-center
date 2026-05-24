'use client';
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
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
      <div className="grid-4" style={{ marginBottom: 32 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>{s.value}</div>
            {s.change && <div style={{ fontSize: 12, color: s.change > 0 ? 'var(--green)' : 'var(--red)', marginTop: 4 }}>{s.change > 0 ? '+' : ''}{s.change}%</div>}
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Platform Breakdown</h2>
      <div style={{ marginBottom: 32 }}>
        <table className="table">
          <thead><tr><th>Platform</th><th>Followers</th><th>Posts</th><th>Engagement</th><th>Status</th></tr></thead>
          <tbody>
            {platformStats.map((p, i) => (
              <tr key={i}>
                <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white' }}>{p.icon}</div><span style={{ fontWeight: 600 }}>{p.name}</span></div></td>
                <td>{p.followers}</td><td>{p.posts}</td><td>{p.engagement}</td>
                <td><span className="badge badge-orange">Connect API</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Growth Over Time</h2>
      <div className="card" style={{ padding: 48, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Connect your platforms to see analytics</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto' }}>
          Once you connect your social accounts with API access, real-time analytics will appear here.
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, marginTop: 32 }}>Top Performing Content</h2>
      <div className="card" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
        Your best-performing posts across platforms will show up here once connected.
      </div>
    </div>
  );
}
