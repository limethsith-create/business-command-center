'use client';
import { useState, useEffect } from 'react';

export default function FacebookPage() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', pageUrl: '', accessToken: '' });
  const [tab, setTab] = useState('accounts');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    setAccounts(stored.facebook || []);
  }, []);

  const saveAccounts = (accs) => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    stored.facebook = accs;
    localStorage.setItem('bcc_accounts', JSON.stringify(stored));
    setAccounts(accs);
  };

  const addAccount = () => {
    if (!form.name) return;
    const newAcc = { id: Date.now(), name: form.name, pageUrl: form.pageUrl, accessToken: form.accessToken, status: form.accessToken ? 'connected' : 'manual', addedAt: new Date().toISOString() };
    saveAccounts([...accounts, newAcc]);
    setForm({ name: '', pageUrl: '', accessToken: '' });
    setShowForm(false);
  };

  const removeAccount = (id) => saveAccounts(accounts.filter(a => a.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Facebook</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage pages, post content, and run campaigns</p>
        </div>
        <button className="btn btn-facebook" onClick={() => setShowForm(!showForm)}>+ Add Page</button>
      </div>

      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {['accounts', 'posts', 'ads', 'messages'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Add Facebook Page</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Page Name *</label>
              <input className="input" placeholder="Your Page Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Page URL</label>
              <input className="input" placeholder="https://facebook.com/yourpage" value={form.pageUrl} onChange={e => setForm({...form, pageUrl: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Page Access Token (optional)</label>
              <input className="input" type="password" placeholder="From Meta Developer Portal" value={form.accessToken} onChange={e => setForm({...form, accessToken: e.target.value})} />
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Required for API posting. Get from developers.facebook.com</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-facebook" onClick={addAccount}>Add Page</button>
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
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>fb</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{acc.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{acc.pageUrl || 'No URL set'}</div>
                </div>
                <span className={`badge ${acc.status === 'connected' ? 'badge-green' : 'badge-blue'}`}>{acc.status}</span>
                <button onClick={() => removeAccount(acc.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>\ud83d\uddd1</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16, background: '#1877f2', width: 64, height: 64, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>fb</div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No Facebook pages connected</div>
            <button className="btn btn-facebook" onClick={() => setShowForm(true)}>Add Facebook Page</button>
          </div>
        )
      )}

      {tab === 'posts' && (
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Create Facebook Post</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <textarea className="textarea" placeholder="What's on your mind?" />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline">\ud83d\udcf7 Photo</button>
              <button className="btn btn-outline">\ud83c\udfa5 Video</button>
              <button className="btn btn-outline">\ud83d\udd17 Link</button>
              <div style={{ flex: 1 }} />
              <button className="btn btn-outline">Schedule</button>
              <button className="btn btn-facebook">Post Now</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'ads' && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
          Ad campaign management coming soon. Connect your Facebook Business Manager to get started.
        </div>
      )}

      {tab === 'messages' && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
          Connect a Facebook Page with API access to manage Messenger conversations.
        </div>
      )}
    </div>
  );
          }
