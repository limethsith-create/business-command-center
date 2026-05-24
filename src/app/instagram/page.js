'use client';
import { useState, useEffect } from 'react';

export default function InstagramPage() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ username: '', accessToken: '' });
  const [tab, setTab] = useState('accounts');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    setAccounts(stored.instagram || []);
  }, []);

  const saveAccounts = (accs) => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    stored.instagram = accs;
    localStorage.setItem('bcc_accounts', JSON.stringify(stored));
    setAccounts(accs);
  };

  const addAccount = () => {
    if (!form.username) return;
    const newAcc = { id: Date.now(), username: form.username, accessToken: form.accessToken, status: form.accessToken ? 'connected' : 'manual', addedAt: new Date().toISOString() };
    saveAccounts([...accounts, newAcc]);
    setForm({ username: '', accessToken: '' });
    setShowForm(false);
  };

  const removeAccount = (id) => saveAccounts(accounts.filter(a => a.id !== id));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Instagram</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Post reels, stories, manage DMs and engagement</p>
        </div>
        <button className="btn btn-instagram" onClick={() => setShowForm(!showForm)}>+ Add Account</button>
      </div>

      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {['accounts', 'create', 'reels', 'dms'].map(t => (
          <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'dms' ? 'DMs' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Add Instagram Account</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Username *</label>
              <input className="input" placeholder="@yourusername" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Meta API Access Token (optional)</label>
              <input className="input" type="password" placeholder="From Meta Developer Portal" value={form.accessToken} onChange={e => setForm({...form, accessToken: e.target.value})} />
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Required for posting via API. Get from developers.facebook.com</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-instagram" onClick={addAccount}>Add Account</button>
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
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>IG</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>@{acc.username}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Added {new Date(acc.addedAt).toLocaleDateString()}</div>
                </div>
                <span className={`badge ${acc.status === 'connected' ? 'badge-green' : 'badge-blue'}`}>{acc.status}</span>
                <button onClick={() => removeAccount(acc.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>\ud83d\uddd1</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16, background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)', width: 64, height: 64, borderRadius: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>IG</div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No Instagram accounts connected</div>
            <button className="btn btn-instagram" onClick={() => setShowForm(true)}>Add Instagram Account</button>
          </div>
        )
      )}

      {tab === 'create' && (
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Create Post</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>\ud83d\udcf7</div>
              <div style={{ color: 'var(--text-secondary)' }}>Drop image/video here or click to upload</div>
            </div>
            <textarea className="textarea" placeholder={"Write your caption...\n\n#hashtags #here"} />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline">\ud83d\udccd Location</button>
              <button className="btn btn-outline"># Hashtags</button>
              <button className="btn btn-outline">\ud83d\udc64 Tag People</button>
              <div style={{ flex: 1 }} />
              <button className="btn btn-outline">Schedule</button>
              <button className="btn btn-instagram">Post Now</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'reels' && (
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Create Reel</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ border: '2px dashed var(--border)', borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>\ud83c\udfac</div>
              <div style={{ color: 'var(--text-secondary)' }}>Drop video file here (MP4, MOV)</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Max 90 seconds, 9:16 ratio recommended</div>
            </div>
            <textarea className="textarea" placeholder="Reel caption..." style={{ minHeight: 80 }} />
            <input className="input" placeholder="Cover thumbnail URL (optional)" />
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline">\ud83c\udfb5 Audio</button>
              <div style={{ flex: 1 }} />
              <button className="btn btn-outline">Schedule</button>
              <button className="btn btn-instagram">Post Reel</button>
            </div>
          </div>
        </div>
      )}

      {tab === 'dms' && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-secondary)' }}>
          Connect an Instagram account with Meta API access to manage DMs.
        </div>
      )}
    </div>
  );
}
