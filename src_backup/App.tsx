import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LightingSimulator } from './simulators/LightingSimulator';
import { Motor1PhSimulator } from './simulators/Motor1PhSimulator';
import { Motor3PhSimulator } from './simulators/Motor3PhSimulator';
import { ControlSimulator } from './simulators/ControlSimulator';
import type { ModuleId } from './types';

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>(() => {
    try {
      const saved = localStorage.getItem('electrolab_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('electrolab_completed', JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  const handleModuleComplete = (id: ModuleId) => {
    if (!completedModules.includes(id)) {
      setCompletedModules(prev => [...prev, id]);
    }
  };

  const handleNavClick = (id: ModuleId) => {
    setActiveModule(id);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans selection:bg-[var(--accent-electric)] selection:text-[var(--text-inverse)]">
      <Navbar 
        activeModule={activeModule} 
        setActiveModule={handleNavClick} 
        completedCount={completedModules.length}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside 
          className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[var(--sidebar-width)] lg:transition-all lg:duration-300 lg:ease-out"
          aria-label="Navigation sidebar"
        >
          <div className="h-full bg-[var(--bg-secondary)] border-r border-[var(--border-primary)] flex flex-col">
            <nav className="flex-1 overflow-y-auto p-4 space-y-1" role="navigation" aria-label="Main navigation">
              <div className="px-3 py-2">
                <div className="flex items-center space-x-3 cursor-pointer hover:bg-[var(--bg-hover)] rounded-lg p-2 transition-colors" onClick={() => handleNavClick('dashboard')}>
                  <div className="bg-[var(--accent-electric)] text-[var(--text-inverse)] p-2 rounded-lg flex items-center justify-center shadow-[0_0_15px_var(--accent-electric-glow)]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-bold text-[var(--text-primary)] truncate">ElectroLab</p>
                    <p className="text-[var(--accent-electric)] text-xs font-mono">Simulator Teknik Elektro</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border-primary)] my-2"></div>

              <ul className="space-y-1" role="list">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
                  { id: 'lighting', label: 'Penerangan', icon: 'lightbulb' },
                  { id: 'motor1ph', label: 'Motor 1 Fase', icon: 'zap' },
                  { id: 'motor3ph', label: 'Motor 3 Fase', icon: 'cpu' },
                  { id: 'control', label: 'Kontrol Industri', icon: 'sliders-horizontal' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id as ModuleId)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeModule === item.id
                          ? 'bg-[var(--accent-electric-dim)] text-[var(--accent-electric)] border border-[var(--accent-electric)]/30 shadow-[0_0_10px_var(--accent-electric-dim)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {(() => {
                        switch (item.icon) {
                          case 'layout-dashboard':
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>;
                          case 'lightbulb':
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.734-.988-2.386l-.548-.547z"/></svg>;
                          case 'zap':
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>;
                          case 'cpu':
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>;
                          case 'sliders-horizontal':
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>;
                          default:
                            return <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>;
                        }
                      })()}
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-[var(--border-primary)]">
              <div className="bg-[var(--bg-tertiary)] rounded-lg p-3">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[var(--text-muted)] font-mono">Progress</span>
                  <span className="font-bold text-[var(--accent-electric)]">{completedModules.length}/4</span>
                </div>
                <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--accent-electric)] to-[var(--accent-amber)] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(completedModules.length / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main 
          className="flex-1 lg:ml-[var(--sidebar-width)] overflow-y-auto"
          role="main"
        >
          {activeModule === 'dashboard' && (
            <Dashboard 
              setActiveModule={handleNavClick} 
              completedModules={completedModules} 
            />
          )}
          {activeModule === 'lighting' && (
            <LightingSimulator 
              onComplete={() => handleModuleComplete('lighting')} 
            />
          )}
          {activeModule === 'motor1ph' && (
            <Motor1PhSimulator 
              onComplete={() => handleModuleComplete('motor1ph')} 
            />
          )}
          {activeModule === 'motor3ph' && (
            <Motor3PhSimulator 
              onComplete={() => handleModuleComplete('motor3ph')} 
            />
          )}
          {activeModule === 'control' && (
            <ControlSimulator 
              onComplete={() => handleModuleComplete('control')} 
            />
          )}
        </main>
      </div>

      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-primary)] py-4 px-6 lg:px-8 lg:ml-[var(--sidebar-width)] text-center text-xs text-[var(--text-muted)] font-mono">
        <p>ElectroLab Simulator v1.0.0 • Dibuat untuk Pembelajaran Teknik Elektro Industri</p>
      </footer>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

export default App;