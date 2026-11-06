import React, { useState } from 'react';
import { Lightbulb, Power } from 'lucide-react';

interface LightingSimulatorProps {
  onComplete: () => void;
}

export const LightingSimulator: React.FC<LightingSimulatorProps> = ({ onComplete }) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [circuitType, setCircuitType] = useState<'single' | 'series' | 'exchange'>('single');
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');

  const toggleSwitch = () => {
    const newState = !switchState;
    setSwitchState(newState);
    if (newState) {
      onComplete();
    }
  };

  const getCircuitInfo = () => {
    switch (circuitType) {
      case 'single':
        return { label: 'Sakelar Tunggal', desc: 'Satu sakelar mengontrol satu beban lampu' };
      case 'series':
        return { label: 'Sakelar Seri', desc: 'Dua sakelar harus keduanya ON untuk lampu menyala' };
      case 'exchange':
        return { label: 'Sakelar Tukar', desc: 'Dua sakelar mengontrol satu lampu dari dua tempat berbeda' };
      default:
        return { label: '', desc: '' };
    }
  };

  const circuitInfo = getCircuitInfo();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl animate-fade-in">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-amber)] text-xs font-mono mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>MODUL PRAKTIKUM 01</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Simulasi Instalasi Penerangan</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Uji interaktif pengawatan instalasi penerangan rumah / industri sederhana dengan sakelar dan sumber listrik AC.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[var(--bg-tertiary)] p-1 rounded-xl border border-[var(--border-secondary)]">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'simulation' ? 'bg-[var(--accent-electric)] text-[var(--text-inverse)] font-bold shadow-[0_0_10px_var(--accent-electric-dim)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            Simulator SVG
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'theory' ? 'bg-[var(--accent-electric)] text-[var(--text-inverse)] font-bold shadow-[0_0_10px_var(--accent-electric-dim)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            Teori & Panduan
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Controls Panel */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl space-y-6 animate-slide-in-left">
            <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-3">Kontrol Rangkaian</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">Pilih Jenis Rangkaian:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['single', 'series', 'exchange'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setCircuitType(type)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                        circuitType === type ? 'bg-[var(--accent-electric-dim)] border-[var(--accent-electric)] text-[var(--accent-electric)]' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-electric)]/50'
                      }`}
                    >
                      {type === 'single' && 'Sakelar Tunggal'}
                      {type === 'series' && 'Sakelar Seri'}
                      {type === 'exchange' && 'Sakelar Tukar'}
                    </button>
                  ))}
                </div>
                <p className="text-[var(--text-muted)] text-xs mt-2 font-mono">{circuitInfo.desc}</p>
              </div>

              <div className="pt-4 border-t border-[var(--border-primary)]">
                <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">Status Sakelar:</label>
                <button
                  onClick={toggleSwitch}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
                    switchState 
                      ? 'bg-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)]/90 text-[var(--text-inverse)] shadow-[var(--accent-emerald-dim)]' 
                      : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] border border-[var(--border-secondary)]'
                  }`}
                >
                  <Power className="w-5 h-5" />
                  <span>{switchState ? 'ON (Sakelar Ditekan)' : 'OFF (Sakelar Terbuka)'}</span>
                </button>
              </div>

              <div className="bg-[var(--bg-tertiary)]/60 p-4 rounded-xl border border-[var(--border-secondary)] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">Tegangan Sumber:</span>
                  <span className="text-[var(--text-primary)] font-bold">220 V AC</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">Arus Mengalir:</span>
                  <span className={switchState ? 'text-[var(--accent-emerald)] font-bold' : 'text-[var(--text-muted)]'}>
                    {switchState ? '0.27 A (60W)' : '0.00 A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--text-muted)]">Kondisi Lampu:</span>
                  <span className={switchState ? 'text-[var(--accent-amber)] font-bold animate-pulse' : 'text-[var(--text-muted)]'}>
                    {switchState ? 'MENYALA' : 'MATI'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[var(--border-secondary)]">
                  <span className="text-[var(--text-muted)]">Jenis Rangkaian:</span>
                  <span className="text-[var(--accent-electric)] font-bold">{circuitInfo.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Diagram Panel */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between animate-fade-in">
            <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3 mb-4">
              <span className="text-xs text-[var(--text-muted)] font-mono">DIAGRAM PENGAWATAN & SIMULASI SVG</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--accent-electric)] font-mono border border-[var(--accent-electric)]/20">
                {switchState ? 'Sirkuit Tertutup (Live)' : 'Sirkuit Terbuka'}
              </span>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-secondary)] flex items-center justify-center min-h-[350px] sm:min-h-[400px]">
              <svg viewBox="0 0 600 350" className="w-full h-auto max-h-[380px] sm:max-h-[450px]">
                {/* Background grid pattern */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#1e293b" />
                  </pattern>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="12" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <rect width="600" height="350" fill="url(#grid)" rx="12" />

                {/* Main Power Lines */}
                {/* Phase Wire (L) - Red/Brown */}
                <path
                  d="M 50 80 L 180 80 L 180 160"
                  fill="none"
                  stroke={switchState ? '#ef4444' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Switch to Lamp Wire */}
                <path
                  d={`M 220 180 L 380 180 L 380 120`}
                  fill="none"
                  stroke={switchState ? '#ef4444' : '#64748b'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Neutral Wire (N) - Blue */}
                <path
                  d="M 420 120 L 520 120 L 520 80 L 80 80"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Ground Wire (PE) - Yellow/Green */}
                <path
                  d="M 400 120 L 400 280 L 550 280"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="6,4"
                />

                {/* Power Source Box */}
                <rect x="30" y="50" width="60" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                <text x="60" y="75" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">220V</text>
                <text x="60" y="93" fill="#94a3b8" fontSize="10" textAnchor="middle">AC 50Hz</text>

                {/* Switch Symbol */}
                <g transform="translate(180, 160)">
                  <rect x="-25" y="-20" width="50" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="0" y="32" fill="#94a3b8" fontSize="10" textAnchor="middle">{circuitType === 'single' ? 'Sakelar Tunggal' : circuitType === 'series' ? 'Sakelar Seri' : 'Sakelar Tukar'}</text>
                  {/* Switch Lever */}
                  {switchState ? (
                    <line x1="-10" y1="0" x2="10" y2="-12" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                  ) : (
                    <line x1="-10" y1="0" x2="10" y2="10" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  )}
                  <circle cx="-10" cy="0" r="3" fill="#ffffff" />
                  <circle cx="10" cy={switchState ? -12 : 10} r="3" fill="#ffffff" />
                </g>

                {/* Lamp Symbol */}
                <g transform="translate(400, 100)">
                  {switchState && (
                    <circle cx="0" cy="0" r="35" fill="#f59e0b" opacity="0.25" filter="url(#glow)" />
                  )}
                  <circle cx="0" cy="0" r="22" fill={switchState ? '#f59e0b' : '#1e293b'} stroke={switchState ? '#fbbf24' : '#475569'} strokeWidth="3" />
                  <path d="M -10 -10 L 10 10 M -10 10 L 10 -10" stroke={switchState ? '#1e293b' : '#64748b'} strokeWidth="2" />
                  <text x="0" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Lampu Penerangan (60W)</text>
                </g>

                {/* Annotations / Labels */}
                <text x="120" y="70" fill="#ef4444" fontSize="10" fontFamily="monospace">Fasa (L)</text>
                <text x="280" y="170" fill="#ef4444" fontSize="10" fontFamily="monospace">Kabel Penghubung</text>
                <text x="470" y="110" fill="#3b82f6" fontSize="10" fontFamily="monospace">Netral (N)</text>
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
              <span>Tip: Klik tombol ON/OFF di panel kiri untuk menguji aliran arus listrik.</span>
              <span className="text-[var(--accent-amber)]">Standar PUIL 2020</span>
            </div>
          </div>
        </div>
      ) : (
        /* Theory Tab */
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-6 sm:p-8 rounded-2xl shadow-xl space-y-6 animate-fade-in">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Teori Dasar Instalasi Penerangan</h3>
          <div className="prose prose-invert max-w-none text-[var(--text-secondary)] space-y-4 text-sm">
            <p>
              Instalasi penerangan adalah sistem kelistrikan yang menyuplai energi listrik ke titik-titik lampu dan kotak kontak demi keperluan pencahayaan ruangan. Berdasarkan standar PUIL (Persyaratan Umum Instalasi Listrik), perancangan harus memperhatikan faktor keamanan, keandalan, dan kemudahan pemeliharaan.
            </p>
            <h4 className="text-[var(--text-primary)] font-bold text-base pt-2">Komponen Utama:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sumber Tegangan AC:</strong> Menyuplai tegangan 220 Volt dengan frekuensi 50 Hz.</li>
              <li><strong>Sakelar:</strong> Alat pemutus dan penghubung arus listrik menuju beban (lampu). Sakelar dipasang selalu pada kabel fasa (L), bukan pada kabel netral demi keselamatan.</li>
              <li><strong>Beban (Lampu):</strong> Mengubah energi listrik menjadi energi cahaya dan panas.</li>
              <li><strong>Kabel Penghantar:</strong> Menghantarkan arus listrik dari sumber ke beban dengan ukuran penampang yang disesuaikan kuat hantar arus (KHA).</li>
            </ul>
            <h4 className="text-[var(--text-primary)] font-bold text-base pt-2">Jenis Pengawatan:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Sakelar Tunggal:</strong> Mengontrol satu lampu dari satu titik.</li>
              <li><strong>Sakelar Seri:</strong> Dua sakelar dipasang seri; lampu menyala hanya jika keduanya ON.</li>
              <li><strong>Sakelar Tukar (3-way):</strong> Mengontrol satu lampu dari dua tempat berbeda (mis. tangga).</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};