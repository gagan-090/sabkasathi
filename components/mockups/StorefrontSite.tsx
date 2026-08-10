import { Search, Camera, User, ShoppingCart, Star, Heart, ChevronRight } from "lucide-react";

/*
  A desktop storefront — the artwork for the Website Development service.

  Same client as BusinessApp (ShopEasy, same blue, same catalogue) but laid out
  for a browser instead of a phone: a utility bar, a header whose search is a
  wide field rather than a pill, a horizontal category nav, and a hero that
  splits into a banner and two side promos. That is the whole point of the
  piece — one brand, two form factors — so the copy and prices are kept
  identical to the phone screens on purpose.

  Composed against BrowserFrame's 1180px virtual viewport, so every size here
  is a plain pixel value. At the frame's default 16:10 the window shows the top
  ~737px, which is why the sections are ordered the way they are: header, hero
  and categories fit, and the fold lands across the top of the product grid.
  Anything moved above the hero pushes that grid out of the window entirely.
*/

const NAV = ["Mobiles", "Fashion", "Electronics", "Home & Kitchen", "Beauty", "Grocery"];

const CATEGORIES = [
  { name: "Mobiles", icon: "📱", bg: "from-blue-50 to-indigo-50" },
  { name: "Fashion", icon: "👗", bg: "from-pink-50 to-rose-50" },
  { name: "Electronics", icon: "💻", bg: "from-purple-50 to-violet-50" },
  { name: "Home", icon: "🏠", bg: "from-green-50 to-emerald-50" },
  { name: "Beauty", icon: "💄", bg: "from-rose-50 to-pink-50" },
  { name: "Sports", icon: "⚽", bg: "from-amber-50 to-yellow-50" },
  { name: "Books", icon: "📚", bg: "from-indigo-50 to-blue-50" },
  { name: "Grocery", icon: "🛒", bg: "from-emerald-50 to-teal-50" },
];

const PRODUCTS = [
  { name: "Wireless Earbuds Pro", price: "₹1,299", mrp: "₹3,999", off: "68", rating: "4.3", emoji: "🎧" },
  { name: "Smart Fitness Watch", price: "₹2,499", mrp: "₹7,999", off: "69", rating: "4.1", emoji: "⌚" },
  { name: "Running Shoes Air", price: "₹899", mrp: "₹2,499", off: "64", rating: "4.4", emoji: "👟" },
  { name: "Premium Cotton Tee", price: "₹399", mrp: "₹1,299", off: "70", rating: "4.2", emoji: "👕" },
];

const TRUST = [
  { icon: "🚚", title: "Free delivery over ₹499", body: "Same-day dispatch across Bihar" },
  { icon: "🔄", title: "7-day easy returns", body: "No questions, pickup from home" },
  { icon: "🔒", title: "UPI, cards & COD", body: "PCI-compliant checkout" },
  { icon: "💬", title: "Support 24 × 7", body: "Call, chat or WhatsApp" },
];

