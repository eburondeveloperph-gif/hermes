import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Zap, 
  Shield, 
  Key, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Save,
  RefreshCw,
  Globe,
  Lock,
  Cpu,
  Trash2,
  Download,
  Database
} from 'lucide-react';
import { listOllamaModels, pullOllamaModel, deleteOllamaModel } from '../lib/ollama';

export default function Settings() {
  const [zapierKey, setZapierKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Ollama State
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [newModelName, setNewModelName] = useState('');
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    setIsRefreshing(true);
    const models = await listOllamaModels();
    setOllamaModels(models);
    setIsRefreshing(false);
  };

  const handlePullModel = async () => {
    if (!newModelName) return;
    setIsPulling(true);
    const success = await pullOllamaModel(newModelName);
    if (success) {
      setNewModelName('');
      await fetchModels();
    }
    setIsPulling(false);
  };

  const handleDeleteModel = async (name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    const success = await deleteOllamaModel(name);
    if (success) {
      await fetchModels();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSaveZapier = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (zapierKey.startsWith('sk-')) {
      setSaveStatus('success');
    } else {
      setSaveStatus('error');
    }
    setIsSaving(false);
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your integrations, security, and global configurations.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Zapier Integration Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Zapier Integration</h2>
                <p className="text-xs text-zinc-500">Connect Hermes to 6,000+ apps via Zapier MCP.</p>
              </div>
            </div>
            <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20">
              MCP Enabled
            </span>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1.5 flex items-center">
                    <Key className="w-4 h-4 mr-2 text-zinc-500" />
                    Zapier Personal Access Token
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value={zapierKey}
                      onChange={(e) => setZapierKey(e.target.value)}
                      placeholder="sk-zapier-..."
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-3 pr-10 py-2 text-sm text-zinc-200 focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Lock className="w-4 h-4 text-zinc-600" />
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2">
                    Your token is encrypted and stored securely. It never leaves your instance except to authenticate with Zapier.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleSaveZapier}
                    disabled={isSaving || !zapierKey}
                    className="flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-md text-sm font-medium transition-all"
                  >
                    {isSaving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    {isSaving ? 'Connecting...' : 'Connect Zapier'}
                  </button>
                  
                  {saveStatus === 'success' && (
                    <div className="flex items-center text-emerald-500 text-sm animate-in fade-in slide-in-from-left-2">
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      Connected
                    </div>
                  )}
                  {saveStatus === 'error' && (
                    <div className="flex items-center text-red-500 text-sm animate-in fade-in slide-in-from-left-2">
                      <AlertCircle className="w-4 h-4 mr-1.5" />
                      Invalid Token
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-zinc-800/20 rounded-lg p-5 border border-zinc-800/50 space-y-4">
                <h3 className="text-sm font-semibold text-zinc-300 flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-zinc-500" />
                  How to connect
                </h3>
                <ul className="text-xs text-zinc-400 space-y-3 list-disc list-inside">
                  <li>Go to your <a href="https://zapier.com/app/settings/mcp" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline">Zapier MCP Settings</a>.</li>
                  <li>Create a new **Personal Access Token**.</li>
                  <li>Copy the token and paste it into the field on the left.</li>
                  <li>Once connected, your Hermes profiles will have access to all your enabled Zapier actions.</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <h3 className="text-sm font-semibold text-zinc-300 mb-4">Active Zapier Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {['Slack: Send Message', 'Google Sheets: Create Row', 'Gmail: Send Email', 'HubSpot: Update Contact', 'Jira: Create Issue'].map(action => (
                  <div key={action} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs">
                    <span className="text-zinc-400">{action}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                ))}
                <button className="flex items-center justify-center p-3 bg-zinc-900 border border-dashed border-zinc-700 rounded-lg text-xs text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-all">
                  + Enable More Actions
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Ollama Model Management Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Cpu className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Ollama Models</h2>
                <p className="text-xs text-zinc-500">Manage local LLMs running on your infrastructure.</p>
              </div>
            </div>
            <button 
              onClick={fetchModels}
              disabled={isRefreshing}
              className="p-2 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Enter model name (e.g., llama3:8b)"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md pl-3 pr-10 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <button 
                onClick={handlePullModel}
                disabled={isPulling || !newModelName}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white rounded-md text-sm font-medium transition-all"
              >
                {isPulling ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                {isPulling ? 'Pulling...' : 'Pull Model'}
              </button>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/30">
                    <th className="px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Model Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {ollamaModels.length > 0 ? ollamaModels.map((model) => (
                    <tr key={model.name} className="hover:bg-zinc-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <Database className="w-4 h-4 mr-2 text-zinc-500" />
                          <span className="text-sm text-zinc-200 font-medium">{model.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-zinc-400 font-mono">
                        {formatSize(model.size)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Ready
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => handleDeleteModel(model.name)}
                          className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                          title="Delete Model"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-sm text-zinc-500 italic">
                        No models found. Pull a model to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Other Settings Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-bold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-300">Two-Factor Authentication</p>
                  <p className="text-xs text-zinc-500">Add an extra layer of security to your account.</p>
                </div>
                <div className="w-10 h-5 bg-zinc-800 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-300">Session Timeout</p>
                  <p className="text-xs text-zinc-500">Automatically log out after 30 minutes of inactivity.</p>
                </div>
                <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-bold text-white">General</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Default Timezone</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">System Language</label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-600">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
