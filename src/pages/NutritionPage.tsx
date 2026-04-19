import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNutritionStore } from '../stores/nutritionStore';
import { useWaterStore } from '../stores/waterStore';

interface FoodPreset {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  defaultPortion: string;
}

const foodPresets: FoodPreset[] = [
  { id: '1', name: 'Tostada de Aguacate', calories: 250, protein: 8, carbs: 25, fat: 15, defaultPortion: '1 unidad' },
  { id: '2', name: 'Huevo', calories: 70, protein: 6, carbs: 0, fat: 5, defaultPortion: '1 unidad' },
  { id: '3', name: 'Café', calories: 5, protein: 0, carbs: 1, fat: 0, defaultPortion: '1 taza' },
  { id: '4', name: 'Plátano', calories: 105, protein: 1, carbs: 27, fat: 0, defaultPortion: '1 unidad' },
  { id: '5', name: 'Yogur natural', calories: 100, protein: 10, carbs: 8, fat: 0, defaultPortion: '1 vaso' },
  { id: '6', name: 'Avena', calories: 150, protein: 5, carbs: 27, fat: 3, defaultPortion: '1 bowl' },
  { id: '7', name: 'Pollo a la plancha', calories: 165, protein: 31, carbs: 0, fat: 4, defaultPortion: '100g' },
  { id: '8', name: 'Arroz blanco', calories: 130, protein: 3, carbs: 28, fat: 0, defaultPortion: '100g' },
  { id: '9', name: 'Ensalada mixta', calories: 50, protein: 2, carbs: 8, fat: 1, defaultPortion: '1 bowl' },
  { id: '10', name: 'Manzana', calories: 95, protein: 0, carbs: 25, fat: 0, defaultPortion: '1 unidad' },
  { id: '11', name: 'Pasta', calories: 200, protein: 7, carbs: 40, fat: 1, defaultPortion: '100g' },
  { id: '12', name: 'Salmón', calories: 208, protein: 20, carbs: 0, fat: 13, defaultPortion: '100g' },
  { id: '13', name: 'Agua', calories: 0, protein: 0, carbs: 0, fat: 0, defaultPortion: '1 vaso' },
  { id: '14', name: 'Leche', calories: 103, protein: 8, carbs: 12, fat: 2, defaultPortion: '1 vaso' },
  { id: '15', name: 'Pan', calories: 79, protein: 3, carbs: 15, fat: 1, defaultPortion: '1 rebanada' },
];

const mealTypes = [
  { id: 'breakfast', label: 'Desayuno', icon: 'light_mode', filled: true },
  { id: 'lunch', label: 'Almuerzo', icon: 'sunny', filled: false },
  { id: 'dinner', label: 'Cena', icon: 'dark_mode', filled: false },
  { id: 'snack', label: 'Meriendas', icon: 'cookie', filled: false },
];

