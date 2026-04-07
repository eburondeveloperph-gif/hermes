import { Play, Pause, Settings, MoreVertical, Clock, Zap } from 'lucide-react';

const workflows = [
  { id: 'wf-1', name: 'Inbound Lead Routing', profile: 'Sales', trigger: 'Webhook', status: 'active', lastRun: '5m ago' },
  { id: 'wf-2', name: 'Weekly Competitor Digest', profile: 'Marketing', trigger: 'Schedule', status: 'active', lastRun: '2d ago' },
  { id: 'wf-3', name: 'PR Review Summarizer', profile: 'Dev', trigger: 'Event', status: 'active', lastRun: '1h ago' },
  { id: 'wf-4', name: 'Ad Creative Matrix', profile: 'Ads', trigger: 'Manual', status: 'disabled', lastRun: '1w ago' },
  { id: 'wf-5', name: 'Blog Post Drafter', profile: 'Content', trigger: 'Manual', status: 'active', lastRun: '3h ago' },
];

export default function Workflows() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Workflow Registry</h1>
          <p className="text-zinc-400 mt-1">Manage automations, triggers, and execution policies.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          + Create Workflow
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Profile</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Trigger</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Last Run</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {workflows.map((wf) => (
              <tr key={wf.id} className="hover:bg-zinc-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-zinc-200">{wf.name}</div>
                  <div className="text-xs text-zinc-500 mt-1 font-mono">{wf.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {wf.profile}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-zinc-400">
                    {wf.trigger === 'Schedule' ? <Clock className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                    {wf.trigger}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${wf.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
                    <span className="text-sm text-zinc-300 capitalize">{wf.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {wf.lastRun}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Run Now">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Pause">
                      <Pause className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors" title="Settings">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-md transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
