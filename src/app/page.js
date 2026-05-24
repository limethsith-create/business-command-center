'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [accounts, setAccounts] = useState({ email: [], linkedin: [], instagram: [], facebook: [] });
  const [scheduled, setScheduled] = useState([]);
  const [inboxCount, setInboxCount] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    setAccounts({
      email: stored.email || [],
      linkedin: stored.linkedin || [],
      instagram: stored.instagram || [],
      facebook: stored.facebook || [],
    });
    setScheduled(JSON.parse(localStorage.getItem('bcc_scheduled') || '[]'));
    setInboxCount(JSON.parse(localStorage.getItem('bcc_inbox') || '[]').length);
  }, []);

  const totalAccounts = Object.values(accounts).flat().length;
  const platforms = [
    { name: 'Email', count: accounts.email.length, color: '#6c5ce7', icon: '\u2709', path: '/email', status: accounts.email.length > 0 ? 'connected' : 'setup' },
    { name: 'LinkedIn', count: accounts.linkedin.length, color: '#0077b5', icon: 'in', path: '/linkedin', status: accounts.linkedin.length > 0 ? 'connected' : 'setup' },
    { name: 'Instagram', count: accounts.instagram.length, color: '#e1306c', icon: 'IG', path: '/instagram', status: accounts.instagram.length > 0 ? 'connected' : 'setup' },
    { name: 'Facebook', count: accounts.facebook.length, color: '#1877f2', icon: 'fb', path: '/facebook', status: accounts.facebook.length > 0 ? 'connected' : 'setup' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Command Center</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Control your entire business from one place</p>
      </div>

      {/* Stats Row */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Connected Platforms</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{platforms.filter(p => p.status === 'connected').length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>of 4 available</div>
        </div>
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total Accounts</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{totalAccounts}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>across all platforms</div>
        </div>
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Scheduled Posts</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{scheduled.length}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>upcoming</div>
        </div>
        <div className="stat-card">
          <div style={{ color: 'var(--text-secondary)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Inbox</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{inboxCount}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>messages</div>
        </div>
      </div>

      {/* Platform Cards */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Platforms</h2>
      <div className="grid-2" style={{ marginBottom: 32 }}>
        {platforms.map((p, i) => (
          <Link key={i} href={p.path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'white' }}>
                {p.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {p.count > 0 ? `${p.count} account${p.count > 1 ? 's' : ''} connected` : 'Not connected yet'}
                </div>
              </div>
              <span className={`badge ${p.status === 'connected' ? 'badge-green' : 'badge-orange'}`}>
                {p.status === 'connected' ? 'Active' : 'Setup'}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Actions</h2>
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <Link href="/scheduler" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>\ud83d\udcc5</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Schedule Post</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Create & schedule across platforms</div>
          </div>
        </Link>
        <Link href="/inbox" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>\ud83d\udcac</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Unified Inbox</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>DMs, comments & messages</div>
          </div>
        </Link>
        <Link href="/analytics" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: 32 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>\ud83d\udcca</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Analytics</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Performance across channels</div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Recent Activity</h2>
      <div className="card">
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
          Connect your platforms to start seeing activity here.
        </div>
      </div>
    </div>
  );
                      }
