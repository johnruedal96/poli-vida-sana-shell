interface TopAppBarProps {
  title: string;
}

export function TopAppBar({ title }: TopAppBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 w-full max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
            <img 
              alt="User profile photo" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJWzhkCakiJoCvKGZ06tTzyIiwqyrfwTAMJ9OP3tdKI2W-2eg-8-PIQtVBrzy6NmFS33CgsEqgzJEvZ7vMCa9c9RfnsNFBPXQKVWSUtKdnaT8YLsYdVQyA0IALy3uF70kG-MSRJwPrPfiwmRc5WPfdPu5WJZayLXlAcUCTEpBTdxwClUoBgN8bMw1LmQZu9tsr1nbkb9vrqlDP2WqXzzrNIvDiTn2bQrOOi1DSPxchT4tiBTWWX0lc34KU6V3zLpmTaGSgW_OzkuU" 
            />
          </div>
          <span className="text-xl font-bold text-emerald-700 tracking-tighter font-headline">{title}</span>
        </div>
        <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors active:scale-95 transition-transform duration-200 text-neutral-500">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>
      <div className="bg-neutral-100 h-[1px] w-full"></div>
    </header>
  );
}