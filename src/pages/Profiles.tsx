import { useState } from 'react';
import { Database, Wrench, Clock, Shield, Settings2, Cpu } from 'lucide-react';

const profiles = [
  { id: 'dev', name: 'Dev', status: 'active', memory: '1.2GB', skills: 4, cronJobs: 2 },
  { id: 'marketing', name: 'Marketing', status: 'active', memory: '850MB', skills: 4, cronJobs: 5 },
  { id: 'sales', name: 'Sales', status: 'active', memory: '2.1GB', skills: 4, cronJobs: 1 },
  { id: 'ads', name: 'Ads', status: 'paused', memory: '400MB', skills: 4, cronJobs: 0 },
  { id: 'content', name: 'Content', status: 'active', memory: '1.5GB', skills: 4, cronJobs: 3 },
];

export default function Profiles() {
  const [activeProfile, setActiveProfile] = useState(profiles[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Domain Workspaces</h1>
          <p className="text-zinc-400 mt-1">Manage Hermes profiles, memory, and skills.</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          + New Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setActiveProfile(profile)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                activeProfile.id === profile.id
                  ? 'bg-zinc-800 border-zinc-700 text-white'
                  : 'bg-zinc-900/50 border-zinc-800/50 text-zinc-400 hover:bg-zinc-900 hover:border-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{profile.name}</span>
                <div className={`w-2 h-2 rounded-full ${profile.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-600'}`} />
              </div>
              <div className="text-xs mt-1 opacity-70">
                {profile.skills} skills • {profile.cronJobs} jobs
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold text-white">{activeProfile.name} Workspace</h2>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <div className="flex items-center text-zinc-400 mb-2">
                  <Database className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Memory Usage</span>
                </div>
                <p className="text-2xl font-bold text-white">{activeProfile.memory}</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <div className="flex items-center text-zinc-400 mb-2">
                  <Wrench className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Active Skills</span>
                </div>
                <p className="text-2xl font-bold text-white">{activeProfile.skills}</p>
              </div>
              <div className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                <div className="flex items-center text-zinc-400 mb-2">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Cron Jobs</span>
                </div>
                <p className="text-2xl font-bold text-white">{activeProfile.cronJobs}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2" /> Allowed Tools (Zapier MCP)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Slack: Send Message', 'Jira: Create Issue', 'GitHub: Create PR', 'Notion: Append Block'].map((tool) => (
                    <span key={tool} className="px-3 py-1.5 rounded-md bg-zinc-800 border border-zinc-700 text-sm text-zinc-300">
                      {tool}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 rounded-md border border-dashed border-zinc-600 text-sm text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                    + Add Tool
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3 flex items-center">
                  <Cpu className="w-4 h-4 mr-2" /> Installed Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['PR Summary Generator', 'Incident Post-Mortem', 'Release Notes Drafter', 'Deployment Checklist'].map((skill) => (
                    <div key={skill} className="p-3 rounded-lg bg-zinc-800/30 border border-zinc-800/50 flex items-center justify-between">
                      <span className="text-sm text-zinc-200">{skill}</span>
                      <Settings2 className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
