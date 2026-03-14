import { Mail, MessageSquare, Phone } from "lucide-react";

export default function Directory() {
  const team = [
    { name: "Aarush Bhagat", role: "Product Manager", dept: "Operations" },
    { name: "Alisha Raj", role: "CEO & Co-Founder", dept: "Management" },
    { name: "Bibhuti Rajput", role: "Founder & Chief Scientist", dept: "Engineering" },
    { name: "Susanta Kumar Sethy", role: "Mechanical Design Manager", dept: "Engineering" },
    { name: "Ajit Kumar", role: "Full-Stack Developer", dept: "Engineering" },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">Team Directory</h1>
          <p className="text-slate-500 font-medium">Connect with the AirBuddy crew.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          + Add Member
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((person, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-black shadow-lg mb-4">
              {person.name.charAt(0)}
            </div>
            <h3 className="font-black text-xl text-slate-900">{person.name}</h3>
            <p className="text-blue-600 font-bold text-sm mb-1">{person.role}</p>
            <p className="text-slate-400 font-medium text-xs uppercase tracking-widest mb-6">{person.dept}</p>
            
            <div className="flex gap-2 w-full">
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl flex justify-center text-slate-600 transition-colors"><Mail size={18} /></button>
              <button className="flex-1 bg-slate-50 hover:bg-slate-100 py-2 rounded-xl flex justify-center text-slate-600 transition-colors"><MessageSquare size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}