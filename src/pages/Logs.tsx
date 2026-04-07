import { Search, Filter, RotateCcw, Terminal, BrainCircuit, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { analyzeComplexLog } from '../lib/gemini';

const logs = [
  { id: 'run-1204', workflow: 'Sales Outreach', status: 'failed', time: '10:42 AM', duration: '45s', error: 'Zapier Rate Limit Exceeded' },
  { id: 'run-1203', workflow: 'Content Generator', status: 'success', time: '10:15 AM', duration: '1m 12s', error: null },
  { id: 'run-1202', workflow: 'Dev PR Review', status: 'success', time: '09:30 AM', duration: '24s', error: null },
];

export default function Logs() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    const logData = "Error: Zapier Rate Limit Exceeded (429 Too Many Requests)\nStep 1: Planning - Analyzing input lead data...\nStep 2: Tool Call - HubSpot: Find or Create Contact (Success)\nStep 3: Tool Call - Gmail: Send Email (Failed: 429 Too Many Requests)";
    const result = await analyzeComplexLog(logData);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Logs & Replay</h1>
          <p className="text-zinc-400 mt-1">Inspect agent trajectories and replay failed runs.</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white focus:outline-none focus:border-zinc-600 w-64"
            />
          </div>
          <button className="flex items-center px-3 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-md text-sm font-medium transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        <div className="w-1/3 flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
            <h3 className="font-semibold text-white">Recent Runs</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {logs.map((log) => (
              <button 
                key={log.id}
                className="w-full text-left p-4 border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors focus:bg-zinc-800 focus:outline-none"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-zinc-200">{log.workflow}</span>
                  <span className="text-xs text-zinc-500">{log.time}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    log.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {log.status}
                  </span>
                  <span className="text-xs text-zinc-500">{log.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-zinc-400" />
              <h3 className="font-semibold text-white">Run Details: run-1204</h3>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BrainCircuit className="w-4 h-4 mr-2" />}
                {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
              </button>
              <button className="flex items-center px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors">
                <RotateCcw className="w-4 h-4 mr-2" />
                Replay Run
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {analysisResult && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-2" /> AI Root Cause Analysis
                </h4>
                <div className="text-sm text-zinc-300 whitespace-pre-wrap">{analysisResult}</div>
              </div>
            )}
            
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Error</h4>
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-mono">
                Error: Zapier Rate Limit Exceeded (429 Too Many Requests)
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Agent Trajectory</h4>
              <div className="space-y-3">
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Step 1: Planning</div>
                  <p className="text-sm text-zinc-300">Analyzing input lead data and determining required actions...</p>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Step 2: Tool Call (Zapier MCP)</div>
                  <p className="text-sm text-zinc-300 font-mono">action: "HubSpot: Find or Create Contact"</p>
                  <p className="text-sm text-emerald-500 mt-2">Success: Contact ID 84920</p>
                </div>
                <div className="p-4 bg-zinc-950 border border-red-900/30 rounded-lg">
                  <div className="text-xs text-zinc-500 mb-1">Step 3: Tool Call (Zapier MCP)</div>
                  <p className="text-sm text-zinc-300 font-mono">action: "Gmail: Send Email"</p>
                  <p className="text-sm text-red-500 mt-2">Failed: 429 Too Many Requests</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
