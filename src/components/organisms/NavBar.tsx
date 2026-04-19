import { useNavigate } from 'react-router-dom';

interface NavBarProps {
  activeTab: string;
}

export function NavBar({ activeTab }: NavBarProps) {
  const navigate = useNavigate();
  
  const tabs = [
    { id: 'dashboard', label: 'inicio', icon: 'home', filled: true },
    { id: 'exercise', label: 'entreno', icon: 'fitness_center', filled: false },
    { id: 'nutrition', label: 'comidas', icon: 'restaurant', filled: false },
    { id: 'progress', label: 'perfil', icon: 'person', filled: false },
  ];

  const getPath = (id: string) => {
    if (id === 'dashboard') return '/';
    if (id === 'nutrition') return '/nutrition';
    if (id === 'exercise') return '/exercise';
    if (id === 'progress') return '/progress';
    return '/';
  };

  return (
    <nav className="fixed bottom-6 left-0 right-0 z-50 flex justify-around items-center px-4">
      <div className="bg-white/80 backdrop-blur-2xl w-[90%] max-w-md rounded-full border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex justify-around items-center py-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(getPath(tab.id))}
            className={`flex flex-col items-center justify-center rounded-full py-2 px-5 transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 scale-110'
                : 'text-neutral-400 hover:text-emerald-500 active:scale-90'
            }`}
          >
            <span className={`material-symbols-outlined ${tab.filled ? 'font-fill' : ''}`}>
              {tab.icon}
            </span>
            <span className="font-['Inter'] font-medium text-[10px] tracking-wide uppercase">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}