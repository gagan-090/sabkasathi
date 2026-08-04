import { Search, Heart, ShoppingBag, ChevronLeft, Star, Home, Grid, User, Filter, Share2 } from "lucide-react";

export function FashionApp({ screen = "home" }: { screen?: "home" | "category" | "product" }) {
  if (screen === "category") return <FashionCategory />;
  if (screen === "product") return <FashionProduct />;
  return <FashionHome />;
}

function FashionHome() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-black text-[22px] tracking-tight">LUXE <span className="text-rose-500 text-[10px] font-black align-super">♦</span></h1>
          <div className="flex items-center gap-3.5">
            <Search className="w-5 h-5 text-slate-600" />
            <Heart className="w-5 h-5 text-slate-600" />
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[7px] font-black w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-br from-[#2d2d2d] via-[#1a1a1a] to-[#0d0d0d] rounded-2xl p-5 relative overflow-hidden shadow-xl shadow-black/20">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-rose-500/10 rounded-full" />
          <div className="absolute right-4 top-4 w-20 h-20 bg-rose-500/5 rounded-full" />
          <span className="text-rose-400 text-[9px] font-bold uppercase tracking-[0.2em]">New Season</span>
          <h3 className="text-white font-black text-[24px] leading-tight mt-1">Autumn<br/>Fashion Fest</h3>
          <p className="text-white/40 text-[11px] mt-1.5 font-medium">40-70% OFF on premium brands</p>
          <button className="mt-4 bg-white text-slate-900 text-[11px] font-black px-5 py-2.5 rounded-full shadow-md">Shop Collection →</button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-5">
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
          {[
            { name: "Women", icon: "👗", active: true },
            { name: "Men", icon: "👔", active: false },
            { name: "Kids", icon: "🧒", active: false },
            { name: "Beauty", icon: "💄", active: false },
            { name: "Shoes", icon: "👠", active: false },
          ].map((c, i) => (
            <div key={i} className="flex flex-col items-center shrink-0">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-[24px] shadow-sm ${c.active ? "bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-300" : "bg-slate-50 border border-slate-200"}`}>
                {c.icon}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 ${c.active ? "text-rose-600" : "text-slate-500"}`}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 mt-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-[15px]">Trending Now 🔥</h3>
          <span className="text-rose-600 text-[12px] font-bold">View All →</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Velvet Blazer", brand: "ARIO Studio", price: "₹2,499", mrp: "₹4,999", off: "50% OFF", rating: "4.5", emoji: "🧥" },
            { name: "Floral Midi Dress", brand: "BLOOM", price: "₹1,899", mrp: "₹3,499", off: "46% OFF", rating: "4.3", emoji: "👗" },
            { name: "Leather Biker Jacket", brand: "URBAN Craft", price: "₹3,299", mrp: "₹6,499", off: "49% OFF", rating: "4.6", emoji: "🧥" },
            { name: "Classic Chronograph", brand: "CHRONO", price: "₹4,999", mrp: "₹9,999", off: "50% OFF", rating: "4.7", emoji: "⌚" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[140px] bg-gradient-to-br from-rose-50/80 via-pink-50/50 to-slate-50 flex items-center justify-center relative">
                <span className="text-[48px]">{p.emoji}</span>
                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-slate-300" />
                </div>
                <span className="absolute bottom-2 left-2 bg-rose-600 text-white text-[8px] font-black px-2 py-0.5 rounded-md">{p.off}</span>
              </div>
              <div className="p-3">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{p.brand}</p>
                <p className="text-[12px] font-bold text-slate-800 leading-tight mt-0.5">{p.name}</p>
                <div className="flex items-baseline gap-1.5 mt-1.5">
                  <span className="font-black text-[14px]">{p.price}</span>
                  <span className="text-[10px] text-slate-400 line-through">{p.mrp}</span>
                </div>
                <div className="flex items-center mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-[10px] text-slate-500 ml-0.5 font-medium">{p.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="mt-5 bg-white border-t border-slate-100 flex justify-around py-2.5 px-2 pb-7 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col items-center text-rose-600"><Home className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Home</span></div>
        <div className="flex flex-col items-center text-slate-400"><Grid className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Categories</span></div>
        <div className="flex flex-col items-center text-slate-400"><Heart className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Wishlist</span></div>
        <div className="flex flex-col items-center text-slate-400"><User className="w-[22px] h-[22px] mb-0.5" /><span className="text-[9px] font-bold">Account</span></div>
      </div>
    </div>
  );
}

function FashionCategory() {
  return (
    <div className="w-[390px] min-h-[844px] bg-[#fafafa] font-sans text-slate-900">
      <div className="bg-white px-5 pt-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center"><ChevronLeft className="w-6 h-6 mr-2" /><h2 className="text-[17px] font-black">Women&apos;s Fashion</h2></div>
        <Filter className="w-5 h-5 text-slate-600" />
      </div>
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none bg-white border-b border-slate-50">
        {["All", "Dresses", "Tops", "Sarees", "Kurtas", "Jeans"].map((f, i) => (
          <span key={i} className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-bold border ${i === 0 ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"}`}>{f}</span>
        ))}
      </div>
      <div className="px-4 pt-3">
        <p className="text-[11px] text-slate-400 font-medium mb-3">1,234 items found</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Anarkali Suit Set", price: "₹1,599", mrp: "₹2,999", emoji: "👗", brand: "ETHNIC" },
            { name: "Banarasi Silk Saree", price: "₹2,999", mrp: "₹5,999", emoji: "🥻", brand: "HERITAGE" },
            { name: "Embroidered Crop Top", price: "₹699", mrp: "₹1,299", emoji: "👚", brand: "BLOOM" },
            { name: "Palazzo Co-ord Set", price: "₹1,199", mrp: "₹2,499", emoji: "👖", brand: "URBAN" },
            { name: "Boho Maxi Dress", price: "₹1,899", mrp: "₹3,499", emoji: "👗", brand: "LUXE" },
            { name: "Denim Trucker Jacket", price: "₹1,499", mrp: "₹2,999", emoji: "🧥", brand: "STREET" },
          ].map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[120px] bg-gradient-to-br from-pink-50 to-rose-50/50 flex items-center justify-center relative">
                <span className="text-[42px]">{p.emoji}</span>
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center">
                  <Heart className="w-3 h-3 text-slate-300" />
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">{p.brand}</p>
                <p className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">{p.name}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-black text-[13px]">{p.price}</span>
                  <span className="text-[9px] text-slate-400 line-through">{p.mrp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FashionProduct() {
  return (
    <div className="w-[390px] min-h-[844px] bg-white font-sans text-slate-900 relative">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <ChevronLeft className="w-6 h-6 text-slate-700" />
        <div className="flex items-center gap-3"><Share2 className="w-5 h-5 text-slate-400" /><Heart className="w-5 h-5 text-slate-400" /><ShoppingBag className="w-5 h-5 text-slate-400" /></div>
      </div>

      <div className="h-[240px] bg-gradient-to-br from-rose-50 via-pink-50 to-slate-50 flex items-center justify-center relative">
        <span className="text-[80px]">👗</span>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {[0,1,2,3,4].map(i => <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-rose-500" : "bg-slate-200"}`} />)}
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">BLOOM STUDIO</p>
        <h3 className="font-black text-[18px] leading-tight mt-1">Floral Print Midi Dress with Adjustable Belt</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-700 text-white text-[11px] font-black px-2 py-0.5 rounded-lg flex items-center"><Star className="w-3 h-3 fill-white mr-0.5" />4.3</span>
          <span className="text-[12px] text-slate-500 font-medium">8,234 ratings</span>
        </div>

        <div className="mt-3 bg-rose-50 rounded-xl p-3 border border-rose-100">
          <div className="flex items-baseline gap-2">
            <span className="font-black text-[26px]">₹1,899</span>
            <span className="text-[14px] text-slate-400 line-through">₹3,499</span>
            <span className="text-[14px] font-black text-green-700">46% off</span>
          </div>
          <p className="text-[10px] text-rose-600 font-bold mt-0.5">🏷️ Extra ₹100 off with coupon</p>
        </div>

        <div className="mt-4">
          <p className="text-[12px] font-black text-slate-700 mb-2.5">Select Size</p>
          <div className="flex gap-2">
            {["XS", "S", "M", "L", "XL"].map((s, i) => (
              <span key={i} className={`w-11 h-11 rounded-xl flex items-center justify-center text-[12px] font-bold border-2 ${i === 2 ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/30" : "bg-white text-slate-600 border-slate-200"}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[12px] font-black text-slate-700 mb-2.5">Select Color</p>
          <div className="flex gap-2.5">
            {[{c: "bg-rose-400", ring: true}, {c: "bg-sky-400", ring: false}, {c: "bg-amber-400", ring: false}, {c: "bg-slate-800", ring: false}].map((col, i) => (
              <span key={i} className={`w-9 h-9 rounded-full ${col.c} ${col.ring ? "ring-2 ring-offset-2 ring-rose-500" : "border border-slate-200"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-7 flex gap-3 shadow-[0_-8px_25px_rgba(0,0,0,0.06)]">
        <button className="flex-1 bg-white text-rose-600 border-2 border-rose-500 rounded-2xl py-3.5 font-black text-[13px]">Add to Bag</button>
        <button className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl py-3.5 font-black text-[13px] shadow-lg shadow-rose-500/30">Buy Now</button>
      </div>
    </div>
  );
}
