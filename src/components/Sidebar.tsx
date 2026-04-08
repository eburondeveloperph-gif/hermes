import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GitMerge, 
  CheckSquare, 
  TerminalSquare, 
  BarChart3,
  Settings,
  Rocket,
  Bot
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Profiles', path: '/profiles', icon: Users },
  { name: 'AI Agents', path: '/agents', icon: Bot },
  { name: 'Workflows', path: '/workflows', icon: GitMerge },
  { name: 'Approvals', path: '/approvals', icon: CheckSquare },
  { name: 'Logs & Replay', path: '/logs', icon: TerminalSquare },
  { name: 'Metrics', path: '/metrics', icon: BarChart3 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div className={clsx(
        "fixed inset-y-0 left-0 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 justify-between">
          <div className="flex items-center">
            <Rocket className="w-6 h-6 text-orange-500 mr-3" />
            <span className="font-bold text-lg tracking-tight">Mission Control</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Global Command
          </div>
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive 
                      ? 'bg-zinc-800 text-white' 
                      : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
                  )
                }
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Domain Workspaces
          </div>
          <nav className="space-y-1 px-2">
            {['Dev', 'Marketing', 'Sales', 'Ads', 'Content'].map((domain) => (
              <button
                key={domain}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-zinc-600 mr-4" />
                {domain}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <NavLink 
            to="/settings"
            onClick={() => {
              if (window.innerWidth < 1024) onClose();
            }}
            className={({ isActive }) =>
              clsx(
                'flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              )
            }
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
        </div>
      </div>
    </>
  );
}

// Missing import fix
import { X } from 'lucide-react';

