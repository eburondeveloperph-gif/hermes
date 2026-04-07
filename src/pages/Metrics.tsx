import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const taskData = [
  { name: 'Mon', tasks: 400 },
  { name: 'Tue', tasks: 300 },
  { name: 'Wed', tasks: 550 },
  { name: 'Thu', tasks: 480 },
  { name: 'Fri', tasks: 700 },
  { name: 'Sat', tasks: 200 },
  { name: 'Sun', tasks: 150 },
];

const successData = [
  { name: 'Mon', rate: 98 },
  { name: 'Tue', rate: 99 },
  { name: 'Wed', rate: 95 },
  { name: 'Thu', rate: 97 },
  { name: 'Fri', rate: 92 },
  { name: 'Sat', rate: 100 },
  { name: 'Sun', rate: 100 },
];

export default function Metrics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">KPI Dashboard</h1>
        <p className="text-zinc-400 mt-1">Monitor task burn, success rates, and domain productivity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Zapier Task Burn (7 Days)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Bar dataKey="tasks" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Run Success Rate (%)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={successData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[80, 100]} stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Estimated Cost (MTD)</h4>
          <p className="text-3xl font-bold text-white">$142.50</p>
          <p className="text-xs text-zinc-500 mt-2">Based on Zapier + Gemini API usage</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Avg Speed-to-Lead</h4>
          <p className="text-3xl font-bold text-white">4.2m</p>
          <p className="text-xs text-emerald-500 mt-2 flex items-center">
            ↓ 1.1m from last week
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Content Output (MTD)</h4>
          <p className="text-3xl font-bold text-white">128</p>
          <p className="text-xs text-zinc-500 mt-2">Posts, emails, and briefs generated</p>
        </div>
      </div>
    </div>
  );
}
