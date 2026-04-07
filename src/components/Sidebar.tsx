import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GitMerge, 
  CheckSquare, 
  TerminalSquare, 
  BarChart3,
  Settings,
  Rocket
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Profiles', path: '/profiles', icon: Users },
  { name: 'Workflows', path: '/workflows', icon: GitMerge },
  { name: 'Approvals', path: '/approvals', icon: CheckSquare },
  { name: 'Logs & Replay', path: '/logs', icon: TerminalSquare },
  { name: 'Metrics', path: '/metrics', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <Rocket className="w-6 h-6 text-orange-500 mr-3" />
        <span className="font-bold text-lg tracking-tight">Mission Control</span>
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
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </div>
  );
}
