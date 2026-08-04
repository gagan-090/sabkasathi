import { Search, MapPin, Star, ChevronLeft, ChevronRight, Clock, Home, Heart, ShoppingBag, User, Flame, Bike } from "lucide-react";

export function FoodDeliveryApp({ screen = "home" }: { screen?: "home" | "restaurant" | "menu" }) {
  if (screen === "restaurant") return <RestaurantList />;
  if (screen === "menu") return <RestaurantMenu />;
  return <FoodHome />;
}

function FoodHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#e23744] via-[#cb202d] to-[#b71c1c] px-5 pt-4 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Bike className="w-4 h-4 text-white/70" />
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Delivering to</span>
            </div>
            <h2 className="text-white font-black text-[18px] leading-none mt-1">Koramangala, Bengaluru</h2>
            <p className="text-white/50 text-[11px] font-medium mt-0.5">123, 5th Block, Near Sony Signal</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-lg shadow-black/10">
          <Search className="w-5 h-5 text-slate-300 mr-3" />
          <span className="text-slate-400 text-[14px] font-medium">Search restaurants, dishes...</span>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
        {[
          { label: "Pure Veg", icon: "🟢", active: false },
          { label: "Rating 4.0+", icon: "⭐", active: true },
          { label: "Under 30 Min", icon: "⚡", active: false },
          { label: "Offers", icon: "🎁", active: false },
        ].map((f, i) => (
          <span key={i} className={`shrink-0 px-3.5 py-2 rounded-xl text-[11px] font-bold flex items-center gap-1.5 border ${f.active ? "bg-red-50 text-red-700 border-red-200" : "bg-white text-slate-600 border-slate-200 shadow-sm"}`}>
            <span className="text-[12px]">{f.icon}</span>{f.label}
          </span>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-[#ff6b6b] via-[#ee5a24] to-[#f0932b] rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-red-500/15">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full" />
          <p className="text-white/70 text-[9px] font-bold uppercase tracking-widest">🔥 Today&apos;s Special</p>
          <h3 className="text-white font-black text-[22px] leading-tight mt-1">Flat 60% OFF</h3>
          <p className="text-white/60 text-[11px] mt-1 font-medium">On your first 3 orders · No code needed</p>
          <button className="mt-3 bg-white text-red-600 text-[11px] font-black px-5 py-2 rounded-full shadow-md">Order Now →</button>
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="px-4 mt-5">
        <h3 className="font-black text-[15px] mb-3 text-slate-800">Popular Near You</h3>
        {[
          { name: "Royal Biryani House", cuisine: "Biryani · Mughlai · North Indian", rating: "4.3", time: "25 min", price: "₹200 for two", offer: "50% OFF up to ₹100", emoji: "🍛" },
          { name: "Pizza Express", cuisine: "Pizzas · Pasta · Italian", rating: "4.1", time: "30 min", price: "₹300 for two", offer: "₹125 OFF above ₹249", emoji: "🍕" },
          { name: "Dosa Factory", cuisine: "Dosa · Idli · South Indian", rating: "4.5", time: "20 min", price: "₹150 for two", offer: "Free Delivery", emoji: "🥘" },
        ].map((r, i) => (
          <div key={i} className="bg-white rounded-2xl mb-4 border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-[130px] bg-gradient-to-br from-orange-50 via-red-50/50 to-amber-50 flex items-center justify-center relative">
              <span className="text-[56px]">{r.emoji}</span>
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-sm shadow-blue-600/30">{r.offer}</div>
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
                <Heart className="w-4 h-4 text-slate-300" />
              </div>
              <div className="absolute bottom-3 right-3 bg-green-700 text-white text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center shadow-sm">
                <Star className="w-3 h-3 fill-white mr-0.5" />{r.rating}
              </div>
            </div>
            <div className="p-3.5">
              <h4 className="font-black text-[14px]">{r.name}</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-0.5 text-slate-400" />{r.time}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>{r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-red-600"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><Search className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Search</span></div>
        <div className="flex flex-col items-center text-slate-400"><ShoppingBag className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Orders</span></div>
        <div className="flex flex-col items-center text-slate-400"><User className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Profile</span></div>
      </div>
    </div>
  );
}

function RestaurantList() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#fafafa] font-sans text-slate-900">
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-2 text-slate-700" />
          <h2 className="text-[17px] font-black text-slate-900">North Indian</h2>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">42 places</span>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none bg-white border-b border-slate-50">
        {["Relevance", "Rating", "Delivery Time", "Cost ↑"].map((f, i) => (
          <span key={i} className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold border ${i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"}`}>{f}</span>
        ))}
      </div>

      <div className="px-4 pt-3">
        {[
          { name: "Royal Tandoor", cuisine: "Tandoori · Mughlai", rating: "4.4", time: "35 min", veg: false, emoji: "🍗", price: "₹350 for two" },
          { name: "Punjab Grill", cuisine: "Punjabi · Butter Chicken", rating: "4.6", time: "25 min", veg: false, emoji: "🍛", price: "₹400 for two" },
          { name: "Green Kitchen", cuisine: "Thali · Pure Veg", rating: "4.5", time: "20 min", veg: true, emoji: "🥗", price: "₹200 for two" },
          { name: "Spice Junction", cuisine: "Curry · Rice · Biryani", rating: "4.2", time: "30 min", veg: false, emoji: "🍲", price: "₹250 for two" },
          { name: "Healthy Bites", cuisine: "Salads · Wraps · Bowls", rating: "4.7", time: "15 min", veg: true, emoji: "🥙", price: "₹180 for two" },
        ].map((r, i) => (
          <div key={i} className="flex items-center bg-white rounded-2xl p-3 mb-2.5 border border-slate-100 shadow-sm">
            <div className="w-[60px] h-[60px] rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center text-[30px] shrink-0 border border-orange-100">{r.emoji}</div>
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="font-black text-[13px]">{r.name}</h4>
                {r.veg && <span className="w-4 h-4 border-2 border-green-600 rounded-[3px] flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-green-600" /></span>}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">{r.cuisine}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="bg-green-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center"><Star className="w-2.5 h-2.5 mr-0.5 fill-white" />{r.rating}</span>
                <span className="text-[10px] text-slate-400 font-medium">{r.time} · {r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RestaurantMenu() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center"><ChevronLeft className="w-6 h-6 mr-2 text-slate-700" /><h2 className="text-[17px] font-black">Royal Biryani House</h2></div>
        <Heart className="w-5 h-5 text-slate-400" />
      </div>

      {/* Restaurant Hero */}
      <div className="h-[140px] bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center relative">
        <span className="text-[64px]">🍛</span>
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="font-black text-[16px] text-slate-900">Royal Biryani House</h3>
            <p className="text-[11px] text-slate-500 font-medium">Biryani · North Indian · Mughlai</p>
          </div>
          <span className="bg-green-700 text-white text-[12px] font-black px-2.5 py-1 rounded-lg flex items-center shadow-sm"><Star className="w-3.5 h-3.5 fill-white mr-0.5" />4.3</span>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-100 text-[11px] text-slate-500 font-medium">
        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" />25 min</span>
        <span>₹200 for two</span>
        <span className="text-red-600 font-bold">🏷️ 50% OFF up to ₹100</span>
      </div>

      {/* Menu */}
      <div className="px-4 mt-3">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-4 h-4 text-red-500" />
          <h3 className="font-black text-[15px]">Bestsellers</h3>
        </div>
        {[
          { name: "Hyderabadi Dum Biryani", desc: "Slow-cooked fragrant basmati with tender mutton, raita", price: "₹349", mrp: "₹449", veg: false, best: true },
          { name: "Paneer Dum Biryani", desc: "Aromatic rice layered with cottage cheese & spices", price: "₹249", mrp: "", veg: true, best: true },
          { name: "Chicken 65 Biryani", desc: "Spicy fried chicken pieces layered in flavoured rice", price: "₹299", mrp: "₹399", veg: false, best: false },
          { name: "Veg Dum Biryani", desc: "Mixed vegetables in aromatic saffron-spiced rice", price: "₹199", mrp: "", veg: true, best: false },
        ].map((item, i) => (
          <div key={i} className="flex items-start py-4 border-b border-slate-50 last:border-0">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-4 h-4 border-2 rounded-[3px] flex items-center justify-center ${item.veg ? "border-green-600" : "border-red-600"}`}>
                  <span className={`w-2 h-2 rounded-full ${item.veg ? "bg-green-600" : "bg-red-600"}`} />
                </span>
                {item.best && <span className="text-[8px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">🔥 BESTSELLER</span>}
              </div>
              <p className="text-[13px] font-black text-slate-800">{item.name}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="font-black text-[14px]">{item.price}</span>
                {item.mrp && <span className="text-[11px] text-slate-400 line-through">{item.mrp}</span>}
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-[80px] h-[70px] rounded-xl bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center text-[32px] border border-orange-100">🍛</div>
              <button className="bg-white text-red-600 border-2 border-red-500 text-[11px] font-black px-5 py-1.5 rounded-lg -mt-3 shadow-sm relative z-10">ADD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
