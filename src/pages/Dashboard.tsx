import { Activity, AlertTriangle, CheckCircle, Clock, PlayCircle, XCircle, Bot } from 'lucide-react';

const stats = [
  { name: 'Active Workflows', value: '24', icon: PlayCircle, color: 'text-blue-500' },
  { name: 'AI Agents Online', value: '3/3', icon: Bot, color: 'text-purple-500' },
  { name: 'Pending Approvals', value: '7', icon: Clock, color: 'text-orange-500' },
  { name: 'Daily Task Burn', value: '1.2k', icon: Activity, color: 'text-emerald-500' },
];

const recentAlerts = [
  { id: 1, title: 'Zapier Rate Limit Warning', time: '10m ago', type: 'warning' },
  { id: 2, title: 'Sales Workflow Failed', time: '1h ago', type: 'error' },
  { id: 3, title: 'New Approval Required: Ad Campaign', time: '2h ago', type: 'info' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Global Command Center</h1>
        <p className="text-zinc-400 mt-1">Overview of your agent operations and task execution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-zinc-800/50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-white">Content Generation Workflow</p>
                    <p className="text-xs text-zinc-400">Triggered by Schedule • Profile: Content</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-300">Success</p>
                  <p className="text-xs text-zinc-500">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">System Alerts</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                {alert.type === 'error' ? (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium text-zinc-200">{alert.title}</p>
                  <p className="text-xs text-zinc-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
