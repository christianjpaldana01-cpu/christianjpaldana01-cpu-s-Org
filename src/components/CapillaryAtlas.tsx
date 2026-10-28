import React, { useState } from 'react';
import { ANATOMICAL_LAYERS, HAIR_IMAGES } from '../data/hairAnatomyData';
import { AnatomicalLayer } from '../types/hair';
import { 
  Dna, 
  Layers, 
  Sparkles, 
  Activity, 
  CircleDot, 
  ChevronRight, 
  BookOpen, 
  Maximize2,
  CheckCircle2,
  Scale
} from 'lucide-react';

export const CapillaryAtlas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shaft' | 'follicle' | 'molecular'>('all');
  const [activeLayerId, setActiveLayerId] = useState<string>('epicuticle');
  const [activeCyclePhase, setActiveCyclePhase] = useState<'anagen' | 'catagen' | 'telogen'>('anagen');

  const filteredLayers = selectedCategory === 'all' 
    ? ANATOMICAL_LAYERS 
    : ANATOMICAL_LAYERS.filter((l) => l.category === selectedCategory);

  const activeLayer = ANATOMICAL_LAYERS.find((l) => l.id === activeLayerId) || ANATOMICAL_LAYERS[0];

  return (
    <div className="space-y-10">
      {/* 1. Header & Filter Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold block mb-1">
            ATLAS HISTOLÓGICO Y TRICOLÓGICO
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Anatomía Detallada del Tallo Capilar y Folículo Piloso
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Exploración anatómica completa de todas las capas, células matriciales, vainas radiculares y estructuras ultra microscópicas del cabello humano.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 shrink-0 text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Todas las Estructuras ({ANATOMICAL_LAYERS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('shaft')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedCategory === 'shaft'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tallo Capilar
          </button>
          <button
            onClick={() => setSelectedCategory('follicle')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedCategory === 'follicle'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Folículo & Bulbo
          </button>
          <button
            onClick={() => setSelectedCategory('molecular')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedCategory === 'molecular'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Escala Molecular
          </button>
        </div>
      </div>

      {/* 2. Interactive Anatomical Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Anatomical Structure Selector List */}
        <div className="lg:col-span-5 space-y-2">
          <span className="text-[11px] uppercase font-mono text-slate-500 block mb-2 font-semibold">
            Índice de Estructuras Histológicas:
          </span>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
            {filteredLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayerId(layer.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
                  activeLayerId === layer.id
                    ? 'bg-slate-900 border-cyan-500/60 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    layer.category === 'shaft' ? 'bg-cyan-400' :
                    layer.category === 'follicle' ? 'bg-amber-400' : 'bg-purple-400'
                  }`} />
                  <div>
                    <h4 className={`text-xs font-semibold ${activeLayerId === layer.id ? 'text-white font-bold' : 'text-slate-300'}`}>
                      {layer.name}
                    </h4>
                    <p className="text-[10px] font-mono text-slate-500">
                      {layer.scientificName}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono text-[11px] text-slate-500 shrink-0">
                  <span className="block text-slate-400 font-medium">{layer.magnification}</span>
                  <span className="text-[10px] text-slate-600">{layer.depth}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Histological Card with Visual Asset */}
        <div className="lg:col-span-7 bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-6">
          {/* Visual Header with Real Image */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[16/9] bg-slate-950">
            <img
              src={activeLayer.imageUrl || HAIR_IMAGES.cuticleSem}
              alt={activeLayer.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase bg-cyan-950/90 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  {activeLayer.category === 'shaft' ? 'Tallo Capilar' : activeLayer.category === 'follicle' ? 'Folículo Piloso' : 'Biomolécula'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  Magnificación: <strong className="text-white">{activeLayer.magnification}</strong>
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">
                {activeLayer.name}
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                {activeLayer.scientificName}
              </p>
            </div>
          </div>

          {/* Description & Function */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold block">
              Función Biológica & Ultraestructura:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {activeLayer.detailedFunction}
            </p>
          </div>

          {/* Two-Column Technical Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Biochemical Composition */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold block flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5" />
                Composición Bioquímica:
              </span>
              <p className="text-slate-300 leading-normal">
                {activeLayer.biochemicalComposition}
              </p>
            </div>

            {/* Salon / Styling Relevance */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-mono text-amber-400 uppercase font-bold block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Relevancia en Estilismo:
              </span>
              <p className="text-slate-300 leading-normal">
                {activeLayer.clinicalImportance}
              </p>
            </div>
          </div>

          {/* pH Sensitivity Indicator */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-mono">Sensibilidad Química & pH:</span>
            <span className="font-mono text-emerald-400 font-semibold">{activeLayer.phBehavior}</span>
          </div>
        </div>
      </div>

      {/* 3. Hair Follicle Cycle Section (Anagen, Catagen, Telogen) */}
      <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold block">
              CICLO BIOLÓGICO DE LA TRICOGÉNESIS
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Fases Fisiológicas del Folículo Piloso Humano
            </h3>
          </div>

          {/* Cycle Phase Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveCyclePhase('anagen')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCyclePhase === 'anagen'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Anágena (Crecimiento)
            </button>
            <button
              onClick={() => setActiveCyclePhase('catagen')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCyclePhase === 'catagen'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Catágena (Involución)
            </button>
            <button
              onClick={() => setActiveCyclePhase('telogen')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeCyclePhase === 'telogen'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Telógena (Caída)
            </button>
          </div>
        </div>

        {/* Cycle Detail Content */}
        {activeCyclePhase === 'anagen' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-emerald-400 uppercase font-semibold text-[11px] block">
                Duración & Proporción:
              </span>
              <p className="text-xl font-bold text-white font-mono">2 a 7 Años</p>
              <p className="text-slate-400">Aproximadamente el 85% al 90% de los folículos del cuero cabelludo se encuentran en esta fase activa constante.</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-cyan-400 uppercase font-semibold text-[11px] block">
                Actividad Celular:
              </span>
              <p className="text-white leading-relaxed">
                Mitosis intensa en la matriz germinativa. Los queratinocitos se duplican cada 24 horas y los melanocitos sintetizan melanosomas activamente, otorgando el color natural.
              </p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-amber-400 uppercase font-semibold text-[11px] block">
                Tasa de Crecimiento:
              </span>
              <p className="text-xl font-bold text-amber-400 font-mono">~1.0 a 1.2 cm / mes</p>
              <p className="text-slate-400">Nutrición constante a través de los capilares de la papila dérmica con alto consumo de glucosa y aminoácidos azufrados.</p>
            </div>
          </div>
        )}

        {activeCyclePhase === 'catagen' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-amber-400 uppercase font-semibold text-[11px] block">
                Duración & Proporción:
              </span>
              <p className="text-xl font-bold text-white font-mono">2 a 3 Semanas</p>
              <p className="text-slate-400">Fase de transición rápida que afecta a menos del 1% al 2% de los folículos capilares de forma simultánea.</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-cyan-400 uppercase font-semibold text-[11px] block">
                Involución y Apoptosis:
              </span>
              <p className="text-white leading-relaxed">
                Cese abrupto de la mitosis celular. Los melanocitos detienen la producción de melanina y la vaina radicular interna desaparece por apoptosis controlada.
              </p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-amber-400 uppercase font-semibold text-[11px] block">
                Desconexión Papilar:
              </span>
              <p className="text-white leading-relaxed">
                La papila dérmica se condensa y se desprende de la base del bulbo piloso, migrando hacia arriba hasta situarse junto a la protuberancia (bulge).
              </p>
            </div>
          </div>
        )}

        {activeCyclePhase === 'telogen' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-rose-400 uppercase font-semibold text-[11px] block">
                Duración & Caída Fisiológica:
              </span>
              <p className="text-xl font-bold text-white font-mono">2 a 4 Meses</p>
              <p className="text-slate-400">10% al 15% del cabello. Es normal una pérdida diaria fisiológica de 50 a 100 cabellos en telógeno.</p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-cyan-400 uppercase font-semibold text-[11px] block">
                Cabello en Maza (Club Hair):
              </span>
              <p className="text-white leading-relaxed">
                El extremo proximal del cabello se cornifica completamente formando una masa redondeada rígida ("raíz de bulbo telógeno blanco").
              </p>
            </div>
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <span className="font-mono text-emerald-400 uppercase font-semibold text-[11px] block">
                Reactivación Anágena:
              </span>
              <p className="text-white leading-relaxed">
                Las células madre del bulge reciben señales moleculares Wnt de la papila dérmica para proliferar, iniciando un nuevo tallo que expulsa al pelo viejo (exógena).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
