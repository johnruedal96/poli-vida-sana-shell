import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NavBar } from './components/organisms/NavBar';
import { TopAppBar } from './components/organisms/TopAppBar';
import { Dashboard } from './pages/Dashboard';
import { NutritionPage } from './pages/NutritionPage';
import { ExercisePage } from './pages/ExercisePage';
import { ProgressPage } from './pages/ProgressPage';

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

function App() {
  return (
    <BrowserRouter>
      <div className="bg-surface font-body antialiased min-h-screen">
        <TopAppBar title="VidaSana" />
        <main className="pt-24 pb-32 px-6 max-w-screen-xl mx-auto space-y-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/exercise" element={<ExercisePage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>
        <NavBarWrapper />
      </div>
    </BrowserRouter>
  );
}

export default App;