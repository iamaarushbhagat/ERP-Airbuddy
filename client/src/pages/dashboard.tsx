import { useAuth } from "../hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  Loader2
} from "lucide-react";

export default function Dashboard() {
  const { data: user } = useAuth();

  // Fetching data with safety fallbacks (empty arrays if no DB connection)
  const { data: tasks = [] } = useQuery({ queryKey: ["/api/tasks"] });
  const { data: attendance = [] } = useQuery({ queryKey: ["/api/attendance/status"] });

  // SAFETY: Handle the 'split' error by checking if username exists first
  const displayName = user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : "Team Member";

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-3">
          Welcome back, <span className="text-blue-600">{displayName}</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium">Here's what's happening at AirBuddy today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Projects", val: "12", icon: <TrendingUp className="text-blue-600" />, bg: "bg-blue-50" },
          { label: "Team Members", val: "24", icon: <Users className="text-purple-600" />, bg: "bg-purple-50" },
          { label: "Tasks Pending", val: tasks?.length || "0", icon: <AlertCircle className="text-amber-600" />, bg: "bg-amber-50" },
          { label: "Hours Logged", val: "128", icon: <Clock className="text-emerald-600" />, bg: "bg-emerald-50" }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed: Tasks */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="text-blue-600" /> Priority Tasks
            </h3>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View All</button>
          </div>
          
          <div className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <div key={task.id} className="flex items-center p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400 mr-4"></div>
                  <span className="font-bold text-slate-800">{task.title}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 font-medium bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
                No tasks assigned yet. Check back later!
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Schedule */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
          <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
            <Calendar className="text-blue-400" /> Upcoming
          </h3>
          
          <div className="space-y-6">
            {[
              { time: "10:00 AM", event: "Engineering Sync", desc: "Product roadmap review" },
              { time: "01:30 PM", event: "Design Audit", desc: "AirBuddy Ops UI Refinement" },
              { time: "04:00 PM", event: "Founder Sync", desc: "Q3 Strategy Planning" }
            ].map((event, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-slate-700">
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <p className="text-blue-400 font-black text-sm">{event.time}</p>
                <p className="font-bold text-lg mt-1">{event.event}</p>
                <p className="text-slate-400 text-sm mt-1">{event.desc}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-900/20">
            Open Calendar
          </button>
        </div>
      </div>
    </div>
  );
}