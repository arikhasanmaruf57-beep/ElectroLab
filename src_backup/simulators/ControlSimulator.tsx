import React, { useState } from 'react';
import { Sliders, Play, Square, RefreshCw } from 'lucide-react';

interface ControlSimulatorProps {
  onComplete: () => void;
}

export const ControlSimulator: React.FC<ControlSimulatorProps> = ({ onComplete }) => {
  const [controlMode, setControlMode] = useState<'dol' | 'forwardReverse' | 'stardelta'>('dol');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [direction, setDirection] = useState<'forward' | 'reverse'>('forward');
  const [starDeltaStage, setStarDeltaStage] = useState<'stopped' | 'star' | 'delta'>('stopped');
  const [starTimer, setStarTimer] = useState<number>(0);

  const handleStart = (dir: 'forward' | 'reverse' = 'forward') => {
    if (controlMode === 'stardelta') {
      setStarDeltaStage('star');
      setStarTimer(5);
      const timer = setInterval(() => {
        setStarTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStarDeltaStage('delta');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setIsStarted(true);
      setDirection(dir);
      onComplete();
    }
  };

  const handleStop = () => {
    setIsStarted(false);
    setStarDeltaStage('stopped');
    setStarTimer(0);
  };

  const setMode = (mode: 'dol' | 'forwardReverse' | 'stardelta') => {
    setControlMode(mode);
    handleStop();
  };

  const getModeInfo = () => {
    switch (controlMode) {
      case 'dol':
        return { title: 'DOL Starter (Direct On Line)', desc: 'Memulai motor langsung dengan kontaktor tunggal. Cocok untuk motor kecil (< 5.5 kW).' };
      case 'forwardReverse':
        return { title: 'Forward-Reverse Starter', desc: 'Dua kontaktor dengan interlock mekanik & elektrik untuk membalik arah putaran motor.' };
      case 'stardelta':
        return { title: 'Star-Delta Starter', desc: 'Memulai motor pada koneksi Star (tegangan reduziert), lalu beralih ke Delta setelah motor mencapai kecepatan.' };
    }
  };

  const modeInfo = getModeInfo();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-amber)] text-xs font-mono mb-1">
            <Sliders className="w-4 h-4" />
            <span>MODUL PRAKTIKUM 04</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">Simulasi Kontrol Industri</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Simulasi rangkaian kendali motor industri: DOL Starter, Forward-Reverse, dan Star-Delta dengan interlock lengkap.
          </p>
        </div>
        <div className="flex bg-[var(--bg-tertiary)] p-1 rounded-xl border border-[var(--border-secondary)]">
          {(['dol', 'forwardReverse', 'stardelta'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                controlMode === mode ? 'bg-[var(--accent-electric)] text-[var(--text-inverse)] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              {mode === 'dol' && 'DOL Starter'}
              {mode === 'forwardReverse' && 'Forward-Reverse'}
              {mode === 'stardelta' && 'Star-Delta'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Pushbutton Panel */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl space-y-6 animate-slide-in-left">
          <h3 className="text-lg font-bold text-[var(--text-primary)] border-b border-[var(--border-primary)] pb-3">Panel Kontrol (Pushbutton)</h3>

          <div className="space-y-4">
            <div className="bg-[var(--bg-tertiary)] p-3 rounded-lg border border-[var(--border-secondary)]">
              <h4 className="text-xs font-mono text-[var(--accent-electric)] mb-2">{modeInfo.title}</h4>
              <p className="text-[var(--text-secondary)] text-xs leading-relaxed">{modeInfo.desc}</p>
            </div>

            {controlMode === 'forwardReverse' ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleStart('forward')}
                  disabled={isStarted}
                  className={`bg-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)]/90 text-[var(--text-inverse)] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Play className="w-4 h-4" />
                  <span>START FORWARD</span>
                </button>
                <button
                  onClick={() => handleStart('reverse')}
                  disabled={isStarted}
                  className={`bg-[var(--accent-electric)] hover:bg-[var(--accent-electric)]/90 text-[var(--text-inverse)] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>START REVERSE</span>
                </button>
              </div>
            ) : controlMode === 'stardelta' ? (
              <div className="space-y-3">
                <button
                  onClick={() => handleStart('forward')}
                  disabled={isStarted || starDeltaStage !== 'stopped'}
                  className={`w-full bg-[var(--accent-amber)] hover:bg-[var(--accent-amber)]/90 text-[var(--text-inverse)] font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Play className="w-5 h-5" />
                  <span>START (Star → Delta)</span>
                </button>
                {starDeltaStage === 'star' && (
                  <div className="bg-[var(--accent-electric-dim)] border border-[var(--accent-electric)]/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--accent-electric)]">Tahap: Star (Y)</span>
                      <span className="text-[var(--accent-amber)] font-bold animate-pulse">{starTimer}s → Delta</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full bg-[var(--accent-electric)] rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${(starTimer / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                {starDeltaStage === 'delta' && (
                  <div className="bg-[var(--accent-emerald-dim)] border border-[var(--accent-emerald)]/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--accent-emerald)]">Tahap: Delta (Δ)</span>
                      <span className="text-[var(--accent-emerald)] font-bold">Motor Berjalan Penuh</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleStart('forward')}
                disabled={isStarted}
                className={`w-full bg-[var(--accent-emerald)] hover:bg-[var(--accent-emerald)]/90 text-[var(--text-inverse)] font-bold py-4 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Play className="w-5 h-5" />
                <span>PUSH BUTTON START (NO)</span>
              </button>
            )}

            <button
              onClick={handleStop}
              disabled={!isStarted && starDeltaStage === 'stopped'}
              className={`w-full bg-[var(--accent-rose)] hover:bg-[var(--accent-rose)]/90 text-[var(--text-inverse)] font-bold py-4 px-4 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Square className="w-5 h-5" />
              <span>PUSH BUTTON STOP (NC)</span>
            </button>

            <div className="bg-[var(--bg-tertiary)]/60 p-4 rounded-xl border border-[var(--border-secondary)] space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Mode Sistem:</span>
                <span className="text-[var(--accent-electric)] uppercase font-bold">{controlMode === 'forwardReverse' ? 'FWD-REV' : controlMode === 'stardelta' ? 'Y-Δ' : 'DOL'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Status Motor:</span>
                <span className={(isStarted || starDeltaStage !== 'stopped') ? 'text-[var(--accent-emerald)] font-bold' : 'text-[var(--text-muted)]'}>
                  {(isStarted || starDeltaStage !== 'stopped') ? `MENYALA (${starDeltaStage === 'star' ? 'STAR' : starDeltaStage === 'delta' ? 'DELTA' : direction.toUpperCase()})` : 'BERHENTI'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Kontaktor:</span>
                <span className={(isStarted || starDeltaStage !== 'stopped') ? 'text-[var(--accent-amber)] font-bold' : 'text-[var(--text-muted)]'}>
                  {controlMode === 'forwardReverse' ? (direction === 'forward' ? 'KM1 AKTIF' : 'KM2 AKTIF') : (isStarted || starDeltaStage !== 'stopped') ? 'KM1 AKTIF' : 'SEMUA OFF'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col justify-between animate-fade-in">
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3 mb-4">
            <span className="text-xs text-[var(--text-muted)] font-mono">PANEL LAMPU INDIKATOR & KONTAKTOR</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
              (isStarted || starDeltaStage !== 'stopped') ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)]/20 text-[var(--accent-emerald)]' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
            }`}>
              {(isStarted || starDeltaStage !== 'stopped') ? 'Sistem Beroperasi' : 'Standby'}
            </span>
          </div>

          <div className="bg-[var(--bg-primary)] rounded-xl p-6 border border-[var(--border-secondary)] flex flex-col items-center justify-center min-h-[350px] sm:min-h-[400px] space-y-8">
            {/* Indicator Lights */}
            <div className="flex items-center space-x-8">
              {/* Red Light - Stop */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                  !(isStarted || starDeltaStage !== 'stopped') ? 'bg-[var(--accent-rose)] border-[var(--accent-rose)] shadow-lg shadow-[var(--accent-rose-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                }`}>
                  <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">STOP (H1)</span>
              </div>

              {/* Green Light - Run */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                  (isStarted || starDeltaStage !== 'stopped') ? 'bg-[var(--accent-emerald)] border-[var(--accent-emerald)] shadow-lg shadow-[var(--accent-emerald-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                }`}>
                  <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">RUN (H2)</span>
              </div>

              {controlMode === 'forwardReverse' && (
                <>
                  {/* Yellow Light - Forward */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                      isStarted && direction === 'forward' ? 'bg-[var(--accent-amber)] border-[var(--accent-amber)] shadow-lg shadow-[var(--accent-amber-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                    }`}>
                      <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">FWD (H3)</span>
                  </div>

                  {/* Blue Light - Reverse */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                      isStarted && direction === 'reverse' ? 'bg-[var(--accent-electric)] border-[var(--accent-electric)] shadow-lg shadow-[var(--accent-electric-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                    }`}>
                      <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">REV (H4)</span>
                  </div>
                </>
              )}

              {controlMode === 'stardelta' && (
                <>
                  {/* Yellow Light - Star */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                      starDeltaStage === 'star' ? 'bg-[var(--accent-electric)] border-[var(--accent-electric)] shadow-lg shadow-[var(--accent-electric-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                    }`}>
                      <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">STAR (Y)</span>
                  </div>

                  {/* Green Light - Delta */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all ${
                      starDeltaStage === 'delta' ? 'bg-[var(--accent-emerald)] border-[var(--accent-emerald)] shadow-lg shadow-[var(--accent-emerald-dim)] animate-pulse' : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] opacity-40'
                    }`}>
                      <div className="w-5 h-5 bg-white/40 rounded-full"></div>
                    </div>
                    <span className="text-xs font-mono text-[var(--text-muted)]">DELTA (Δ)</span>
                  </div>
                </>
              )}
            </div>

            {/* Motor status visual */}
            <div className="text-center space-y-3">
              <div className="w-28 h-28 mx-auto rounded-full bg-[var(--bg-tertiary)] border-4 border-[var(--border-secondary)] flex items-center justify-center">
                <div className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center ${
                  (isStarted || starDeltaStage !== 'stopped') ? 'border-[var(--accent-amber)] animate-spin text-[var(--accent-amber)]' : 'border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}>
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {(isStarted || starDeltaStage !== 'stopped') 
                  ? (controlMode === 'forwardReverse' 
                      ? `Motor Berputar (${direction === 'forward' ? 'Forward ➔' : 'Reverse ⇦'})`
                      : controlMode === 'stardelta'
                        ? `Motor Berputar (${starDeltaStage === 'star' ? 'Star (Y)' : 'Delta (Δ)'})`
                        : 'Motor Berputar (DOL)')
                  : 'Motor Standby'}
              </p>
            </div>

            {/* Contactor visualization */}
            <div className="w-full max-w-md">
              <h4 className="text-xs font-mono text-[var(--text-muted)] mb-3 text-center">Kontaktor Status</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-lg text-center text-xs font-mono border ${
                  (controlMode === 'dol' || controlMode === 'stardelta') && (isStarted || starDeltaStage !== 'stopped')
                    ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]'
                    : controlMode === 'forwardReverse' && isStarted && direction === 'forward'
                      ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]'
                      : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}>
                  <div className="font-bold">KM1</div>
                  <div>{controlMode === 'forwardReverse' ? 'FWD' : 'MAIN'}</div>
                </div>
                <div className={`p-3 rounded-lg text-center text-xs font-mono border ${
                  controlMode === 'forwardReverse' && isStarted && direction === 'reverse'
                    ? 'bg-[var(--accent-electric-dim)] border-[var(--accent-electric)] text-[var(--accent-electric)]'
                    : controlMode === 'stardelta' && starDeltaStage !== 'stopped'
                      ? 'bg-[var(--accent-amber-dim)] border-[var(--accent-amber)] text-[var(--accent-amber)]'
                      : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}>
                  <div className="font-bold">{controlMode === 'forwardReverse' ? 'KM2' : controlMode === 'stardelta' ? 'KM2' : 'KM2'}</div>
                  <div>{controlMode === 'forwardReverse' ? 'REV' : controlMode === 'stardelta' ? 'STAR' : 'AUX'}</div>
                </div>
                <div className={`p-3 rounded-lg text-center text-xs font-mono border ${
                  controlMode === 'stardelta' && starDeltaStage === 'delta'
                    ? 'bg-[var(--accent-emerald-dim)] border-[var(--accent-emerald)] text-[var(--accent-emerald)]'
                    : 'bg-[var(--bg-tertiary)] border-[var(--border-secondary)] text-[var(--text-muted)]'
                }`}>
                  <div className="font-bold">KM3</div>
                  <div>{controlMode === 'stardelta' ? 'DELTA' : 'TOR'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span>Rangkaian Kontrol Magnetik Industri</span>
            <span className="text-[var(--accent-amber)]">Interlock & Push Button</span>
          </div>
        </div>
      </div>
    </div>
  );
};