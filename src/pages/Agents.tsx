import { useState } from 'react';
import { Bot, Server, Globe, ShieldCheck, Cpu, RefreshCw, ExternalLink, AlertCircle, Settings2 } from 'lucide-react';
import { testOllamaConnection } from '../lib/ollama';

const initialAgents = [
  { 
    id: 'gemini-pro', 
    name: 'Gemini 3.1 Pro', 
    provider: 'Google', 
    type: 'Cloud', 
    status: 'connected', 
    latency: '1.2s',
    capabilities: ['Reasoning', 'Coding', 'Vision']
  },
  { 
    id: 'gemini-flash', 
    name: 'Gemini 3.1 Flash', 
    provider: 'Google', 
    type: 'Cloud', 
    status: 'connected', 
    latency: '0.4s',
    capabilities: ['Speed', 'Summarization']
  },
  { 
    id: 'ollama-gemma', 
    name: 'Ollama: Gemma 4', 
    provider: 'Self-Hosted', 
    type: 'Local/Edge', 
    status: 'pending', 
    latency: '-',
    capabilities: ['Privacy', 'Offline', 'Custom Models']
  },
];

export default function Agents() {
  const [agents, setAgents] = useState(initialAgents);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    details: string;
    error?: string;
    latency?: number;
    version?: string;
  } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestOllama = async () => {
    setIsTesting(true);
    setTestResult(null);
    const result = await testOllamaConnection();
    setTestResult(result);
    setIsTesting(false);
    
    // Update status based on success
    if (result.success) {
      setAgents(agents.map(a => a.id === 'ollama-gemma' ? { 
        ...a, 
        status: 'connected', 
        latency: `${(result.latency! / 1000).toFixed(2)}s` 
      } : a));
    } else {
      setAgents(agents.map(a => a.id === 'ollama-gemma' ? { ...a, status: 'error' } : a));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">AI Agent Fleet</h1>
          <p className="text-zinc-400 mt-1">Configure and monitor your reasoning cores.</p>
        </div>
        <button className="w-full sm:w-auto bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
          + Add Agent
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-zinc-800/50 text-zinc-300">
                {agent.type === 'Cloud' ? <Globe className="w-6 h-6" /> : <Server className="w-6 h-6" />}
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                agent.status === 'connected' 
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                  : agent.status === 'error'
                  ? 'bg-red-500/10 text-red-500 border-red-500/20'
                  : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
              }`}>
                {agent.status}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
            <p className="text-sm text-zinc-500 mb-4">{agent.provider} • {agent.type}</p>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Latency</span>
                <span className="text-zinc-300 font-mono">{agent.latency}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {agent.capabilities.map(cap => (
                  <span key={cap} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-400 border border-zinc-700">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-between">
              <button className="text-xs text-zinc-400 hover:text-white flex items-center">
                <Settings2 className="w-3 h-3 mr-1.5" />
                Configure
              </button>
              {agent.id === 'ollama-gemma' && (
                <button 
                  onClick={handleTestOllama}
                  disabled={isTesting}
                  className="text-xs text-orange-500 hover:text-orange-400 flex items-center font-medium disabled:opacity-50"
                >
                  {isTesting ? <RefreshCw className="w-3 h-3 mr-1.5 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1.5" />}
                  Test Connection
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {testResult && (
        <div className={`p-4 rounded-xl border ${!testResult.success ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
          <div className="flex items-center mb-2">
            {!testResult.success ? <AlertCircle className="w-4 h-4 mr-2" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
            <span className="font-bold text-sm">Connection Test Result</span>
          </div>
          <p className="text-sm font-medium mb-1">{testResult.details}</p>
          {testResult.error && (
            <p className="text-xs font-mono bg-black/20 p-2 rounded mt-2 overflow-x-auto">
              {testResult.error}
            </p>
          )}
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 md:p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Cpu className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold text-white">Self-Hosted Infrastructure</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">Ollama Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Ollama API Endpoint</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    defaultValue="http://localhost:11434"
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600"
                  />
                  <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-md text-sm hover:bg-zinc-700 transition-colors">
                    Save
                  </button>
                </div>
                <p className="text-[10px] text-zinc-600 mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 shrink-0" />
                  Note: If running in Cloud Run, use a public tunnel (ngrok/cloudflare) or a static IP.
                </p>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Active Model</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600">
                  <option>gemma:4b</option>
                  <option>llama3:8b</option>
                  <option>mistral:latest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/20 rounded-lg p-5 md:p-6 border border-zinc-800/50">
            <h3 className="text-sm font-semibold text-zinc-300 mb-4 flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Setup Guide
            </h3>
            <ol className="text-sm text-zinc-400 space-y-3 list-decimal list-inside">
              <li>Install Ollama on your local machine or server.</li>
              <li>Run <code className="bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-200">ollama run gemma:4b</code> to pull the model.</li>
              <li>Expose the Ollama port (11434) using a tunnel if needed.</li>
              <li>Enter the endpoint URL above and test the connection.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
