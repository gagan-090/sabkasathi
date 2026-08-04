import { Search, ChevronLeft, Star, Play, Clock, BookOpen, Award, Home, Flame, User, BarChart3, Trophy, Target } from "lucide-react";

export function EducationApp({ screen = "home" }: { screen?: "home" | "course" | "live" }) {
  if (screen === "course") return <CoursePage />;
  if (screen === "live") return <LiveClass />;
  return <EducationHome />;
}

function EducationHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f8fafb] font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0a4d3c] via-[#0d6b4f] to-[#10886a] px-5 pt-4 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-emerald-300/60 text-[10px] font-bold uppercase tracking-widest">Welcome back!</p>
            <h2 className="text-white font-black text-[22px] leading-tight mt-0.5">Hi, Rahul 👋</h2>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 mr-1" />
              <span className="text-white text-[12px] font-black">14</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white/12 backdrop-blur-sm rounded-2xl flex items-center px-4 py-3 border border-white/10">
          <Search className="w-5 h-5 text-white/40 mr-3" />
          <span className="text-white/40 text-[14px] font-medium">Search courses, topics...</span>
        </div>
      </div>

      {/* Goal Card */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl p-4 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <p className="text-[10px] text-teal-600 font-bold uppercase tracking-wider">Current Goal</p>
                <h3 className="font-black text-[14px] mt-0.5">IIT-JEE 2026</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="font-black text-[20px] text-teal-600 leading-none">68%</p>
              <p className="text-[9px] text-slate-400 font-bold">Complete</p>
            </div>
          </div>
          <div className="mt-3 h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full shadow-sm shadow-teal-500/30" style={{ width: "68%" }} />
          </div>
        </div>
      </div>

      {/* Live Classes */}
      <div className="px-4 mt-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" /></span>
            <h3 className="font-black text-[15px]">Live Now</h3>
          </div>
          <span className="text-teal-600 text-[12px] font-bold">See All →</span>
        </div>
        {[
          { title: "Physics — Wave Optics", teacher: "Dr. Anand Sharma", viewers: "1.2K", badge: "LIVE NOW", color: "from-red-500 to-rose-500" },
          { title: "Maths — Integral Calculus", teacher: "Prof. Neha Gupta", viewers: "890", badge: "STARTS IN 10 MIN", color: "from-amber-500 to-orange-500" },
        ].map((cls, i) => (
          <div key={i} className="flex items-center bg-white rounded-2xl p-3.5 mb-2.5 border border-slate-100 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cls.color} flex items-center justify-center shrink-0 shadow-sm`}>
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-[13px] font-black leading-tight">{cls.title}</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">{cls.teacher}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] font-black text-white bg-red-500 px-1.5 py-0.5 rounded">{cls.badge}</span>
                <span className="text-[10px] text-slate-400">👁 {cls.viewers}</span>
              </div>
            </div>
            <button className="bg-teal-600 text-white text-[10px] font-black px-4 py-2 rounded-xl shrink-0 shadow-sm shadow-teal-600/20">JOIN</button>
          </div>
        ))}
      </div>

      {/* My Courses */}
      <div className="px-4 mt-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-[15px]">Continue Learning</h3>
          <span className="text-teal-600 text-[12px] font-bold">All Courses →</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Physics Complete", progress: 72, lessons: 48, color: "from-blue-500 to-indigo-600", icon: "⚛️" },
            { name: "Organic Chemistry", progress: 45, lessons: 36, color: "from-amber-500 to-orange-500", icon: "🧪" },
            { name: "Mathematics", progress: 83, lessons: 52, color: "from-emerald-500 to-teal-600", icon: "📐" },
            { name: "Biology NCERT", progress: 28, lessons: 24, color: "from-purple-500 to-pink-500", icon: "🧬" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className={`h-[70px] bg-gradient-to-br ${c.color} flex items-center justify-center relative`}>
                <span className="text-[28px]">{c.icon}</span>
                <span className="absolute top-2 right-2 bg-white/20 text-white text-[8px] font-black px-1.5 py-0.5 rounded">{c.progress}%</span>
              </div>
              <div className="p-3">
                <p className="text-[12px] font-black text-slate-800 leading-tight">{c.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{c.lessons} lessons</p>
                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${c.color} rounded-full`} style={{ width: `${c.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-5 bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-teal-600"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><BookOpen className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Courses</span></div>
        <div className="flex flex-col items-center text-slate-400"><BarChart3 className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Progress</span></div>
        <div className="flex flex-col items-center text-slate-400"><User className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Profile</span></div>
      </div>
    </div>
  );
}

function CoursePage() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      <div className="px-5 pt-4 pb-3 border-b border-slate-100 flex items-center">
        <ChevronLeft className="w-6 h-6 mr-2" />
        <h2 className="text-[17px] font-black">Course Details</h2>
      </div>

      {/* Course Hero */}
      <div className="h-[160px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center relative">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
        <div className="absolute bottom-3 left-5 right-5 flex justify-between text-white">
          <span className="text-[11px] font-bold bg-white/20 px-2.5 py-1 rounded-lg">📚 48 Lessons</span>
          <span className="text-[11px] font-bold bg-white/20 px-2.5 py-1 rounded-lg">⏱ 36 Hours</span>
          <span className="text-[11px] font-bold bg-white/20 px-2.5 py-1 rounded-lg">⭐ 4.8 Rating</span>
        </div>
      </div>

      <div className="px-5 py-4">
        <h3 className="font-black text-[18px] leading-tight">Complete Physics for JEE Mains & Advanced</h3>
        <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed font-medium">Master all concepts from Mechanics to Modern Physics. Includes solved examples, daily practice problems, and live doubt sessions.</p>

        <div className="flex items-center gap-2.5 mt-3">
          <span className="bg-green-700 text-white text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center"><Star className="w-3 h-3 fill-white mr-0.5" />4.8</span>
          <span className="text-[11px] text-slate-500 font-medium">2,340 learners enrolled</span>
        </div>

        <div className="flex gap-2 mt-3">
          <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
            <p className="font-black text-[16px] text-blue-600">48</p>
            <p className="text-[9px] text-slate-500 font-bold">Lessons</p>
          </div>
          <div className="flex-1 bg-emerald-50 rounded-xl p-3 text-center border border-emerald-100">
            <p className="font-black text-[16px] text-emerald-600">36h</p>
            <p className="text-[9px] text-slate-500 font-bold">Duration</p>
          </div>
          <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
            <p className="font-black text-[16px] text-amber-600">12</p>
            <p className="text-[9px] text-slate-500 font-bold">Quizzes</p>
          </div>
        </div>
      </div>

      {/* Chapters */}
      <div className="px-5">
        <h3 className="font-black text-[15px] mb-3">Syllabus</h3>
        {[
          { name: "1. Kinematics", lessons: "6 lessons · 4h 20m", done: true },
          { name: "2. Laws of Motion", lessons: "5 lessons · 3h 45m", done: true },
          { name: "3. Work, Energy & Power", lessons: "7 lessons · 5h 10m", done: false, current: true },
          { name: "4. Rotational Motion", lessons: "8 lessons · 6h", done: false },
          { name: "5. Gravitation", lessons: "4 lessons · 3h", done: false },
          { name: "6. Waves & Oscillations", lessons: "6 lessons · 4h 30m", done: false },
        ].map((ch, i) => (
          <div key={i} className={`flex items-center py-3.5 border-b border-slate-50 last:border-0 ${ch.current ? "bg-teal-50/50 -mx-5 px-5 rounded-xl" : ""}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mr-3 shrink-0 ${ch.done ? "bg-gradient-to-br from-emerald-500 to-teal-500" : ch.current ? "bg-gradient-to-br from-teal-500 to-cyan-500" : "bg-slate-100"}`}>
              {ch.done ? <Award className="w-4 h-4 text-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />}
            </div>
            <div className="flex-1">
              <p className={`text-[13px] font-bold ${ch.current ? "text-teal-700" : ""}`}>{ch.name}</p>
              <p className="text-[10px] text-slate-400 font-medium">{ch.lessons}</p>
            </div>
            {ch.done && <span className="text-[10px] text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">✓ Done</span>}
            {ch.current && <span className="text-[10px] text-teal-600 font-black bg-teal-100 px-2 py-0.5 rounded-lg border border-teal-200">In Progress</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveClass() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#0a0e17] font-sans text-white relative">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center"><ChevronLeft className="w-6 h-6 mr-2 text-white/60" /><h2 className="text-[15px] font-black">Live Class</h2></div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" /></span>
          <span className="text-red-400 text-[11px] font-black">LIVE</span>
          <span className="text-white/40 text-[11px] font-medium ml-1">👁 1.2K</span>
        </div>
      </div>

      {/* Video Area */}
      <div className="mx-4 h-[200px] bg-gradient-to-br from-[#1a1f35] to-[#0f1425] rounded-2xl flex items-center justify-center relative border border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 mx-auto flex items-center justify-center mb-2 shadow-lg shadow-teal-500/30">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-[14px] font-black text-white">Dr. Anand Sharma</p>
          <p className="text-[11px] text-white/50 font-medium">Physics — Wave Optics</p>
        </div>
        <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-[10px] font-bold border border-white/5">
          ⏱ 15:42 elapsed
        </div>
      </div>

      {/* Topic Info */}
      <div className="mx-4 mt-3 bg-[#141825] rounded-2xl p-3.5 border border-white/5">
        <p className="text-[13px] font-black text-white">Ch 10: Young&apos;s Double Slit Experiment</p>
        <p className="text-[10px] text-white/40 font-medium mt-0.5">Interference pattern, fringe width formula, applications</p>
      </div>

      {/* Live Chat */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-black text-[13px] text-white/80">Live Chat</h3>
          <button className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">💬 Ask Doubt</button>
        </div>
        <div className="space-y-3 bg-[#0d1120] rounded-2xl p-3.5 border border-white/5">
          {[
            { user: "Ankit M.", msg: "Sir, can you explain the path difference concept again?", time: "2m", color: "from-blue-500 to-indigo-500" },
            { user: "Priya K.", msg: "What's the formula for fringe width? Is it λD/d?", time: "1m", color: "from-pink-500 to-rose-500" },
            { user: "Rahul S.", msg: "Got it! Thanks sir 🙏 Very clear explanation", time: "now", color: "from-emerald-500 to-teal-500" },
          ].map((m, i) => (
            <div key={i} className="flex gap-2.5">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                <span className="text-[9px] font-black text-white">{m.user[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-teal-400">{m.user}</span>
                  <span className="text-[8px] text-white/30">{m.time}</span>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">{m.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4 grid grid-cols-3 gap-2.5">
        <button className="bg-[#141825] rounded-2xl p-3 text-center border border-white/5">
          <BookOpen className="w-5 h-5 mx-auto mb-1.5 text-teal-400" />
          <span className="text-[10px] font-bold text-white/60">Notes</span>
        </button>
        <button className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-3 text-center shadow-lg shadow-teal-600/20">
          <Trophy className="w-5 h-5 mx-auto mb-1.5 text-white" />
          <span className="text-[10px] font-bold text-white">Quiz</span>
        </button>
        <button className="bg-[#141825] rounded-2xl p-3 text-center border border-white/5">
          <Award className="w-5 h-5 mx-auto mb-1.5 text-amber-400" />
          <span className="text-[10px] font-bold text-white/60">Leaderboard</span>
        </button>
      </div>
    </div>
  );
}
