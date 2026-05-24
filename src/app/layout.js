'use client';
import './globals.css';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const nav = [
    { section: 'Overview' },
    { name: 'Dashboard', path: '/', icon: '⌘', color: '#6c5ce7' },
    { section: 'Channels' },
    { name: 'Email', path: '/email', icon: '✉', color: '#6c5ce7' },
    { name: 'LinkedIn', path: '/linkedin', icon: 'in', color: '#0077b5' },
    { name: 'Instagram', path: '/instagram', icon: 'IG', color: '#e1306c' },
    { name: 'Facebook', path: '/facebook', icon: 'fb', color: '#1877f2' },
    { section: 'Tools' },
    { name: 'Scheduler', path: '/scheduler', icon: '📅', color: '#00d48a' },
    { name: 'Inbox', path: '/inbox', icon: '💬', color: '#0984e3' },
    { name: 'Analytics', path: '/analytics', icon: '📊', color: '#ffa502' },
  ];

  return (
    <html lang="en">
      <head>
        <title>Command Center — Aviance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6c5ce7, #0984e3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700 }}>A</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Aviance</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Command Center</div>
              </div>
            </div>
            <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 16 }}>
              {collapsed ? '→' : '←'}
            </button>
          </div>

          <nav style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
            {nav.map((item, i) => {
              if (item.section) {
                return <div key={i} className="nav-section">{item.section}</div>;
              }
              const isActive = pathname === item.path;
              return (
                <Link key={i} href={item.path} className={`nav-item ${isActive ? 'active' : ''}`}>
                  <span className="platform-icon" style={{ background: isActive ? 'rgba(255,255,255,0.2)' : item.color }}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>L</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>limethsith</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Admin</div>
              </div>
            </div>
          </div>
        </div>

        <main className="main-content fade-in">
          {children}
        </main>
      </body>
    </html>
  );
                }
