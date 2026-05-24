'use client';
import { useState, useEffect } from 'react';

export default function LinkedInPage() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', profileUrl: '', accessToken: '' });
  const [tab, setTab] = useState('accounts');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    setAccounts(stored.linkedin || []);
  }, []);

  const saveAccounts = (accs) => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    stored.linkedin = accs;
    localStorage.setItem('bcc_accounts', JSON.stringify(stored));
    setAccounts(accs);
  };

  const addAccount = () => {
    if (!form.name) return;
    const newAcc = { id: Date.now(), name: form.name, profileUrl: form.profileUrl, accessToken: form.accessToken, status: form.accessToken ? 'connected' : 'manual', addedAt: new Date().toISOString() };
    saveAccounts([...accounts, newAcc]);
    setForm({ name: '', profileUrl: '', accessToken: '' });
    setShowForm(false);
  };

  const removeAccount = (id) => saveAccounts(accounts.filter(a => a.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>LinkedIn</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage profiles, post content, and automate outreach</p>
        </div>
        <button className="btn btn-linkedin" onClick={() => setShowForm(!showForm)}>+ Add Profile</button>
      </div>

      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {['accounts', 'posts', 'outreach', 'connections'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Add LinkedIn Profile</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Profile Name *</label>
              <input className="input" placeholder="Your Name or Company" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Profile URL</label>
              <input className="input" placeholder="https://linkedin.com/in/yourprofile" value={form.profileUrl} onChange={e => setForm({...form, profileUrl: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>API Access Token (optional)</label>
              <input className="input" type="password" placeholder="LinkedIn API token for automation" value={form.accessToken} onChange={e => setForm({...form, accessToken: e.target.value})} />
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Get from LinkedIn Developer Portal \u2192 My Apps</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-linkedin" onClick={addAccount}>Add Profile</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'accounts' && (
        accounts.length > 0 ? (
          <div style={{ display: 'grid', gap: 12 }}>
            {accounts.map(acc => (
              <div key={acc.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>in</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{acc.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{acc.profileUrl || 'No URL set'}</div>
                </div>
                <span className={`badge ${acc.status === 'connected' ? 'badge-green' : 'badge-blue'}`}>{acc.status}</span>
                <button onClick={() => removeAccount(acc.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>\ud83d\uddd1</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16, background: '#0077b5', width: 64, height: 64, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>in</div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No LinkedIn profiles connected</div>
            <button className="btn btn-linkedin" onClick={() => setShowForm(true)}>Add LinkedIn Profile</button>
          </div>
        )
      )}

      {tab === 'posts' && (
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Create LinkedIn Post</h3>
          <textarea className="textarea" placeholder="Write your post content..." style={{ marginBottom: 12 }} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btn-outline">\ud83d\udcf7 Image</button>
            <button className="btn btn-outline">\ud83c\udfa5 Video</button>
            <button className="btn btn-outline">\ud83d\udcc4 Document</button>
            <div style={{ flex: 1 }} />
            <button className="btn btn-outline">Schedule</button>
            <button className="btn btn-linkedin">Post Now</button>
          </div>
        </div>
      )}

      {tab === 'outreach' && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Connection Request Campaign</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <input className="input" placeholder="Campaign name..." />
              <textarea className="textarea" placeholder={"Connection message template...\n\nHi {{name}}, I noticed your work at {{company}}..."} style={{ minHeight: 80 }} />
              <div className="grid-2">
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Daily limit</label>
                  <input className="input" type="number" defaultValue={25} />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Delay between (seconds)</label>
                  <input className="input" type="number" defaultValue={60} />
                </div>
              </div>
              <button className="btn btn-linkedin">Start Campaign</button>
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Follow-up Messages</h3>
            <textarea className="textarea" placeholder={"Follow-up template for accepted connections...\n\nThanks for connecting, {{name}}! I'd love to..."} style={{ minHeight: 80, marginBottom: 12 }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Send after (days)</label>
                <input className="input" type="number" defaultValue={3} style={{ width: 80, marginLeft: 8 }} />
              </div>
              <div style={{ flex: 1 }} />
              <button className="btn btn-outline">Save Template</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'connections' && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
          Connect a LinkedIn profile with API access to view your connections.
        </div>
      )}
    </div>
  );
}