export function StorefrontSite() {
  return (
    <div className="w-[1180px] min-h-[1260px] bg-[#f1f3f6] font-sans text-slate-900">
      {/* ── utility bar ── */}
      <div className="h-[30px] bg-[#0f1e3d] px-10 flex items-center justify-between text-[11px] font-medium text-white/55">
        <span>Free delivery on orders over ₹499 · Same-day dispatch across Bihar</span>
        <span className="flex items-center gap-6">
          <span>Track order</span>
          <span>Help centre</span>
          <span className="text-yellow-400/90 font-bold">Sell on ShopEasy</span>
        </span>
      </div>

      {/* ── header ── */}
      <header className="bg-gradient-to-r from-[#2874f0] to-[#1a5dc7] px-10 py-[14px] flex items-center gap-8">
        <div className="flex items-center gap-2 shrink-0">
          <h1 className="text-white font-black text-[24px] tracking-tight leading-none">ShopEasy</h1>
          <span className="bg-yellow-400 text-[9px] font-black text-blue-900 px-[6px] py-[2px] rounded italic leading-none">
            Plus
          </span>
        </div>

        <div className="flex-1 max-w-[520px] bg-white rounded-lg flex items-center px-4 h-[40px] shadow-lg shadow-black/10">
          <Search className="w-[17px] h-[17px] text-slate-300 mr-3" />
          <span className="flex-1 text-slate-400 text-[13px] font-medium">
            Search for products, brands and more
          </span>
          <Camera className="w-[17px] h-[17px] text-blue-500" />
        </div>

        <div className="flex items-center gap-7 ml-auto text-white/85 text-[13px] font-bold">
          <span className="flex items-center gap-[6px]">
            <User className="w-[16px] h-[16px]" />
            Account
          </span>
          <span className="relative flex items-center gap-[6px]">
            <ShoppingCart className="w-[16px] h-[16px]" />
            Cart
            <span className="absolute -top-[7px] left-[9px] bg-yellow-400 text-blue-900 text-[8px] font-black w-[15px] h-[15px] rounded-full flex items-center justify-center">
              3
            </span>
          </span>
        </div>
      </header>

      {/* ── category nav ── */}
      <nav className="h-[44px] bg-white border-b border-slate-200 px-10 flex items-center gap-8 text-[13px] font-semibold text-slate-600">
        {NAV.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className="text-red-600 font-black">Today&apos;s Deals</span>
        <span className="ml-auto flex items-center gap-1 text-[12px] font-bold text-slate-400">
          Deliver to <span className="text-slate-700">Bhagalpur 812001</span>
          <ChevronRight className="w-[13px] h-[13px]" />
        </span>
      </nav>

      {/* ── hero ── */}
      <section className="px-10 pt-[26px] grid grid-cols-[1.32fr_0.68fr] gap-5">
        <div className="relative h-[290px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#ffd700] via-[#ffb300] to-[#ff8f00] p-8 shadow-lg shadow-amber-400/25">
          <div className="absolute -right-14 -top-14 w-[220px] h-[220px] rounded-full bg-white/15" />
          <div className="absolute right-10 -bottom-20 w-[150px] h-[150px] rounded-full bg-white/10" />

          <div className="relative flex items-center gap-2">
            <span className="bg-red-600 text-white text-[10px] font-black px-[9px] py-[3px] rounded-full">LIVE</span>
            <span className="text-amber-900/50 text-[11px] font-bold uppercase tracking-[0.2em]">Mega Sale</span>
          </div>

          <h2 className="relative mt-3 text-amber-950 font-black text-[52px] leading-[1.02] tracking-tight">
            Up to 80% OFF
          </h2>
          <p className="relative mt-2 text-amber-800/65 text-[15px] font-semibold">
            Electronics, Fashion, Home &amp; More · Ends in 04:23:17
          </p>

          <div className="relative mt-6 flex items-center gap-3">
            <span className="bg-[#2874f0] text-white text-[13px] font-black px-6 py-[11px] rounded-full shadow-md shadow-blue-600/30">
              Explore Deals →
            </span>
            <span className="bg-white/70 text-amber-900 text-[13px] font-black px-6 py-[11px] rounded-full">
              New arrivals
            </span>
          </div>

          <div className="relative mt-6 flex items-center gap-5 text-[11px] font-bold text-amber-900/55">
            <span>★ 4.8 average rating</span>
            <span>·</span>
            <span>1.2L+ orders shipped</span>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-5">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 flex flex-col justify-center shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600">Under ₹999</span>
            <p className="mt-1 text-[19px] font-black leading-tight text-slate-900">
              Everyday
              <br />
              essentials
            </p>
            <span className="mt-3 text-[12px] font-bold text-slate-400">248 products →</span>
          </div>
          <div className="relative rounded-2xl bg-gradient-to-br from-[#2874f0] to-[#1a5dc7] p-5 flex flex-col justify-center overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-[110px] h-[110px] rounded-full bg-white/10" />
            <span className="relative text-[10px] font-black uppercase tracking-[0.16em] text-yellow-300">
              Plus members
            </span>
            <p className="relative mt-1 text-[19px] font-black leading-tight text-white">
              Free delivery,
              <br />
              always
            </p>
            <span className="relative mt-3 text-[12px] font-bold text-white/60">Join for ₹99 / yr →</span>
          </div>
        </div>
      </section>

      {/* ── categories ── */}
      <section className="px-10 mt-[24px]">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[16px] font-black text-slate-900">Shop by category</h3>
          <span className="text-[12px] font-bold text-blue-600">All categories →</span>
        </div>
        <div className="mt-3 grid grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="flex flex-col items-center">
              <div
                className={`w-full h-[74px] rounded-2xl bg-gradient-to-br ${cat.bg} border border-slate-100 flex items-center justify-center text-[30px] shadow-sm`}
              >
                {cat.icon}
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-2">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── trending. The fold falls across the top of this grid, so the row is
             caught mid-image and the page reads as continuing past the window
             rather than as a picture that happens to end there. ── */}
      <section className="px-10 mt-[26px] pb-8">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[16px] font-black text-slate-900">Trending deals</h3>
          <span className="text-[12px] font-bold text-blue-600">View all →</span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="h-[150px] bg-gradient-to-br from-slate-50 to-blue-50/50 flex items-center justify-center relative">
                <span className="text-[56px]">{p.emoji}</span>
                <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-[3px] rounded-md">
                  {p.off}% OFF
                </span>
                <span className="absolute top-3 right-3 w-[26px] h-[26px] rounded-full bg-white shadow-md flex items-center justify-center">
                  <Heart className="w-[13px] h-[13px] text-slate-300" />
                </span>
              </div>
              <div className="p-4">
                <p className="text-[13px] font-bold text-slate-800 leading-tight">{p.name}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-black text-[17px] text-slate-900">{p.price}</span>
                  <span className="text-[11px] text-slate-400 line-through">{p.mrp}</span>
                </div>
                <div className="flex items-center mt-[6px]">
                  <Star className="w-[12px] h-[12px] fill-amber-400 text-amber-400" />
                  <span className="text-[11px] text-slate-500 font-medium ml-1">{p.rating} (2.4k)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── trust strip. Below the fold on purpose: it is the row that makes
             the page feel finished when you scroll, and above the fold it
             pushed the product grid clean out of the window. ── */}
      <section className="px-10 pb-10">
        <div className="grid grid-cols-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          {TRUST.map((item, i) => (
            <div
              key={item.title}
              className={`px-6 py-4 flex items-center gap-3 ${i > 0 ? "border-l border-slate-100" : ""}`}
            >
              <span className="text-[22px]">{item.icon}</span>
              <span>
                <p className="text-[13px] font-black text-slate-800 leading-tight">{item.title}</p>
                <p className="text-[11px] font-medium text-slate-400 mt-[2px]">{item.body}</p>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="bg-[#0f1e3d] px-10 py-8 grid grid-cols-4 gap-8 text-[11px] text-white/45">
        <div>
          <p className="text-white font-black text-[16px] tracking-tight">ShopEasy</p>
          <p className="mt-2 leading-relaxed">
            A Next.js storefront rendered on the server, indexed in full and green on Core Web Vitals.
          </p>
        </div>
        {[
          { head: "Shop", links: ["Deals of the day", "New arrivals", "Best sellers", "Gift cards"] },
          { head: "Help", links: ["Track order", "Returns", "Payments", "Contact us"] },
          { head: "Company", links: ["About", "Careers", "Sell with us", "Privacy"] },
        ].map((col) => (
          <div key={col.head}>
            <p className="text-white/80 font-black uppercase tracking-[0.16em] text-[10px]">{col.head}</p>
            <ul className="mt-2 space-y-[6px]">
              {col.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </footer>
    </div>
  );
}
