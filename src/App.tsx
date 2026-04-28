import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { NavBar } from './components/organisms/NavBar';
import { TopAppBar } from './components/organisms/TopAppBar';

// Cargar MF remotos
const Dashboard = lazy(() => import('mf-metrics/Dashboard'));
const NutritionPage = lazy(() => import('mf-nutrition/NutritionPage'));
const ExercisePage = lazy(() => import('mf-exercise/ExercisePage'));
const ProgressPage = lazy(() => import('mf-metrics/ProgressPage'));

function NavBarWrapper() {
  const location = useLocation();
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'dashboard';
    if (path === '/nutrition') return 'nutrition';
    if (path === '/exercise') return 'exercise';
    if (path === '/progress') return 'progress';
    return 'dashboard';
  };
  return <NavBar activeTab={getActiveTab()} />;
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-primary animate-pulse">Cargando...</div>
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-surface font-body antialiased min-h-screen">
      <TopAppBar title="VidaSana" />
      <main className="pt-24 pb-32 px-6 max-w-screen-xl mx-auto space-y-10">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Dashboard onNavigate={(path: string) => navigate(path)} />} />
            <Route path="/nutrition" element={<NutritionPage onNavigate={(path: string) => navigate(path)} />} />
            <Route path="/exercise" element={<ExercisePage onNavigate={(path: string) => navigate(path)} />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </Suspense>
      </main>
      <NavBarWrapper />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
