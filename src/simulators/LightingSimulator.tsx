import React, { useState } from 'react';
import { 
  Power, 
  Info, 
  Settings2, 
  Activity, 
  CircuitBoard,
  ChevronRight
} from 'lucide-react';

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

  const circuitInfo = {
    single: { label: 'Sakelar Tunggal', desc: 'Satu sakelar mengontrol satu beban lampu secara langsung.' },
    series: { label: 'Sakelar Seri', desc: 'Dua sakelar dalam satu rangkaian seri untuk logika AND.' },
    exchange: { label: 'Sakelar Tukar', desc: 'Kontrol satu lampu dari dua lokasi berbeda (3-way).' }
  }[circuitType];

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-electric)] mb-1">
            <CircuitBoard className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Module EL-01</span>
          </div>
          <h1 className="heading-2">Instalasi Penerangan</h1>
        </div>

        <div className="flex items-center bg-[var(--bg-panel)] p-1 rounded-lg border border-[var(--border-main)]">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'simulation' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Simulation
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
              activeTab === 'theory' ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'
            }`}
          >
            Theoretical Basis
          </button>
        </div>
      </div>

      {activeTab === 'simulation' ? (
        <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-8 flex-1">
          {/* Left Panel - Controls */}
          <div className="space-y-6">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Settings2 className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Control Panel</span>
              </div>
              
              <div className="p-5 space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">Configuration</label>
                  <div className="space-y-2 mb-4">
                    {(['single', 'series', 'exchange'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setCircuitType(type)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all ${
                          circuitType === type 
                            ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-white' 
                            : 'bg-[var(--bg-main)] border-[var(--border-main)] text-[var(--text-secondary)] hover:border-[var(--text-muted)]'
                        }`}
                      >
                        <span>{type === 'single' ? 'Single Switch' : type === 'series' ? 'Series Switch' : 'Exchange Switch'}</span>
                        {circuitType === type && <ChevronRight className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-[var(--text-secondary)] italic leading-relaxed px-1">
                    {circuitInfo.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-[var(--border-main)]">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-3">Manual Override</label>
                  <button
                    onClick={toggleSwitch}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-3 transition-all ${
                      switchState 
                        ? 'bg-[var(--success)] text-[var(--text-inverse)] shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                        : 'bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-main)] hover:border-[var(--text-muted)]'
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>{switchState ? 'SYSTEM LIVE' : 'SYSTEM OFF'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Telemetry Card */}
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Telemetry</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Voltage</span>
                  <span className="text-xs font-mono font-bold text-[var(--accent-electric)]">220.4 V AC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Current</span>
                  <span className={`text-xs font-mono font-bold ${switchState ? 'text-[var(--success)]' : 'text-[var(--text-muted)]'}`}>
                    {switchState ? '0.273 A' : '0.000 A'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-secondary)]">Power Draw</span>
                  <span className={`text-xs font-mono font-bold ${switchState ? 'text-[var(--warning)]' : 'text-[var(--text-muted)]'}`}>
                    {switchState ? '60.1 W' : '0.0 W'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Area - Visualization */}
          <div className="flex flex-col space-y-4">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl flex-1 flex flex-col min-h-[500px]">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CircuitBoard className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Circuit Diagram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${switchState ? 'bg-[var(--success)] animate-pulse' : 'bg-[var(--text-muted)]'}`}></span>
                  <span className="text-[10px] font-mono text-[var(--text-secondary)]">{switchState ? 'CLOSED LOOP' : 'OPEN CIRCUIT'}</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-8 bg-[#070b14] rounded-b-xl relative overflow-hidden">
                {/* SVG Blueprint Look */}
                <svg viewBox="0 0 600 350" className="w-full h-auto max-w-2xl">
                  <defs>
                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#263449" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="600" height="350" fill="url(#grid)" />
                  
                  {/* Schematic Elements */}
                  <g strokeLinecap="round" strokeLinejoin="round">
                    {/* Wires */}
                    <path d="M 50 100 L 150 100 L 150 175" fill="none" stroke={switchState ? "#EF4444" : "#475569"} strokeWidth="2.5" />
                    <path d="M 200 175 L 400 175 L 400 125" fill="none" stroke={switchState ? "#EF4444" : "#475569"} strokeWidth="2.5" />
                    <path d="M 450 100 L 550 100" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
                    <path d="M 50 100 L 50 50 L 550 50 L 550 100" fill="none" stroke="#3B82F6" strokeWidth="2.5" opacity="0.3" />
                    
                    {/* Switch */}
                    <g transform="translate(175, 175)">
                      <circle cx="-25" cy="0" r="4" fill="white" />
                      <circle cx="25" cy="0" r="4" fill="white" />
                      {switchState ? (
                        <line x1="-25" y1="0" x2="25" y2="0" stroke="#EF4444" strokeWidth="4" />
                      ) : (
                        <line x1="-25" y1="0" x2="20" y2="-25" stroke="#94A3B8" strokeWidth="4" />
                      )}
                    </g>
                    
                    {/* Lamp */}
                    <g transform="translate(425, 100)">
                      <circle cx="0" cy="0" r="25" fill={switchState ? "rgba(245,158,11,0.2)" : "transparent"} />
                      <circle cx="0" cy="0" r="20" fill="none" stroke={switchState ? "#F59E0B" : "#475569"} strokeWidth="3" />
                      <path d="M -12 -12 L 12 12 M -12 12 L 12 -12" stroke={switchState ? "#F59E0B" : "#475569"} strokeWidth="2" />
                      {switchState && <circle cx="0" cy="0" r="30" fill="none" stroke="#F59E0B" strokeWidth="1" opacity="0.3" className="animate-pulse" />}
                    </g>
                  </g>

                  {/* Labels */}
                  <text x="50" y="85" fill="#EF4444" fontSize="10" className="font-mono">PHASE (L)</text>
                  <text x="500" y="85" fill="#3B82F6" fontSize="10" className="font-mono">NEUTRAL (N)</text>
                </svg>

                <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-main)]/80 px-2 py-1 rounded border border-[var(--border-main)]">
                  <Info className="w-3 h-3" />
                  <span>Interactive Schematic • Real-time Physics</span>
                </div>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-4">
              <h4 className="text-xs font-bold mb-2 flex items-center space-x-2">
                <Info className="w-3.5 h-3.5 text-[var(--accent-electric)]" />
                <span>Operating Instructions</span>
              </h4>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Pilih konfigurasi rangkaian pada panel kontrol. Tekan sakelar untuk menguji aliran arus. Perhatikan diagram skematik dan parameter telemetri untuk memvalidasi hasil simulasi.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-8 max-w-4xl animate-fade-in">
          <h2 className="heading-3 mb-6">Theoretical Basis</h2>
          <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
            <p>
              Instalasi penerangan adalah sistem distribusi listrik yang melayani beban pencahayaan. Dalam lingkungan industri, instalasi ini harus memenuhi standar keamanan tinggi untuk mencegah kegagalan sistem dan risiko kecelakaan kerja.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-2">Switching Logic</h4>
                <p className="text-xs">Sakelar selalu dipasang pada kabel fasa (Live) untuk memastikan beban benar-benar terputus dari tegangan saat kondisi OFF.</p>
              </div>
              <div className="bg-[var(--bg-main)] p-4 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-2">Safety Standards</h4>
                <p className="text-xs">Sesuai PUIL 2020, instalasi harus menggunakan penghantar dengan KHA (Kuat Hantar Arus) yang sesuai dan sistem proteksi yang memadai.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
