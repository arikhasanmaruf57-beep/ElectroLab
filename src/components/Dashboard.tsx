import React from 'react';
import { 
  Lightbulb, 
  Zap, 
  Cpu, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  BarChart3,
  BookOpen
} from 'lucide-react';
import type { ModuleId } from '../types';
import { MODULES } from '../data/modulesData';

interface DashboardProps {
  setActiveModule: (id: ModuleId) => void;
  completedModules: ModuleId[];
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveModule, completedModules }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb': return <Lightbulb className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Sliders': return <Sliders className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Welcome Section */}
      <section>
        <h2 className="text-[var(--text-secondary)] font-mono text-xs uppercase tracking-[0.2em] mb-2">Engineering Workbench</h2>
        <h1 className="heading-1 mb-4">Welcome back, Engineer</h1>
        <p className="text-[var(--text-secondary)] max-w-2xl text-body">
          Sistem simulasi teknik elektro industri terpadu. Pilih modul di bawah ini untuk memulai praktikum virtual atau melanjutkan progres belajar Anda.
        </p>
      </section>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">Active Modules</span>
          </div>
          <div className="text-3xl font-bold">{MODULES.length}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Total simulasi tersedia</div>
        </div>
        
        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">Completion</span>
          </div>
          <div className="text-3xl font-bold">{completedModules.length} / {MODULES.length}</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Modul telah diselesaikan</div>
        </div>

        <div className="bg-[var(--bg-panel)] border border-[var(--border-main)] p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">Study Time</span>
          </div>
          <div className="text-3xl font-bold">~2.5h</div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">Estimasi waktu belajar</div>
        </div>
      </div>

      {/* Module Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-3">Modul Simulator</h2>
          <div className="h-px flex-1 bg-[var(--border-main)] mx-6 opacity-50"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {MODULES.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            return (
              <div 
                key={module.id}
                className="group bg-[var(--bg-panel)] border border-[var(--border-main)] hover:border-[var(--border-active)] rounded-xl transition-all overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${isCompleted ? 'bg-[var(--success)]/10 text-[var(--success)]' : 'bg-[var(--primary)]/10 text-[var(--primary)]'}`}>
                      {getIcon(module.iconName)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--bg-main)] border border-[var(--border-main)] text-[var(--text-secondary)] uppercase">
                        {module.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--accent-electric)] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 flex-1">
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4 text-xs text-[var(--text-muted)] font-mono">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {module.duration}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center text-[var(--success)]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Complete
                        </span>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => setActiveModule(module.id)}
                      className="flex items-center space-x-2 text-xs font-bold text-[var(--accent-electric)] hover:text-white transition-colors"
                    >
                      <span>Open Simulator</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Visual side element */}
                <div className="w-2 bg-[var(--border-main)] group-hover:bg-[var(--border-active)] transition-colors hidden sm:block"></div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
