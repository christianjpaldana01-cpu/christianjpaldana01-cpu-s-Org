import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ZoomLevel, HairType, AnatomicalLayer } from '../types/hair';
import { ANATOMICAL_LAYERS } from '../data/hairAnatomyData';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Crosshair, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Compass, 
  Activity, 
  HelpCircle,
  Maximize2
} from 'lucide-react';

interface Props {
  onSelectLayer?: (layer: AnatomicalLayer) => void;
}

export const Microscope360Viewer: React.FC<Props> = ({ onSelectLayer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('ultrastructure');
  const [hairType, setHairType] = useState<HairType>('wavy');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [selectedLayerId, setSelectedLayerId] = useState<string>('cortex');
  
  // Layer visibility toggles
  const [visibleCuticle, setVisibleCuticle] = useState<boolean>(true);
  const [visibleCortex, setVisibleCortex] = useState<boolean>(true);
  const [visibleMedulla, setVisibleMedulla] = useState<boolean>(true);
  const [visibleMelanin, setVisibleMelanin] = useState<boolean>(true);
  const [cutawayAngle, setCutawayAngle] = useState<number>(90); // 0 to 180 degrees cutaway

  // Camera telemetry readout state
  const [azimuth, setAzimuth] = useState<number>(45);
  const [elevation, setElevation] = useState<number>(20);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const hairGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Selected layer data
  const selectedLayer = ANATOMICAL_LAYERS.find(l => l.id === selectedLayerId) || ANATOMICAL_LAYERS[4];

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 580;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060911);

    // Subtle atmospheric fog for documentary depth
    scene.fog = new THREE.FogExp2(0x060911, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 10, 32);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Clean any prior children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Studio & Lab Lighting (Discovery Channel clinical documentary aesthetic)
    const ambientLight = new THREE.AmbientLight(0x384152, 0.9);
    scene.add(ambientLight);

    // Laser cyan key light
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.2);
    keyLight.position.set(20, 25, 20);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Warm golden amber rim light (simulating keratin protein birefringence)
    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
    rimLight.position.set(-25, -15, -20);
    scene.add(rimLight);

    // Top clinical downlight
    const topLight = new THREE.PointLight(0xffffff, 1.2, 50);
    topLight.position.set(0, 25, 5);
    scene.add(topLight);

    // 5. Grid helper (Subtle coordinate measurement plane)
    const gridHelper = new THREE.GridHelper(30, 30, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -10;
    scene.add(gridHelper);

    // 6. Hair 3D assembly group
    const hairGroup = new THREE.Group();
    hairGroupRef.current = hairGroup;
    scene.add(hairGroup);

    // Build the 3D structures based on zoom level and options
    rebuild3DStructure(hairGroup, zoomLevel, hairType, visibleCuticle, visibleCortex, visibleMedulla, visibleMelanin, cutawayAngle);

    // Mouse / Touch orbit interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !hairGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      hairGroupRef.current.rotation.y += deltaX * 0.008;
      hairGroupRef.current.rotation.x += deltaY * 0.008;

      // Update telemetry readouts
      setAzimuth(Math.round(((hairGroupRef.current.rotation.y * 180) / Math.PI) % 360));
      setElevation(Math.round(((hairGroupRef.current.rotation.x * 180) / Math.PI) % 360));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z += e.deltaY * 0.02;
      cameraRef.current.position.z = Math.max(12, Math.min(50, cameraRef.current.position.z));
    };

    // Touch events for mobile 360 rotation
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !hairGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      hairGroupRef.current.rotation.y += deltaX * 0.01;
      hairGroupRef.current.rotation.x += deltaY * 0.01;

      setAzimuth(Math.round(((hairGroupRef.current.rotation.y * 180) / Math.PI) % 360));
      setElevation(Math.round(((hairGroupRef.current.rotation.x * 180) / Math.PI) % 360));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('wheel', handleWheel, { passive: false });
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (hairGroupRef.current && isAutoRotating && !isDraggingRef.current) {
        hairGroupRef.current.rotation.y += 0.004;
        setAzimuth(Math.round(((hairGroupRef.current.rotation.y * 180) / Math.PI) % 360));
      }

      // Gentle floating animation
      if (hairGroupRef.current) {
        hairGroupRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.25;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Responsive resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 580;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('wheel', handleWheel);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  // Update structure whenever zoomLevel, hairType, cutawayAngle or visibility toggles change
  useEffect(() => {
    if (hairGroupRef.current) {
      rebuild3DStructure(
        hairGroupRef.current, 
        zoomLevel, 
        hairType, 
        visibleCuticle, 
        visibleCortex, 
        visibleMedulla, 
        visibleMelanin, 
        cutawayAngle
      );
    }
  }, [zoomLevel, hairType, visibleCuticle, visibleCortex, visibleMedulla, visibleMelanin, cutawayAngle]);

  // Adjust camera distance based on zoom level
  useEffect(() => {
    if (!cameraRef.current) return;
    const targetZ = zoomLevel === 'macro' ? 36 :
                    zoomLevel === 'cuticle' ? 26 :
                    zoomLevel === 'ultrastructure' ? 24 :
                    zoomLevel === 'microfibrils' ? 20 : 16;
    
    // Smooth camera reposition
    cameraRef.current.position.set(0, zoomLevel === 'molecular' ? 2 : 6, targetZ);
  }, [zoomLevel]);

  return (
    <div className="relative w-full rounded-2xl bg-[#07090e] border border-slate-800 shadow-2xl overflow-hidden">
      {/* 1. Top Clinical Telemetry Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-cyan-400 font-semibold tracking-wide flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            MICROSCOPIO 360° · SEM 5K
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            Resolución: <strong className="text-slate-200 font-mono">0.2 nm (Ultra-High Res)</strong>
          </span>
        </div>

        {/* Live Coordinate HUD & Sensor Readout */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
            <span className="text-slate-500">AZIMUT:</span>
            <span className="text-cyan-300 tabular-nums">{azimuth}°</span>
            <span className="text-slate-500 ml-2">ELEV:</span>
            <span className="text-amber-300 tabular-nums">{elevation}°</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/90 px-2.5 py-1 rounded border border-slate-800">
            <span className="text-slate-500">TIPO:</span>
            <span className="text-emerald-400 uppercase">{hairType}</span>
          </div>

          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`px-3 py-1 rounded text-[11px] font-medium transition-colors border ${
              isAutoRotating 
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20' 
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAutoRotating ? 'Auto-Giro 360°: ON' : 'Auto-Giro: PAUSADO'}
          </button>
        </div>
      </div>

      {/* 2. Main Stage & Split Controls */}
      <div className="relative flex flex-col lg:flex-row h-[620px]">
        {/* 3D WebGL Canvas Container */}
        <div 
          ref={containerRef} 
          className="relative flex-1 h-full cursor-grab active:cursor-grabbing"
          title="Arrastra para rotar 360° en cualquier dirección. Usa la rueda para hacer zoom."
        >
          {/* Overlay Compass & Controls */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {/* Quick Zoom Tier Buttons */}
            <div className="bg-slate-950/90 p-1.5 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md flex flex-col gap-1 text-xs">
              <span className="text-[10px] uppercase font-mono text-slate-500 px-2 pt-1 font-semibold">
                Nivel de Microscopía
              </span>
              
              <button
                onClick={() => setZoomLevel('macro')}
                className={`px-3 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between gap-3 ${
                  zoomLevel === 'macro'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>1. Macro (Fibra Completa)</span>
                <span className="font-mono text-[10px] opacity-80">50x</span>
              </button>

              <button
                onClick={() => setZoomLevel('cuticle')}
                className={`px-3 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between gap-3 ${
                  zoomLevel === 'cuticle'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>2. Cutícula Imbricada (SEM)</span>
                <span className="font-mono text-[10px] opacity-80">1,000x</span>
              </button>

              <button
                onClick={() => setZoomLevel('ultrastructure')}
                className={`px-3 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between gap-3 ${
                  zoomLevel === 'ultrastructure'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>3. Corte Transversal Completo</span>
                <span className="font-mono text-[10px] opacity-80">10,000x</span>
              </button>

              <button
                onClick={() => setZoomLevel('microfibrils')}
                className={`px-3 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between gap-3 ${
                  zoomLevel === 'microfibrils'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>4. Macro & Microfibrillas</span>
                <span className="font-mono text-[10px] opacity-80">50,000x</span>
              </button>

              <button
                onClick={() => setZoomLevel('molecular')}
                className={`px-3 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between gap-3 ${
                  zoomLevel === 'molecular'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>5. Enlaces & Hélice α Queratina</span>
                <span className="font-mono text-[10px] opacity-80">1,000,000x</span>
              </button>
            </div>

            {/* Hair Morphological Section Selector */}
            <div className="bg-slate-950/90 p-2 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md text-xs">
              <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1.5 font-semibold">
                Morfología Étnica del Tallo
              </span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px]">
                <button
                  onClick={() => setHairType('straight')}
                  className={`px-2 py-1 rounded text-center transition-colors ${
                    hairType === 'straight' 
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Sección transversal redonda, resistente y lisa (Asiático)"
                >
                  Liso (Circular)
                </button>
                <button
                  onClick={() => setHairType('wavy')}
                  className={`px-2 py-1 rounded text-center transition-colors ${
                    hairType === 'wavy' 
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Sección ovalada elíptica moderada (Caucásico)"
                >
                  Ondulado (Oval)
                </button>
                <button
                  onClick={() => setHairType('curly')}
                  className={`px-2 py-1 rounded text-center transition-colors ${
                    hairType === 'curly' 
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Sección elíptica marcada (Rizado)"
                >
                  Rizado (Elipse)
                </button>
                <button
                  onClick={() => setHairType('afro')}
                  className={`px-2 py-1 rounded text-center transition-colors ${
                    hairType === 'afro' 
                      ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Sección cinta aplanada asimétrica, vulnerable a roturas (Afro)"
                >
                  Afro (Aplanada)
                </button>
              </div>
            </div>
          </div>

          {/* Quick HUD Navigation Cue Bottom Left */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 backdrop-blur-md">
              <Rotate3d className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Arrastra con el ratón o dedo para rotar 360° · Rueda para zoom continuo</span>
            </div>
          </div>

          {/* Cutaway Angle Slider (Only for Ultrastructure or Cuticle) */}
          {(zoomLevel === 'ultrastructure' || zoomLevel === 'cuticle') && (
            <div className="absolute top-4 right-4 z-10 bg-slate-950/90 p-3 rounded-xl border border-slate-800 shadow-xl backdrop-blur-md text-xs w-64">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-200 flex items-center gap-1.5">
                  <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                  Ángulo de Corte Anatómico
                </span>
                <span className="font-mono text-cyan-400 text-[11px]">{cutawayAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="10"
                value={cutawayAngle}
                onChange={(e) => setCutawayAngle(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0° (Cilindro Sellado)</span>
                <span>90° (Corte a Cuarto)</span>
                <span>180° (Mitad)</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Clinical Telemetry & Anatomical Probe Drawer (Right Column) */}
        <div className="w-full lg:w-96 bg-slate-950/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Header of Probe */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  Sonda Anatómica Activa
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2 py-0.5 rounded">
                TRICOLOGÍA HD
              </span>
            </div>

            {/* Quick layer switch buttons */}
            <div className="mb-4">
              <span className="text-[11px] uppercase font-mono text-slate-500 block mb-1.5 font-semibold">
                Seleccionar Estructura para Inspección:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ANATOMICAL_LAYERS.slice(0, 8).map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => {
                      setSelectedLayerId(layer.id);
                      if (onSelectLayer) onSelectLayer(layer);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all border ${
                      selectedLayerId === layer.id
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-semibold shadow-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {layer.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Detail Card */}
            <div className="space-y-4 text-xs">
              <div>
                <h4 className="text-base font-bold text-white mb-0.5">
                  {selectedLayer.name}
                </h4>
                <p className="font-mono text-cyan-400 text-[11px]">
                  {selectedLayer.scientificName}
                </p>
                <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-1 font-mono">
                  <span>Profundidad: <strong className="text-slate-300">{selectedLayer.depth}</strong></span>
                  <span>·</span>
                  <span>Magnificación: <strong className="text-amber-400">{selectedLayer.magnification}</strong></span>
                </div>
              </div>

              {/* Short summary */}
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
                {selectedLayer.detailedFunction}
              </div>

              {/* Composition */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block">
                  Composición Bioquímica:
                </span>
                <p className="text-slate-300 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/80 leading-normal">
                  {selectedLayer.biochemicalComposition}
                </p>
              </div>

              {/* Salon / Clinical Relevance */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Impacto en Peluquería y Tratamientos:
                </span>
                <p className="text-slate-300 bg-amber-950/20 p-2.5 rounded-lg border border-amber-900/40 leading-normal">
                  {selectedLayer.clinicalImportance}
                </p>
              </div>

              {/* pH Behavior */}
              <div className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-[11px]">
                <span className="text-slate-400 font-mono">Sensibilidad de pH:</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedLayer.phBehavior}</span>
              </div>
            </div>
          </div>

          {/* Layer Peeling Filter Checkboxes */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-xs">
            <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-semibold">
              Filtro de Despiece Anatómico (Peeling 3D):
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={visibleCuticle}
                  onChange={(e) => setVisibleCuticle(e.target.checked)}
                  className="rounded accent-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Cutícula (Escamas)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={visibleCortex}
                  onChange={(e) => setVisibleCortex(e.target.checked)}
                  className="rounded accent-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Córtex (Masa Queratina)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={visibleMedulla}
                  onChange={(e) => setVisibleMedulla(e.target.checked)}
                  className="rounded accent-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Médula Central</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={visibleMelanin}
                  onChange={(e) => setVisibleMelanin(e.target.checked)}
                  className="rounded accent-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Melanina (Pigmentos)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Three.js Procedural 3D Geometry Generator
// ==========================================
function rebuild3DStructure(
  group: THREE.Group, 
  zoomLevel: ZoomLevel, 
  hairType: HairType,
  showCuticle: boolean,
  showCortex: boolean,
  showMedulla: boolean,
  showMelanin: boolean,
  cutawayAngle: number
) {
  // Clear previous geometry
  while (group.children.length > 0) {
    const obj = group.children[0];
    group.remove(obj);
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
  }

  // Cross-section deformation ratios based on hair ethnicity
  const scaleX = hairType === 'straight' ? 1.0 : hairType === 'wavy' ? 1.18 : hairType === 'curly' ? 1.35 : 1.65;
  const scaleZ = hairType === 'straight' ? 1.0 : hairType === 'wavy' ? 0.85 : hairType === 'curly' ? 0.74 : 0.60;

  if (zoomLevel === 'macro') {
    // ----------------------------------------------------
    // LEVEL 1: MACRO FIBER (50x)
    // Long hair strand showing smooth cuticle surface, sheen, curvature
    // ----------------------------------------------------
    const length = 26;
    const radius = 3.6;
    const cylinderGeo = new THREE.CylinderGeometry(radius * scaleX, radius * scaleX, length, 48, 30);
    cylinderGeo.scale(1, 1, scaleZ / scaleX);

    // Subtle wavy curve
    const pos = cylinderGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const wave = Math.sin(y * 0.25) * 0.8;
      pos.setX(i, pos.getX(i) + wave);
    }
    pos.needsUpdate = true;
    cylinderGeo.computeVertexNormals();

    const hairMat = new THREE.MeshPhysicalMaterial({
      color: 0x2b1c14,
      roughness: 0.28,
      metalness: 0.1,
      clearcoat: 0.85,
      clearcoatRoughness: 0.2,
      sheen: 0.6,
      sheenColor: new THREE.Color(0xd4af37)
    });

    const hairMesh = new THREE.Mesh(cylinderGeo, hairMat);
    group.add(hairMesh);

    // Add overlapping microscopic ring ridges (SEM style)
    const ringCount = 28;
    for (let r = 0; r < ringCount; r++) {
      const ringGeo = new THREE.TorusGeometry(radius * 1.01 * scaleX, 0.08, 12, 48);
      ringGeo.scale(1, 1, scaleZ / scaleX);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x4a3528,
        roughness: 0.5
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (r - ringCount / 2) * 0.9;
      group.add(ring);
    }

  } else if (zoomLevel === 'cuticle') {
    // ----------------------------------------------------
    // LEVEL 2: CUTICLE SCALE SCAN (SEM 1,000x)
    // Realistic shingle plates overlapping with micro-ridges
    // ----------------------------------------------------
    const cylinderRadius = 4.2;
    const cylinderHeight = 18;
    
    // Core base
    const coreGeo = new THREE.CylinderGeometry(cylinderRadius * 0.85 * scaleX, cylinderRadius * 0.85 * scaleX, cylinderHeight, 36);
    coreGeo.scale(1, 1, scaleZ / scaleX);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1f140e,
      roughness: 0.7
    });
    group.add(new THREE.Mesh(coreGeo, coreMat));

    // Overlapping shingles
    const tiers = 14;
    const shinglesPerTier = 8;
    for (let t = 0; t < tiers; t++) {
      const y = (t - tiers / 2) * 1.2;
      for (let s = 0; s < shinglesPerTier; s++) {
        const angle = (s / shinglesPerTier) * Math.PI * 2 + (t % 2) * (Math.PI / shinglesPerTier);
        
        // Shingle scale geometry
        const scaleGeo = new THREE.BoxGeometry(2.4, 1.8, 0.22);
        const scaleMat = new THREE.MeshPhysicalMaterial({
          color: 0x785642,
          roughness: 0.35,
          metalness: 0.05,
          clearcoat: 0.6,
          reflectivity: 0.8
        });
        const scaleMesh = new THREE.Mesh(scaleGeo, scaleMat);

        // Position on surface
        const posX = Math.cos(angle) * (cylinderRadius * scaleX);
        const posZ = Math.sin(angle) * (cylinderRadius * scaleZ);
        scaleMesh.position.set(posX, y, posZ);

        // Orient facing outward and tilt slightly outward (imbrication angle 5-10°)
        scaleMesh.rotation.y = -angle + Math.PI / 2;
        scaleMesh.rotation.x = 0.18; // outward flare
        group.add(scaleMesh);
      }
    }

  } else if (zoomLevel === 'ultrastructure') {
    // ----------------------------------------------------
    // LEVEL 3: CROSS-SECTION CUTAWAY (10,000x)
    // Cuticle shell, Cortex cell bundles, Medulla pore center
    // ----------------------------------------------------
    const radius = 5.0;
    const height = 15;
    const thetaStart = (cutawayAngle * Math.PI) / 180;
    const thetaLength = Math.PI * 2 - thetaStart;

    // 1. Cuticle outer multi-layer ring
    if (showCuticle) {
      const cuticleGeo = new THREE.CylinderGeometry(
        radius * scaleX, 
        radius * scaleX, 
        height, 
        48, 
        1, 
        false, 
        thetaStart, 
        thetaLength
      );
      cuticleGeo.scale(1, 1, scaleZ / scaleX);
      const cuticleMat = new THREE.MeshPhysicalMaterial({
        color: 0x5a3d28,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.9,
        side: THREE.DoubleSide
      });
      group.add(new THREE.Mesh(cuticleGeo, cuticleMat));

      // Epicuticle outer thin rim line
      const epicuticleGeo = new THREE.CylinderGeometry(
        radius * 1.02 * scaleX,
        radius * 1.02 * scaleX,
        height,
        48,
        1,
        true,
        thetaStart,
        thetaLength
      );
      epicuticleGeo.scale(1, 1, scaleZ / scaleX);
      const epicuticleMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      group.add(new THREE.Mesh(epicuticleGeo, epicuticleMat));
    }

    // 2. Cortex mass (85% volume)
    if (showCortex) {
      const cortexRadius = radius * 0.88;
      const cortexGeo = new THREE.CylinderGeometry(
        cortexRadius * scaleX,
        cortexRadius * scaleX,
        height * 0.99,
        48,
        1,
        false,
        thetaStart,
        thetaLength
      );
      cortexGeo.scale(1, 1, scaleZ / scaleX);
      const cortexMat = new THREE.MeshStandardMaterial({
        color: 0xa16207,
        roughness: 0.6,
        bumpScale: 0.05,
        side: THREE.DoubleSide
      });
      group.add(new THREE.Mesh(cortexGeo, cortexMat));

      // Macrofibril bundled cylinders inside cortex
      const macrofibrilCount = 18;
      for (let m = 0; m < macrofibrilCount; m++) {
        const rDist = 1.6 + Math.random() * 2.2;
        const angle = (m / macrofibrilCount) * thetaLength + thetaStart;
        const fx = Math.cos(angle) * (rDist * scaleX);
        const fz = Math.sin(angle) * (rDist * scaleZ);

        const macroGeo = new THREE.CylinderGeometry(0.38, 0.38, height * 0.95, 12);
        const macroMat = new THREE.MeshStandardMaterial({
          color: 0xd97706,
          roughness: 0.4
        });
        const macroMesh = new THREE.Mesh(macroGeo, macroMat);
        macroMesh.position.set(fx, 0, fz);
        group.add(macroMesh);
      }
    }

    // 3. Central Medulla (Honeycombed hollow channel)
    if (showMedulla) {
      const medullaRadius = 1.2;
      const medullaGeo = new THREE.CylinderGeometry(
        medullaRadius * scaleX,
        medullaRadius * scaleX,
        height * 1.01,
        24,
        1,
        false,
        thetaStart,
        thetaLength
      );
      medullaGeo.scale(1, 1, scaleZ / scaleX);
      const medullaMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.9,
        wireframe: true,
        side: THREE.DoubleSide
      });
      group.add(new THREE.Mesh(medullaGeo, medullaMat));

      // Air porous chambers in medulla
      for (let p = 0; p < 12; p++) {
        const poreGeo = new THREE.SphereGeometry(0.28, 8, 8);
        const poreMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
        const pore = new THREE.Mesh(poreGeo, poreMat);
        pore.position.set(
          (Math.random() - 0.5) * medullaRadius * scaleX,
          (Math.random() - 0.5) * (height - 3),
          (Math.random() - 0.5) * medullaRadius * scaleZ
        );
        group.add(pore);
      }
    }

    // 4. Melanin Granules (Melanosomes scattered in cortex)
    if (showMelanin) {
      const granuleCount = 50;
      for (let g = 0; g < granuleCount; g++) {
        const rDist = 1.5 + Math.random() * (radius * 0.75);
        const angle = Math.random() * thetaLength + thetaStart;
        const gx = Math.cos(angle) * (rDist * scaleX);
        const gz = Math.sin(angle) * (rDist * scaleZ);
        const gy = (Math.random() - 0.5) * (height - 2);

        // Eumelanin (oval black/brown) or Pheomelanin (small gold)
        const isEumelanin = g % 4 !== 0;
        const granGeo = new THREE.SphereGeometry(isEumelanin ? 0.14 : 0.09, 8, 8);
        granGeo.scale(1.4, 1.0, 1.0); // oval
        const granMat = new THREE.MeshStandardMaterial({
          color: isEumelanin ? 0x1c1917 : 0xd97706,
          roughness: 0.5
        });
        const granule = new THREE.Mesh(granGeo, granMat);
        granule.position.set(gx, gy, gz);
        group.add(granule);
      }
    }

  } else if (zoomLevel === 'microfibrils') {
    // ----------------------------------------------------
    // LEVEL 4: MACROFIBRIL UNRAVELING (50,000x)
    // Macrofibril splitting into 8-12 microfibrils (intermediate filaments)
    // ----------------------------------------------------
    const microCount = 14;
    const radiusRing = 3.4;
    const height = 18;

    // Center KAP matrix cloud
    const matrixGeo = new THREE.CylinderGeometry(radiusRing * 1.2, radiusRing * 1.2, height * 0.9, 32);
    const matrixMat = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.22,
      roughness: 0.2
    });
    group.add(new THREE.Mesh(matrixGeo, matrixMat));

    // Glowing intermediate filaments
    for (let f = 0; f < microCount; f++) {
      const angle = (f / microCount) * Math.PI * 2;
      const x = Math.cos(angle) * radiusRing;
      const z = Math.sin(angle) * radiusRing;

      const filamentGeo = new THREE.CylinderGeometry(0.35, 0.35, height, 16, 20);
      
      // Give each filament a spiral twist
      const pos = filamentGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const twist = y * 0.2 + angle;
        pos.setX(i, pos.getX(i) + Math.cos(twist) * 0.2);
        pos.setZ(i, pos.getZ(i) + Math.sin(twist) * 0.2);
      }
      pos.needsUpdate = true;
      filamentGeo.computeVertexNormals();

      const filamentMat = new THREE.MeshStandardMaterial({
        color: f % 2 === 0 ? 0x38bdf8 : 0x06b6d4,
        roughness: 0.3,
        metalness: 0.3
      });
      const filament = new THREE.Mesh(filamentGeo, filamentMat);
      filament.position.set(x, 0, z);
      group.add(filament);
    }

  } else if (zoomLevel === 'molecular') {
    // ----------------------------------------------------
    // LEVEL 5: ALPHA-HELIX & DISULFIDE BONDS (1,000,000x)
    // Double coiled-coil with glowing golden -S-S- bridges
    // ----------------------------------------------------
    const helixLength = 16;
    const radius = 2.4;
    const turns = 5;

    // Create 2 interlocking alpha-helices
    for (let h = 0; h < 2; h++) {
      const phase = h * Math.PI;
      const curvePoints: THREE.Vector3[] = [];
      const segments = 120;

      for (let s = 0; s <= segments; s++) {
        const t = (s / segments) * turns * Math.PI * 2;
        const y = (s / segments) * helixLength - helixLength / 2;
        const x = Math.cos(t + phase) * radius;
        const z = Math.sin(t + phase) * radius;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.26, 12, false);
      const tubeMat = new THREE.MeshPhysicalMaterial({
        color: h === 0 ? 0x38bdf8 : 0x0ea5e9,
        roughness: 0.2,
        metalness: 0.2,
        clearcoat: 0.8
      });
      group.add(new THREE.Mesh(tubeGeo, tubeMat));

      // Add amino acid spheres along the backbone
      for (let a = 0; a < 25; a++) {
        const pt = curve.getPoint(a / 25);
        const aaGeo = new THREE.SphereGeometry(0.3, 12, 12);
        const aaMat = new THREE.MeshStandardMaterial({
          color: a % 3 === 0 ? 0xe2e8f0 : a % 3 === 1 ? 0xf43f5e : 0x3b82f6
        });
        const aaMesh = new THREE.Mesh(aaGeo, aaMat);
        aaMesh.position.copy(pt);
        group.add(aaMesh);
      }
    }

    // Add glowing Disulfide Bridges (-S-S-) connecting the helices
    const bondCount = 7;
    for (let b = 0; b < bondCount; b++) {
      const y = (b / bondCount) * (helixLength - 4) - (helixLength - 4) / 2;
      
      // Golden cylinder connecting across
      const bondGeo = new THREE.CylinderGeometry(0.18, 0.18, radius * 2, 12);
      bondGeo.rotateZ(Math.PI / 2);
      const bondMat = new THREE.MeshPhysicalMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.8
      });
      const bondMesh = new THREE.Mesh(bondGeo, bondMat);
      bondMesh.position.set(0, y, 0);
      group.add(bondMesh);

      // Two sulfur atom balls
      const sulfur1 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), bondMat);
      sulfur1.position.set(-radius * 0.6, y, 0);
      const sulfur2 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), bondMat);
      sulfur2.position.set(radius * 0.6, y, 0);
      group.add(sulfur1);
      group.add(sulfur2);
    }

    // Hydrogen bonding dotted connections
    for (let d = 0; d < 12; d++) {
      const hy = (d / 12) * (helixLength - 2) - (helixLength - 2) / 2;
      const hDotGeo = new THREE.SphereGeometry(0.1, 6, 6);
      const hDotMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
      const hDot = new THREE.Mesh(hDotGeo, hDotMat);
      hDot.position.set(Math.sin(d) * 1.1, hy, Math.cos(d) * 1.1);
      group.add(hDot);
    }
  }
}
