import { CalendarOff, Plane } from "lucide-react";

export default function Leaves() {
  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto animate-in fade-in">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Time Off</h1>
          <p className="text-slate-500 font-medium">Manage leaves and out-of-office status.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
          <Plane size={18} /> Request Leave
        </button>
      </header>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 text-center py-20">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CalendarOff size={32} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Upcoming Leaves</h3>
        <p className="text-slate-500">The whole team is currently active.</p>
      </div>
    </div>
  );
}