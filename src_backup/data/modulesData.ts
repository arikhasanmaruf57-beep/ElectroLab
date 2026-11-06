import type { ModuleItem } from '../types';

export const MODULES: ModuleItem[] = [
  {
    id: 'lighting',
    title: 'Simulasi Instalasi Penerangan',
    category: 'Instalasi Listrik',
    description: 'Pelajari pengawatan sakelar tunggal, seri, tukar, serta simulasi aliran arus listrik dan kondisi lampu menyala atau mati.',
    iconName: 'Lightbulb',
    difficulty: 'Pemula',
    duration: '15 Menit',
    isAvailable: true,
  },
  {
    id: 'motor1ph',
    title: 'Simulasi Motor Listrik 1 Fase',
    category: 'Mesin Listrik',
    description: 'Eksplorasi motor induksi satu fase dengan kapasitor running/starting, sakelar sentrifugal, dan pembalikan arah putaran.',
    iconName: 'Zap',
    difficulty: 'Menengah',
    duration: '25 Menit',
    isAvailable: true,
  },
  {
    id: 'motor3ph',
    title: 'Simulasi Motor Listrik 3 Fase',
    category: 'Mesin Listrik',
    description: 'Analisis sistem tenaga 3 fase (R, S, T), motor induksi 3 fase, kontaktor, thermal overload relay (TOR), dan proteksi MCB.',
    iconName: 'Cpu',
    difficulty: 'Menengah',
    duration: '30 Menit',
    isAvailable: true,
  },
  {
    id: 'control',
    title: 'Simulasi Kontrol Industri',
    category: 'Otomasi Industri',
    description: 'Rangkaian kendali industri standar: DOL Starter, Forward-Reverse, dan Star-Delta dengan pushbutton dan interlock.',
    iconName: 'Sliders',
    difficulty: 'Lanjutan',
    duration: '45 Menit',
    isAvailable: true,
  },
];
