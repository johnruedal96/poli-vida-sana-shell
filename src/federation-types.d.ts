declare module 'mf-nutrition/NutritionPage' {
  const NutritionPage: React.ComponentType<any>;
  export default NutritionPage;
}
declare module 'mf-nutrition/store' {
  export const useNutritionStore: any;
}

declare module 'mf-exercise/ExercisePage' {
  const ExercisePage: React.ComponentType<any>;
  export default ExercisePage;
}
declare module 'mf-exercise/store' {
  export const useWorkoutStore: any;
}

declare module 'mf-metrics/Dashboard' {
  import { ComponentType } from "react";
  const Dashboard: ComponentType<any>;
  export default Dashboard;
}

declare module 'mf-metrics/ProgressPage' {
  const ProgressPage: React.ComponentType<any>;
  export default ProgressPage;
}
declare module 'mf-metrics/stores' {
  export const useWaterStore: any;
  export const useNutritionStore: any;
  export const useWorkoutStore: any;
}