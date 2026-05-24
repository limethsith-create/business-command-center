'use client';
import { useState, useEffect } from 'react';

export default function InboxPage() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setMessages(JSON.parse(localStorage.getItem('bcc_inbox') || '[]'));
  }, []);

  const saveMessages = (msgs) => {
    localStorage.setItem('bcc_inbox', JSON.stringify(msgs));
    setMessages(msgs);
  };

  const markRead = (id) => {
    saveMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const archiveMsg = (id) => {
    saveMessages(messages.map(m => m.id === id ? { ...m, archived: true } : m));
    if (selectedMsg?.id === id) setSelectedMsg(null);
  };

  const sendReply = () => {
    if (!replyText || !selectedMsg) return;
    const updated = messages.map(m => m.id === selectedMsg.id ? { ...m, replies: [...(m.replies || []), { text: replyText, sentAt: new Date().toISOString(), from: 'you' }] } : m);
    saveMessages(updated);
    setSelectedMsg(updated.find(m => m.id === selectedMsg.id));
    setReplyText('');
  };

  const platformColors = { linkedin: '#0077b5', instagram: '#e1306c', facebook: '#1877f2', email: '#6c5ce7' };
  const platformIcons = { linkedin: 'in', instagram: 'IG', facebook: 'fb', email: '✉' };

  const filtered = messages.filter(m => {
    if (m.archived) return false;
    if (filter === 'all') return true;
    if (filter === 'unread') return !m.read;
    return m.platform === filter;
  });

  const unreadCount = messages.filter(m => !m.read && !m.archived).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Unified Inbox</h1>
          <p style={{ color: 'var(--text-secondary)' }}>All messages, DMs, and comments in one place</p>
        </div>
        {unreadCount > 0 && <span className="badge badge-orange">{unreadCount} unread</span>}
      </div>

      <div className="tab-bar" style={{ marginBottom: 24 }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: 'Unread' },
          { key: 'email', label: 'Email' },
          { key: 'linkedin', label: 'LinkedIn' },
          { key: 'instagram', label: 'Instagram' },
          { key: 'facebook', label: 'Facebook' },
        ].map(t => (
          <button key={t.key} className={`tab ${filter === t.key ? 'active' : ''}`} onClick={() => setFilter(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedMsg ? '1fr 1fr' : '1fr', gap: 16 }}>
        <div>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {filtered.map(msg => (
                <div key={msg.id} className="card" onClick={() => { setSelectedMsg(msg); markRead(msg.id); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, borderLeft: !msg.read ? '3px solid var(--accent)' : '3px solid transparent' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: platformColors[msg.platform] || '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>{platformIcons[msg.platform] || '?'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: msg.read ? 400 : 600, fontSize: 14 }}>{msg.from}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{new Date(msg.receivedAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg.subject || msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>No messages yet</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Messages from connected platforms will appear here</div>
            </div>
          )}
        </div>

        {selectedMsg && (
          <div className="card" style={{ position: 'sticky', top: 24, maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{selectedMsg.from}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{selectedMsg.platform} • {new Date(selectedMsg.receivedAt).toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-outline" style={{ fontSize: 12, padding: '4px 10px' }} onClick={() => archiveMsg(selectedMsg.id)}>Archive</button>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setSelectedMsg(null)}>✕</button>
              </div>
            </div>
            {selectedMsg.subject && <div style={{ fontWeight: 600, marginBottom: 8 }}>{selectedMsg.subject}</div>}
            <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 16, whiteSpace: 'pre-wrap' }}>{selectedMsg.text}</div>
            {selectedMsg.replies?.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginBottom: 12 }}>
                {selectedMsg.replies.map((r, i) => (
                  <div key={i} style={{ marginBottom: 8, padding: 10, borderRadius: 8, background: r.from === 'you' ? 'rgba(108,92,231,0.1)' : 'var(--bg-tertiary)' }}>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{r.from === 'you' ? 'You' : selectedMsg.from} • {new Date(r.sentAt).toLocaleTimeString()}</div>
                    <div style={{ fontSize: 14 }}>{r.text}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" style={{ flex: 1 }} placeholder="Type a reply..." value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendReply()} />
              <button className="btn btn-primary" onClick={sendReply}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
          }
