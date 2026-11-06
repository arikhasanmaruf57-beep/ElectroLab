import React, { useState } from 'react';
import { Zap, Power } from 'lucide-react';

interface Motor1PhSimulatorProps {
  onComplete: () => void;
}

export const Motor1PhSimulator: React.FC<Motor1PhSimulatorProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasCapacitor, setHasCapacitor] = useState<boolean>(true);
  const [direction, setDirection] = useState<'CW' | 'CCW'>('CW');

  const toggleRun = () => {
    if (!hasCapacitor) return;
    const nextState = !isRunning;
    setIsRunning(nextState);
    if (nextState) {
      onComplete();
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-amber)] text-xs font-mono mb-1">
            <Zap className="w-4 h-4" />
            <span>MODUL PRAKTIKUM 02</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Simulasi Motor Listrik 1 Fase</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Analisis motor induksi 1 fase dengan kapasitor start/run, pembalikan arah putaran, dan sakelar sentrifugal.
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[var(--bg-tertiary)] px-4 py-2 rounded-xl border border-[var(--border-secondary)] text-xs font-mono text-[var(--accent-electric)]">
          <span>Daya: 0.5 HP (373 Watt) • 220V AC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Controls */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl space-y-6 animate-slide-in-left">
          <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-3">Parameter Motor</h3>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">Kondisi Kapasitor:</label>
              <button
                onClick={() => setHasCapacitor(!hasCapacitor)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                  hasCapacitor ? 'bg-[var(--accent-amber-dim)] border-[var(--accent-amber)] text-[var(--accent-amber)]' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}
              >
                <span>Kapasitor (Run & Start)</span>
                <span>{hasCapacitor ? 'Terpasang' : 'Dilepas (Gagal Start)'}</span>
              </button>
            </div>

            <div>
              <label className="text-xs text-[var(--text-muted)] font-mono block mb-2">Arah Putaran:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDirection('CW')}
                  disabled={isRunning}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    direction === 'CW' ? 'bg-[var(--accent-electric-dim)] border-[var(--accent-electric)] text-[var(--accent-electric)]' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-electric)]/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Searah Jarum Jam (CW)
                </button>
                <button
                  onClick={() => setDirection('CCW')}
                  disabled={isRunning}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                    direction === 'CCW' ? 'bg-[var(--accent-electric-dim)] border-[var(--accent-electric)] text-[var(--accent-electric)]' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-electric)]/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Berlawanan (CCW)
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-primary)]">
              <button
                onClick={toggleRun}
                disabled={!hasCapacitor}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  !hasCapacitor
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed border border-[var(--border-secondary)]'
                    : isRunning 
                      ? 'bg-[var(--accent-rose)] hover:bg-[var(--accent-rose)]/90 text-[var(--text-inverse)] shadow-[var(--accent-rose-dim)]' 
                      : 'bg-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)]/90 text-[var(--text-inverse)] shadow-[var(--accent-emerald-dim)]'
                }`}
              >
                <Power className="w-5 h-5" />
                <span>{isRunning ? 'MATIKAN MOTOR (STOP)' : 'JALANKAN MOTOR (START)'}</span>
              </button>
            </div>

            <div className="bg-[var(--bg-tertiary)]/60 p-4 rounded-xl border border-[var(--border-secondary)] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Kecepatan Putar:</span>
                <span className={isRunning && hasCapacitor ? 'text-[var(--accent-emerald)] font-bold' : 'text-[var(--text-muted)]'}>
                  {isRunning && hasCapacitor ? '1450 RPM' : '0 RPM'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Arus Kerja (In):</span>
                <span className={isRunning ? 'text-[var(--accent-amber)] font-bold' : 'text-[var(--text-muted)]'}>
                  {isRunning ? (hasCapacitor ? '2.4 A' : '7.8 A (Stall!)') : '0.0 A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Arah Putaran:</span>
                <span className="text-[var(--accent-electric)] font-bold">{direction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Kapasitor:</span>
                <span className={hasCapacitor ? 'text-[var(--accent-emerald)] font-bold' : 'text-[var(--accent-rose)] font-bold'}>
                  {hasCapacitor ? '35 µF (OK)' : 'LEPAS'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SVG Animation Panel */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between animate-fade-in">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3 mb-4">
            <span className="text-xs text-[var(--text-muted)] font-mono">VISUALISASI MOTOR INDUKSI 1 FASE</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
              !hasCapacitor && isRunning ? 'bg-[var(--accent-rose-dim)] border-[var(--accent-rose)]/20 text-[var(--accent-rose)]' :
              isRunning ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)]/20 text-[var(--accent-emerald)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
            }`}>
              {!hasCapacitor && isRunning ? 'PERINGATAN: Tanpa Kapasitor, Motor Gagal Start!' : `Arah: ${direction} ${isRunning ? '• Berjalan' : '• Standby'}`}
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-secondary)] flex items-center justify-center min-h-[350px] sm:min-h-[400px]">
            <svg viewBox="0 0 600 350" className="w-full h-auto max-h-[380px] sm:max-h-[450px]">
              {/* Motor Stator Housing */}
              <circle cx="300" cy="175" r="90" fill="#1e293b" stroke="#475569" strokeWidth="6" />
              
              {/* Rotating Rotor */}
              <g transform="translate(300, 175)">
                <circle 
                  cx="0" 
                  cy="0" 
                  r="55" 
                  fill={isRunning && hasCapacitor ? '#0f172a' : '#1e293b'} 
                  stroke={isRunning && hasCapacitor ? '#f59e0b' : '#64748b'} 
                  strokeWidth="4" 
                  className={isRunning && hasCapacitor ? (direction === 'CW' ? 'animate-spin' : 'animate-spin-reverse') : ''}
                  style={{ transformOrigin: 'center' }}
                />
                {/* Rotor bars / aesthetic */}
                <line x1="-40" y1="0" x2="40" y2="0" stroke="#64748b" strokeWidth="3" />
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#64748b" strokeWidth="3" />
                <circle cx="0" cy="0" r="15" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
              </g>

              {/* Capacitor box representation */}
              <rect x="130" y="100" width="60" height="90" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <text x="160" y="135" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">CAP</text>
              <text x="160" y="155" fill={hasCapacitor ? '#10b981' : '#ef4444'} fontSize="9" textAnchor="middle">
                {hasCapacitor ? '35 µF' : 'LEPAS'}
              </text>

              {/* Connecting Wires */}
              <path d="M 100 140 L 130 140" stroke="#ef4444" strokeWidth="3" />
              <path d="M 190 140 L 300 85" stroke="#ef4444" strokeWidth="3" />

              {/* Direction indicator */}
              {isRunning && hasCapacitor && (
                <g transform="translate(300, 175)">
                  <text x="0" y="-80" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    {direction === 'CW' ? '⟳ CW' : '⟲ CCW'}
                  </text>
                </g>
              )}

              {/* Status Text inside SVG */}
              <text x="300" y="300" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="monospace">
                {isRunning ? (hasCapacitor ? 'Motor Berputar Normal (1450 RPM)' : 'Motor Berdengung & Panas (Gagal Start)') : 'Motor Berhenti (Standby)'}
              </text>
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span>Pelatihan Mesin Listrik AC 1 Fase</span>
            <span className="text-[var(--accent-amber)]">Praktikum Virtual</span>
          </div>
        </div>
      </div>
    </div>
  );
};