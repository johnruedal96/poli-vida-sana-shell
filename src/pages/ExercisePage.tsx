import { useState } from 'react';
import { useWorkoutStore } from '../stores/workoutStore';
import { useNavigate } from 'react-router-dom';

const exerciseTypes = [
  { id: 'running', label: 'Correr', icon: 'directions_run', filled: true },
  { id: 'cycling', label: 'Ciclismo', icon: 'directions_bike', filled: false },
  { id: 'swimming', label: 'Natación', icon: 'pool', filled: false },
  { id: 'yoga', label: 'Yoga', icon: 'self_improvement', filled: false },
  { id: 'weights', label: 'Pesas', icon: 'fitness_center', filled: false },
  { id: 'other', label: 'Otro', icon: 'more_horiz', filled: false },
];

export function ExercisePage() {
  const navigate = useNavigate();
  const { addWorkout } = useWorkoutStore();
  const [selectedType, setSelectedType] = useState('running');
  const [duration, setDuration] = useState(45);
  const [intensity, setIntensity] = useState(7);
  const [notes, setNotes] = useState('');

  const estimatedCalories = Math.round(duration * (intensity * 0.8 + 5));

  const handleSubmit = () => {
    addWorkout({
      type: selectedType,
      duration,
      intensity,
      notes,
      calories: estimatedCalories,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    });
    navigate('/');
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-10">
        <p className="text-[10px] font-light uppercase tracking-[0.2em] text-secondary mb-1">Seguimiento de Actividad</p>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface font-headline">Registrar Ejercicio</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Blocks */}
        <div className="lg:col-span-7 space-y-6">
          {/* Exercise Type Grid */}
          <section className="bg-surface-container-low rounded-xl p-6">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">fitness_center</span> Tipo de Ejercicio
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {exerciseTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all active:scale-95 ${
                    selectedType === type.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'bg-surface-container-lowest text-neutral-500 hover:bg-neutral-50 border-transparent'
                  }`}
                >
                  <span className={`material-symbols-outlined mb-2 text-2xl ${type.filled ? 'font-fill' : ''}`}>
                    {type.icon}
                  </span>
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Duration & Intensity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <section className="bg-surface-container-low rounded-xl p-6">
              <h3 className="text-sm font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">timer</span> Duración
              </h3>
              <div className="relative group">
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-2xl font-bold focus:ring-2 focus:ring-primary transition-all pr-12"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">min</span>
              </div>
            </section>

            {/* Intensity */}
            <section className="bg-surface-container-low rounded-xl p-6">
              <h3 className="text-sm font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-lg">bolt</span> Intensidad
              </h3>
              <div className="flex flex-col gap-4">
                <input
                  className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  max="10"
                  min="1"
                  type="range"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                  <span>Baja</span>
                  <span className="text-primary">Vigorosa ({intensity}/10)</span>
                  <span>Máx</span>
                </div>
              </div>
            </section>
          </div>

          {/* Notes */}
          <section className="bg-surface-container-low rounded-xl p-6">
            <h3 className="text-sm font-semibold text-on-surface-variant mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-neutral-500 text-lg">edit_note</span> Notas del Entrenamiento
            </h3>
            <textarea
              className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-primary transition-all h-24 resize-none"
              placeholder="¿Cómo te sentiste durante la sesión?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>
        </div>

        {/* Right Column: Visual Summary & Action */}
        <div className="lg:col-span-5 space-y-6">
          {/* Calories Burned Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
            <svg className="absolute -right-10 -top-10 w-48 h-48 text-primary-container/10 opacity-50" fill="currentColor" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40"></circle>
            </svg>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="12" />
                  <circle
                    className="text-primary-container"
                    cx="96"
                    cy="96"
                    fill="transparent"
                    r="80"
                    stroke="currentColor"
                    strokeDasharray="502"
                    strokeDashoffset={502 * (1 - estimatedCalories / 600)}
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-[-4px]">
                  <span className="text-4xl font-extrabold text-on-surface tracking-tighter">{estimatedCalories}</span>
                  <span className="text-[10px] font-light uppercase tracking-widest text-secondary">Cal. Est.</span>
                </div>
              </div>
              <div className="flex gap-8 w-full justify-center">
                <div className="text-center">
                  <p className="text-lg font-bold text-on-surface">{Math.round(100 + intensity * 10)}</p>
                  <p className="text-[9px] font-medium uppercase tracking-tighter text-neutral-400">PPM Prom.</p>
                </div>
                <div className="w-[1px] h-8 bg-neutral-100"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-on-surface">{(intensity * 0.25).toFixed(1)}</p>
                  <p className="text-[9px] font-medium uppercase tracking-tighter text-neutral-400">Índice EPOC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-5 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Completar Registro
          </button>

          {/* Contextual Hint */}
          <div className="flex items-start gap-3 p-4 bg-secondary/5 rounded-xl">
            <span className="material-symbols-outlined text-secondary">lightbulb</span>
            <p className="text-xs text-secondary leading-relaxed font-medium">
              Basado en tu tendencia de frecuencia cardíaca, esta sesión contribuye a tu pico de resistencia cardiovascular.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}