import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { UnifiedVideoDocumentary } from './components/UnifiedVideoDocumentary';
import { Microscope360Viewer } from './components/Microscope360Viewer';
import { CapillaryAtlas } from './components/CapillaryAtlas';
import { ChemicalProcessesLab } from './components/ChemicalProcessesLab';
import { BiochemicalDossier } from './components/BiochemicalDossier';
import { TrichologyQuiz } from './components/TrichologyQuiz';
import { Footer } from './components/Footer';
import { 
  Tv, 
  Rotate3d, 
  BookOpen, 
  FlaskConical, 
  Dna, 
  GraduationCap, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Droplets,
  Film
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('video');

  return (
    <div className="min-h-screen flex flex-col bg-[#06080d] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Header Navigation Bar (Strict 3-zone contract) */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Hero Kicker & Institutional Header */}
      <div className="border-b border-slate-800/80 bg-gradient-to-b from-[#0a0e18] via-[#06080d] to-[#06080d]">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                <span>INSTITUTO DIVINA PASTORA</span>
                <span aria-hidden="true">·</span>
                <span>TRICOLOGÍA Y ESTILISMO PROFESIONAL</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400">DOCUMENTAL COMPLETO EN UN SOLO VÍDEO</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Estructura Interna del Cabello: El Documental Maestro en 5K
              </h1>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
                Toda la anatomía capilar, folículo piloso, degradación del 18-MEA, puentes disulfuro y los mecanismos moleculares de decoloración, coloración, corte y alisados integrados en una experiencia cinematográfica interactiva 360°.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('video')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Tv className="w-4 h-4" />
                <span>Vídeo Documental 5K</span>
              </button>

              <button
                onClick={() => setActiveTab('microscope')}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2"
              >
                <Rotate3d className="w-4 h-4 text-cyan-400" />
                <span>Microscopio 360° Libre</span>
              </button>
            </div>
          </div>

          {/* 3. Scientific Metric KPIs Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800/80">
            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Composición Proteica
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-bold text-cyan-400 tabular-nums">85-90%</span>
                <span className="text-xs text-slate-500 font-mono">Queratina dura</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Cisteína (17.5%) en hélices alfa</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Punto Isoeléctrico
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">pH 3.67</span>
                <span className="text-xs text-slate-500 font-mono">Cierre cuticular</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Fuerza tensil mecánica máxima</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Capa F Lipídica
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-bold text-amber-400 tabular-nums">18-MEA</span>
                <span className="text-xs text-slate-500 font-mono">Monocapa</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Hidrofobicidad nativa impermeable</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Puentes Disulfuro
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-bold text-purple-400 tabular-nums">250 kJ</span>
                <span className="text-xs text-slate-500 font-mono">/ mol</span>
              </div>
              <span className="text-[11px] text-slate-500 block">Memoria y resistencia permanente</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tab Navigation Strip */}
      <div className="border-b border-slate-800 bg-[#070a10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'video'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Vídeo Documental Maestro 5K</span>
            </button>

            <button
              onClick={() => setActiveTab('microscope')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'microscope'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Rotate3d className="w-4 h-4" />
              <span>Microscopio 360° Libre</span>
            </button>

            <button
              onClick={() => setActiveTab('atlas')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'atlas'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Atlas del Tallo & Folículo</span>
            </button>

            <button
              onClick={() => setActiveTab('lab')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'lab'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Laboratorio Químico del Salón</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'dossier'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Dna className="w-4 h-4" />
              <span>Dossier Bioquímico & pH</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Acreditación Profesional</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {activeTab === 'video' && <UnifiedVideoDocumentary />}
        {activeTab === 'microscope' && <Microscope360Viewer />}
        {activeTab === 'atlas' && <CapillaryAtlas />}
        {activeTab === 'lab' && <ChemicalProcessesLab />}
        {activeTab === 'dossier' && <BiochemicalDossier />}
        {activeTab === 'quiz' && <TrichologyQuiz />}
      </main>

      {/* 6. Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
