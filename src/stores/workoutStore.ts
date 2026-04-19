import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WorkoutEntry {
  id: string;
  type: string;
  duration: number;
  intensity: number;
  notes: string;
  calories: number;
  date: string;
  time: string;
}

interface WorkoutState {
  workouts: WorkoutEntry[];
  addWorkout: (workout: Omit<WorkoutEntry, 'id' | 'date'>) => void;
  removeWorkout: (id: string) => void;
  getTodayWorkouts: () => WorkoutEntry[];
  getTodayDuration: () => number;
  getTodayCalories: () => number;
  getWeeklyWorkouts: () => { date: string; duration: number }[];
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: [],
      
      addWorkout: (workout) => {
        const newWorkout: WorkoutEntry = {
          ...workout,
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
        };
        set((state) => ({ workouts: [...state.workouts, newWorkout] }));
      },
      
      removeWorkout: (id) => {
        set((state) => ({ workouts: state.workouts.filter((w) => w.id !== id) }));
      },
      
      getTodayWorkouts: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().workouts.filter((w) => w.date === today);
      },
      
      getTodayDuration: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().workouts
          .filter((w) => w.date === today)
          .reduce((sum, w) => sum + w.duration, 0);
      },
      
      getTodayCalories: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().workouts
          .filter((w) => w.date === today)
          .reduce((sum, w) => sum + w.calories, 0);
      },
      
      getWeeklyWorkouts: () => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        const last7Days: { date: string; duration: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const dayDuration = get().workouts
            .filter((w) => w.date === dateStr)
            .reduce((sum, w) => sum + w.duration, 0);
          last7Days.push({ date: dateStr, duration: dayDuration });
        }
        return last7Days;
      },
    }),
    { name: 'vidasana-workout' }
  )
);