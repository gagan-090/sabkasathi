import { Search, MapPin, Mic, Home, Grid, Percent, User, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, Clock, Zap } from "lucide-react";

export function GroceryApp({ screen = "home" }: { screen?: "home" | "category" | "cart" }) {
  if (screen === "category") return <GroceryCategory />;
  if (screen === "cart") return <GroceryCart />;
  return <GroceryHome />;
}

function GroceryHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      {/* Status-bar-style header with gradient */}
      <div className="bg-gradient-to-br from-[#0c831f] via-[#108a24] to-[#14a82e] px-5 pt-4 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white/80 text-[11px] font-bold uppercase tracking-wide">Delivery in</span>
            </div>
            <h2 className="text-[26px] font-black text-white leading-none mt-0.5">8 minutes</h2>
            <div className="flex items-center text-white/70 text-[11px] mt-1.5 font-semibold">
              <MapPin className="w-3 h-3 mr-1" /> HSR Layout, Bengaluru <ChevronRight className="w-3 h-3 ml-0.5" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="bg-white rounded-2xl flex items-center px-4 py-3 shadow-lg shadow-black/10">
          <Search className="w-5 h-5 text-slate-300 mr-3" />
          <span className="text-slate-400 text-[14px] font-medium flex-1">Search &quot;milk&quot;, &quot;bread&quot;, &quot;eggs&quot;</span>
          <Mic className="w-5 h-5 text-green-600" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5 pb-24">
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-2xl p-4 relative overflow-hidden shadow-lg shadow-orange-500/20 mb-5">
          <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -bottom-8 w-20 h-20 bg-white/5 rounded-full" />
          <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Festival Special</p>
          <h3 className="text-white font-black text-xl leading-tight mt-1">Flat 50% OFF</h3>
          <p className="text-white/70 text-[11px] mt-1 font-medium">On sweets, dry fruits & diyas</p>
          <button className="mt-3 bg-white text-orange-600 text-[11px] font-black px-5 py-2 rounded-full shadow-md">Shop Now →</button>
        </div>

        {/* Categories Grid */}
        <h3 className="font-black text-[15px] mb-3 text-slate-800">Shop by Category</h3>
        <div className="grid grid-cols-4 gap-2.5 mb-6">
          {[
            { n: "Dairy & Eggs", e: "🥛", bg: "from-blue-50 to-sky-50", border: "border-blue-100" },
            { n: "Snacks", e: "🍿", bg: "from-orange-50 to-amber-50", border: "border-orange-100" },
            { n: "Cold Drinks", e: "🥤", bg: "from-red-50 to-rose-50", border: "border-red-100" },
            { n: "Fresh Fruits", e: "🍎", bg: "from-green-50 to-emerald-50", border: "border-green-100" },
            { n: "Atta & Rice", e: "🌾", bg: "from-amber-50 to-yellow-50", border: "border-amber-100" },
            { n: "Meat & Fish", e: "🍗", bg: "from-rose-50 to-pink-50", border: "border-rose-100" },
            { n: "Bakery", e: "🍞", bg: "from-yellow-50 to-orange-50", border: "border-yellow-100" },
            { n: "Pharmacy", e: "💊", bg: "from-teal-50 to-cyan-50", border: "border-teal-100" },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className={`w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${cat.bg} border ${cat.border} flex items-center justify-center text-[28px] shadow-sm`}>
                {cat.e}
              </div>
              <span className="text-[9px] font-bold text-slate-500 text-center leading-tight">{cat.n}</span>
            </div>
          ))}
        </div>

        {/* Best Sellers */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-[15px] text-slate-800">Bestsellers</h3>
          <span className="text-green-600 text-[12px] font-bold">See all →</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Amul Taaza Toned Milk", weight: "500 ml", price: "₹27", mrp: "₹30", emoji: "🥛" },
            { name: "Britannia Brown Bread", weight: "400 g", price: "₹42", mrp: "₹50", emoji: "🍞" },
            { name: "Farm Fresh Eggs", weight: "6 pcs", price: "₹55", mrp: "₹65", emoji: "🥚" },
            { name: "India Gate Basmati", weight: "1 kg", price: "₹89", mrp: "₹120", emoji: "🍚" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[90px] bg-gradient-to-br from-slate-50 to-green-50/50 flex items-center justify-center relative">
                <span className="text-[40px]">{p.emoji}</span>
                {i < 2 && <span className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">BEST SELLER</span>}
              </div>
              <div className="p-3">
                <p className="text-[12px] font-bold text-slate-800 leading-tight line-clamp-2">{p.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{p.weight}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-black text-[14px]">{p.price}</span>
                    <span className="text-[10px] text-slate-400 line-through">{p.mrp}</span>
                  </div>
                  <button className="bg-green-50 text-green-700 border border-green-200 text-[11px] font-black px-3 py-1.5 rounded-lg">ADD</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-green-700"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><Grid className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Categories</span></div>
        <div className="flex flex-col items-center text-slate-400"><Percent className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Offers</span></div>
        <div className="flex flex-col items-center text-slate-400 relative">
          <ShoppingCart className="w-[22px] h-[22px] mb-0.5" />
          <span className="absolute -top-1 right-0 bg-green-600 text-white text-[7px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-sm">3</span>
          <span className="text-[9px] font-bold">Cart</span>
        </div>
      </div>
    </div>
  );
}

function GroceryCategory() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f8f8f8] font-sans text-slate-900">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center">
          <ChevronLeft className="w-6 h-6 mr-2 text-slate-700" />
          <h2 className="text-[17px] font-black text-slate-900">Fresh Vegetables</h2>
        </div>
        <div className="relative">
          <ShoppingCart className="w-5 h-5 text-slate-600" />
          <span className="absolute -top-1 -right-1.5 bg-green-600 text-white text-[7px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full">3</span>
        </div>
      </div>

      {/* Delivery Strip */}
      <div className="bg-green-50 px-5 py-2 flex items-center border-b border-green-100">
        <Clock className="w-3.5 h-3.5 text-green-700 mr-1.5" />
        <span className="text-[11px] text-green-800 font-bold">Get it in 8 minutes</span>
      </div>

      {/* Products Grid */}
      <div className="px-4 pt-4">
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { n: "Red Onion", p: "₹35", w: "1 kg", e: "🧅", off: "12% OFF" },
            { n: "Tomato Local", p: "₹28", w: "500 g", e: "🍅", off: "" },
            { n: "Potato", p: "₹30", w: "1 kg", e: "🥔", off: "15% OFF" },
            { n: "Palak Leaves", p: "₹15", w: "250 g", e: "🥬", off: "" },
            { n: "Carrot Ooty", p: "₹45", w: "500 g", e: "🥕", off: "10% OFF" },
            { n: "Green Capsicum", p: "₹22", w: "250 g", e: "🫑", off: "" },
            { n: "Cucumber", p: "₹18", w: "500 g", e: "🥒", off: "" },
            { n: "Cauliflower", p: "₹35", w: "1 pc", e: "🥦", off: "8% OFF" },
            { n: "Green Chilli", p: "₹10", w: "100 g", e: "🌶️", off: "" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[80px] bg-gradient-to-br from-green-50/80 to-emerald-50/50 flex items-center justify-center relative">
                <span className="text-[32px]">{item.e}</span>
                {item.off && <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded">{item.off}</span>}
              </div>
              <div className="p-2">
                <p className="text-[11px] font-bold text-slate-700 leading-tight line-clamp-1">{item.n}</p>
                <p className="text-[9px] text-slate-400 font-medium">{item.w}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-black text-[13px]">{item.p}</span>
                  <button className="bg-green-50 text-green-700 border border-green-200 text-[10px] font-black w-14 py-1 rounded-lg text-center">ADD</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GroceryCart() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#f5f5f5] font-sans text-slate-900 relative">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center">
        <ChevronLeft className="w-6 h-6 mr-2 text-slate-700" />
        <div>
          <h2 className="text-[17px] font-black text-slate-900 leading-none">Your Cart</h2>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">3 items</p>
        </div>
      </div>

      {/* Delivery Timer */}
      <div className="mx-4 mt-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-3.5 flex items-center shadow-lg shadow-green-500/20">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <Zap className="w-5 h-5 text-white fill-white" />
        </div>
        <div>
          <p className="text-white font-black text-[14px]">Delivery in 8 minutes</p>
          <p className="text-white/70 text-[11px] font-medium">From your nearest store</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-50">
          <p className="text-[13px] font-black text-slate-800">🛒 Items in your cart</p>
        </div>
        {[
          { n: "Amul Taaza Milk", p: "₹54", w: "500 ml × 2", e: "🥛" },
          { n: "Farm Fresh Tomato", p: "₹28", w: "500 g × 1", e: "🍅" },
          { n: "Britannia Brown Bread", p: "₹42", w: "400 g × 1", e: "🍞" },
        ].map((item, i) => (
          <div key={i} className="flex items-center px-4 py-3 border-b border-slate-50 last:border-0">
            <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center text-[22px] shrink-0 mr-3">{item.e}</div>
            <div className="flex-1">
              <p className="text-[12px] font-bold text-slate-800">{item.n}</p>
              <p className="text-[10px] text-slate-400 font-medium">{item.w}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center bg-green-600 rounded-lg overflow-hidden">
                <button className="px-2 py-1.5 text-white"><Minus className="w-3 h-3" /></button>
                <span className="text-[12px] font-black text-white px-1">1</span>
                <button className="px-2 py-1.5 text-white"><Plus className="w-3 h-3" /></button>
              </div>
              <span className="font-black text-[13px] w-10 text-right">{item.p}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
        <h3 className="font-black text-[13px] mb-3 text-slate-800">Bill Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-[12px]"><span className="text-slate-500 font-medium">Item Total</span><span className="font-bold">₹124</span></div>
          <div className="flex justify-between text-[12px]"><span className="text-slate-500 font-medium">Delivery Fee</span><span className="font-bold text-green-600">FREE</span></div>
          <div className="flex justify-between text-[12px]"><span className="text-slate-500 font-medium">Handling Charge</span><span className="font-bold">₹3</span></div>
        </div>
        <div className="flex justify-between text-[14px] font-black text-slate-900 pt-3 mt-3 border-t border-dashed border-slate-200">
          <span>Grand Total</span><span>₹127</span>
        </div>
      </div>

      {/* Coupon */}
      <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm border border-dashed border-orange-200 p-3.5 flex items-center">
        <span className="text-lg mr-3">🎟️</span>
        <div className="flex-1">
          <p className="text-[12px] font-bold text-slate-800">Apply Coupon</p>
          <p className="text-[10px] text-slate-400">Save more on your order</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </div>

      {/* Bottom Pay Button */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-7 shadow-[0_-8px_25px_rgba(0,0,0,0.06)]">
        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl py-4 flex justify-between items-center px-5 shadow-lg shadow-green-600/30">
          <div className="leading-tight">
            <span className="font-black text-[16px] block">₹127</span>
            <span className="text-[10px] font-bold text-white/70 uppercase">Total</span>
          </div>
          <div className="flex items-center font-black text-[14px]">
            Place Order <ChevronRight className="w-5 h-5 ml-1" />
          </div>
        </button>
      </div>
    </div>
  );
}
