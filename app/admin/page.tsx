'use client';
import { useState, useEffect } from 'react';
import { Users, Heart, CheckCircle, XCircle, LogOut } from 'lucide-react';
import QRCode from 'react-qr-code';

interface RSVP { id: string; name: string; phone: string; attendance: string; guests: number; message: string; createdAt: string; }

export default function AdminPage() {
  const [authed,   setAuthed]   = useState(false);
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [rsvps,    setRsvps]    = useState<RSVP[]>([]);
  const [tab,      setTab]      = useState<'rsvp'|'qr'>('rsvp');
  const [qrToken,  setQrToken]  = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('wc_admin_auth');
    if (saved === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch('/api/rsvp').then((r) => r.json()).then((d) => setRsvps(d.rsvps || []));
  }, [authed]);

  const login = async () => {
    const res = await fetch('/api/admin-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) { setAuthed(true); sessionStorage.setItem('wc_admin_auth', 'true'); setError(''); }
    else { setError('Password salah. Coba lagi.'); setPassword(''); }
  };

  const logout = () => { setAuthed(false); sessionStorage.removeItem('wc_admin_auth'); };

  const attending    = rsvps.filter((r) => r.attendance === 'attend');
  const notAttending = rsvps.filter((r) => r.attendance === 'notAttend');
  const totalGuests  = attending.reduce((s, r) => s + r.guests, 0);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--bg)' }}>
        <div className="wc-card p-10 w-full max-w-sm text-center">
          <h1 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-script)', color: 'var(--moss-dark)' }}>Admin</h1>
          <input type="password" placeholder="Password admin" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()} autoFocus
            className="w-full bg-transparent border-b pb-2 outline-none text-sm mb-2"
            style={{ borderColor: error ? '#c0392b' : 'var(--border)', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}/>
          {error && <p className="text-xs mb-3 text-left" style={{ color: '#c0392b', fontFamily: 'var(--font-sans)' }}>{error}</p>}
          <button onClick={login}
            className="w-full py-3 mt-4 text-xs tracking-[0.2em] uppercase rounded-full hover:opacity-85 transition-opacity"
            style={{ background: 'var(--moss)', color: 'white', fontFamily: 'var(--font-sans)' }}>
            Masuk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-script)', color: 'var(--moss-dark)' }}>Admin Dashboard</h1>
          <button onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase border hover:opacity-70"
            style={{ border: '1px solid var(--border)', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            <LogOut className="w-3 h-3" /> Keluar
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Users className="w-5 h-5" />,       label: 'Total RSVP',  value: rsvps.length },
            { icon: <CheckCircle className="w-5 h-5" />, label: 'Hadir',       value: attending.length },
            { icon: <XCircle className="w-5 h-5" />,     label: 'Tidak Hadir', value: notAttending.length },
            { icon: <Heart className="w-5 h-5" />,       label: 'Total Tamu',  value: totalGuests },
          ].map((stat, i) => (
            <div key={i} className="wc-card p-5 text-center">
              <div className="flex justify-center mb-2" style={{ color: 'var(--sage)' }}>{stat.icon}</div>
              <p className="text-3xl font-light mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>{stat.value}</p>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-6">
          {(['rsvp','qr'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-6 py-2 rounded-full text-xs tracking-widest uppercase border transition-all"
              style={{ fontFamily: 'var(--font-sans)', background: tab === t ? 'var(--moss)' : 'transparent', borderColor: 'var(--border)', color: tab === t ? 'white' : 'var(--text-muted)' }}>
              {t === 'rsvp' ? 'Daftar RSVP' : 'QR Generator'}
            </button>
          ))}
        </div>

        {tab === 'rsvp' && (
          <div className="wc-card overflow-hidden">
            {rsvps.length === 0
              ? <p className="text-center py-12 text-sm italic" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}>Belum ada RSVP masuk.</p>
              : <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-2)' }}>
                        {['Nama','WhatsApp','Status','Tamu','Tanggal'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-xs tracking-wider uppercase"
                            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((r) => (
                        <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td className="px-4 py-3" style={{ color: 'var(--text)', fontFamily: 'var(--font-sans)' }}>{r.name}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{r.phone}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs px-3 py-1 rounded-full"
                              style={{ background: r.attendance === 'attend' ? 'var(--sage-mist)' : 'rgba(192,57,43,0.08)', color: r.attendance === 'attend' ? 'var(--moss)' : '#c0392b', fontFamily: 'var(--font-sans)' }}>
                              {r.attendance === 'attend' ? '✓ Hadir' : '✗ Tidak'}
                            </span>
                          </td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>{r.guests}</td>
                          <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                            {new Date(r.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            }
          </div>
        )}

        {tab === 'qr' && (
          <div className="wc-card p-8 max-w-md">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text)' }}>Generate QR Code Tamu</h3>
            <input placeholder="Nama / ID tamu" value={qrToken} onChange={(e) => setQrToken(e.target.value)}
              className="w-full bg-transparent border-b pb-2 outline-none text-sm mb-6"
              style={{ borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'var(--font-sans)' }}/>
            {qrToken && (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-white rounded-xl">
                  <QRCode value={`${typeof window !== 'undefined' ? window.location.origin : ''}/checkin?token=${encodeURIComponent(qrToken)}`} size={180}/>
                </div>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
                  Scan QR ini untuk check-in tamu
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
