import React from 'react';
import { Tv, Rotate3d, BookOpen, FlaskConical, Dna, GraduationCap } from 'lucide-react';

export type ActiveTab = 'video' | 'microscope' | 'atlas' | 'lab' | 'dossier' | 'quiz';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-4 bg-[#06080d]/90 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark */}
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); setActiveTab('video'); }}
        className="text-base md:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-cyan-300 transition-colors"
      >
        <span>INSTITUTO DIVINA PASTORA</span>
      </a>

      {/* Zone 2: 4–5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-400">
        <button
          onClick={() => setActiveTab('video')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 flex items-center gap-1.5 ${
            activeTab === 'video' ? 'text-amber-400 border-amber-400 font-bold' : 'border-transparent'
          }`}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>Vídeo Documental Completo</span>
        </button>

        <button
          onClick={() => setActiveTab('microscope')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'microscope' ? 'text-cyan-400 border-cyan-400 font-bold' : 'border-transparent'
          }`}
        >
          Microscopio 360°
        </button>

        <button
          onClick={() => setActiveTab('atlas')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'atlas' ? 'text-cyan-400 border-cyan-400 font-bold' : 'border-transparent'
          }`}
        >
          Atlas Anatómico
        </button>

        <button
          onClick={() => setActiveTab('lab')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'lab' ? 'text-cyan-400 border-cyan-400 font-bold' : 'border-transparent'
          }`}
        >
          Reactividad Química
        </button>

        <button
          onClick={() => setActiveTab('dossier')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'dossier' ? 'text-cyan-400 border-cyan-400 font-bold' : 'border-transparent'
          }`}
        >
          Dossier Molecular
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
            activeTab === 'quiz' ? 'text-cyan-400 border-cyan-400 font-bold' : 'border-transparent'
          }`}
        >
          Certificación
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={() => setActiveTab('video')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
            activeTab === 'video'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Tv className="w-3.5 h-3.5 text-amber-400" />
          <span>Reproducir Documental 5K</span>
        </button>
      </div>
    </header>
  );
};
