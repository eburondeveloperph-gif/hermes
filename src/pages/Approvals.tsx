import { Check, X, Edit2, AlertTriangle } from 'lucide-react';

const approvals = [
  { 
    id: 'app-1', 
    workflow: 'Outbound Sales Sequence', 
    action: 'Send Email via Gmail', 
    risk: 'High', 
    requestedAt: '10m ago',
    payload: {
      to: 'ceo@targetcompany.com',
      subject: 'Partnership Opportunity',
      body: 'Hi there, I noticed your recent funding round...'
    }
  },
  { 
    id: 'app-2', 
    workflow: 'Ad Campaign Mutation', 
    action: 'Update Facebook Ad Budget', 
    risk: 'Critical', 
    requestedAt: '1h ago',
    payload: {
      campaignId: '123456789',
      newDailyBudget: '$500.00',
      reason: 'ROAS exceeded target threshold'
    }
  },
];

export default function Approvals() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Approval Center</h1>
        <p className="text-zinc-400 mt-1">Review and authorize pending actions from your agents.</p>
      </div>

      <div className="space-y-4">
        {approvals.map((approval) => (
          <div key={approval.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-4 md:p-6 border-b border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {approval.risk} Risk
                  </span>
                  <span className="text-sm text-zinc-400">{approval.requestedAt}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">{approval.action}</h3>
                <p className="text-sm text-zinc-400 mt-1">Requested by: {approval.workflow}</p>
              </div>
              <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                <button className="flex-1 lg:flex-none flex items-center justify-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md text-sm font-medium transition-colors">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-md text-sm font-medium transition-colors">
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </button>
                <button className="flex-1 lg:flex-none flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-sm font-medium transition-colors">
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </button>
              </div>
            </div>
            <div className="p-4 md:p-6 bg-zinc-950/50">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Action Payload</h4>
              <pre className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm font-mono text-zinc-300 overflow-x-auto">
                {JSON.stringify(approval.payload, null, 2)}
              </pre>
            </div>
          </div>
        ))}
        
        {approvals.length === 0 && (
          <div className="text-center py-12 bg-zinc-900 border border-zinc-800 rounded-xl">
            <Check className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white">All caught up!</h3>
            <p className="text-zinc-400 mt-1">There are no pending approvals at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
