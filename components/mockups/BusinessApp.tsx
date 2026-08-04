import { Search, ChevronLeft, Star, Heart, ShoppingBag, Home, Camera, Mic, Bell, Filter, User, TrendingUp } from "lucide-react";

export function BusinessApp({ screen = "home" }: { screen?: "home" | "product" | "deals" }) {
  if (screen === "product") return <ProductPage />;
  if (screen === "deals") return <DealsPage />;
  return <BusinessHome />;
}

function BusinessHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f1f3f6] font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2874f0] to-[#1a5dc7] px-4 pt-4 pb-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-black text-[20px] tracking-tight">ShopEasy</h1>
            <span className="bg-yellow-400 text-[8px] font-black text-blue-900 px-1.5 py-0.5 rounded italic">Plus</span>
          </div>
          <div className="flex items-center gap-3.5">
            <Bell className="w-5 h-5 text-white/80" />
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-white/80" />
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-blue-900 text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">3</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl flex items-center px-3.5 py-2.5 shadow-lg shadow-black/10">
          <Search className="w-5 h-5 text-slate-300 mr-3" />
          <span className="text-slate-400 text-[13px] font-medium flex-1">Search for products, brands...</span>
          <Camera className="w-5 h-5 text-blue-500 ml-2" />
          <Mic className="w-5 h-5 text-blue-500 ml-2.5" />
        </div>
      </div>

      {/* Mega Deal Banner */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-[#ffd700] via-[#ffb300] to-[#ff8f00] rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-amber-400/25">
          <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/15 rounded-full" />
          <div className="absolute -right-4 -bottom-10 w-20 h-20 bg-white/10 rounded-full" />
          <div className="flex items-center gap-1.5 mb-1">
            <span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
            <span className="text-amber-900/50 text-[9px] font-bold uppercase tracking-widest">Mega Sale</span>
          </div>
          <h3 className="text-amber-950 font-black text-[24px] leading-tight">Up to 80% OFF</h3>
          <p className="text-amber-800/60 text-[11px] mt-0.5 font-medium">Electronics, Fashion, Home & More</p>
          <button className="mt-3 bg-[#2874f0] text-white text-[11px] font-black px-5 py-2 rounded-full shadow-md shadow-blue-600/30">Explore Deals →</button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-5">
        <div className="grid grid-cols-4 gap-2.5">
          {[
            { name: "Mobiles", icon: "📱", bg: "from-blue-50 to-indigo-50" },
            { name: "Fashion", icon: "👗", bg: "from-pink-50 to-rose-50" },
            { name: "Electronics", icon: "💻", bg: "from-purple-50 to-violet-50" },
            { name: "Home", icon: "🏠", bg: "from-green-50 to-emerald-50" },
            { name: "Beauty", icon: "💄", bg: "from-rose-50 to-pink-50" },
            { name: "Sports", icon: "⚽", bg: "from-amber-50 to-yellow-50" },
            { name: "Books", icon: "📚", bg: "from-indigo-50 to-blue-50" },
            { name: "Grocery", icon: "🛒", bg: "from-emerald-50 to-teal-50" },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-[68px] h-[68px] rounded-2xl bg-gradient-to-br ${cat.bg} border border-slate-100 flex items-center justify-center text-[26px] shadow-sm`}>
                {cat.icon}
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1.5">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hot Deals */}
      <div className="px-4 mt-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <h3 className="font-black text-[15px]">Trending Deals</h3>
          </div>
          <span className="text-blue-600 text-[12px] font-bold">View All →</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Wireless Earbuds Pro", price: "₹1,299", mrp: "₹3,999", off: "68%", rating: "4.3", emoji: "🎧" },
            { name: "Smart Fitness Watch", price: "₹2,499", mrp: "₹7,999", off: "69%", rating: "4.1", emoji: "⌚" },
            { name: "Running Shoes Air", price: "₹899", mrp: "₹2,499", off: "64%", rating: "4.4", emoji: "👟" },
            { name: "Premium Cotton Tee", price: "₹399", mrp: "₹1,299", off: "70%", rating: "4.2", emoji: "👕" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[100px] bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center relative">
                <span className="text-[40px]">{p.emoji}</span>
                <span className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-md">{p.off}% OFF</span>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-[12px] font-bold text-slate-800 leading-tight">{p.name}</p>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="font-black text-[15px] text-slate-900">{p.price}</span>
                  <span className="text-[10px] text-slate-400 line-through">{p.mrp}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-slate-500 font-medium ml-0.5">{p.rating} (2.4k)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-5 bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-blue-600"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><Filter className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Categories</span></div>
        <div className="flex flex-col items-center text-slate-400"><Heart className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Wishlist</span></div>
        <div className="flex flex-col items-center text-slate-400"><User className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Account</span></div>
      </div>
    </div>
  );
}

function ProductPage() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center"><ChevronLeft className="w-6 h-6 mr-2" /><span className="text-[14px] font-bold text-slate-500">Back</span></div>
        <div className="flex items-center gap-3"><Heart className="w-5 h-5 text-slate-400" /><ShoppingBag className="w-5 h-5 text-slate-400" /></div>
      </div>

      <div className="h-[200px] bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 flex items-center justify-center relative">
        <span className="text-[80px]">🎧</span>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0,1,2,3].map(i => <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-600" : "bg-slate-200"}`} />)}
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">Premium Audio</p>
        <h3 className="font-black text-[18px] leading-tight mt-1">Wireless Earbuds Pro with Active Noise Cancellation</h3>
        <div className="flex items-center gap-2.5 mt-2">
          <span className="bg-green-700 text-white text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center"><Star className="w-3 h-3 fill-white mr-0.5" />4.3</span>
          <span className="text-[12px] text-slate-500 font-medium">12,847 Ratings & 2,341 Reviews</span>
        </div>
        <div className="mt-3 bg-green-50 rounded-xl p-3 border border-green-100">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-[26px] text-slate-900">₹1,299</span>
            <span className="text-[14px] text-slate-400 line-through">₹3,999</span>
            <span className="text-[14px] font-black text-green-700">68% off</span>
          </div>
          <p className="text-[10px] text-green-700 font-bold mt-0.5">🎉 Special Price · Limited Stock</p>
        </div>

        <div className="mt-4 space-y-2.5">
          {["✅ Active Noise Cancellation (ANC)", "✅ 32 Hours Battery Life", "✅ IPX5 Water & Sweat Resistant", "✅ Fast Charging — 10 min = 2 hrs", "✅ 13mm Premium Drivers"].map((f, i) => (
            <p key={i} className="text-[12px] text-slate-600 font-medium">{f}</p>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 text-[11px]">
          <span className="bg-blue-50 text-blue-700 border border-blue-100 font-bold px-3 py-1.5 rounded-lg">🚚 Free Delivery</span>
          <span className="bg-amber-50 text-amber-700 border border-amber-100 font-bold px-3 py-1.5 rounded-lg">🔄 7-Day Return</span>
          <span className="bg-green-50 text-green-700 border border-green-100 font-bold px-3 py-1.5 rounded-lg">🛡️ 1 Year Warranty</span>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-7 flex gap-3 shadow-[0_-8px_25px_rgba(0,0,0,0.06)]">
        <button className="flex-1 bg-[#ff9f00] text-white rounded-xl py-3.5 font-black text-[13px] shadow-lg shadow-amber-500/30">Add to Cart</button>
        <button className="flex-1 bg-[#fb641b] text-white rounded-xl py-3.5 font-black text-[13px] shadow-lg shadow-orange-500/30">Buy Now</button>
      </div>
    </div>
  );
}

function DealsPage() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f1f3f6] font-sans text-slate-900">
      <div className="bg-gradient-to-r from-[#2874f0] to-[#1a5dc7] px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center"><ChevronLeft className="w-6 h-6 mr-2 text-white/80" /><h2 className="text-[17px] font-black text-white">Deals of the Day</h2></div>
        <Bell className="w-5 h-5 text-white/80" />
      </div>

      <div className="px-4 pt-4">
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-red-500/20 mb-4">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded-full">⏰ Ends in 04:23:17</span>
          </div>
          <h3 className="text-white font-black text-[22px] leading-tight">Flash Sale ⚡</h3>
          <p className="text-white/60 text-[11px] mt-0.5 font-medium">Top deals under ₹999 · Limited stock</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Bluetooth Speaker", price: "₹799", mrp: "₹2,499", emoji: "🔊", off: "68%" },
            { name: "Phone Case Premium", price: "₹199", mrp: "₹799", emoji: "📱", off: "75%" },
            { name: "Travel Backpack", price: "₹499", mrp: "₹1,499", emoji: "🎒", off: "67%" },
            { name: "UV Sunglasses", price: "₹349", mrp: "₹999", emoji: "🕶️", off: "65%" },
            { name: "Steel Bottle 1L", price: "₹299", mrp: "₹899", emoji: "🧴", off: "67%" },
            { name: "LED Desk Lamp", price: "₹599", mrp: "₹1,799", emoji: "💡", off: "67%" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[85px] bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center relative">
                <span className="text-[36px]">{p.emoji}</span>
                <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded">{p.off} OFF</span>
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-bold text-slate-800 leading-tight">{p.name}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-black text-[14px]">{p.price}</span>
                  <span className="text-[9px] text-slate-400 line-through">{p.mrp}</span>
                </div>
                <button className="mt-2 w-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-black py-1.5 rounded-lg">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
