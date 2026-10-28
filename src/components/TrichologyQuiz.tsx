import React, { useState } from 'react';
import { TRICHOLOGY_QUIZ_QUESTIONS } from '../data/hairAnatomyData';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Printer, 
  Share2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const TrichologyQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Estilista Profesional');

  const questions = TRICHOLOGY_QUIZ_QUESTIONS;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: index
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowResults(true);
      // Trigger confetti if high score
      const correctCount = questions.filter(q => selectedAnswers[q.id] === q.correctIndex).length;
      if (correctCount / questions.length >= 0.75) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const correctAnswersCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  
  const scorePercentage = Math.round((correctAnswersCount / questions.length) * 100);
  const isPassed = scorePercentage >= 75;

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-semibold block mb-1">
            EVALUACIÓN Y ACREDITACIÓN PROFESIONAL
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Certificación en Tricología y Físico-Química Capilar
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Pon a prueba tu conocimiento sobre anatomía folicular, ultraestructura de cutícula y córtex, y los fundamentos moleculares de la colorimetría y alisados.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          <span>Instituto Divina Pastora</span>
        </div>
      </div>

      {!showResults ? (
        /* Quiz Interface */
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-cyan-400 font-semibold">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="text-slate-400">
                {currentQuestion.trichologyDomain}
              </span>
            </div>
            <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-cyan-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Options list */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between text-xs md:text-sm ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/80 text-white font-medium shadow-md'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isSelected 
                          ? 'bg-cyan-500 text-slate-950' 
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 transition-all"
              >
                Anterior
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-40 transition-all shadow-md flex items-center gap-2"
              >
                <span>{currentQuestionIndex === questions.length - 1 ? 'Finalizar Evaluación' : 'Siguiente Pregunta'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results & Printable Certificate */
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Score banner */}
          <div className="p-6 md:p-8 bg-slate-900/80 rounded-2xl border border-slate-800 text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-2">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              {isPassed ? '¡Felicitaciones! Has aprobado con Distinción' : 'Examen Completado · Repaso Recomendado'}
            </h3>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Obtuviste <strong className="text-cyan-400 font-mono text-base">{correctAnswersCount} de {questions.length}</strong> respuestas correctas ({scorePercentage}%).
              {isPassed ? ' Tu diploma de acreditación ha sido generado a continuación.' : ' Te recomendamos revisar el Atlas y el Laboratorio de procesos para fortalecer los conceptos.'}
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reintentar Examen</span>
              </button>
            </div>
          </div>

          {/* Printable Certificate (Revealed if passed) */}
          {isPassed && (
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-12 rounded-3xl border-2 border-amber-500/40 shadow-2xl space-y-8 relative overflow-hidden">
              {/* Certificate Watermark / Corner Filigree */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-tr-full pointer-events-none" />

              <div className="text-center space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-bold">
                  INSTITUTO DIVINA PASTORA · DIVISIÓN DE TRICOLOGÍA MÉDICO-COSMÉTICA
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide font-bold">
                  DIPLOMA DE ACREDITACIÓN PROFESIONAL
                </h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                  Certifica formalmente la suficiencia teórico-práctica en
                </p>
                <h4 className="text-lg font-semibold text-cyan-300">
                  Estructura Interna del Cabello y Mecanismos Moleculares Capilares
                </h4>
              </div>

              {/* Recipient Name Customizer */}
              <div className="text-center py-4 border-y border-amber-500/20 max-w-lg mx-auto space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500">Otorgado a:</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-center text-xl md:text-2xl font-serif font-bold text-amber-300 bg-transparent border-b border-amber-400/40 focus:outline-none focus:border-amber-400 pb-1"
                  placeholder="Tu Nombre Completo"
                />
                <span className="text-[11px] text-slate-400 block italic">
                  Por demostrar dominio riguroso en físico-química de la queratina, 18-MEA, enlaces disulfuro y procesos de decoloración/alisado.
                </span>
              </div>

              {/* Signatures & Accreditation Stamp */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-center items-end text-xs">
                <div className="space-y-1">
                  <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-2" />
                  <span className="font-semibold text-slate-200 block">Dra. M. Rodríguez, PhD</span>
                  <span className="text-[10px] text-slate-400">Directora de Tricología Clínica</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-500/60 flex items-center justify-center p-1 bg-amber-500/10">
                    <ShieldCheck className="w-8 h-8 text-amber-400" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 mt-2 uppercase tracking-widest font-bold">
                    SELLO INSTITUCIONAL
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-0.5 w-32 bg-slate-700 mx-auto mb-2" />
                  <span className="font-semibold text-slate-200 block">Prof. J. C. Aldana</span>
                  <span className="text-[10px] text-slate-400">Cátedra de Estilismo Químico</span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center gap-2 shadow-lg"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar Diploma en PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Detailed Question Review List */}
          <div className="space-y-4 pt-6">
            <h4 className="text-base font-bold text-white">
              Revisión Científica y Explicación Detallada:
            </h4>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAnswer = selectedAnswers[q.id];
                const isCorrect = userAnswer === q.correctIndex;
                return (
                  <div key={q.id} className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-bold text-slate-200">
                        {idx + 1}. {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-400 font-mono flex items-center gap-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Correcto
                        </span>
                      ) : (
                        <span className="text-rose-400 font-mono flex items-center gap-1 shrink-0">
                          <XCircle className="w-4 h-4 text-rose-400" /> Incorrecto
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400">
                      <p>
                        Respuesta seleccionada: <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                          {userAnswer !== undefined ? q.options[userAnswer] : 'No respondida'}
                        </strong>
                      </p>
                      {!isCorrect && (
                        <p className="mt-0.5">
                          Respuesta correcta: <strong className="text-emerald-300">{q.options[q.correctIndex]}</strong>
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 text-slate-300 text-[11px] leading-relaxed">
                      <strong className="text-cyan-400 font-mono">Explicación Tricológica: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
