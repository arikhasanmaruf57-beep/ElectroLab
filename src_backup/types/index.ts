export type ModuleId = 'dashboard' | 'lighting' | 'motor1ph' | 'motor3ph' | 'control';

export interface ModuleItem {
  id: ModuleId;
  title: string;
  category: string;
  description: string;
  iconName: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  duration: string;
  isAvailable: boolean;
}

export interface UserProgress {
  completedModules: ModuleId[];
  lastActive: string;
}
