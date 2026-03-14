import { Users, UserPlus } from "lucide-react";

export default function Hiring() {
  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto animate-in fade-in">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Hiring Pipeline</h1>
          <p className="text-slate-500 font-medium">Track incoming talent.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2">
          <UserPlus size={18} /> New Posting
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Applied', 'Interviewing', 'Offered'].map((stage, i) => (
          <div key={i} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 min-h-[400px]">
            <h3 className="font-black text-slate-900 mb-4 flex justify-between items-center">
              {stage} <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg text-xs">2</span>
            </h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-3 cursor-pointer hover:shadow-md transition-shadow">
              <h4 className="font-bold text-slate-900">Frontend Engineer</h4>
              <p className="text-sm text-slate-500 mt-1">John Doe • 3 days ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}