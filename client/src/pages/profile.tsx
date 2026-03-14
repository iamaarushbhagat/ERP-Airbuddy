import { useAuth } from "../hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Mail, GraduationCap, Briefcase, Zap } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-slate-100 pb-12">
        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-5xl font-black text-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
          {user?.name?.[0] || "A"}
        </div>
        
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">{user?.name}</h1>
          <p className="text-blue-600 font-bold text-lg mt-2 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
            <GraduationCap size={20} /> {user?.department || "Computer Science"}
          </p>
          <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
            <Badge className="bg-slate-900 text-white px-4 py-1 rounded-full text-xs">Full-Stack Dev</Badge>
            <Badge className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs">FinTech Researcher</Badge>
            <Badge variant="outline" className="px-4 py-1 rounded-full text-xs border-slate-300">IIT Patna Hackathon</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Bio & Contact */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none bg-slate-50 shadow-none p-6">
            <CardHeader className="px-2">
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <Zap className="text-blue-600" /> About
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 text-slate-600 font-medium leading-relaxed">
              {user?.bio || "Currently optimizing internal operations at AirBuddy Aerospace. Passionate about leveraging CS to solve financial accessibility issues."}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-100 p-6">
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="text-blue-500" size={18} />
                <span className="font-bold text-sm">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Briefcase className="text-blue-500" size={18} />
                <span className="font-bold text-sm">AirBuddy Aerospace</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Achievements (ELIXIR 24, etc.) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-slate-900 px-2 flex items-center gap-2">
            <Award className="text-amber-500" /> Professional Achievements
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            {user?.achievements?.map((ach, i) => (
              <div key={i} className="group p-6 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <p className="text-lg font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {ach}
                  </p>
                  <div className="bg-slate-100 group-hover:bg-blue-100 p-2 rounded-xl transition-colors">
                    <Award className="text-slate-400 group-hover:text-blue-600" size={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}