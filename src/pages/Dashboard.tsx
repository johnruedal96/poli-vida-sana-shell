import { useNavigate } from 'react-router-dom';
import { useNutritionStore } from '../stores/nutritionStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { useWaterStore } from '../stores/waterStore';
import { ProgressRing } from '../components/molecules/ProgressRing';
import { QuickActionButton } from '../components/molecules/QuickActionButton';
import { NutrientBar } from '../components/molecules/NutrientBar';

export function Dashboard() {
  const navigate = useNavigate();
  const { dailyGoal, getTodayMacros } = useNutritionStore();
  const { getTodayDuration } = useWorkoutStore();
  const { glasses, dailyGoal: waterGoal } = useWaterStore();

  const caloriesConsumed = getTodayMacros().calories;
  const proteinGoal = 80;
  const carbsGoal = 200;
  const fatGoal = 65;

  return (
    <>
      {/* Hero Header */}
      <section className="ml-2 mr-4 lg:ml-8 lg:mr-12">
        <p className="text-[10px] font-light tracking-[0.05em] uppercase text-neutral-500 mb-1">resumen diario</p>
        <h2 className="text-4xl font-bold tracking-tight text-on-surface">Mantén el ritmo, <span className="text-primary">Alex</span>.</h2>
      </section>

      {/* Bento Grid Progress Rings */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressRing
          value={caloriesConsumed}
          max={dailyGoal}
          currentLabel={caloriesConsumed.toLocaleString()}
          subtitle="kcal restantes"
          title="Calorías"
          colorClass="text-primary-container"
        />
        <ProgressRing
          value={getTodayDuration()}
          max={60}
          currentLabel={getTodayDuration().toString()}
          subtitle="min hoy"
          title="Ejercicio"
          colorClass="text-secondary"
          bgColorClass="text-surface-container-highest"
        />
        <ProgressRing
          value={glasses}
          max={waterGoal}
          currentLabel={glasses.toString()}
          subtitle="vasos"
          title="Hidratación"
          colorClass="text-tertiary"
          bgColorClass="text-surface-container-highest"
        />
      </section>

      {/* Quick Actions */}
      <section className="bg-surface-container-low rounded-[2rem] p-6 md:p-10">
        <div className="mb-8">
          <p className="text-[10px] font-light tracking-[0.05em] uppercase text-neutral-500 mb-1">Acciones rápidas</p>
          <h3 className="text-2xl font-bold tracking-tight">Sigue tu progreso</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionButton
            icon={<span className="material-symbols-outlined">restaurant</span>}
            label="+ Comida"
            colorClass="text-primary"
            bgColorClass="bg-primary/10"
            onClick={() => navigate('/nutrition')}
          />
          <QuickActionButton
            icon={<span className="material-symbols-outlined">water_drop</span>}
            label="+ Agua"
            colorClass="text-secondary"
            bgColorClass="bg-secondary/10"
            onClick={() => navigate('/nutrition')}
          />
          <QuickActionButton
            icon={<span className="material-symbols-outlined">fitness_center</span>}
            label="+ Ejercicio"
            colorClass="text-tertiary"
            bgColorClass="bg-tertiary/10"
            onClick={() => navigate('/exercise')}
          />
        </div>
      </section>

      {/* Insights Layer */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/15">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-xl">Balance de Nutrientes</h4>
            <span className="text-xs text-neutral-500 font-medium">Desglose Diario</span>
          </div>
          <div className="space-y-6">
            <NutrientBar label="proteína" current={getTodayMacros().protein} max={proteinGoal} colorClass="bg-primary" />
            <NutrientBar label="Carbohidratos" current={getTodayMacros().carbs} max={carbsGoal} colorClass="bg-secondary" />
            <NutrientBar label="grasas" current={getTodayMacros().fat} max={fatGoal} colorClass="bg-tertiary" />
          </div>
        </div>

        <div className="relative rounded-[2rem] overflow-hidden group aspect-video lg:aspect-auto">
          <img
            alt="Workout context"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
            <span className="text-primary-container text-xs font-bold tracking-widest uppercase mb-2">próximo entrenamiento</span>
            <h4 className="text-white text-2xl font-bold">Tren superior</h4>
            <p className="text-white/70 text-sm">Programado para las 6:00pm de hoy</p>
          </div>
        </div>
      </section>
    </>
  );
}