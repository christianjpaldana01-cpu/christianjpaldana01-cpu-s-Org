import React, { useState } from 'react';
import { BIOCHEMICAL_COMPOSITION, CHEMICAL_BONDS_DATA, HAIR_IMAGES } from '../data/hairAnatomyData';
import { 
  Atom, 
  Dna, 
  Droplet, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle, 
  Sliders, 
  Activity 
} from 'lucide-react';

export const BiochemicalDossier: React.FC = () => {
  const [selectedBondIndex, setSelectedBondIndex] = useState<number>(0);
  const [simulatorPh, setSimulatorPh] = useState<number>(5.5);

  const activeBond = CHEMICAL_BONDS_DATA[selectedBondIndex];

  // Amino acid profile of hair keratin (g / 100g protein)
  const aminoAcidProfile = [
    { name: 'Cisteína / Cistina (Puentes -S-S-)', amount: 17.5, sulfur: true, desc: 'Clave para la resistencia mecánica y puentes disulfuro' },
    { name: 'Ácido Glutámico', amount: 14.3, sulfur: false, desc: 'Aminoácido ácido, participa en puentes salinos' },
    { name: 'Serina', amount: 10.8, sulfur: false, desc: 'Aporta grupos hidroxilo (-OH) para enlaces de hidrógeno con agua' },
    { name: 'Treonina', amount: 7.2, sulfur: false, desc: 'Hidrófilo, retención de hidratación' },
    { name: 'Arginina', amount: 8.8, sulfur: false, desc: 'Carga catiónica (+) a pH biológico, diana de enlaces salinos' },
    { name: 'Glicina', amount: 6.4, sulfur: false, desc: 'Permite el empaquetamiento ceñido de las hélices alfa' },
    { name: 'Leucina', amount: 6.9, sulfur: false, desc: 'Cadena hidrofóbica interna' },
    { name: 'Valina', amount: 5.8, sulfur: false, desc: 'Estabilidad de la conformación alfa' },
    { name: 'Ácido Aspártico', amount: 5.6, sulfur: false, desc: 'Aminoácido dicarboxílico' },
    { name: 'Prolina', amount: 4.8, sulfur: false, desc: 'Provoca giros y dobleces en la cadena polipeptídica' }
  ];

  // Dynamic pH description
  const getPhAnalysis = (ph: number) => {
    if (ph < 2.5) {
      return {
        zone: 'Ácido Extremo (Cauterización)',
        state: 'Cutícula fuertemente compactada, desnaturalización ácida',
        charges: 'Exceso de H+, grupos carboxilo neutralizados, pérdida de enlaces salinos',
        salonUse: 'Peelings químicos dermatológicos capilares, alisados ácidos concentrados'
      };
    } else if (ph <= 4.0) {
      return {
        zone: 'Zona Isoeléctrica Óptima (pH 3.67)',
        state: 'Máxima resistencia elástica, cutícula 100% sellada y plana',
        charges: 'Carga neta cero: equilibrio exacto entre -NH3+ y -COO-',
        salonUse: 'Mascarillas selladoras post-tinte, neutralizantes de permanente, acondicionadores de rescate'
      };
    } else if (ph <= 6.0) {
      return {
        zone: 'Manto Ácido Fisiológico (pH 4.5 - 5.5)',
        state: 'Estado saludable normal del tallo capilar y cuero cabelludo',
        charges: 'Leve carga aniónica superficial, manto hidrolipídico activo',
        salonUse: 'Champús de uso diario equilibrados, serums hidro-nutritivos'
      };
    } else if (ph <= 8.0) {
      return {
        zone: 'Neutro a Ligeramente Alcalino (pH 7.0 - 8.0)',
        state: 'Inicio de hinchamiento cuticular y desengrase profundo',
        charges: 'Aumento progresivo de cargas negativas en la cutícula',
        salonUse: 'Champú antiresiduos / preparador pre-tratamiento'
      };
    } else if (ph <= 10.5) {
      return {
        zone: 'Alcalino Moderado (pH 9.0 - 10.5)',
        state: 'Apertura franca de cutícula, hinchamiento de endocutícula >30%',
        charges: 'Desprotonación de grupos amino, rotura reversible de enlaces salinos',
        salonUse: 'Coloración permanente oxidativa, amoníaco, alisado con tioglicolato'
      };
    } else {
      return {
        zone: 'Alcalino Cáustico Severo (pH 11.0 - 14.0)',
        state: 'Disolución del 18-MEA, sobreoxidación de cistina y riesgo de hidrólisis',
        charges: 'Rotura irreversible de enlaces covalentes y solubilización proteica',
        salonUse: 'Decoloración con persulfatos a 40 Vol, alisados tradicionales de hidróxido de sodio'
      };
    }
  };

  const phAnalysis = getPhAnalysis(simulatorPh);

  return (
    <div className="space-y-10">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold block mb-1">
            DOSSIER BIOQUÍMICO DE PRECISIÓN
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Composición Molecular & Física de los Enlaces Capilares
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            La química cuántica de la fibra capilar: distribución porcentual de polímeros de queratina, perfil de 18 aminoácidos, lípidos y la física de los puentes covalentes.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
          <Atom className="w-4 h-4 text-cyan-400" />
          <span>Instituto Divina Pastora · Laboratorio</span>
        </div>
      </div>

      {/* 2. Composition Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {BIOCHEMICAL_COMPOSITION.map((comp, idx) => (
          <div key={idx} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-2xl font-mono font-bold" style={{ color: comp.color }}>
                {comp.percentage}
              </span>
              <h4 className="text-xs font-bold text-white mt-1 mb-2">
                {comp.component}
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal">
                {comp.description}
              </p>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  backgroundColor: comp.color, 
                  width: comp.percentage.includes('-') ? `${parseInt(comp.percentage.split('-')[1])}%` : comp.percentage 
                }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. The 3 Fundamental Chemical Bonds of Hair */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold block">
              LOS TRES GRANDES ENLACES QUÍMICOS DE LA QUERATINA
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Arquitectura de Estabilidad y Modificación Capilar
            </h3>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            {CHEMICAL_BONDS_DATA.map((bond, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedBondIndex(idx)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedBondIndex === idx
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {bond.name.split(' ')[0]} {bond.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Active Bond Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
                {activeBond.type}
              </span>
              <h4 className="text-xl font-bold text-white mt-0.5">
                {activeBond.name}
              </h4>
              <p className="text-xs font-mono text-cyan-300 mt-1">
                {activeBond.strength}
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
              {activeBond.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold block mb-1">
                  Rol Biológico & Mecánico:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeBond.role}
                </p>
              </div>

              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold block mb-1">
                  Acción en el Salón de Estilismo:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {activeBond.stylistAction}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={HAIR_IMAGES.keratinBonds}
              alt="Enlaces de queratina y puentes disulfuro"
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* 4. Amino Acid Profile & Interactive pH Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Amino Acid Chart */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block">
                PERFIL AMINOGRAMA
              </span>
              <h4 className="text-base font-bold text-white">
                Los 10 Aminoácidos Principales de la Queratina
              </h4>
            </div>
            <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded">
              g / 100g Proteína
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {aminoAcidProfile.map((aa, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className={`font-semibold ${aa.sulfur ? 'text-amber-400' : 'text-slate-200'}`}>
                    {aa.name}
                  </span>
                  <span className="text-cyan-300 font-bold tabular-nums">
                    {aa.amount}%
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80">
                  <div
                    className={`h-full rounded-full ${aa.sulfur ? 'bg-amber-400' : 'bg-cyan-500'}`}
                    style={{ width: `${(aa.amount / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-900/40 text-[11px] text-slate-300 mt-2">
            <strong className="text-amber-400">Nota del Instituto:</strong> La Cisteína representa casi el 18% del peso de la queratina dura capilar. Por ello, la reposición de azufre es el eje central de cualquier tratamiento reconstructor profesional.
          </div>
        </div>

        {/* Interactive pH Scale Analyzer */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold block">
                  ESCALA FÍSICO-QUÍMICA
                </span>
                <h4 className="text-base font-bold text-white">
                  Simulador de Comportamiento Cuticular según pH
                </h4>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-cyan-400">
                  pH {simulatorPh.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-3 my-6">
              <input
                type="range"
                min="1.0"
                max="14.0"
                step="0.5"
                value={simulatorPh}
                onChange={(e) => setSimulatorPh(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-gradient-to-r from-rose-500 via-emerald-400 to-indigo-500 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>pH 1.0 (Ácido Fuerte)</span>
                <span className="text-cyan-400 font-bold">pH 3.67 (Isoeléctrico)</span>
                <span>pH 7.0 (Neutro)</span>
                <span>pH 9.5 (Color)</span>
                <span>pH 14.0 (Cáustico)</span>
              </div>
            </div>

            {/* Live readout card */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block">
                  Zona Físico-Química Activa:
                </span>
                <h5 className="text-sm font-bold text-white">
                  {phAnalysis.zone}
                </h5>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                  Estado de la Cutícula y Hinchamiento:
                </span>
                <p className="text-slate-300">
                  {phAnalysis.state}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                  Cargas Iónicas & Enlaces Salinos:
                </span>
                <p className="text-slate-300">
                  {phAnalysis.charges}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold block">
                  Aplicación Habitual en el Salón:
                </span>
                <p className="text-amber-200/90 font-medium">
                  {phAnalysis.salonUse}
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
            <p>
              El cabello virgen posee un punto isoeléctrico en <strong>pH 3.67</strong>. Todo tratamiento que se aleje de este valor genera alteración osmótica en la fibra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
