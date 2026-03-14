import { CheckCircle2, Circle, Clock } from "lucide-react";

export default function Tasks() {
  const taskList = [
    { id: 1, title: "Review DriveCore UI/UX designs", status: "pending", priority: "high" },
    { id: 2, title: "Update AirBuddy database schema", status: "in-progress", priority: "medium" },
    { id: 3, title: "Finalize candidate offers", status: "done", priority: "high" },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1200px] mx-auto animate-in fade-in">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Tasks</h1>
        <p className="text-slate-500 font-medium">Manage your action items.</p>
      </header>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden p-4">
        {taskList.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-4">
              {task.status === "done" ? <CheckCircle2 className="text-green-500" /> : <Circle className="text-slate-300" />}
              <span className={`font-bold text-lg ${task.status === 'done' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                {task.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {task.priority === 'high' && <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold uppercase tracking-wider">High</span>}
              <Clock className="text-slate-400" size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}