export function NutritionPage() {
  const navigate = useNavigate();
  const { addFood } = useNutritionStore();
  const { glasses, addGlass, removeGlass } = useWaterStore();
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [selectedFood, setSelectedFood] = useState<FoodPreset | null>(null);
  const [portion, setPortion] = useState(1);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [waterMode, setWaterMode] = useState(false);
  
  // Custom form state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState(0);
  const [customProtein, setCustomProtein] = useState(0);
  const [customCarbs, setCustomCarbs] = useState(0);
  const [customFat, setCustomFat] = useState(0);
  const [customPortion, setCustomPortion] = useState('100g');

  const handleFoodSelect = (food: FoodPreset) => {
    setSelectedFood(food);
    setPortion(1);
    setShowCustomForm(false);
  };

  const handleCustomSubmit = () => {
    if (customName.trim()) {
      addFood({
        name: customName,
        calories: Math.round(customCalories),
        protein: Math.round(customProtein),
        carbs: Math.round(customCarbs),
        fat: Math.round(customFat),
        portion: customPortion,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });
      navigate('/');
    }
  };

  const handlePresetSubmit = () => {
    if (selectedFood) {
      addFood({
        name: selectedFood.name,
        calories: Math.round(selectedFood.calories * portion),
        protein: Math.round(selectedFood.protein * portion),
        carbs: Math.round(selectedFood.carbs * portion),
        fat: Math.round(selectedFood.fat * portion),
        portion: `${portion} ${selectedFood.defaultPortion.split(' ')[1] || 'unidad'}`,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      });
      navigate('/');
    }
  };

  const calories = selectedFood ? Math.round(selectedFood.calories * portion) : customCalories;
  const protein = selectedFood ? Math.round(selectedFood.protein * portion) : customProtein;
  const carbs = selectedFood ? Math.round(selectedFood.carbs * portion) : customCarbs;
  const fat = selectedFood ? Math.round(selectedFood.fat * portion) : customFat;

  if (waterMode) {
    return (
      <>
        <header className="mb-8">
          <span className="font-label text-xs uppercase tracking-[0.2em] font-light text-neutral-500 mb-2 block">Registro diario</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline leading-tight">
            Registrar Agua
          </h1>
        </header>

        <section className="mb-6">
          <button
            onClick={() => setWaterMode(false)}
            className="text-secondary font-medium flex items-center gap-1 mb-4"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Volver a comida
          </button>
        </section>

        <section className="mb-8">
          <div className="bg-secondary/10 rounded-2xl p-8 text-center">
            <div className="text-6xl font-extrabold text-secondary mb-2">{glasses}</div>
            <div className="text-neutral-500 uppercase tracking-wider text-sm">vasos hoy</div>
            <div className="text-neutral-400 text-xs mt-1">Meta: 8 vasos</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => addGlass()}
              className="py-6 rounded-2xl bg-gradient-to-r from-secondary to-secondary-container text-white font-bold shadow-lg active:scale-[0.98] transition-all flex flex-col items-center"
            >
              <span className="material-symbols-outlined text-3xl mb-1">add</span>
              Agregar vaso
            </button>
            <button
              onClick={() => glasses > 0 && removeGlass()}
              disabled={glasses === 0}
              className="py-6 rounded-2xl bg-surface-container text-neutral-600 font-medium shadow-sm active:scale-[0.98] transition-all flex flex-col items-center disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-3xl mb-1">remove</span>
              Quitar vaso
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="mb-8">
        <span className="font-label text-xs uppercase tracking-[0.2em] font-light text-neutral-500 mb-2 block">Registro diario</span>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline leading-tight">
          Registra tu Nutrición
        </h1>
      </header>

      {/* Toggle to Water */}
      <section className="mb-8">
        <button
          onClick={() => setWaterMode(true)}
          className="w-full py-4 rounded-2xl bg-secondary/10 text-secondary font-medium flex items-center justify-center gap-2 hover:bg-secondary/20 transition-all"
        >
          <span className="material-symbols-outlined">water_drop</span>
          Registrar Agua ({glasses} vasos)
        </button>
      </section>

      {/* Meal Type Selection */}
      <section className="mb-8">
        <h2 className="font-label text-[10px] uppercase tracking-widest font-bold text-primary mb-4">Categoría</h2>
        <div className="grid grid-cols-4 gap-2">
          {mealTypes.map((meal) => (
            <button
              key={meal.id}
              onClick={() => setSelectedMeal(meal.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all active:scale-95 ${
                selectedMeal === meal.id
                  ? 'bg-primary text-white'
                  : 'bg-surface-container hover:bg-surface-container-high text-neutral-600'
              }`}
            >
              <span className={`material-symbols-outlined mb-1 ${meal.filled ? 'font-fill' : ''} text-lg`}>
                {meal.icon}
              </span>
              <span className="text-[10px] font-medium">
                {meal.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Food Selection */}
      {!showCustomForm ? (
        <section className="mb-8">
          <h2 className="font-label text-[10px] uppercase tracking-widest font-bold text-primary mb-4">Selecciona un alimento</h2>
          
          {selectedFood ? (
            <div className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-on-surface">{selectedFood.name}</span>
                  <button 
                    onClick={() => setSelectedFood(null)}
                    className="text-neutral-500 hover:text-neutral-700"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-500">Porción</span>
                    <span className="font-bold text-primary">{portion}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.5"
                    value={portion}
                    onChange={(e) => setPortion(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-primary">{calories}</div>
                    <div className="text-[8px] uppercase text-neutral-500">kcal</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-secondary">{protein}g</div>
                    <div className="text-[8px] uppercase text-neutral-500">prot</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-tertiary">{carbs}g</div>
                    <div className="text-[8px] uppercase text-neutral-500">carbs</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-on-surface-variant">{fat}g</div>
                    <div className="text-[8px] uppercase text-neutral-500">grasa</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePresetSubmit}
                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg active:scale-[0.98] transition-all"
              >
                Agregar {selectedFood.name}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {foodPresets.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => handleFoodSelect(food)}
                    className="p-3 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high text-left transition-all active:scale-95"
                  >
                    <div className="text-sm font-medium text-on-surface truncate">{food.name}</div>
                    <div className="text-[10px] text-neutral-500">{food.calories} kcal</div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowCustomForm(true)}
                className="w-full p-4 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-500 hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">add</span>
                Crear alimento nuevo
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-label text-[10px] uppercase tracking-widest font-bold text-primary">Nuevo alimento</h2>
            <button 
              onClick={() => setShowCustomForm(false)}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del alimento"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full p-4 bg-surface-container-lowest rounded-xl text-lg font-medium"
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-xl">
                <label className="text-[10px] uppercase text-neutral-500 block mb-1">Calorías</label>
                <input
                  type="number"
                  value={customCalories}
                  onChange={(e) => setCustomCalories(Number(e.target.value))}
                  className="w-full bg-transparent text-xl font-bold text-primary"
                />
              </div>
              <div className="bg-surface-container-low p-4 rounded-xl">
                <label className="text-[10px] uppercase text-neutral-500 block mb-1">Porción</label>
                <input
                  type="text"
                  value={customPortion}
                  onChange={(e) => setCustomPortion(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold"
                  placeholder="100g"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-surface-container-low p-3 rounded-xl">
                <label className="text-[8px] uppercase text-neutral-500 block mb-1">Proteína (g)</label>
                <input
                  type="number"
                  value={customProtein}
                  onChange={(e) => setCustomProtein(Number(e.target.value))}
                  className="w-full bg-transparent text-lg font-bold text-secondary"
                />
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl">
                <label className="text-[8px] uppercase text-neutral-500 block mb-1">Carbs (g)</label>
                <input
                  type="number"
                  value={customCarbs}
                  onChange={(e) => setCustomCarbs(Number(e.target.value))}
                  className="w-full bg-transparent text-lg font-bold text-tertiary"
                />
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl">
                <label className="text-[8px] uppercase text-neutral-500 block mb-1">Grasas (g)</label>
                <input
                  type="number"
                  value={customFat}
                  onChange={(e) => setCustomFat(Number(e.target.value))}
                  className="w-full bg-transparent text-lg font-bold text-on-surface-variant"
                />
              </div>
            </div>

            <button
              onClick={handleCustomSubmit}
              disabled={!customName.trim()}
              className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
            >
              Agregar {customName || 'alimento'}
            </button>
          </div>
        </section>
      )}

      {(selectedFood || showCustomForm) && (
        <div className="text-center text-xs text-neutral-400 uppercase tracking-wider py-4">
          {selectedFood ? `${portion} porción = ${calories} kcal` : `${customCalories} kcal por porción`}
        </div>
      )}
    </>
  );
}