import React, { useState, useEffect } from 'react';
import { HAIR_IMAGES } from '../data/hairAnatomyData';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Film, 
  Compass, 
  Layers, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Maximize2,
  ChevronRight,
  Tv
} from 'lucide-react';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  timecode: string;
  durationSeconds: number;
  image: string;
  magnification: string;
  narrationProse: string[];
  scientificInsights: string[];
  hotspots: { x: number; y: number; label: string; detail: string }[];
}

export const DocumentaryMode: React.FC = () => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      title: 'Capítulo 1: El Génesis en las Profundidades Dérmicas',
      subtitle: 'La Fábrica de Queratina y la Matriz Germinativa',
      timecode: '04:12:00',
      durationSeconds: 45,
      image: HAIR_IMAGES.follicleAnatomy,
      magnification: '500x - Histología Dérmica',
      narrationProse: [
        'A tres milímetros bajo la superficie del cuero cabelludo, inmerso en la dermis reticular, late uno de los motores biológicos más activos del organismo humano: el folículo piloso.',
        'En la base del bulbo, una densa red de capilares sanguíneos en la papila dérmica suministra oxígeno y glucosa sin descanso. Aquí, células matriciales se dividen a un ritmo vertiginoso, empujando hacia arriba queratinocitos que sintetizan toneladas microscópicas de proteína fibrosa antes de cornificarse.',
        'Al mismo tiempo, los melanocitos inyectan melanosomas con eumelanina y feomelanina, definiendo con precisión genética el color natural de cada hebra.'
      ],
      scientificInsights: [
        'Duplicación celular mitótica cada 24 horas',
        'Secreción continua de factores de crecimiento FGF-7 y VEGF',
        'Vaina radicular interna como troquel mecánico de la curvatura'
      ],
      hotspots: [
        { x: 48, y: 72, label: 'Papila Dérmica', detail: 'Red microvascular nutricional y señalización de crecimiento anágeno' },
        { x: 42, y: 55, label: 'Matriz Germinativa', detail: 'Células madre pluripotentes en continua división celular' },
        { x: 70, y: 32, label: 'Glándula Sebácea', detail: 'Secreción del manto hidrolipídico ácido protector pH 4.5 - 5.5' }
      ]
    },
    {
      id: 2,
      title: 'Capítulo 2: La Fortaleza Acorazada de la Cutícula',
      subtitle: 'Escamas Superpuestas y la Capa F Lipídica',
      timecode: '12:45:00',
      durationSeconds: 40,
      image: HAIR_IMAGES.cuticleSem,
      magnification: '10,000x - Microscopía Electrónica SEM',
      narrationProse: [
        'Al emerger al exterior, el tallo capilar se blinda con una coraza milimétrica: la cutícula. Compuesta por seis a diez capas de células aplanadas superpuestas como las tejas de un tejado.',
        'La superficie externa está recubierta por una película monomolecular de ácido 18-metileicosanoico, la legendaria "Capa F". Este lípido natural otorga al cabello virgen una hidrofobicidad absoluta: el agua resbala sin penetrar.',
        'Bajo la superficie, la exocutícula resiste la fricción mecánica con un contenido de azufre del 30%, mientras que la endocutícula esponjosa actúa como amortiguador osmótico.'
      ],
      scientificInsights: [
        'Monocapa de lípido 18-MEA anclada covalentemente por enlaces tioéster',
        'Resistencia a más de 100.000 ciclos de cepillado mecánico en cabello sano',
        'Hinchamiento asimétrico que abre las escamas ante pH > 8.5'
      ],
      hotspots: [
        { x: 35, y: 45, label: 'Borde de Escama', detail: 'Límite celular queratinizado con ángulo nativo inferior a 5 grados' },
        { x: 62, y: 30, label: 'Capa F (18-MEA)', detail: 'Monocapa lipídica impermeabilizante destruida en la primera decoloración' },
        { x: 80, y: 65, label: 'Complejo Intercelular (CMC)', detail: 'Cemento trilaminar de ceramidas y colesterol que pega las escamas' }
      ]
    },
    {
      id: 3,
      title: 'Capítulo 3: El Núcleo de Resistencia en el Córtex',
      subtitle: 'Macrofibrillas, Matriz y Gránulos de Melanina',
      timecode: '21:18:00',
      durationSeconds: 50,
      image: HAIR_IMAGES.cortexUltrastructure,
      magnification: '25,000x - Ultraestructura 3D',
      narrationProse: [
        'Penetrando al corazón del cabello llegamos al córtex, responsable del 85% de la masa total y de toda su fuerza tensil. Millones de células alargadas contienen cilindros de macrofibrillas empaquetadas como cables de acero.',
        'Cada macrofibrilla encierra microfibrillas o filamentos intermedios, inmersos en una matriz amorfa rica en azufre. Aquí residen los puentes disulfuro, los auténticos candados moleculares que deciden si el cabello es lacio o rizado.',
        'Entre las fibras flotan millones de gránulos de melanina: la eumelanina, densa y resistente, y la feomelanina, rojiza y esquiva.'
      ],
      scientificInsights: [
        'Capacidad elástica de estiramiento hasta el 130% de su longitud en húmedo',
        'Red de enlaces disulfuro (-S-S-) con energía de 250 kJ/mol',
        'Dispersión óptica variable en la médula porosa central'
      ],
      hotspots: [
        { x: 45, y: 35, label: 'Haces de Macrofibrillas', detail: 'Conjuntos paralelos de microfibrillas embebidas en matriz KAP rica en azufre' },
        { x: 68, y: 42, label: 'Melanosomas', detail: 'Gránulos de eumelanina (pardo-negro) y feomelanina (amarillo-rojo)' },
        { x: 78, y: 70, label: 'Médula Porosa', detail: 'Canal alveolar con cámaras llenas de aire para termorregulación' }
      ]
    },
    {
      id: 4,
      title: 'Capítulo 4: La Alquimia del Estilismo Moderno',
      subtitle: 'Decoloración, Alisados y Reconstrucción Molecular',
      timecode: '33:05:00',
      durationSeconds: 45,
      image: HAIR_IMAGES.keratinBonds,
      magnification: '1,000,000x - Física Molecular',
      narrationProse: [
        'En el salón de belleza, el estilista profesional actúa como un químico cuántico. Al aplicar un decolorante, iones hidróxido disuelven el 18-MEA y el peróxido disuelve la melanina natural, arriesgando la formación de ácido cisteico.',
        'En un alisado químico, agentes reductores escinden los puentes disulfuro a cisteínas libres; la tensión mecánica desliza las microfibrillas, y el neutralizante ácido fija los nuevos enlaces en la posición deseada.',
        'Hoy, con la biotecnología de Plex y lípidos biomiméticos, el Instituto Divina Pastora enseña a reconectar molecularmente los enlaces rotos, devolviendo al cabello su elasticidad y tenacidad virgen.'
      ],
      scientificInsights: [
        'Ruptura reductora de puentes disulfuro con tioglicolato o cisteamina',
        'Sobreoxidación a ácido cisteico evitable mediante protectores bivalentes',
        'Reposición de masa mediante péptidos hidrolizados de menos de 1000 Dalton'
      ],
      hotspots: [
        { x: 48, y: 50, label: 'Puente Disulfuro (-S-S-)', detail: 'Diana de rotura en alisados permanentes y sobreoxidación en decoloración' },
        { x: 28, y: 38, label: 'Hélice Alfa de Queratina', detail: 'Superhélice proteica estabilizada por puentes de hidrógeno' },
        { x: 74, y: 62, label: 'Moléculas Reactivas (H2O2 / NH3)', detail: 'Agentes químicos del salón que inducen aperturas y reacciones redox' }
      ]
    }
  ];

  const currentChapter = chapters[currentChapterIndex];

  // Auto-advance narrative playback
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentChapterIndex < chapters.length - 1) {
          setCurrentChapterIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setCurrentChapterIndex(0);
        }
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentChapterIndex]);

  return (
    <div className="space-y-6">
      {/* 1. Cinematic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
            <Tv className="w-4 h-4 text-cyan-400" />
            EXPERIENCIA CINEMATOGRÁFICA · ESTILO DISCOVERY CHANNEL
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Documental Científico: El Universo Interior del Cabello Humano
          </h2>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentChapterIndex(prev => Math.max(0, prev - 1))}
            disabled={currentChapterIndex === 0}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Capítulo Anterior"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-md'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-slate-950" />
                <span>Pausar Narración</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Reproducir Documental</span>
              </>
            )}
          </button>

          <button
            onClick={() => setCurrentChapterIndex(prev => Math.min(chapters.length - 1, prev + 1))}
            disabled={currentChapterIndex === chapters.length - 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition-colors"
            title="Siguiente Capítulo"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Chapter Selection Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {chapters.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => {
              setCurrentChapterIndex(idx);
              setActiveHotspot(null);
            }}
            className={`p-3 rounded-xl border text-left transition-all ${
              currentChapterIndex === idx
                ? 'bg-slate-900 border-cyan-500/70 shadow-lg'
                : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-cyan-400 font-bold">0{ch.id} / 04</span>
              <span className="text-[10px] font-mono text-slate-500">{ch.magnification.split(' ')[0]}</span>
            </div>
            <h5 className="text-xs font-semibold text-slate-200 line-clamp-1">{ch.title.split(': ')[1]}</h5>
          </button>
        ))}
      </div>

      {/* 3. Cinematic Stage Viewport */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[16/9] shadow-2xl">
        <img
          src={currentChapter.image}
          alt={currentChapter.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />

        {/* Dark Vignette Overlay for Documentary Immersion */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60 pointer-events-none" />

        {/* Top Documentary HUD Telemetry */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md text-slate-300">
            <Film className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold">DISCOVERY CHANNEL · 5K ULTRA-HD</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{currentChapter.timecode}</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 backdrop-blur-md text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentChapter.magnification}</span>
          </div>
        </div>

        {/* Interactive Hotspot Pins on the Micrograph */}
        {currentChapter.hotspots.map((spot, idx) => (
          <div
            key={idx}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <button
              onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
              className="relative group focus:outline-none"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-lg transition-transform group-hover:scale-125">
                {idx + 1}
              </div>
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/90 text-cyan-300 text-[10px] px-2 py-0.5 rounded border border-slate-700 shadow-md pointer-events-none font-mono">
                {spot.label}
              </span>
            </button>

            {/* Hotspot Popover Modal */}
            {activeHotspot === idx && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 w-64 bg-slate-950/95 p-3.5 rounded-xl border border-cyan-500/60 shadow-2xl backdrop-blur-md text-xs">
                <div className="flex justify-between items-start mb-1">
                  <h6 className="font-bold text-white text-xs">{spot.label}</h6>
                  <button 
                    onClick={() => setActiveHotspot(null)} 
                    className="text-slate-500 hover:text-white text-xs font-mono ml-2"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-normal">
                  {spot.detail}
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Bottom Subtitle / Voiceover Banner */}
        <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
          <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 shadow-2xl backdrop-blur-md max-w-4xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                VOZ EN OFF · LOCUCIÓN CIENTÍFICA INSTITUCIONAL
              </span>
            </div>
            <p className="text-sm text-slate-100 font-medium leading-relaxed italic">
              "{currentChapter.narrationProse[0]}"
            </p>
          </div>
        </div>
      </div>

      {/* 4. Scientific Deep Dive & Clinical Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentChapter.scientificInsights.map((insight, idx) => (
          <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs flex items-start gap-3">
            <div className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 font-mono font-bold shrink-0 mt-0.5">
              {idx + 1}
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block mb-0.5">
                Hallazgo Tricológico
              </span>
              <p className="text-slate-300 leading-normal font-medium">
                {insight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
