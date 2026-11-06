import React from 'react';
import { 
  Lightbulb, 
  Zap, 
  Cpu, 
  Sliders, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Activity,
  Layers,
  ShieldAlert
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
      case 'Lightbulb': return <Lightbulb className="w-8 h-8 text-[var(--accent-amber)]" />;
      case 'Zap': return <Zap className="w-8 h-8 text-[var(--accent-amber)]" />;
      case 'Cpu': return <Cpu className="w-8 h-8 text-[var(--accent-amber)]" />;
      case 'Sliders': return <Sliders className="w-8 h-8 text-[var(--accent-amber)]" />;
      default: return <BookOpen className="w-8 h-8 text-[var(--accent-amber)]" />;
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden animate-fade-in">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 bg-[radial-gradient(var(--accent-electric)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-electric-dim)] to-transparent opacity-20"></div>
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center space-x-2 bg-[var(--accent-electric-dim)] border border-[var(--accent-electric)]/20 px-3 py-1 rounded-full text-[var(--accent-electric)] text-xs font-mono">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Platform Pembelajaran Teknik Elektro Industri</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            Eksplorasi & Simulasi Rangkaian Listrik Tanpa Batas
          </h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
            ElectroLab Simulator menghadirkan sarana praktikum virtual interaktif untuk instalasi penerangan, mesin listrik 1 fase & 3 fase, hingga sistem kontrol industri secara gratis dan ringan.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setActiveModule('lighting')}
              className="bg-[var(--accent-electric)] hover:bg-[var(--accent-electric)]/90 text-[var(--text-inverse)] font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[var(--accent-electric-glow)] flex items-center space-x-2 text-sm"
            >
              <span>Mulai Praktikum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] px-4 py-3 rounded-xl text-[var(--text-secondary)] text-sm font-mono">
              <span>Status: <strong className="text-[var(--accent-emerald)]">Online / Siap Digunakan</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-in-left">
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 rounded-xl shadow-md flex items-center space-x-4 hover:border-[var(--accent-electric)]/30 transition-all">
          <div className="p-3 bg-[var(--accent-electric-dim)] border border-[var(--accent-electric)]/20 rounded-lg text-[var(--accent-electric)]">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Total Modul Simulasi</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{MODULES.length} Modul Tersedia</h3>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 rounded-xl shadow-md flex items-center space-x-4 hover:border-[var(--accent-emerald)]/30 transition-all">
          <div className="p-3 bg-[var(--accent-emerald-dim)] border border-[var(--accent-emerald)]/20 rounded-lg text-[var(--accent-emerald)]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Modul Diselesaikan</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{completedModules.length} dari {MODULES.length}</h3>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] p-5 rounded-xl shadow-md flex items-center space-x-4 hover:border-[var(--accent-amber)]/30 transition-all">
          <div className="p-3 bg-[var(--accent-amber-dim)] border border-[var(--accent-amber)]/20 rounded-lg text-[var(--accent-amber)]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[var(--text-muted)] text-xs">Tingkat Kesulitan</p>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Pemula s/d Lanjutan</h3>
          </div>
        </div>
      </div>

      {/* Module Grid Header */}
      <div className="flex items-center justify-between pt-4 animate-fade-in">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Modul Pembelajaran & Simulasi</h2>
          <p className="text-[var(--text-muted)] text-sm">Pilih topik praktikum teknik elektro di bawah ini untuk memulai.</p>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 animate-fade-in">
        {MODULES.map((module, index) => {
          const isCompleted = completedModules.includes(module.id);
          return (
            <div
              key={module.id}
              className="bg-[var(--bg-card)] border border-[var(--border-primary)] hover:border-[var(--accent-electric)]/30 hover:shadow-xl hover:shadow-[var(--accent-electric-dim)] transition-all rounded-2xl p-5 lg:p-6 shadow-md flex flex-col justify-between group animate-slide-in-left"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-secondary)] group-hover:bg-[var(--bg-hover)] transition-colors">
                    {getIcon(module.iconName)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)] font-mono border border-[var(--border-secondary)]">
                      {module.category}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-mono border ${
                      module.difficulty === 'Pemula' ? 'bg-[var(--accent-emerald-dim)] text-[var(--accent-emerald)] border-[var(--accent-emerald)]/20' :
                      module.difficulty === 'Menengah' ? 'bg-[var(--accent-amber-dim)] text-[var(--accent-amber)] border-[var(--accent-amber)]/20' :
                      'bg-[var(--accent-rose-dim)] text-[var(--accent-rose)] border-[var(--accent-rose)]/20'
                    }`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base lg:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-electric)] transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-1 leading-relaxed line-clamp-3">
                    {module.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-primary)] flex items-center justify-between">
                <div className="text-xs text-[var(--text-muted)] font-mono flex items-center space-x-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <span>Estimasi: {module.duration}</span>
                  {isCompleted && (
                    <span className="text-[var(--accent-emerald)] font-bold ml-2 flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Selesai
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setActiveModule(module.id)}
                  className="bg-[var(--bg-tertiary)] hover:bg-[var(--accent-electric)] hover:text-[var(--text-inverse)] text-[var(--text-primary)] font-medium px-4 py-2 rounded-xl text-sm transition-all flex items-center space-x-1.5 border border-[var(--border-secondary)] hover:border-[var(--accent-electric)]"
                >
                  <span>Buka Simulasi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};