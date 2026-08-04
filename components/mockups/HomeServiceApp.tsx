import { Search, MapPin, Star, ChevronLeft, ChevronRight, Clock, Shield, Home, Wrench, Calendar, User, Phone, CheckCircle } from "lucide-react";

export function HomeServiceApp({ screen = "home" }: { screen?: "home" | "booking" | "profile" }) {
  if (screen === "booking") return <ServiceBooking />;
  if (screen === "profile") return <ServiceProfile />;
  return <ServiceHome />;
}

function ServiceHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f8f9fb] font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] px-5 pt-4 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-300/70 text-[10px] font-bold uppercase tracking-widest">Welcome Back</p>
            <h2 className="text-white font-black text-[20px] leading-tight mt-0.5">Home Services</h2>
            <div className="flex items-center text-white/50 text-[11px] mt-1.5 font-medium">
              <MapPin className="w-3 h-3 mr-1" /> Koramangala, Bengaluru <ChevronRight className="w-3 h-3 ml-0.5" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <User className="w-5 h-5 text-white/80" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl flex items-center px-4 py-3 border border-white/10">
          <Search className="w-5 h-5 text-white/40 mr-3" />
          <span className="text-white/40 text-[14px] font-medium">Search for services...</span>
        </div>
      </div>

      {/* Offer Banner */}
      <div className="px-4 -mt-3">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-orange-500/25">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute right-3 bottom-3 w-16 h-16 bg-white/5 rounded-full" />
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-white/20 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Limited Time</span>
          </div>
          <h3 className="text-white font-black text-xl leading-tight">30% OFF</h3>
          <p className="text-white/70 text-[11px] mt-0.5 font-medium">On AC service & deep cleaning</p>
          <button className="mt-3 bg-white text-orange-600 text-[11px] font-black px-5 py-2 rounded-full shadow-md">Book Now →</button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 mt-5">
        <h3 className="font-black text-[15px] mb-3 text-slate-800">Popular Services</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { name: "AC Repair", icon: "❄️", bg: "from-sky-50 to-blue-50", border: "border-sky-100" },
            { name: "Cleaning", icon: "✨", bg: "from-emerald-50 to-green-50", border: "border-emerald-100" },
            { name: "Plumbing", icon: "🔧", bg: "from-blue-50 to-indigo-50", border: "border-blue-100" },
            { name: "Electrical", icon: "⚡", bg: "from-amber-50 to-yellow-50", border: "border-amber-100" },
            { name: "Painting", icon: "🎨", bg: "from-violet-50 to-purple-50", border: "border-violet-100" },
            { name: "Carpentry", icon: "🪵", bg: "from-orange-50 to-amber-50", border: "border-orange-100" },
            { name: "Salon", icon: "💇", bg: "from-pink-50 to-rose-50", border: "border-pink-100" },
            { name: "Pest Ctrl", icon: "🛡️", bg: "from-red-50 to-rose-50", border: "border-red-100" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-[68px] h-[68px] rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} flex items-center justify-center text-[26px] shadow-sm`}>
                {s.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1.5 text-center leading-tight">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Rated Pros */}
      <div className="px-4 mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-[15px] text-slate-800">Top Rated Experts</h3>
          <span className="text-indigo-600 text-[12px] font-bold">View All →</span>
        </div>
        {[
          { name: "Rajesh Kumar", role: "AC Specialist", rating: "4.9", jobs: "320+", price: "₹499", avatar: "👨‍🔧" },
          { name: "Priya Sharma", role: "Deep Cleaning", rating: "4.8", jobs: "210+", price: "₹399", avatar: "👩‍🔧" },
          { name: "Suresh Babu", role: "Electrician", rating: "4.9", jobs: "450+", price: "₹349", avatar: "🧑‍🔧" },
        ].map((pro, i) => (
          <div key={i} className="flex items-center bg-white rounded-2xl p-3.5 mb-2.5 border border-slate-100 shadow-sm">
            <div className="w-[48px] h-[48px] rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-[24px] shrink-0">{pro.avatar}</div>
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-black">{pro.name}</span>
                <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{pro.role} · {pro.jobs} jobs</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-bold text-slate-700">{pro.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-black text-[14px] text-slate-900">{pro.price}</span>
              <p className="text-[9px] text-slate-400 font-medium">onwards</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-indigo-600"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><Wrench className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Services</span></div>
        <div className="flex flex-col items-center text-slate-400"><Calendar className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Bookings</span></div>
        <div className="flex flex-col items-center text-slate-400"><User className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Profile</span></div>
      </div>
    </div>
  );
}

function ServiceBooking() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] px-5 pt-4 pb-5">
        <div className="flex items-center mb-3">
          <ChevronLeft className="w-6 h-6 mr-2 text-white/80" />
          <h2 className="text-[17px] font-black text-white">AC Repair & Service</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-white/15 text-white/80 text-[10px] font-bold px-3 py-1 rounded-full">⭐ 4.8 Rated</span>
          <span className="bg-white/15 text-white/80 text-[10px] font-bold px-3 py-1 rounded-full">🛡️ Warranty</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mx-4 -mt-3 bg-gradient-to-br from-sky-50 to-blue-100 rounded-2xl h-36 flex items-center justify-center border border-sky-100 shadow-sm">
        <span className="text-[64px]">❄️</span>
      </div>

      {/* Service Options */}
      <div className="px-4 mt-5">
        <h3 className="font-black text-[15px] mb-3 text-slate-800">Choose a Service</h3>
        {[
          { name: "AC Regular Service", price: "₹499", time: "45 min", desc: "Gas top-up, filter clean, jet wash", icon: "🔧", popular: true },
          { name: "AC Deep Cleaning", price: "₹799", time: "90 min", desc: "Foam jet, coil clean, sanitisation", icon: "✨", popular: false },
          { name: "AC Installation", price: "₹1,299", time: "2 hrs", desc: "Split AC fitting with copper piping", icon: "⚙️", popular: false },
          { name: "AC Gas Refill", price: "₹2,499", time: "60 min", desc: "R410/R32 gas refill with leak test", icon: "💨", popular: false },
        ].map((s, i) => (
          <div key={i} className="flex items-start bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-sm relative overflow-hidden">
            {s.popular && <span className="absolute top-0 right-0 bg-amber-500 text-white text-[7px] font-black px-2.5 py-0.5 rounded-bl-xl">POPULAR</span>}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-[20px] shrink-0 mr-3">{s.icon}</div>
            <div className="flex-1">
              <p className="text-[13px] font-black text-slate-800">{s.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center text-[10px] text-slate-400 font-medium"><Clock className="w-3 h-3 mr-0.5" />{s.time}</span>
                <span className="flex items-center text-[10px] text-emerald-600 font-bold"><Shield className="w-3 h-3 mr-0.5" />30-day warranty</span>
              </div>
            </div>
            <div className="text-right ml-3 shrink-0">
              <p className="font-black text-[15px] text-indigo-600">{s.price}</p>
              <button className="mt-1.5 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg shadow-sm shadow-indigo-600/20">ADD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceProfile() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f8f9fb] font-sans text-slate-900 relative">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] px-5 pt-4 pb-20">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-2 text-white/80" />
          <h2 className="text-[17px] font-black text-white">Expert Profile</h2>
        </div>
      </div>

      {/* Profile Card - overlapping header */}
      <div className="mx-4 -mt-14 bg-white rounded-3xl p-5 border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative z-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 mx-auto flex items-center justify-center text-[40px] border-4 border-white shadow-lg -mt-14 mb-3">👨‍🔧</div>
        <div className="flex items-center justify-center gap-1.5">
          <h3 className="font-black text-[18px]">Rajesh Kumar</h3>
          <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
        </div>
        <p className="text-[12px] text-slate-500 font-medium mt-0.5">AC & Appliance Specialist · 5 yrs</p>
        <div className="flex justify-center items-center gap-0.5 mt-2">
          {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
          <span className="text-[13px] font-black text-slate-700 ml-1.5">4.9</span>
        </div>
        <div className="flex justify-around mt-4 pt-4 border-t border-slate-100">
          <div className="text-center">
            <p className="font-black text-[18px] text-indigo-600">320+</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase">Jobs</p>
          </div>
          <div className="w-px bg-slate-100" />
          <div className="text-center">
            <p className="font-black text-[18px] text-emerald-600">98%</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase">Satisfaction</p>
          </div>
          <div className="w-px bg-slate-100" />
          <div className="text-center">
            <p className="font-black text-[18px] text-amber-600">4.9</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase">Rating</p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="px-4 mt-5">
        <h3 className="font-black text-[15px] mb-3">Recent Reviews</h3>
        {[
          { name: "Anita S.", text: "Excellent service! AC running like new. Very professional and punctual. Will book again.", rating: 5, time: "2 days ago" },
          { name: "Vikram P.", text: "On time, quick work. Highly recommended for AC service. Very clean work.", rating: 5, time: "1 week ago" },
          { name: "Meera R.", text: "Good work, fixed the issue quickly. Satisfied with the service quality.", rating: 4, time: "2 weeks ago" },
        ].map((r, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 mb-2.5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center text-[11px] font-black text-indigo-600">{r.name[0]}</div>
                <div>
                  <span className="font-bold text-[12px]">{r.name}</span>
                  <p className="text-[9px] text-slate-400">{r.time}</p>
                </div>
              </div>
              <div className="flex">{Array.from({length: r.rating}).map((_, j) => <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />)}</div>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>

      {/* Book Button */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-7 shadow-[0_-8px_25px_rgba(0,0,0,0.06)]">
        <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl py-4 font-black text-[14px] shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" /> Book Rajesh — ₹499 onwards
        </button>
      </div>
    </div>
  );
}
