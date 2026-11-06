import { useState, useEffect } from 'react';
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
    <div className="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-[var(--sidebar-width)] bg-[var(--bg-sidebar)] border-r border-[var(--border-main)] transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-[var(--header-height)] flex items-center px-6 border-b border-[var(--border-main)]">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
              <div className="bg-[var(--primary)] text-white p-1.5 rounded-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div>
                <span className="font-bold tracking-tight text-lg">ElectroLab</span>
                <div className="text-[10px] uppercase tracking-widest text-[var(--accent-electric)] font-bold -mt-1">Simulator</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
              { id: 'lighting', label: 'Instalasi Penerangan', icon: 'Lightbulb' },
              { id: 'motor1ph', label: 'Motor 1 Phase', icon: 'Zap' },
              { id: 'motor3ph', label: 'Motor 3 Phase', icon: 'Cpu' },
              { id: 'control', label: 'Kontrol Industri', icon: 'Sliders' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as ModuleId)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeModule === item.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-panel)] hover:text-[var(--text-main)]'
                }`}
              >
                {/* Simplified Icon Rendering for now, will improve later */}
                <span className="w-5 h-5 opacity-80">
                  {item.id === 'dashboard' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
                  {item.id === 'lighting' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>}
                  {item.id === 'motor1ph' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
                  {item.id === 'motor3ph' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>}
                  {item.id === 'control' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/></svg>}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Progress Section */}
          <div className="p-4 bg-[var(--bg-panel)] m-4 rounded-xl border border-[var(--border-main)]">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[var(--text-secondary)] mb-2 font-bold">
              <span>Overall Progress</span>
              <span className="text-[var(--accent-electric)]">{Math.round((completedModules.length / 4) * 100)}%</span>
            </div>
            <div className="h-1.5 bg-[var(--bg-main)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--accent-electric)] transition-all duration-500"
                style={{ width: `${(completedModules.length / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[var(--sidebar-width)] transition-all duration-300">
        {/* Header */}
        <header className="h-[var(--header-height)] bg-[var(--bg-main)] border-b border-[var(--border-main)] flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-[var(--text-secondary)]"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)]">
              <span className="text-[var(--accent-electric)]">user@electrolab</span>
              <span>:</span>
              <span className="text-[var(--primary)]">~/workstation/{activeModule}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[var(--bg-panel)] px-3 py-1.5 rounded-full border border-[var(--border-main)] text-xs font-medium">
              <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></div>
              <span className="text-[var(--text-secondary)]">System Status:</span>
              <span className="text-[var(--text-main)]">Operational</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-[1600px] mx-auto">
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
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>

  );
}

export default App;