import { useState } from "react";
import { Save, Clock, FileText, CheckCircle2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Meetings() {
  const [notes, setNotes] = useState("");
  const [activeMeeting, setActiveMeeting] = useState("Weekly Engineering Sync");
  const queryClient = useQueryClient();

  // 1. Fetch past meetings from the database
  const { data: pastMeetings } = useQuery({
    queryKey: ["/api/meetings"],
    queryFn: async () => {
      const res = await fetch("/api/meetings");
      if (!res.ok) throw new Error("Failed to fetch meetings");
      return res.json();
    }
  });

  // 2. The function to save notes to the database
  const saveNotes = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: activeMeeting,
          time: new Date().toLocaleTimeString(),
          type: "Internal Sync",
          notes: notes,
        }),
      });
      
      if (!res.ok) throw new Error("Failed to save notes");
      return await res.json();
    },
    onSuccess: () => {
      // Clear the notepad and refresh the list!
      setNotes("");
      queryClient.invalidateQueries({ queryKey: ["/api/meetings"] });
      alert("Notes saved successfully!");
    },
  });

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-2">Meetings & Notes</h1>
        <p className="text-slate-500 font-medium">Track your syncs and document decisions.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Meeting Schedule & History */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Today's Schedule */}
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Clock size={18} /> Today's Schedule
            </h3>
            {[
              { title: "Weekly Engineering Sync", time: "10:00 AM", type: "Zoom" },
              { title: "Design Review: DriveCore", time: "1:30 PM", type: "Google Meet" },
              { title: "Q3 Planning with Founders", time: "4:00 PM", type: "In-Person" }
            ].map((meet, i) => (
              <div 
                key={i} 
                onClick={() => setActiveMeeting(meet.title)}
                className={`p-5 rounded-2xl border mb-3 transition-all cursor-pointer ${
                  activeMeeting === meet.title 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white border-slate-200 hover:border-blue-500 text-slate-900'
                }`}
              >
                <h4 className="font-bold">{meet.title}</h4>
                <div className="flex items-center gap-3 mt-2 text-sm font-medium opacity-80">
                  <span className={activeMeeting === meet.title ? "text-slate-300" : "bg-slate-100 px-2 py-1 rounded-md"}>{meet.time}</span>
                  <span>{meet.type}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Past Saved Notes (Loaded from DB) */}
          {pastMeetings && pastMeetings.length > 0 && (
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4 mt-8">
                <CheckCircle2 size={18} className="text-green-500" /> Saved Notes
              </h3>
              {pastMeetings.map((meet: any) => (
                <div key={meet.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-2">
                  <h4 className="font-bold text-slate-900 text-sm">{meet.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{meet.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Active Notes Canvas */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col h-[600px] overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-xl"><FileText size={20} /></div>
              <div>
                <h3 className="font-black text-slate-900">Active Notes</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{activeMeeting}</p>
              </div>
            </div>
            
            <button 
              onClick={() => saveNotes.mutate()}
              disabled={saveNotes.isPending || !notes.trim()}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {saveNotes.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
              {saveNotes.isPending ? "Saving..." : "Save Notes"}
            </button>
          </div>
          
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={`Type your notes for ${activeMeeting} here...`}
            className="flex-1 w-full p-8 resize-none outline-none text-slate-700 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}