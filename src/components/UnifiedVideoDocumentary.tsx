import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipForward, 
  SkipBack, 
  Compass, 
  Sparkles, 
  Eye, 
  Settings, 
  Tv, 
  CheckCircle2, 
  AlertTriangle,
  Rotate3d,
  Layers,
  Flame,
  Droplets,
  Scissors,
  Bookmark
} from 'lucide-react';
import { HAIR_IMAGES } from '../data/hairAnatomyData';

export interface VideoChapter {
  id: number;
  timeStart: number; // in seconds
  timeEnd: number;
  title: string;
  category: string;
  zoomLevel: 'macro' | 'cuticle' | 'ultrastructure' | 'microfibrils' | 'molecular';
  magnification: string;
  cutawayAngle: number;
  narrationLines: string[];
  hudTelemetry: {
    ph: string;
    temperature: string;
    chemicalAgent: string;
    targetBond: string;
    activeStructure: string;
  };
  featuredImage: string;
  subtitles: { time: number; text: string }[];
}

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    timeStart: 0,
    timeEnd: 150,
    title: 'Bloque I: El Origen Dérmico en el Folículo Piloso',
    category: 'GÉNESIS & HISTOLOGÍA CELULAR',
    zoomLevel: 'macro',
    magnification: '500x · Histología',
    cutawayAngle: 0,
    narrationLines: [
      'Bienvenidos al documental científico del Instituto Divina Pastora. Iniciamos nuestro viaje a tres milímetros de profundidad en la piel del cuero cabelludo, donde el folículo piloso actúa como una de las máquinas de biosíntesis más veloces del organismo.',
      'En la papila dérmica, una intrincada red de capilares sanguíneos suministra nutrientes, glucosa y aminoácidos a las células matriciales, que se multiplican cada 24 horas.',
      'Aquí los melanocitos producen los gránulos de eumelanina y feomelanina que definen el color natural, mientras la vaina radicular interna esculpe la curvatura del tallo en formación.'
    ],
    hudTelemetry: {
      ph: '7.35 Fisiológico',
      temperature: '37.0 °C',
      chemicalAgent: 'ATP + Aminoácidos Sanguíneos',
      targetBond: 'Mitosis & Enzimas TRP-1/2',
      activeStructure: 'Papila Dérmica & Matriz Germinativa'
    },
    featuredImage: HAIR_IMAGES.follicleAnatomy,
    subtitles: [
      { time: 0, text: 'INSTITUTO DIVINA PASTORA PRESENTA: ESTRUCTURA INTERNA DEL CABELLO Y MECANISMOS MOLECULARES' },
      { time: 10, text: 'Bloque 1: El Folículo Piloso, la bio-fábrica subterránea del cabello humano.' },
      { time: 30, text: 'En la papila dérmica, los capilares arteriolares bombean oxígeno y aminoácidos a la matriz germinativa.' },
      { time: 65, text: 'Los queratinocitos se duplican por mitosis cada 24 horas sintetizando queratina dura.' },
      { time: 105, text: 'Melanocitos dendríticos inyectan melanosomas, determinando genéticamente el tono natural del cabello.' }
    ]
  },
  {
    id: 2,
    timeStart: 150,
    timeEnd: 320,
    title: 'Bloque II: La Coraza Cuticular & El Ácido 18-MEA',
    category: 'BARRERA EXTERNA & CAPA F',
    zoomLevel: 'cuticle',
    magnification: '2,000x · Microscopía SEM',
    cutawayAngle: 0,
    narrationLines: [
      'Al ascender hacia la superficie, el tallo capilar se recubre de una armadura multicapa: la cutícula. Entre 6 y 10 capas de escamas transparentes se superponen en un patrón idéntico a las tejas de un tejado.',
      'La superficie exterior está blindada por la Capa F, una monocapa de ácido 18-metileicosanoico anclada covalentemente por enlaces tioéster. Este lípido es el responsable de que el cabello sano sea impermeable y repele el agua.',
      'Bajo ella encontramos la exocutícula, extraordinariamente rica en azufre con un 30% de cistina, y la endocutícula, más blanda y vulnerable a hincharse con soluciones alcalinas.'
    ],
    hudTelemetry: {
      ph: '4.5 - 5.5 Manto Ácido',
      temperature: '22.0 °C Ambiente',
      chemicalAgent: 'Ácido 18-metileicosanoico (18-MEA)',
      targetBond: 'Enlaces Tioéster & Enlace Covalente',
      activeStructure: 'Epicutícula, Exocutícula & CMC'
    },
    featuredImage: HAIR_IMAGES.cuticleSem,
    subtitles: [
      { time: 150, text: 'Bloque 2: Microscopía Electrónica de Barrido (SEM) sobre las escamas cuticulares.' },
      { time: 175, text: 'La Capa F de ácido 18-metileicosanoico (18-MEA) dota al cabello virgen de total hidrofobicidad.' },
      { time: 220, text: 'El Complejo de Membrana Celular (CMC) actúa como cemento lipídico entre escama y escama.' },
      { time: 270, text: 'La Exocutícula contiene un 30% de cistina, protegiendo al cabello del desgaste por fricción y cepillado.' }
    ]
  },
  {
    id: 3,
    timeStart: 320,
    timeEnd: 500,
    title: 'Bloque III: El Córtex, Macrofibrillas y la Médula',
    category: 'NÚCLEO DE FUERZA & RESISTENCIA',
    zoomLevel: 'ultrastructure',
    magnification: '10,000x · Ultraestructura 3D',
    cutawayAngle: 90,
    narrationLines: [
      'Ingresamos al córtex o corteza capilar, que constituye el 85% al 90% de la masa total de la fibra. Millones de células corticales fusiformes se agrupan en paralelo a lo largo del tallo.',
      'En su interior viajan las macrofibrillas, verdaderos cables de acero biológicos compuestos por filamentos intermedios embebidos en una matriz amorfa rica en azufre.',
      'Dispersos en el córtex encontramos los gránulos de melanina: la eumelanina, densa y granular, y la feomelanina, rojiza y difusa. En el centro exacto reside la médula porosa con sus cámaras de aire.'
    ],
    hudTelemetry: {
      ph: '3.67 Punto Isoeléctrico',
      temperature: '25.0 °C',
      chemicalAgent: 'Queratinas K31-K40 / K81-K86',
      targetBond: 'Matriz KAP & Melanosomas',
      activeStructure: 'Macrofibrillas & Médula Central'
    },
    featuredImage: HAIR_IMAGES.cortexUltrastructure,
    subtitles: [
      { time: 320, text: 'Bloque 3: Realizamos un corte transversal de 90 grados revelando la arquitectura del córtex.' },
      { time: 350, text: 'El córtex representa el 85% de la masa del cabello y concentra toda su resistencia a la tracción.' },
      { time: 400, text: 'Las macrofibrillas contienen cientos de microfibrillas embebidas en matriz proteica KAP.' },
      { time: 450, text: 'En el centro se aprecia la médula con vacuolas de gas que proporcionan aislamiento térmico.' }
    ]
  },
  {
    id: 4,
    timeStart: 500,
    timeEnd: 680,
    title: 'Bloque IV: La Escala Molecular y los Enlaces Disulfuro',
    category: 'NANOMECÁNICA CUÁNTICA',
    zoomLevel: 'molecular',
    magnification: '1,000,000x · Nanométrica',
    cutawayAngle: 120,
    narrationLines: [
      'Descendemos a la escala de los nanómetros. Cada microfibrilla está constituida por protofilamentos formados por dímeros de queratina en conformación de hélice alfa enrolladas entre sí en superhélice.',
      'Entre las cadenas polipeptídicas se forjan los tres grandes enlaces: los enlaces de hidrógeno, que se rompen con agua y calor en el peinado temporal; los enlaces salinos, dependientes del pH; y los imponentes puentes disulfuro covalentes.',
      'Con una energía de 250 kilojulios por mol, los puentes disulfuro de cistina son los que guardan la memoria permanente de si un cabello nace liso, ondulado o rizado.'
    ],
    hudTelemetry: {
      ph: '3.67 Máxima Cohesión',
      temperature: '37.0 °C',
      chemicalAgent: 'Residuos de Cisteína (-SH + HS-)',
      targetBond: 'Puentes Disulfuro (-S-S-)',
      activeStructure: 'Dímeros α-Hélice de Queratina'
    },
    featuredImage: HAIR_IMAGES.keratinBonds,
    subtitles: [
      { time: 500, text: 'Bloque 4: Magnificación extrema a 1.000.000x: dímeros en hélice alfa de queratina.' },
      { time: 535, text: 'Puentes de hidrógeno débiles se reorganizan con el secador y la plancha térmica a 180°C.' },
      { time: 580, text: 'Puentes salinos iónicos alcanzan su punto neutro de máxima fuerza en el pH 3.67.' },
      { time: 630, text: 'Los puentes disulfuro covalentes (-S-S-) aportan el 80% de la fuerza tensil mecánica.' }
    ]
  },
  {
    id: 5,
    timeStart: 680,
    timeEnd: 870,
    title: 'Bloque V: Mecanismos Químicos: Decoloración, Color y Alisado',
    category: 'REACTIVIDAD EN EL SALÓN',
    zoomLevel: 'ultrastructure',
    magnification: '15,000x · Reacción Química',
    cutawayAngle: 90,
    narrationLines: [
      'Al aplicar un decolorante con persulfatos y peróxido a pH 10.5, los álcalis hidrolizan la capa 18-MEA y abren la cutícula en un 45%. El ion perhidroxilo penetra al córtex oxidando y solubilizando los anillos de eumelanina.',
      'Si se sobreexpone, la cistina se oxida irreversiblemente a ácido cisteico, tornando el cabello quebradizo y gomoso. En la coloración permanente, precursores microscópicos como la PPD entran al córtex y polimerizan formando macromoléculas que quedan atrapadas.',
      'En el alisado químico con tioglicolato o cisteamina, iones tiolato reducen los puentes disulfuro, permitiendo alinear las hebras antes de que el neutralizante ácido los reforme en la nueva forma lisa.'
    ],
    hudTelemetry: {
      ph: 'pH 10.5 Alcalino Extremo',
      temperature: '38.0 °C Exotérmica',
      chemicalAgent: 'Persulfatos + H2O2 + NH3',
      targetBond: 'Oxidación Melánica & Tiolato',
      activeStructure: 'Lisis de Melanosomas en Córtex'
    },
    featuredImage: HAIR_IMAGES.keratinBonds,
    subtitles: [
      { time: 680, text: 'Bloque 5: Reactividad química profesional en decoloración y transformaciones.' },
      { time: 715, text: 'Los persulfatos alcalinos destruyen la capa 18-MEA e hinchan la endocutícula.' },
      { time: 760, text: 'Iones perhidroxilo disuelven la eumelanina. El riesgo: sobreoxidación a ácido cisteico.' },
      { time: 810, text: 'En alisados, el tioglicolato escinde puentes -S-S- a tioles libres; el neutralizante los vuelve a sellar.' }
    ]
  },
  {
    id: 6,
    timeStart: 870,
    timeEnd: 1080,
    title: 'Bloque VI: Hidratación, Plex & Mecánica del Corte',
    category: 'TERAPIA BIOMIMÉTICA & FINAL',
    zoomLevel: 'macro',
    magnification: '1,000x · Microscopía Óptica',
    cutawayAngle: 45,
    narrationLines: [
      'Llegamos a la fase de reparación y corte clínico. La hidratación repone agua ligada en puentes de hidrógeno, mientras que la nutrición devuelve ceramidas y lípidos biomiméticos al CMC.',
      'La tecnología de enlaces Plex utiliza moléculas bivalentes como el maleato para reconectar químicamente los puentes disulfuro rotos, frenando la rotura elástica.',
      'Por último, el corte con tijera japonesa de filo convexo sella limpiamente el extremo del cilindro de queratina, evitando el deshilachado de las macrofibrillas y la temida tricoptilosis o puntas abiertas.'
    ],
    hudTelemetry: {
      ph: '3.80 Acondicionador Ácido',
      temperature: '22.0 °C',
      chemicalAgent: 'Plex Bivalente + 18-MEA Mimético',
      targetBond: 'Reconexión Covalente Artificial',
      activeStructure: 'Sellado Apical & Bicapa CMC'
    },
    featuredImage: HAIR_IMAGES.cuticleSem,
    subtitles: [
      { time: 870, text: 'Bloque 6: Restauración biomimética de la fibra y corte de precisión.' },
      { time: 900, text: 'Tecnología Plex actúa como puente artificial covalente entre cisteínas rotas.' },
      { time: 945, text: 'La reposición lipídica restaura la repelencia al agua y la fricción suave de la cutícula.' },
      { time: 1000, text: 'El corte limpio con tijera afilada previene la deslaminación y las puntas abiertas (tricoptilosis).' },
      { time: 1040, text: 'INSTITUTO DIVINA PASTORA · FORMANDO A LA NUEVA GENERACIÓN DE ESTILISTAS Y TRICÓLOGOS' }
    ]
  }
];

