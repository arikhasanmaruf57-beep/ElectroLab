import React, { useState, useEffect } from 'react';
import { 
  Power, 
  RotateCw, 
  Activity, 
  Settings2, 
  Info,
  CircuitBoard,
  Gauge
} from 'lucide-react';

interface Motor1PhSimulatorProps {
  onComplete: () => void;
}

export const Motor1PhSimulator: React.FC<Motor1PhSimulatorProps> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [load, setLoad] = useState(0);
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');

  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(() => {
        setSpeed(prev => {
          const targetSpeed = 1450 - (load * 50);
          if (prev < targetSpeed) return Math.min(prev + 50, targetSpeed);
          if (prev > targetSpeed) return Math.max(prev - 20, targetSpeed);
          return prev;
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setSpeed(prev => Math.max(0, prev - 30));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, load]);

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
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Module EL-02</span>
          </div>
          <h1 className="heading-2">Motor Listrik 1 Fase</h1>
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
                <span className="text-xs font-bold uppercase tracking-wider">Motor Control</span>
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">Power Command</label>
                  <button
                    onClick={toggleMotor}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all ${
                      isRunning 
                        ? 'bg-[var(--success)] text-[var(--text-inverse)] shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                        : 'bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>{isRunning ? 'STOP MOTOR' : 'START MOTOR'}</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-[var(--border-main)]">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">Load Simulator</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={load} 
                    onChange={(e) => setLoad(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--bg-main)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-electric)]"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                    <span>No Load</span>
                    <span>Full Load</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Engine Data</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Rotational Speed</span>
                  <span className="text-xs font-mono font-bold text-[var(--accent-electric)]">{speed} RPM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Current (Amps)</span>
                  <span className={`text-xs font-mono font-bold ${isRunning ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}`}>
                    {isRunning ? (2.1 + (load * 0.4)).toFixed(2) + ' A' : '0.00 A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Slip Factor</span>
                  <span className="text-xs font-mono font-bold text-[var(--warning)]">
                    {isRunning ? ((1 - speed/1500) * 100).toFixed(1) + '%' : '0.0%'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl flex-1 flex flex-col min-h-[500px]">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Motor Visualization</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--text-secondary)] uppercase">
                  <span className={isRunning ? 'text-[var(--success)]' : ''}>{isRunning ? 'RUNNING' : 'STANDBY'}</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-8 bg-[#070b14] rounded-b-xl relative overflow-hidden">
                <div className="relative">
                  {/* Motor Housing */}
                  <div className="w-64 h-64 rounded-full border-8 border-[var(--border-main)] bg-[var(--bg-panel)] flex items-center justify-center relative">
                    {/* Rotor */}
                    <div 
                      className="w-48 h-48 rounded-full border-4 border-[var(--accent-electric)]/30 flex items-center justify-center transition-transform duration-500 ease-linear"
                      style={{ transform: `rotate(${speed * 2}deg)` }}
                    >
                      <div className="w-full h-1 bg-[var(--accent-electric)] absolute"></div>
                      <div className="w-1 h-full bg-[var(--accent-electric)] absolute"></div>
                      <div className="w-12 h-12 rounded-full bg-[var(--accent-electric)] shadow-[0_0_20px_var(--accent-glow)]"></div>
                    </div>
                    
                    {/* Stator coils (visual) */}
                    {[0, 90, 180, 270].map(deg => (
                      <div key={deg} className="absolute w-8 h-12 bg-orange-900/40 border border-orange-500/30 rounded" style={{ transform: `rotate(${deg}deg) translateY(-100px)` }}></div>
                    ))}
                  </div>

                  {/* Cooling Fan effect */}
                  {isRunning && (
                    <div className="absolute -inset-8 border-4 border-dashed border-[var(--accent-electric)]/10 rounded-full animate-spin" style={{ animationDuration: '0.5s' }}></div>
                  )}
                </div>

                <div className="absolute bottom-6 flex space-x-8 text-[10px] font-mono tracking-widest uppercase text-[var(--text-muted)]">
                  <div className="flex flex-col items-center">
                    <span className="text-white mb-1">{speed}</span>
                    <span>RPM</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white mb-1">50</span>
                    <span>HZ</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-white mb-1">220</span>
                    <span>VAC</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-4 flex items-start space-x-4">
              <div className="p-2 bg-[var(--warning)]/10 rounded-lg">
                <Info className="w-4 h-4 text-[var(--warning)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold mb-1">Technical Observation</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Perhatikan hubungan antara beban (Load) dan kecepatan putar (RPM). Pada motor induksi 1 fase, penambahan beban akan meningkatkan slip dan menurunkan kecepatan sinkron.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-8 max-w-4xl animate-fade-in">
          <h2 className="heading-3 mb-6">Motor Listrik 1 Fase</h2>
          <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
            <p>
              Motor induksi satu fase adalah mesin listrik yang mengubah energi listrik bolak-balik (AC) satu fase menjadi energi mekanik. Motor ini banyak digunakan pada peralatan rumah tangga dan industri kecil.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-[var(--bg-main)] p-5 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                  <RotateCw className="w-4 h-4 text-[var(--accent-electric)]" />
                  <span>Starting Mechanism</span>
                </h4>
                <p className="text-xs">Karena medan magnet stator pada motor 1 fase tidak berputar secara alami, diperlukan kapasitor start atau lilitan bantu untuk menghasilkan beda fase guna menciptakan torsi awal.</p>
              </div>
              <div className="bg-[var(--bg-main)] p-5 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-[var(--success)]" />
                  <span>Performance Curves</span>
                </h4>
                <p className="text-xs">Torsi motor akan berubah sesuai dengan beban yang diberikan. Arus starting biasanya jauh lebih besar dibandingkan arus nominal (Full Load Current).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
