import React, { useState } from 'react';
import { CHEMICAL_PROCESSES_DATA, HAIR_IMAGES } from '../data/hairAnatomyData';
import { ChemicalProcessId, ChemicalProcessStep } from '../types/hair';
import { 
  FlaskConical, 
  Flame, 
  Sparkles, 
  Scissors, 
  Droplets, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Clock, 
  Atom, 
  Zap, 
  Info,
  Scale
} from 'lucide-react';

export const ChemicalProcessesLab: React.FC = () => {
  const [activeProcessId, setActiveProcessId] = useState<ChemicalProcessId>('bleach');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Interactive Bleach Lab state
  const [bleachVolume, setBleachVolume] = useState<number>(20);
  const [bleachTimeMinutes, setBleachTimeMinutes] = useState<number>(30);
  const [withPlexProtection, setWithPlexProtection] = useState<boolean>(true);

  // Active process data
  const currentProcess = CHEMICAL_PROCESSES_DATA.find((p) => p.id === activeProcessId) || CHEMICAL_PROCESSES_DATA[0];
  const activeStep: ChemicalProcessStep = currentProcess.steps[currentStepIndex] || currentProcess.steps[0];

  // Calculate live dynamic metrics for Bleaching
  const clarificationLevel = Math.min(
    10, 
    Math.round(1 + (bleachVolume / 40) * 4 + (bleachTimeMinutes / 50) * 5)
  );

  const getClarificationColor = (level: number) => {
    switch (level) {
      case 1: return { name: '1. Negro Natural', hex: '#171717', undertone: 'Rojo subyacente oscuro' };
      case 2: return { name: '2. Moreno', hex: '#261b17', undertone: 'Rojo muy oscuro' };
      case 3: return { name: '3. Castaño Oscuro', hex: '#3d271d', undertone: 'Rojo caoba' };
      case 4: return { name: '4. Castaño Medio', hex: '#523424', undertone: 'Rojo vivo' };
      case 5: return { name: '5. Castaño Claro', hex: '#694129', undertone: 'Rojo naranja' };
      case 6: return { name: '6. Rubio Oscuro', hex: '#875632', undertone: 'Naranja puro' };
      case 7: return { name: '7. Rubio Medio', hex: '#a66e3b', undertone: 'Naranja dorado' };
      case 8: return { name: '8. Rubio Claro', hex: '#c9914b', undertone: 'Amarillo dorado' };
      case 9: return { name: '9. Rubio Muy Claro', hex: '#e8bb6b', undertone: 'Amarillo pálido' };
      case 10: return { name: '10. Rubio Platino', hex: '#fae39c', undertone: 'Amarillo extraclaro manteca' };
      default: return { name: '10. Rubio Platino', hex: '#fae39c', undertone: 'Platino' };
    }
  };

  const clarInfo = getClarificationColor(clarificationLevel);

  // Cysteic acid damage percentage calculation
  const rawDamage = (bleachVolume * 0.8) + (bleachTimeMinutes * 0.7);
  const cysteicAcidPercent = Math.min(
    withPlexProtection ? 22 : 45, 
    Math.round(withPlexProtection ? rawDamage * 0.45 : rawDamage * 0.75)
  );
  
  const tensileStrengthRetention = Math.max(35, 100 - cysteicAcidPercent * 1.4);

  return (
    <div className="space-y-8">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold block mb-1">
            LABORATORIO DE REACTIVIDAD MOLECULAR
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Mecanismos Moleculares en Procesos Capilares Profesionales
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Comprende la físico-química del estilismo: desde la lisis oxidativa de melanina y apertura cuticular hasta la escisión de puentes disulfuro y la regeneración de enlaces biomiméticos.
          </p>
        </div>

        {/* Process Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => { setActiveProcessId('bleach'); setCurrentStepIndex(0); }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeProcessId === 'bleach'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Decoloración</span>
          </button>

          <button
            onClick={() => { setActiveProcessId('color'); setCurrentStepIndex(0); }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeProcessId === 'color'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Color Permanente</span>
          </button>

          <button
            onClick={() => { setActiveProcessId('straightening'); setCurrentStepIndex(0); }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeProcessId === 'straightening'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Alisado / Permanente</span>
          </button>

          <button
            onClick={() => { setActiveProcessId('reconstruction'); setCurrentStepIndex(0); }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeProcessId === 'reconstruction'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Hidratación & Plex</span>
          </button>

          <button
            onClick={() => { setActiveProcessId('haircut'); setCurrentStepIndex(0); }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeProcessId === 'haircut'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Corte & Tricoptilosis</span>
          </button>
        </div>
      </div>

      {/* 2. Process Overview Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                {currentProcess.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {currentProcess.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Índice de Agresión:</span>
              <span className={`text-xs px-2.5 py-1 rounded font-mono font-bold ${
                currentProcess.damageLevel === 'Severo' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                currentProcess.damageLevel === 'Alto' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                currentProcess.damageLevel === 'Moderado' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {currentProcess.damageLevel}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {currentProcess.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
                Reactivos Clave Involucrados:
              </span>
              <ul className="text-xs text-slate-300 space-y-1">
                {currentProcess.primaryReagents.map((reagent, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">·</span>
                    <span>{reagent}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
                Enlaces Afectados & pH de Operación:
              </span>
              <div className="text-xs text-slate-300 space-y-1">
                <p><strong className="text-amber-400 font-mono">Rango de pH:</strong> {currentProcess.optimalPhRange}</p>
                <div className="pt-1">
                  {currentProcess.affectedBonds.map((bond, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-slate-400">
                      <span className="text-rose-400">⚡</span>
                      <span>{bond}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counter-measure Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono uppercase font-bold tracking-wider">
                Protocolo de Protección Tricológica
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentProcess.counterMeasure}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Atom className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-xs">
                <span className="text-slate-400 block font-mono text-[10px]">REGLA DE ORO DEL ESTILISTA</span>
                <span className="text-slate-200 font-semibold">
                  "El cabello no se recupera solo: la estructura degradada exige reposición proteica y lipídica activa."
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Bleach Simulator (When Bleach is Selected) */}
      {activeProcessId === 'bleach' && (
        <div className="p-6 bg-slate-900/40 rounded-2xl border border-rose-950/60 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-rose-400 uppercase font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                SIMULADOR INTERACTIVO DE FONDOS DE ACLARACIÓN Y SOBREOXIDACIÓN
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Comportamiento de la Fibra según Volumen de Oxidante y Tiempo
              </h3>
            </div>

            <label className="flex items-center gap-2.5 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={withPlexProtection}
                onChange={(e) => setWithPlexProtection(e.target.checked)}
                className="rounded accent-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className="text-cyan-300 font-medium">Tecnología Plex Activada (Protector de Enlaces)</span>
            </label>
          </div>

          {/* Controls Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Volumen de Peróxido de Hidrógeno ($H_2O_2$):</span>
                <span className="font-mono text-rose-400 font-bold text-sm">{bleachVolume} Vol. ({((bleachVolume / 40) * 12).toFixed(1)}%)</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="10"
                value={bleachVolume}
                onChange={(e) => setBleachVolume(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>10 Vol (3%)</span>
                <span>20 Vol (6%)</span>
                <span>30 Vol (9%)</span>
                <span>40 Vol (12%)</span>
              </div>
            </div>

            <div className="space-y-2 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">Tiempo de Exposición Química:</span>
                <span className="font-mono text-amber-400 font-bold text-sm">{bleachTimeMinutes} minutos</span>
              </div>
              <input
                type="range"
                min="5"
                max="55"
                step="5"
                value={bleachTimeMinutes}
                onChange={(e) => setBleachTimeMinutes(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>5 min (Capa F)</span>
                <span>25 min (Eumelanina)</span>
                <span>40 min (Feomelanina)</span>
                <span>55 min (Peligro)</span>
              </div>
            </div>
          </div>

          {/* Real-time Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Clarification Undercoat Preview */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Fondo de Aclaración Resultante:
                </span>
                <div className="flex items-center gap-3 my-2">
                  <div 
                    className="w-10 h-10 rounded-full border-2 border-white/20 shadow-inner shrink-0" 
                    style={{ backgroundColor: clarInfo.hex }}
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{clarInfo.name}</h5>
                    <p className="text-[11px] text-slate-400">{clarInfo.undertone}</p>
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Residuo melánico predominante
              </span>
            </div>

            {/* 2. Cysteic Acid Accumulation */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Ácido Cisteico Formado (Daño):
                </span>
                <div className="my-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-mono font-bold text-rose-400">{cysteicAcidPercent}%</span>
                    <span className="text-xs text-slate-500 font-mono">de cistina oxidada</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        cysteicAcidPercent > 30 ? 'bg-rose-500' : cysteicAcidPercent > 18 ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${Math.min(100, cysteicAcidPercent * 2.2)}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {cysteicAcidPercent > 28 ? '⚠️ Riesgo inminente de rotura elástica' : '✓ Daño dentro de límites manejables'}
              </span>
            </div>

            {/* 3. Tensile Strength Retention */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase font-semibold block mb-1">
                  Fuerza Tensil Remanente:
                </span>
                <div className="my-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-mono font-bold text-emerald-400">{tensileStrengthRetention.toFixed(0)}%</span>
                    <span className="text-xs text-slate-500 font-mono">resistencia mecánica</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${tensileStrengthRetention}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                Carga de rotura: {(tensileStrengthRetention * 1.3).toFixed(0)} g/hebra
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Step-by-Step Chronological Molecular Reaction Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Cronología de la Reacción Molecular Paso a Paso
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Paso {currentStepIndex + 1} de {currentProcess.steps.length}
          </span>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentProcess.steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all ${
                currentStepIndex === idx
                  ? 'bg-slate-800 border-cyan-500/60 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400">
                  Fase 0{step.stepNumber}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {step.duration}
                </span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200 line-clamp-1">
                {step.title}
              </h5>
            </button>
          ))}
        </div>

        {/* Active Step Deep-Dive Card */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                Fase {activeStep.stepNumber} · Tiempo: {activeStep.duration}
              </span>
              <h4 className="text-lg font-bold text-white">
                {activeStep.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-slate-300">
                Reactivo: <strong className="text-cyan-300">{activeStep.reagent}</strong>
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded border border-slate-800 text-slate-300">
                pH: <strong className="text-amber-400">{activeStep.ph.toFixed(1)}</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            {/* Molecular Mechanism */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono uppercase font-bold text-cyan-400 block flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5" />
                Mecanismo a Escala Molecular y Atómica:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeStep.molecularMechanism}
              </p>
            </div>

            {/* Structural Impact */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-400 block flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Impacto Físico en la Fibra Capilar:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {activeStep.structuralImpact}
              </p>
            </div>
          </div>

          {/* Stylist Clinical Recommendation */}
          <div className="p-3.5 bg-emerald-950/20 rounded-xl border border-emerald-900/40 flex items-start gap-3 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-300 font-semibold block mb-0.5">
                Recomendación del Instituto Divina Pastora para el Profesional:
              </strong>
              <p className="text-slate-300">
                {activeStep.stylistRecommendation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
