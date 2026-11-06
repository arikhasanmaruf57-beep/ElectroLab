import React, { useState } from 'react';
import { Cpu, Power } from 'lucide-react';

interface Motor3PhSimulatorProps {
  onComplete: () => void;
}

export const Motor3PhSimulator: React.FC<Motor3PhSimulatorProps> = ({ onComplete }) => {
  const [mcbOn, setMcbOn] = useState<boolean>(true);
  const [contactorOn, setContactorOn] = useState<boolean>(false);
  const [torTripped, setTorTripped] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);

  const toggleContactor = () => {
    if (!mcbOn || torTripped) return;
    const nextState = !contactorOn;
    setContactorOn(nextState);
    if (nextState) {
      setCurrent(8.5);
      onComplete();
    } else {
      setCurrent(0);
    }
  };

  const tripTor = () => {
    const nextState = !torTripped;
    setTorTripped(nextState);
    if (nextState) {
      setContactorOn(false);
      setCurrent(0);
    }
  };

  const handleMcbToggle = () => {
    const nextState = !mcbOn;
    setMcbOn(nextState);
    if (!nextState) {
      setContactorOn(false);
      setCurrent(0);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-amber)] text-xs font-mono mb-1">
            <Cpu className="w-4 h-4" />
            <span>MODUL PRAKTIKUM 03</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Simulasi Motor Listrik 3 Fase</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Analisis sistem tenaga 3 fase (R, S, T), proteksi MCB, Kontaktor Magnetik, dan Thermal Overload Relay (TOR).
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[var(--bg-tertiary)] px-4 py-2 rounded-xl border border-[var(--border-secondary)] text-xs font-mono text-[var(--accent-electric)]">
          <span>Tegangan: 380V / 400V AC • 50 Hz</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Controls */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl space-y-6 animate-slide-in-left">
          <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-3">Panel Proteksi & Kontrol</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">1. MCB 3 Fase:</label>
              <button
                onClick={handleMcbToggle}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                  mcbOn ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}
              >
                <span>Main Circuit Breaker</span>
                <span>{mcbOn ? 'ON (Aktif)' : 'OFF (Trip/Putus)'}</span>
              </button>
            </div>

            <div>
              <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">2. Thermal Overload Relay (TOR):</label>
              <button
                onClick={tripTor}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                  torTripped ? 'bg-[var(--accent-rose-dim)] border-[var(--accent-rose)] text-[var(--accent-rose)]' : 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]'
                }`}
              >
                <span>Status TOR Overload</span>
                <span>{torTripped ? 'TRIPPED (Lebih Beban)' : 'NORMAL (Aman)'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[var(--border-primary)]">
              <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">3. Kontaktor Utama:</label>
              <button
                onClick={toggleContactor}
                disabled={!mcbOn || torTripped}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  !mcbOn || torTripped 
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-secondary)]' 
                    : contactorOn 
                      ? 'bg-[var(--accent-rose)] hover:bg-[var(--accent-rose)]/90 text-[var(--text-inverse)] shadow-[var(--accent-rose-dim)]' 
                      : 'bg-[var(--accent-amber)] hover:bg-[var(--accent-amber)]/90 text-[var(--text-inverse)] shadow-[var(--accent-amber-dim)]'
                }`}
              >
                <Power className="w-5 h-5" />
                <span>{contactorOn ? 'MATIKAN KONTAKTOR' : 'HIDUPKAN KONTAKTOR'}</span>
              </button>
            </div>

            <div className="bg-[var(--bg-tertiary)]/60 p-4 rounded-xl border border-[var(--border-secondary)] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Fasa R-S-T:</span>
                <span className={mcbOn ? 'text-[var(--accent-emerald)] font-bold' : 'text-[var(--accent-rose)]'}>{mcbOn ? '380V OK' : '0V Mati'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Arus Motor:</span>
                <span className={contactorOn ? 'text-[var(--accent-amber)] font-bold' : 'text-[var(--text-muted)]'}>{current > 0 ? `${current.toFixed(1)} A` : '0.0 A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Putaran Motor:</span>
                <span className={contactorOn ? 'text-[var(--accent-amber)] font-bold' : 'text-[var(--text-muted)]'}>
                  {contactorOn ? '1460 RPM (4-pole)' : '0 RPM'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Diagram Panel */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between animate-fade-in">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3 mb-4">
            <span className="text-xs text-[var(--text-muted)] font-mono">DIAGRAM RANGKAIAN DAYA 3 FASE</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
              torTripped ? 'bg-[var(--accent-rose-dim)] border-[var(--accent-rose)]/20 text-[var(--accent-rose)]' :
              contactorOn ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)]/20 text-[var(--accent-emerald)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
            }`}>
              {torTripped ? 'Overload Trip!' : contactorOn ? 'Motor Berjalan' : 'Standby'}
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-secondary)] flex items-center justify-center min-h-[350px] sm:min-h-[400px]">
            <svg viewBox="0 0 600 350" className="w-full h-auto max-h-[380px] sm:max-h-[450px]">
              {/* R S T Supply Lines */}
              <path d="M 50 60 L 550 60" stroke="#ef4444" strokeWidth="3" />
              <text x="30" y="64" fill="#ef4444" fontSize="12" fontWeight="bold">R</text>

              <path d="M 50 90 L 550 90" stroke="#eab308" strokeWidth="3" />
              <text x="30" y="94" fill="#eab308" fontSize="12" fontWeight="bold">S</text>

              <path d="M 50 120 L 550 120" stroke="#3b82f6" strokeWidth="3" />
              <text x="30" y="124" fill="#3b82f6" fontSize="12" fontWeight="bold">T</text>

              {/* MCB Box */}
              <rect x="120" y="40" width="60" height="100" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="150" y="95" fill="#ffffff" fontSize="10" textAnchor="middle">MCB 3F</text>
              <text x="150" y="125" fill={mcbOn ? '#10b981' : '#ef4444'} fontSize="9" textAnchor="middle">{mcbOn ? 'ON' : 'OFF'}</text>

              {/* Contactor Box */}
              <rect x="250" y="40" width="60" height="100" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="280" y="95" fill="#ffffff" fontSize="10" textAnchor="middle">KM1</text>
              <text x="280" y="125" fill={contactorOn ? '#10b981' : '#94a3b8'} fontSize="9" textAnchor="middle">{contactorOn ? 'AKTIF' : 'STANDBY'}</text>

              {/* TOR Box */}
              <rect x="370" y="40" width="60" height="100" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <text x="400" y="95" fill="#ffffff" fontSize="10" textAnchor="middle">TOR</text>
              <text x="400" y="125" fill={torTripped ? '#ef4444' : '#10b981'} fontSize="9" textAnchor="middle">{torTripped ? 'TRIP' : 'OK'}</text>

              {/* Motor 3 Phase Symbol */}
              <circle cx="500" cy="230" r="60" fill="#1e293b" stroke="#475569" strokeWidth="4" />
              <text x="500" y="225" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">M3~</text>
              <text x="500" y="245" fill={contactorOn ? '#10b981' : '#94a3b8'} fontSize="10" textAnchor="middle">
                {contactorOn ? '1460 RPM' : 'Mati'}
              </text>

              {/* Connections */}
              <path d="M 180 60 L 250 60" stroke={mcbOn ? '#ef4444' : '#64748b'} strokeWidth="3" />
              <path d="M 180 90 L 250 90" stroke={mcbOn ? '#eab308' : '#64748b'} strokeWidth="3" />
              <path d="M 180 120 L 250 120" stroke={mcbOn ? '#3b82f6' : '#64748b'} strokeWidth="3" />

              <path d="M 310 60 L 370 60" stroke={contactorOn ? '#ef4444' : '#64748b'} strokeWidth="3" />
              <path d="M 310 90 L 370 90" stroke={contactorOn ? '#eab308' : '#64748b'} strokeWidth="3" />
              <path d="M 310 120 L 370 120" stroke={contactorOn ? '#3b82f6' : '#64748b'} strokeWidth="3" />

              <path d="M 430 60 L 470 170" stroke={contactorOn ? '#ef4444' : '#64748b'} strokeWidth="3" />
              <path d="M 430 90 L 500 170" stroke={contactorOn ? '#eab308' : '#64748b'} strokeWidth="3" />
              <path d="M 430 120 L 530 170" stroke={contactorOn ? '#3b82f6' : '#64748b'} strokeWidth="3" />

              {/* Current flow animation when running */}
              {contactorOn && (
                <g>
                  <animateTransform 
                    attributeName="transform" 
                    type="translate" 
                    from="0" to="300" 
                    dur="1s" 
                    repeatCount="indefinite"
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span>Standar Industri Motor Induksi 3 Fase</span>
            <span className="text-[var(--accent-amber)]">Proteksi TOR & MCB</span>
          </div>
        </div>
      </div>
    </div>
  );
};