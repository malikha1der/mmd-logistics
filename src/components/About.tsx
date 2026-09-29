import React from 'react';
import { Truck, ShieldCheck, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../types';
import mmdTruck from '../assets/images/mmd_truck.webp';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 sm:py-24 bg-slate-50 dark:bg-[#0b1429] border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase mb-3">
            <span>Operational Profile</span>
            <span aria-hidden="true">·</span>
            <span>Motor Carrier Authority</span>
          </div>

          <h2
            id="about-heading"
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
          >
            Interstate Freight Transportation Engineered for Reliability
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {COMPANY_DETAILS.name} is an authorized interstate motor carrier based in Burnsville, Minnesota, providing dedicated dry van transportation services for commercial shippers, manufacturers, and logistics partners.
          </p>
        </div>

        {/* 2-Column Content: Equipment & Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left Column: Equipment & Image */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1b3b]">

              <div className="relative">
                <img
                  src={mmdTruck}
                  alt="MMD Logistics commercial semi-truck pulling a 53-foot dry van trailer"
                  width={1200}
                  height={896}
                  className="w-full h-72 sm:h-80 object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-blue-500/30 text-white flex items-center gap-1.5 shadow-md">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs font-black tracking-wider uppercase font-sans">
                    MMD LOGISTICS
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
                  <span>Standard Fleet Configuration</span>
                  <span className="font-mono text-blue-700 dark:text-blue-400">
                    53' × 102" × 110"
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  53-Foot Air-Ride Dry Van Solutions
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our core freight operations focus exclusively on 53-foot dry van trailers. Designed for palletized, non-perishable commercial freight, these trailers provide clean, weather-tight cargo containment with high cubic capacity and smooth air-ride transit.
                </p>
              </div>
            </div>

            {/* Quick Equipment Dimensions Strip */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white dark:bg-[#101e40] border border-slate-200/90 dark:border-slate-800 text-center">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Trailer Length
                </p>
                <p className="text-lg font-bold text-slate-950 dark:text-white font-mono mt-1">
                  53 Feet
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  High Cube
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#101e40] border border-slate-200/90 dark:border-slate-800 text-center">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Pallet Capacity
                </p>
                <p className="text-lg font-bold text-slate-950 dark:text-white font-mono mt-1">
                  26 Standard
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  48" × 40" Pallets
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#101e40] border border-slate-200/90 dark:border-slate-800 text-center">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Payload Rating
                </p>
                <p className="text-lg font-bold text-slate-950 dark:text-white font-mono mt-1">
                  Up to 45k lbs
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Legal Weight
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Operating Capabilities & Authority Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white dark:bg-[#0f1b3b] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Carrier Verification & Operating Standard
              </h3>

              <div className="space-y-4">

                {/* FMCSA */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      Federal Motor Carrier Safety Administration (FMCSA)
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Operating under active federal authority with MC #
                      <span className="font-mono font-medium">
                        {COMPANY_DETAILS.mcNumber}
                      </span>{' '}
                      and USDOT #
                      <span className="font-mono font-medium">
                        {COMPANY_DETAILS.usdotNumber}
                      </span>{' '}
                      for interstate commerce.
                    </p>
                  </div>
                </div>

                {/* Base of Operations */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      Registered Base of Operations
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Strategically located at {COMPANY_DETAILS.address.full}, facilitating freight lanes originating across Upper Midwest corridors and connecting interstate transport links.
                    </p>
                  </div>
                </div>

                {/* Cargo Protection */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5">
                    <Truck className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      Cargo Protection & Trailer Cleanliness
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Strict inspection standards before dispatch: clean wooden floors, odorless dry interiors, functional load bars, and E-track straps to maintain cargo integrity from shipper dock to receiver facility.
                    </p>
                  </div>
                </div>
              </div>

              {/* Service & Operational Commitment Banner */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">

                <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                  <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
                  <span>Committed Carrier Standard</span>
                </div>

                <p className="leading-relaxed">
                  Every load coordinated through MMD LOGISTICS LLC is managed with direct carrier communication, active FMCSA safety compliance, and premium 53-foot dry van equipment engineered for prompt, damage-free interstate freight delivery.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};