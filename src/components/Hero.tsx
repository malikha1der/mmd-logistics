import React from 'react';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../types';
import heroTruck from '../assets/images/hero_truck.jpg';
export const Hero: React.FC = () => {
  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const quoteElement = document.getElementById('quote');
    if (quoteElement) {
      quoteElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Welcome and Overview"
      className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroTruck}
          alt="American commercial semi-truck pulling a 53-foot dry van trailer on interstate highway"
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite_alternate]"
          loading="eager"
          fetchPriority="high"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark blue gradient scrim ensuring WCAG AA contrast (>= 4.5:1) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061025]/95 via-[#0b1b42]/85 to-[#0b2154]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061025] via-transparent to-transparent opacity-80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-white">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Trust Line (Anti-Slop Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-semibold text-blue-200/90 mb-5">
            <span className="inline-flex items-center gap-1.5 text-blue-300">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              MC {COMPANY_DETAILS.mcNumber}
            </span>
            <span aria-hidden="true" className="text-blue-400/60">·</span>
            <span>USDOT {COMPANY_DETAILS.usdotNumber}</span>
            <span aria-hidden="true" className="text-blue-400/60">·</span>
            <span>53-Foot Dry Van</span>
            <span aria-hidden="true" className="text-blue-400/60">·</span>
            <span>Burnsville, MN</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500"
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">MMD Logistics LLC</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-600">
            Interstate dry van transportation for your business. Share your pickup, delivery, and shipment requirements with our team.
          </p>

          {/* Key capability signals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-xl text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full Truckload (FTL) & Palletized Freight</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Moisture-Sealed 53' Air-Ride Trailers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Compliant Interstate Authority</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct Carrier-to-Shipper Coordination</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#quote"
              onClick={scrollToQuote}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg hover:shadow-blue-600/30 transition-all duration-150 active:scale-[0.98] min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-slate-100 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-slate-500 rounded-xl transition-all duration-150 min-h-[48px] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group"
              aria-label={`Call Dispatch at ${COMPANY_DETAILS.phone}`}
            >
              <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Call Dispatch:</span>
              <span className="font-bold text-white font-mono">{COMPANY_DETAILS.phone}</span>
            </a>
          </div>

          {/* Direct dispatch contact strip in hero */}
          <p className="mt-4 text-xs text-slate-300 max-w-xl flex flex-wrap items-center gap-2">
            <span>Direct carrier line:</span>
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="text-white font-semibold font-mono hover:text-blue-300 transition-colors"
            >
              {COMPANY_DETAILS.phone}
            </a>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Email:</span>
            <a
              href={`mailto:${COMPANY_DETAILS.email}`}
              className="text-blue-300 underline hover:text-white transition-colors"
            >
              {COMPANY_DETAILS.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
