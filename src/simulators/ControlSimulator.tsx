import React, { useState } from 'react';
import { 
  Sliders, 
  Power, 
  Settings2, 
  Activity, 
  CircuitBoard,
  MousePointer2,
  AlertTriangle
} from 'lucide-react';

interface ControlSimulatorProps {
  onComplete: () => void;
}

export const ControlSimulator: React.FC<ControlSimulatorProps> = ({ onComplete }) => {
  const [powerOn, setPowerOn] = useState(false);
  const [motorState, setMotorState] = useState<'off' | 'running' | 'tripped'>('off');
  const [activeTab, setActiveTab] = useState<'simulation' | 'theory'>('simulation');

  const togglePower = () => {
    setPowerOn(!powerOn);
    if (!powerOn === false) {
       setMotorState('off');
    }
  };

  const pressStart = () => {
    if (powerOn && motorState === 'off') {
      setMotorState('running');
      onComplete();
    }
  };

  const pressStop = () => {
    setMotorState('off');
  };

  const triggerTrip = () => {
    if (motorState === 'running') {
      setMotorState('tripped');
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-electric)] mb-1">
            <CircuitBoard className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Module EL-04</span>
          </div>
          <h1 className="heading-2">Kontrol Industri (DOL)</h1>
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
            {/* Logic Controls */}
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Settings2 className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">Control Station</span>
              </div>
              <div className="p-5 space-y-4">
                 <div>
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Main Circuit Breaker</label>
                  <button
                    onClick={togglePower}
                    className={`w-full py-2.5 rounded-lg font-bold flex items-center justify-center space-x-2 border transition-all ${
                      powerOn 
                        ? 'bg-[var(--primary)]/10 border-[var(--primary)] text-white' 
                        : 'bg-[var(--bg-main)] border-[var(--border-main)] text-[var(--text-secondary)]'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    <span>{powerOn ? 'MCB ON' : 'MCB OFF'}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-[var(--border-main)] grid grid-cols-2 gap-3">
                   <button
                     onClick={pressStart}
                     disabled={!powerOn || motorState !== 'off'}
                     className="py-6 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-20 disabled:hover:bg-green-600 text-white font-bold flex flex-col items-center justify-center space-y-1 transition-all shadow-lg active:translate-y-1"
                   >
                     <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">I</div>
                     <span className="text-[10px] uppercase">Start</span>
                   </button>
                   <button
                     onClick={pressStop}
                     className="py-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex flex-col items-center justify-center space-y-1 transition-all shadow-lg active:translate-y-1"
                   >
                     <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">O</div>
                     <span className="text-[10px] uppercase">Stop</span>
                   </button>
                </div>

                <button
                  onClick={triggerTrip}
                  disabled={motorState !== 'running'}
                  className="w-full py-2 rounded-lg border border-[var(--border-main)] text-[var(--text-muted)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition-all text-[10px] font-bold uppercase disabled:opacity-20"
                >
                  Simulate Overload (Trip)
                </button>
              </div>
            </div>

            {/* Status Panel */}
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl overflow-hidden">
               <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-[var(--text-secondary)]" />
                <span className="text-xs font-bold uppercase tracking-wider">System Status</span>
              </div>
              <div className="p-4 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Control Supply</span>
                    <div className={`w-3 h-3 rounded-full ${powerOn ? 'bg-[var(--success)]' : 'bg-slate-800'}`}></div>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Main Contactor</span>
                    <div className={`w-3 h-3 rounded-full ${motorState === 'running' ? 'bg-[var(--success)] shadow-[0_0_10px_var(--success)]' : 'bg-slate-800'}`}></div>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-secondary)]">Overload Relay</span>
                    <div className={`w-3 h-3 rounded-full ${motorState === 'tripped' ? 'bg-[var(--danger)] animate-pulse shadow-[0_0_10px_var(--danger)]' : 'bg-slate-800'}`}></div>
                 </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl flex-1 flex flex-col min-h-[500px]">
              <div className="px-4 py-3 border-b border-[var(--border-main)] bg-[var(--bg-main)]/50 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CircuitBoard className="w-4 h-4 text-[var(--text-secondary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">Control Schematic (Logic)</span>
                </div>
                <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Direct-On-Line Controller</div>
              </div>
              
              <div className="flex-1 flex items-center justify-center p-8 bg-[#070b14] rounded-b-xl relative overflow-hidden">
                <svg viewBox="0 0 500 400" className="w-full h-auto max-w-lg">
                   {/* Power Lines */}
                   <line x1="50" y1="50" x2="450" y2="50" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                   <line x1="50" y1="350" x2="450" y2="350" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5" opacity="0.3" />
                   
                   {/* Control Logic Vertical Lines */}
                   <g stroke="#94A3B8" strokeWidth="2">
                      {/* Line L1 to MCB */}
                      <path d="M 100 50 L 100 80" />
                      {/* MCB Contact */}
                      <g transform="translate(100, 100)">
                        <circle cx="0" cy="-20" r="3" fill="#94A3B8" />
                        <circle cx="0" cy="20" r="3" fill="#94A3B8" />
                        {powerOn ? <line x1="0" y1="-20" x2="0" y2="20" stroke="white" strokeWidth="3" /> : <line x1="0" y1="-20" x2="15" y2="15" stroke="#94A3B8" strokeWidth="3" />}
                        <text x="25" y="0" fill="#94A3B8" fontSize="10" className="font-mono">MCB</text>
                      </g>
                      
                      {/* Stop Button (NC) */}
                      <g transform="translate(100, 180)">
                        <circle cx="0" cy="-20" r="3" fill="#EF4444" />
                        <circle cx="0" cy="20" r="3" fill="#EF4444" />
                        <line x1="0" y1="-20" x2="0" y2="20" stroke="#EF4444" strokeWidth="3" />
                        <text x="25" y="0" fill="#EF4444" fontSize="10" className="font-mono">STOP</text>
                      </g>

                      {/* Start Button (NO) */}
                      <g transform="translate(100, 260)">
                        <circle cx="0" cy="-20" r="3" fill="#22C55E" />
                        <circle cx="0" cy="20" r="3" fill="#22C55E" />
                        <line x1="0" y1="-20" x2="15" y2="15" stroke="#22C55E" strokeWidth="3" />
                        <text x="25" y="0" fill="#22C55E" fontSize="10" className="font-mono">START</text>
                      </g>

                      {/* Contactor Coil */}
                      <g transform="translate(100, 330)">
                         <rect x="-15" y="-15" width="30" height="30" fill="none" stroke={motorState === 'running' ? "#22C55E" : "#94A3B8"} strokeWidth="2" />
                         <text x="0" y="5" textAnchor="middle" fill={motorState === 'running' ? "#22C55E" : "#94A3B8"} fontSize="12" fontWeight="bold">K1</text>
                      </g>

                      <path d="M 100 120 L 100 160" />
                      <path d="M 100 200 L 100 240" />
                      <path d="M 100 280 L 100 315" />
                      <path d="M 100 345 L 100 350" />
                   </g>

                   {/* Indicator Lamps */}
                   <g transform="translate(300, 150)">
                      <circle cx="0" cy="0" r="20" fill="none" stroke={motorState === 'running' ? "#22C55E" : "#1E293B"} strokeWidth="2" />
                      {motorState === 'running' && <circle cx="0" cy="0" r="25" fill="#22C55E" opacity="0.1" className="animate-pulse" />}
                      <text x="0" y="40" textAnchor="middle" fill="#94A3B8" fontSize="10">RUN LAMP</text>
                   </g>

                   <g transform="translate(300, 250)">
                      <circle cx="0" cy="0" r="20" fill="none" stroke={motorState === 'tripped' ? "#EF4444" : "#1E293B"} strokeWidth="2" />
                      {motorState === 'tripped' && <circle cx="0" cy="0" r="25" fill="#EF4444" opacity="0.1" className="animate-pulse" />}
                      <text x="0" y="40" textAnchor="middle" fill="#94A3B8" fontSize="10">TRIP LAMP</text>
                   </g>
                </svg>
              </div>
            </div>

            <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-4 flex items-start space-x-4">
              <div className="p-2 bg-[var(--primary)]/10 rounded-lg">
                <MousePointer2 className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold mb-1">Interaction Logic</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Gunakan tombol START dan STOP pada Control Station. Sistem memiliki fitur <i>Self-Holding</i> melalui kontak bantu K1 yang menjaga motor tetap menyala setelah tombol START dilepas.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] rounded-xl p-8 max-w-4xl animate-fade-in">
          <h2 className="heading-3 mb-6">Kontrol Industri (Direct-On-Line)</h2>
          <div className="space-y-6 text-[var(--text-secondary)] text-sm leading-relaxed">
            <p>
              Sistem kendali Direct-On-Line (DOL) adalah metode penyalaan motor paling dasar di industri. Metode ini menghubungkan motor langsung ke sumber daya melalui kontaktor magnetik.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="bg-[var(--bg-main)] p-5 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[var(--accent-electric)]" />
                  <span>Control Logic</span>
                </h4>
                <p className="text-xs">Terdiri dari rangkaian daya dan rangkaian kontrol. Rangkaian kontrol menggunakan tegangan rendah atau satu fase untuk menggerakkan coil kontaktor yang memiliki kapasitas arus besar.</p>
              </div>
              <div className="bg-[var(--bg-main)] p-5 rounded-lg border border-[var(--border-main)]">
                <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-[var(--danger)]" />
                  <span>Protection Unit</span>
                </h4>
                <p className="text-xs">Thermal Overload Relay (TOR) berfungsi melindungi motor dari beban berlebih dengan memutus rangkaian kontrol saat terdeteksi panas berlebih pada bimetal.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