export const UnifiedVideoDocumentary: React.FC = () => {
  // Video player timing state
  const totalDuration = 1080; // 18 minutes in seconds
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isVoiceOverActive, setIsVoiceOverActive] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showChaptersDrawer, setShowChaptersDrawer] = useState<boolean>(false);

  // 3D Canvas References
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const hairGroupRef = useRef<THREE.Group | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isDragging3DRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Current active chapter based on time
  const currentChapter = VIDEO_CHAPTERS.find(
    (c) => currentTime >= c.timeStart && currentTime < c.timeEnd
  ) || VIDEO_CHAPTERS[VIDEO_CHAPTERS.length - 1];

  // Current active subtitle
  const activeSubtitle = currentChapter.subtitles
    .slice()
    .reverse()
    .find((s) => currentTime >= s.time);

  // Time formatting helper
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Playback timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Voiceover Web Speech API Synthesizer Integration
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    if (!isVoiceOverActive || !isPlaying) {
      window.speechSynthesis.cancel();
      return;
    }

    // When subtitles change, speak the new sentence
    if (activeSubtitle && activeSubtitle.text) {
      window.speechSynthesis.cancel(); // stop previous line
      const utterance = new SpeechSynthesisUtterance(activeSubtitle.text);
      utterance.lang = 'es-ES';
      utterance.rate = 1.05 * playbackSpeed;
      utterance.pitch = 0.98;
      speechUtteranceRef.current = utterance;
      
      // Try to find Spanish voice
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.startsWith('es'));
      if (spanishVoice) utterance.voice = spanishVoice;

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [activeSubtitle?.text, isVoiceOverActive, isPlaying, playbackSpeed]);

  // Initialize Three.js 3D WebGL World inside the Video Player Viewport
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x04060a);
    scene.fog = new THREE.FogExp2(0x04060a, 0.018);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 8, 30);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Studio Lights
    const ambient = new THREE.AmbientLight(0x2d3748, 1.2);
    scene.add(ambient);

    const keyCyan = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyCyan.position.set(20, 20, 25);
    scene.add(keyCyan);

    const rimGold = new THREE.DirectionalLight(0xf59e0b, 2.5);
    rimGold.position.set(-20, -10, -20);
    scene.add(rimGold);

    // Coordinate grid floor
    const grid = new THREE.GridHelper(40, 40, 0x1e293b, 0x090d16);
    grid.position.y = -12;
    scene.add(grid);

    // Main 3D hair group
    const hairGroup = new THREE.Group();
    hairGroupRef.current = hairGroup;
    scene.add(hairGroup);

    // Populate initial geometry
    buildCinematicGeometry(hairGroup, currentChapter.zoomLevel, currentChapter.cutawayAngle);

    // User 360 interaction on video
    const onMouseDown = (e: MouseEvent) => {
      isDragging3DRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging3DRef.current || !hairGroupRef.current) return;
      const dx = e.clientX - prevMousePosRef.current.x;
      const dy = e.clientY - prevMousePosRef.current.y;
      hairGroupRef.current.rotation.y += dx * 0.007;
      hairGroupRef.current.rotation.x += dy * 0.007;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging3DRef.current = false;
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.02;
      cameraRef.current.position.z = Math.max(12, Math.min(45, cameraRef.current.position.z));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for 360 drag on mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging3DRef.current = true;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging3DRef.current || !hairGroupRef.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevMousePosRef.current.x;
      const dy = e.touches[0].clientY - prevMousePosRef.current.y;
      hairGroupRef.current.rotation.y += dx * 0.009;
      hairGroupRef.current.rotation.x += dy * 0.009;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging3DRef.current = false;
    };
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Animation Loop with Director Camera Tracking
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth auto rotation if not dragging
      if (hairGroupRef.current && !isDragging3DRef.current) {
        hairGroupRef.current.rotation.y += 0.005;
        hairGroupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.2;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!containerRef() || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef().clientWidth;
      const h = containerRef().clientHeight || 540;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    function containerRef() { return container; }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // When chapter changes, rebuild 3D geometry smoothly
  useEffect(() => {
    if (hairGroupRef.current) {
      buildCinematicGeometry(hairGroupRef.current, currentChapter.zoomLevel, currentChapter.cutawayAngle);
    }
    // Adjust camera distance based on chapter
    if (cameraRef.current) {
      const zDist = currentChapter.zoomLevel === 'macro' ? 32 :
                    currentChapter.zoomLevel === 'cuticle' ? 24 :
                    currentChapter.zoomLevel === 'ultrastructure' ? 22 :
                    currentChapter.zoomLevel === 'microfibrils' ? 18 : 15;
      cameraRef.current.position.set(0, currentChapter.zoomLevel === 'molecular' ? 2 : 5, zDist);
    }
  }, [currentChapter.id]);

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(totalDuration, newTime)));
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
            <Tv className="w-4 h-4 text-cyan-400" />
            EL DOCUMENTAL CIENTÍFICO MAESTRO · INSTITUTO DIVINA PASTORA
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            Estructura Interna del Cabello & Mecanismos Moleculares
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            Todo el conocimiento anatómico, histológico, biofísico y químico integrado en un único vídeo documental interactivo en Ultra-HD con microscopía 360° en vivo y locución guiada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChaptersDrawer(!showChaptersDrawer)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-2"
          >
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Índice de Capítulos ({VIDEO_CHAPTERS.length})</span>
          </button>
        </div>
      </div>

      {/* 2. THE MASTER UNIFIED VIDEO VIEWPORT */}
      <div 
        ref={videoContainerRef}
        className="relative w-full rounded-2xl bg-black border border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] min-h-[520px] flex flex-col justify-between"
      >
        {/* Layer A: Real-time 3D WebGL Interactive Simulation */}
        <div 
          ref={canvasContainerRef} 
          className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
          title="Arrastra en 360° para inspeccionar el modelo 3D en cualquier momento del vídeo"
        />

        {/* Layer B: Cinematic Vignettes and TV Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none z-10" />

        {/* Top Video Telemetry Ribbon */}
        <div className="relative z-20 flex items-center justify-between p-4 md:p-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="bg-red-600/90 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              DOCUMENTAL 5K · EN EMISIÓN
            </span>
            <span className="text-slate-300 font-bold hidden sm:inline">
              {currentChapter.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-slate-950/80 text-cyan-400 border border-slate-800 px-2.5 py-1 rounded backdrop-blur-md">
              {currentChapter.magnification}
            </span>
            <span className="bg-slate-950/80 text-amber-400 border border-slate-800 px-2.5 py-1 rounded backdrop-blur-md">
              {currentChapter.hudTelemetry.ph}
            </span>
          </div>
        </div>

        {/* Center 360° Interaction Hint (Only displays briefly) */}
        <div className="relative z-20 pointer-events-none flex justify-center">
          <div className="bg-slate-950/75 border border-slate-800 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-300 backdrop-blur-md flex items-center gap-2 opacity-80">
            <Rotate3d className="w-3.5 h-3.5 text-cyan-400" />
            <span>Modo 360° Activo: Puedes interactuar y girar el modelo libremente durante el vídeo</span>
          </div>
        </div>

        {/* Lower Thirds & Dynamic Subtitle Overlay */}
        <div className="relative z-20 p-4 md:p-6 space-y-4 max-w-4xl">
          {/* Active Clinical Telemetry Floating Pill */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span className="bg-cyan-950/90 text-cyan-300 border border-cyan-800/80 px-2.5 py-1 rounded backdrop-blur-md">
              Estructura: <strong>{currentChapter.hudTelemetry.activeStructure}</strong>
            </span>
            <span className="bg-slate-950/90 text-slate-300 border border-slate-800 px-2.5 py-1 rounded backdrop-blur-md">
              Diana Química: <strong>{currentChapter.hudTelemetry.targetBond}</strong>
            </span>
            <span className="bg-slate-950/90 text-emerald-400 border border-slate-800 px-2.5 py-1 rounded backdrop-blur-md">
              Reactivo: <strong>{currentChapter.hudTelemetry.chemicalAgent}</strong>
            </span>
          </div>

          {/* Subtitle Teleprompter Box */}
          <div className="bg-black/85 p-3.5 md:p-4 rounded-xl border border-slate-800 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-2 mb-1 text-[10px] font-mono uppercase text-cyan-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>LOCUCIÓN CIENTÍFICA · CAPÍTULO 0{currentChapter.id}</span>
            </div>
            <p className="text-sm md:text-base font-medium text-white leading-relaxed italic">
              "{activeSubtitle?.text || currentChapter.narrationLines[0]}"
            </p>
          </div>
        </div>

        {/* Bottom Video Controls Player Bar */}
        <div className="relative z-20 bg-slate-950/95 border-t border-slate-800 p-3 md:p-4 backdrop-blur-md space-y-2">
          {/* Timeline Scrubber */}
          <div className="space-y-1">
            <div className="relative w-full h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden group">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full transition-all duration-150"
                style={{ width: `${(currentTime / totalDuration) * 100}%` }}
              />
              <input
                type="range"
                min="0"
                max={totalDuration}
                value={currentTime}
                onChange={(e) => handleSeek(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
              />
            </div>

            {/* Chapter Markers on the Timeline Bar */}
            <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-0.5">
              {VIDEO_CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handleSeek(ch.timeStart)}
                  className={`hover:text-cyan-300 transition-colors ${
                    currentTime >= ch.timeStart && currentTime < ch.timeEnd ? 'text-cyan-400 font-bold' : ''
                  }`}
                >
                  0{ch.id}. {ch.title.split(':')[0].replace('Bloque ', 'B')}
                </button>
              ))}
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold flex items-center justify-center transition-all shadow-md"
                title={isPlaying ? 'Pausar Vídeo' : 'Reproducir Vídeo'}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
              </button>

              {/* Skip back 10s */}
              <button
                onClick={() => handleSeek(currentTime - 10)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Retroceder 10s"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Skip Chapter */}
              <button
                onClick={() => {
                  const nextCh = VIDEO_CHAPTERS.find(c => c.timeStart > currentTime);
                  if (nextCh) handleSeek(nextCh.timeStart);
                }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Siguiente Bloque Temático"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              {/* Digital Timecode Display */}
              <div className="font-mono text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-cyan-400 font-bold">{formatTime(currentTime)}</span>
                <span className="text-slate-600"> / </span>
                <span className="text-slate-500">{formatTime(totalDuration)}</span>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Voiceover Speech Audio Toggle */}
              <button
                onClick={() => setIsVoiceOverActive(!isVoiceOverActive)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors border flex items-center gap-1.5 ${
                  isVoiceOverActive
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
                title="Activar/Desactivar Voz de Locución Sintetizada en Español"
              >
                {isVoiceOverActive ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isVoiceOverActive ? 'Voz en Off: ON' : 'Voz en Off: MUTE'}</span>
              </button>

              {/* Speed Selector */}
              <div className="flex items-center bg-slate-900 rounded-lg border border-slate-800 p-0.5 text-xs font-mono">
                {[1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                title="Pantalla Completa"
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Chapter Drawer (Jump to any part of the master video) */}
      <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
              ESTRUCTURA INTEGRADA DEL VÍDEO COMPLETO
            </span>
            <h4 className="text-base font-bold text-white">
              Guía Temática del Documental: Selecciona cualquier capítulo para saltar en tiempo real
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Duración Total: 18:00 min
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {VIDEO_CHAPTERS.map((ch) => {
            const isCurrent = currentTime >= ch.timeStart && currentTime < ch.timeEnd;
            return (
              <button
                key={ch.id}
                onClick={() => handleSeek(ch.timeStart)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg ring-1 ring-cyan-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                      {ch.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formatTime(ch.timeStart)} - {formatTime(ch.timeEnd)}
                    </span>
                  </div>
                  <h5 className={`text-xs font-bold leading-snug ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                    {ch.title}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {ch.narrationLines[0]}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-400">{ch.magnification}</span>
                  <span className="text-cyan-400 font-semibold">{isCurrent ? '▶ REPRODUCIENDO' : 'Saltar aquí →'}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Three.js Procedural 3D Scene Animator
// ==========================================
function buildCinematicGeometry(group: THREE.Group, zoomLevel: string, cutawayAngle: number) {
  while (group.children.length > 0) {
    const obj = group.children[0];
    group.remove(obj);
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
  }

  if (zoomLevel === 'macro') {
    // Macro cylindrical strand
    const geo = new THREE.CylinderGeometry(3.5, 3.5, 24, 48, 20);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setX(i, pos.getX(i) + Math.sin(y * 0.3) * 0.6);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x332219,
      roughness: 0.25,
      metalness: 0.1,
      clearcoat: 0.8,
      sheen: 0.7,
      sheenColor: new THREE.Color(0xf59e0b)
    });
    group.add(new THREE.Mesh(geo, mat));

    // Concentric micro-ridges
    for (let r = 0; r < 20; r++) {
      const ringGeo = new THREE.TorusGeometry(3.55, 0.08, 10, 48);
      const ringMat = new THREE.MeshStandardMaterial({ color: 0x5a3e2b, roughness: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (r - 10) * 1.1;
      group.add(ring);
    }

  } else if (zoomLevel === 'cuticle') {
    // Cuticle scale scan
    const tiers = 12;
    const shingles = 8;
    for (let t = 0; t < tiers; t++) {
      const y = (t - tiers / 2) * 1.3;
      for (let s = 0; s < shingles; s++) {
        const angle = (s / shingles) * Math.PI * 2 + (t % 2) * (Math.PI / shingles);
        const scaleGeo = new THREE.BoxGeometry(2.2, 1.8, 0.22);
        const scaleMat = new THREE.MeshPhysicalMaterial({
          color: 0x785642,
          roughness: 0.3,
          clearcoat: 0.7,
          reflectivity: 0.9
        });
        const mesh = new THREE.Mesh(scaleGeo, scaleMat);
        mesh.position.set(Math.cos(angle) * 4.2, y, Math.sin(angle) * 4.2);
        mesh.rotation.y = -angle + Math.PI / 2;
        mesh.rotation.x = 0.2;
        group.add(mesh);
      }
    }

  } else if (zoomLevel === 'ultrastructure') {
    // Cross section cutaway
    const thetaStart = (cutawayAngle * Math.PI) / 180;
    const thetaLength = Math.PI * 2 - thetaStart;

    // Outer Cuticle
    const cuticleGeo = new THREE.CylinderGeometry(4.8, 4.8, 15, 48, 1, false, thetaStart, thetaLength);
    const cuticleMat = new THREE.MeshPhysicalMaterial({ color: 0x5a3d28, roughness: 0.3, clearcoat: 0.9, side: THREE.DoubleSide });
    group.add(new THREE.Mesh(cuticleGeo, cuticleMat));

    // Cortex mass
    const cortexGeo = new THREE.CylinderGeometry(4.2, 4.2, 14.8, 48, 1, false, thetaStart, thetaLength);
    const cortexMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.5, side: THREE.DoubleSide });
    group.add(new THREE.Mesh(cortexGeo, cortexMat));

    // Macrofibrils inside cortex
    for (let m = 0; m < 14; m++) {
      const rDist = 1.4 + Math.random() * 2.1;
      const angle = (m / 14) * thetaLength + thetaStart;
      const geo = new THREE.CylinderGeometry(0.35, 0.35, 14.2, 12);
      const mat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(Math.cos(angle) * rDist, 0, Math.sin(angle) * rDist);
      group.add(mesh);
    }

    // Porous medulla center
    const medullaGeo = new THREE.CylinderGeometry(1.2, 1.2, 15.1, 24, 1, false, thetaStart, thetaLength);
    const medullaMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, wireframe: true, side: THREE.DoubleSide });
    group.add(new THREE.Mesh(medullaGeo, medullaMat));

  } else if (zoomLevel === 'molecular') {
    // Keratin alpha-helix coiled coil with golden disulfide bridges
    const length = 16;
    const turns = 5;
    const radius = 2.4;

    for (let h = 0; h < 2; h++) {
      const phase = h * Math.PI;
      const points: THREE.Vector3[] = [];
      const segs = 100;
      for (let s = 0; s <= segs; s++) {
        const t = (s / segs) * turns * Math.PI * 2;
        const y = (s / segs) * length - length / 2;
        points.push(new THREE.Vector3(Math.cos(t + phase) * radius, y, Math.sin(t + phase) * radius));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tube = new THREE.TubeGeometry(curve, 80, 0.28, 10, false);
      const mat = new THREE.MeshPhysicalMaterial({ color: h === 0 ? 0x38bdf8 : 0x0ea5e9, clearcoat: 0.8 });
      group.add(new THREE.Mesh(tube, mat));
    }

    // Glowing disulfide bridges
    for (let b = 0; b < 6; b++) {
      const y = (b / 6) * (length - 4) - (length - 4) / 2;
      const bridgeGeo = new THREE.CylinderGeometry(0.2, 0.2, radius * 2, 10);
      bridgeGeo.rotateZ(Math.PI / 2);
      const bridgeMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.8
      });
      const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
      bridge.position.set(0, y, 0);
      group.add(bridge);
    }
  }
}
