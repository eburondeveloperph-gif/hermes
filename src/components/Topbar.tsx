import { Bell, Activity, AlertCircle, BrainCircuit, Loader2, Menu } from 'lucide-react';
import { useState } from 'react';
import { quickStatusCheck } from '../lib/gemini';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleStatusCheck = async () => {
    setIsChecking(true);
    const result = await quickStatusCheck("What is the overall system health and task burn status based on current metrics?");
    setStatusMessage(result);
    setIsChecking(false);
    setTimeout(() => setStatusMessage(null), 5000);
  };

  return (
    <header className="h-16 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 backdrop-blur-sm relative shrink-0">
      <div className="flex items-center space-x-2 md:space-x-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-zinc-400 hover:text-white lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:flex items-center text-sm text-zinc-400">
          <Activity className="w-4 h-4 text-emerald-500 mr-2" />
          <span className="hidden md:inline">System Health:</span> <span className="text-emerald-500 ml-1 font-medium">Optimal</span>
        </div>
        <div className="hidden sm:block h-4 w-px bg-zinc-800" />
        <div className="flex items-center text-sm text-zinc-400">
          <span className="hidden md:inline">Task Burn:</span> <span className="text-zinc-200 ml-1 font-medium">1.2k / 5k</span>
        </div>
        <div className="h-4 w-px bg-zinc-800" />
        <button 
          onClick={handleStatusCheck}
          disabled={isChecking}
          className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
        >
          {isChecking ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
          <span className="hidden xs:inline">AI Status</span>
        </button>
      </div>

      {statusMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-sm shadow-lg z-50 animate-in fade-in slide-in-from-top-2 max-w-[90vw] text-center">
          {statusMessage}
        </div>
      )}

      <div className="flex items-center space-x-2 md:space-x-4">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800">
          <AlertCircle className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border border-zinc-900"></span>
        </button>
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-zinc-900"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 border border-zinc-700 shrink-0" />
      </div>
    </header>
  );
}
