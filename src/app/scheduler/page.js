'use client';
import { useState, useEffect } from 'react';

export default function SchedulerPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ platform: 'linkedin', content: '', mediaUrl: '', scheduledDate: '', scheduledTime: '' });

  useEffect(() => {
    setPosts(JSON.parse(localStorage.getItem('bcc_scheduled') || '[]'));
  }, []);

  const savePosts = (p) => {
    localStorage.setItem('bcc_scheduled', JSON.stringify(p));
    setPosts(p);
  };

  const addPost = () => {
    if (!form.content || !form.scheduledDate || !form.scheduledTime) return;
    const newPost = {
      id: Date.now(),
      platform: form.platform,
      content: form.content,
      mediaUrl: form.mediaUrl,
      scheduledAt: `${form.scheduledDate}T${form.scheduledTime}`,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    savePosts([...posts, newPost]);
    setForm({ platform: 'linkedin', content: '', mediaUrl: '', scheduledDate: '', scheduledTime: '' });
    setShowForm(false);
  };

  const removePost = (id) => savePosts(posts.filter(p => p.id !== id));

  const platformColors = { linkedin: '#0077b5', instagram: '#e1306c', facebook: '#1877f2', email: '#6c5ce7' };
  const platformIcons = { linkedin: 'in', instagram: 'IG', facebook: 'fb', email: '\u2709' };

  const upcoming = posts.filter(p => p.status === 'scheduled').sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
  const past = posts.filter(p => p.status !== 'scheduled');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Scheduler</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Schedule and manage posts across all platforms</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Schedule Post</button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16, fontWeight: 600 }}>New Scheduled Post</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Platform</label>
              <select className="input" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
                <option value="linkedin">LinkedIn</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Content *</label>
              <textarea className="textarea" placeholder="Write your post content..." value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Media URL (optional)</label>
              <input className="input" placeholder="https://... image or video URL" value={form.mediaUrl} onChange={e => setForm({...form, mediaUrl: e.target.value})} />
            </div>
            <div className="grid-2">
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Date *</label>
                <input className="input" type="date" value={form.scheduledDate} onChange={e => setForm({...form, scheduledDate: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Time *</label>
                <input className="input" type="time" value={form.scheduledTime} onChange={e => setForm({...form, scheduledTime: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={addPost}>Schedule</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Upcoming ({upcoming.length})</h2>
      {upcoming.length > 0 ? (
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {upcoming.map(post => (
            <div key={post.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: platformColors[post.platform], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white', flexShrink: 0 }}>
                {platformIcons[post.platform]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, marginBottom: 4, textTransform: 'capitalize' }}>{post.platform}</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8, whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: 60 }}>{post.content}</div>
                <div style={{ fontSize: 12, color: 'var(--accent)' }}>
                  \ud83d\udcc5 {new Date(post.scheduledAt).toLocaleDateString()} at {new Date(post.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <button onClick={() => removePost(post.id)} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontSize: 16 }}>\ud83d\uddd1</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>\ud83d\udcc5</div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No posts scheduled yet</div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Schedule Your First Post</button>
        </div>
      )}

      {past.length > 0 && (
        <>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>History ({past.length})</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {past.map(post => (
              <div key={post.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: 0.7 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: platformColors[post.platform], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'white' }}>
                  {platformIcons[post.platform]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{post.platform}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{post.content.substring(0, 60)}...</div>
                </div>
                <span className="badge badge-green">{post.status}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
        }
