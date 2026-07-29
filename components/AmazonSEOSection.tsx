import React from 'react';
import Link from 'next/link';

interface ServiceLink {
  slug: string;
  name: string;
  url: string;
}

interface AmazonSEOSectionProps {
  cityName: string;
  stateName: string;
  currentService: string;
  relatedServices: ServiceLink[];
  nearbyCities: { name: string; slug: string; url: string }[];
}

export const AmazonSEOSection: React.FC<AmazonSEOSectionProps> = ({
  cityName,
  stateName,
  currentService,
  relatedServices,
  nearbyCities,
}) => {
  return (
    <section
      aria-label="Amazon Silo Cross-Linking Grid"
      className="my-16 border-t border-slate-200 bg-slate-50/50 py-12 px-4 md:px-8 rounded-3xl"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Amazon-style Verified Ratings & Trust Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex text-amber-500 text-xl font-bold">
              ★★★★★
            </div>
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                4.9 out of 5 Stars — Verified Client Rating
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Based on 148+ completed software, web, and mobile app projects in {cityName} & {stateName}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 bg-slate-100 px-4 py-2 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Enterprise Service Provider
          </div>
        </div>

        {/* Amazon Silo Grid 1: Frequently Combined Digital Services */}
        <div>
          <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
            <span className="text-orange-600 font-serif">⚡</span>
            Frequently Combined Solutions in {cityName}
          </h3>
          <p className="text-xs text-slate-500 font-medium mb-6">
            Clients looking for {currentService} in {cityName} also frequently integrate these services:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedServices.slice(0, 6).map((service, idx) => (
              <Link
                key={idx}
                href={service.url}
                className="group bg-white p-4 rounded-xl border border-slate-200/80 hover:border-orange-600/50 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                    Complementary Service
                  </div>
                  <div className="text-sm font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                    {service.name} in {cityName}
                  </div>
                </div>
                <div className="mt-3 text-xs font-semibold text-slate-400 group-hover:text-slate-700 flex items-center gap-1">
                  View Specs & Pricing →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Amazon Silo Grid 2: Regional Hubs & Nearby Cities Matrix */}
        {nearbyCities.length > 0 && (
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
              <span className="text-orange-600 font-serif">📍</span>
              Nearby Digital Hubs & Industrial Locations in {stateName}
            </h3>
            <p className="text-xs text-slate-500 font-medium mb-6">
              Serving surrounding business districts and hubs around {cityName}:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {nearbyCities.map((city, idx) => (
                <Link
                  key={idx}
                  href={city.url}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-xs"
                >
                  {currentService} in {city.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
