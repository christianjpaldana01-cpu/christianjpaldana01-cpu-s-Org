import React from 'react';
import { ActiveTab } from './Navbar';

interface Props {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<Props> = ({ setActiveTab }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-tight">
              INSTITUTO DIVINA PASTORA
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cátedra de Tricología Científica, Biofísica de la Queratina y Formación Avanzada en Estilismo Químico Profesional.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] text-slate-300 uppercase font-semibold">
              Módulos Académicos
            </h5>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <button onClick={() => setActiveTab('microscope')} className="hover:text-cyan-400 transition-colors">
                  Microscopio 360° Interactivo
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('atlas')} className="hover:text-cyan-400 transition-colors">
                  Atlas del Tallo y Folículo
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('lab')} className="hover:text-cyan-400 transition-colors">
                  Laboratorio de Decoloración y Alisados
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dossier')} className="hover:text-cyan-400 transition-colors">
                  Dossier de Enlaces y pH
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] text-slate-300 uppercase font-semibold">
              Tricología Clínica
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>Ácido 18-metileicosanoico (18-MEA)</li>
              <li>Puentes Disulfuro Covalentes (-S-S-)</li>
              <li>Punto Isoeléctrico (pH 3.67)</li>
              <li>Complejo de Membrana Celular (CMC)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <h5 className="font-mono text-[11px] text-slate-300 uppercase font-semibold">
              Certificación Oficial
            </h5>
            <p className="text-[11px] leading-relaxed">
              Examen teórico de suficiencia con emisión de diploma acreditativo para estilistas y terapeutas capilares.
            </p>
            <button
              onClick={() => setActiveTab('quiz')}
              className="inline-block mt-1 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px]"
            >
              Iniciar Examen de Acreditación →
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Instituto Divina Pastora. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span>Tricología y Estilismo Profesional</span>
            <span>·</span>
            <span>Documental 5K Ultra-HD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
