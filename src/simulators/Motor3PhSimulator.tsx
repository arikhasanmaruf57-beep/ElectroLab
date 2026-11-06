import React, { useState, useEffect } from 'react';
import { 
  Power, 
  RotateCw, 
  Activity, 
  Settings2, 
  CircuitBoard,
  Gauge,
  ArrowRightLeft,
  ShieldAlert
} from 'lucide-react';

interface Motor3PhSimulatorProps {
  onComplete: () => void;
}

export const Motor3PhSimulator: React.FC<Motor3PhSimulatorProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [direction, setDirection] = useState<'CW' | 'CCW'>('CW');
  const [connection, setConnection] = useState<'STAR' | 'DELTA'>('STAR');
  const [speed, setSpeed] = useState(0);
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSpeed(prev => {
          const targetSpeed = connection === 'STAR' ? 1400 : 1480;
          if (prev < targetSpeed) return Math.min(prev + 100, targetSpeed);
          return targetSpeed;
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setSpeed(prev => Math.max(0, prev - 50));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, connection]);

  const toggleMotor = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    if (newState) onComplete();
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-electric)] mb-1">
            <CircuitBoard className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Module EL-03</span>
          </div>
          <h1 className="heading-2">Motor Listrik 3 Fase</h1>
        </div>

        <div className="flex items-center bg-[var(--bg-panel)] p-1 rounded-lg border border-[var(--border-main)]">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'simulation' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Simulation
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'theory' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Theoretical Basis
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8 flex-1">
          <div className="space-y-6">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Settings2 className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Control Panel</span>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">Power Switch</label>
                  <button
                    onClick={toggleMotor}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all ${
                      isRunning 
                        ? 'bg-[var(--danger)] text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]' 
                        : 'bg-[var(--success)] text-[var(--text-inverse)] shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>{isRunning ? 'EMERGENCY STOP' : 'SYSTEM START'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[var(--border-main)] space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Wiring Config</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['STAR', 'DELTA'].map(cfg => (
                        <button
                          key={cfg}
                          disabled={isRunning}
                          onClick={() => setConnection(cfg as any)}
                          className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                            connection === cfg 
                              ? 'bg-[var(--primary)] border-[var(--primary)] text-white' 
                              : 'bg-[var(--bg-main)] border-[var(--border-main)] text-[var(--text-secondary)] disabled:opacity-50'
                          }`}
                        >
                          {cfg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Phase Sequence</label>
                    <button
                      disabled={isRunning}
                      onClick={() => setDirection(prev => prev === 'CW' ? 'CCW' : 'CW')}
                      className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-bold border border-[var(--border-main)] bg-[var(--bg-main)] text-[var(--text-secondary)] hover:text-white disabled:opacity-50 transition-colors"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      <span>{direction === 'CW' ? 'R-S-T (Normal)' : 'R-T-S (Reverse)'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">3-Phase Telemetry</span>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { label: 'Voltage L1-L2', value: '380.2 V', color: 'text-[var(--accent-electric)]' },
                  { label: 'Phase Current', value: isRunning ? (connection === 'STAR' ? '4.2 A' : '7.3 A') : '0.0 A', color: 'text-[var(--success)]' },
                  { label: 'RPM Output', value: `${speed} RPM`, color: 'text-[var(--warning)]' }
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-xs text-[var(--text-secondary)]">{stat.label}</span>
                    <span className={`text-xs font-mono font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl flex-1 flex flex-col min-h-[500px]">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Industrial Motor Unit</span>
                </div>
                <div className="flex items-center space-x-3">
                   <span className={`text-[10px] font-mono ${isRunning ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}`}>● {isRunning ? 'ONLINE' : 'OFFLINE'}</span>
                   <span className="text-[10px] font-mono text-[var(--accent-electric)]">[{connection}]</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-12 bg-[#070b14] rounded-b-xl relative overflow-hidden">
                <div className="relative">
                   {/* Heavy Industrial Motor Base */}
                   <div className="w-80 h-56 bg-slate-700 rounded-lg relative border-b-8 border-slate-900 shadow-2xl">
                      {/* Cooling Fins */}
                      <div className="absolute inset-x-4 top-0 flex justify-between h-full px-2">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="w-1 h-full bg-slate-800 opacity-40"></div>
                        ))}
                      </div>
                      
                      {/* Terminal Box */}
                      <div className="absolute -top-4 right-8 w-16 h-12 bg-slate-600 rounded border border-slate-500 shadow-lg flex items-center justify-center">
                         <div className="grid grid-cols-2 gap-1">
                            {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-600"></div>)}
                         </div>
                      </div>

                      {/* Main Shaft Container */}
                      <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-600">
                         {/* Shaft */}
                         <div 
                           className="w-16 h-16 rounded-full border-4 border-dashed border-[var(--accent-electric)]/40 flex items-center justify-center"
                           style={{ 
                             transform: `rotate(${direction === 'CW' ? speed : -speed}deg)`,
                             transition: isRunning ? 'none' : 'transform 1s ease-out'
                           }}
                         >
                            <div className="w-12 h-2 bg-slate-400 rounded-full"></div>
                            <div className="w-2 h-12 bg-slate-400 rounded-full absolute"></div>
                         </div>
                      </div>
                   </div>
                   
                   {/* Connection Indicators */}
                   <div className="absolute -bottom-16 inset-x-0 flex justify-center space-x-12">
                      {['L1', 'L2', 'L3'].map(l => (
                        <div key={l} className="flex flex-col items-center">
                           <div className={`w-3 h-3 rounded-full mb-1 transition-colors ${isRunning ? 'bg-[var(--success)] shadow-[0_0_10px_var(--success)]' : 'bg-slate-800'}`}></div>
                           <span className="text-[10px] font-mono text-slate-500">{l}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-4 flex items-center space-x-3">
                <ShieldAlert className="w-5 h-5 text-[var(--danger)]" />
                <div className="text-[10px] text-[var(--text-secondary)] leading-tight">
                  <span className="text-white font-bold block mb-1">Safety Interlock</span>
                  Wiring tidak dapat diubah saat motor sedang beroperasi (Running).
                </div>
              </div>
              <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-4 flex items-center space-x-3">
                <RotateCw className="w-5 h-5 text-[var(--accent-electric)]" />
                <div className="text-[10px] text-[var(--text-secondary)] leading-tight">
                  <span className="text-white font-bold block mb-1">Phase Control</span>
                  Arah putaran motor 3 fase ditentukan oleh urutan fasa yang masuk ke terminal.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-8 max-w-4xl animate-fade-in">
          <h2 className="heading-3 mb-6">Motor Listrik 3 Fase</h2>
          <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
            <p>
              Motor induksi tiga fase adalah standar industri untuk penggerak mekanis skala besar. Keunggulannya meliputi efisiensi tinggi, konstruksi yang kokoh, dan kemampuan start sendiri tanpa alat bantu tambahan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-2 text-xs">Star (Y) Connection</h4>
                <p className="text-[10px]">Arus start rendah (1/3 dari Delta). Digunakan untuk beban awal yang ringan guna mengurangi lonjakan arus pada jaringan.</p>
              </div>
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-2 text-xs">Delta (Δ) Connection</h4>
                <p className="text-[10px]">Memberikan torsi maksimum dan daya penuh. Tegangan fasa sama dengan tegangan jala-jala.</p>
              </div>
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-2 text-xs">Rotation Logic</h4>
                <p className="text-[10px]">Arah putaran diubah dengan menukar salah satu urutan dari dua fasa (misalnya menukar S dengan T).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
