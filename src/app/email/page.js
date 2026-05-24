'use client';
import { useState, useEffect } from 'react';

export default function EmailPage() {
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', appPassword: '' });
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    setAccounts(stored.email || []);
  }, []);

  const saveAccounts = (accs) => {
    const stored = JSON.parse(localStorage.getItem('bcc_accounts') || '{}');
    stored.email = accs;
    localStorage.setItem('bcc_accounts', JSON.stringify(stored));
    setAccounts(accs);
  };

  const addAccount = () => {
    if (!form.email || !form.appPassword) return;
    const newAcc = { id: Date.now(), displayName: form.name || form.email, email: form.email, appPassword: form.appPassword, status: 'active', addedAt: new Date().toISOString() };
    saveAccounts([...accounts, newAcc]);
    setForm({ name: '', email: '', appPassword: '' });
    setShowForm(false);
    setTestResult(null);
  };

  const removeAccount = (id) => {
    saveAccounts(accounts.filter(a => a.id !== id));
  };

  const mailDistroUrl = 'https://email-distributor-d6wcvn2u3-aviance.vercel.app';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Email</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage Gmail accounts & email campaigns</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href={mailDistroUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Open MailDistro \u2197</a>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Account</button>
        </div>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Connect Gmail Account</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Display Name (optional)</label>
              <input className="input" placeholder="e.g. Marketing Team" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Gmail Address *</label>
              <input className="input" placeholder="youremail@gmail.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>App Password *</label>
              <input className="input" type="password" placeholder="xxxx xxxx xxxx xxxx" value={form.appPassword} onChange={e => setForm({...form, appPassword: e.target.value})} />
            </div>
            {testResult && (
              <div style={{ padding: 12, borderRadius: 8, background: testResult.success ? 'rgba(0,212,138,0.1)' : 'rgba(255,71,87,0.1)', color: testResult.success ? 'var(--green)' : 'var(--red)' }}>
                {testResult.success ? 'Connection verified!' : `Error: ${testResult.error}`}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-outline" onClick={addAccount}>Add Account</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Connected Accounts */}
      {accounts.length > 0 ? (
        <div style={{ display: 'grid', gap: 12 }}>
          {accounts.map(acc => (
            <div key={acc.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>
                {acc.displayName?.charAt(0)?.toUpperCase() || 'E'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{acc.displayName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{acc.email}</div>
              </div>
              <span className="badge badge-green">active</span>
              <button onClick={() => removeAccount(acc.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>\ud83d\uddd1</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>\u2709</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No email accounts connected yet</div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Connect Gmail Account</button>
        </div>
      )}

      {/* Link to MailDistro */}
      <div className="card" style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #6c5ce7, #0984e3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>\ud83d\udce8</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600 }}>MailDistro \u2014 Bulk Email Campaigns</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Send mass emails with round-robin distribution across your Gmail accounts</div>
        </div>
        <a href={mailDistroUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Launch MailDistro \u2197</a>
      </div>
    </div>
  );
        }
