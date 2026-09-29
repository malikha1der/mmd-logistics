import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { COMPANY_DETAILS } from '../types';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#080e1e] text-slate-900 dark:text-slate-100 transition-colors">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Header Block */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase mb-2">
            <FileText className="w-4 h-4" />
            <span>Carrier Service & Website Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Terms and Conditions
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            <span>Effective Date: <strong className="font-semibold text-slate-700 dark:text-slate-300">{COMPANY_DETAILS.effectiveDate}</strong></span>
            <span>·</span>
            <span>Entity: <strong className="font-semibold text-slate-700 dark:text-slate-300">{COMPANY_DETAILS.name}</strong></span>
            <span>·</span>
            <span>MC: <strong className="font-mono text-slate-700 dark:text-slate-300">{COMPANY_DETAILS.mcNumber}</strong></span>
            <span>·</span>
            <span>USDOT: <strong className="font-mono text-slate-700 dark:text-slate-300">{COMPANY_DETAILS.usdotNumber}</strong></span>
          </div>
        </div>

        {/* Legal Body Content */}
        <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              1. Agreement to Terms & Carrier Identification
            </h2>
            <p>
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern the use of this website and the freight transportation services requested, booked, or tendered through <span className="font-semibold">{COMPANY_DETAILS.name}</span> (&ldquo;Carrier,&rdquo; &ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a licensed motor carrier holding operating authority from the Federal Motor Carrier Safety Administration (FMCSA) under MC #{COMPANY_DETAILS.mcNumber} and USDOT #{COMPANY_DETAILS.usdotNumber}, with its verified office located at:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-[#0f1b3b] rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-mono">
              {COMPANY_DETAILS.name}<br />
              {COMPANY_DETAILS.address.street}<br />
              {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}<br />
              Phone: {COMPANY_DETAILS.phone}<br />
              Email: {COMPANY_DETAILS.email}
            </div>
            <p>
              By accessing our website, requesting a rate quote, or tendering freight to Carrier, the shipper, consignor, consignee, broker, or user (&ldquo;Customer&rdquo;) agrees to be bound by these Terms and any applicable written Rate Confirmation, Bill of Lading, or Master Transportation Agreement.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              2. Scope of Transportation Services & Equipment
            </h2>
            <p>
              {COMPANY_DETAILS.name} provides interstate commercial freight motor carrier transportation utilizing standard 53-foot dry van trailers. Unless explicitly agreed upon in a written and signed agreement:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Equipment furnished consists exclusively of dry van trailers designed for clean, dry, non-refrigerated commercial freight.</li>
              <li>Maximum legal cargo weight payload shall not exceed 45,000 lbs, subject to federal, state, and local bridge formula weight restrictions.</li>
              <li>Hazardous materials (HAZMAT) requiring placarding, temperature-controlled cargo, oversized loads, and illegal substances are not accepted for transport.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              3. Rate Quotes, Fuel Surcharges & Accessorial Charges
            </h2>
            <p>
              Online quote estimations generated or requested through our website are informational and subject to equipment availability, lane verification, fuel cost indexing, and final dispatch confirmation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>Free Time & Detention:</strong> Standard loading and unloading includes two (2) hours of free time at shipper and receiver facilities. Detention accrued beyond free time is billed at industry-standard hourly rates.</li>
              <li><strong>Truck Ordered Not Used (TONU):</strong> Cancellations made after a truck has been dispatched or arrived at the origin facility will be assessed standard TONU charges.</li>
              <li><strong>Layover:</strong> If loading or unloading cannot be completed on the scheduled date due to facility delays, standard layover charges apply per 24-hour delay period.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              4. Bills of Lading & Carmack Amendment Cargo Liability
            </h2>
            <p>
              Carrier&rsquo;s liability for loss, damage, or delay to cargo transported in interstate commerce is governed by the Carmack Amendment, 49 U.S.C. &sect; 14706, and the provisions of the applicable uniform Bill of Lading.
            </p>
            <p>
              Carrier shall not be liable for loss, damage, or delay caused by: (a) acts of God or public authority; (b) inherent vice of the goods; (c) improper packaging, palletizing, loading, blocking, or bracing performed by the shipper; (d) acts or defaults of the shipper or receiver; or (e) severe weather, highway closures, or force majeure events beyond Carrier&rsquo;s reasonable control.
            </p>
            <p>
              All cargo loss and damage claims must be filed in writing with Carrier within nine (9) months of the delivery date (or reasonable delivery date in the event of non-delivery), accompanied by the paid freight bill, original bill of lading, and substantiated salvage/repair invoices.
            </p>
          </section>

          {/* Section 5: TCPA & 10DLC SMS Messaging Policy */}
          <section className="space-y-3 p-5 rounded-2xl bg-blue-50/70 dark:bg-[#0c1630] border border-blue-200/80 dark:border-blue-900/60">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                5. SMS & Mobile Text Messaging Terms (TCPA / 10DLC Compliance)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              When you opt in by checking our dedicated SMS consent checkbox on our rate quote form or inquiring about dispatch services, you expressly consent to receive conversational and informational SMS/MMS messages from <span className="font-semibold">{COMPANY_DETAILS.name}</span>.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li>
                <strong>Program Description:</strong> Messages relate strictly to your load inquiries, rate quotes, pickup and delivery scheduling, dispatch coordination, shipment tracking, and driver check-in updates.
              </li>
              <li>
                <strong>Voluntary & Optional:</strong> Consent to receive text messages is not a condition of purchase or contracting carrier services. You may submit quote requests without consenting to SMS.
              </li>
              <li>
                <strong>Message Frequency:</strong> Message frequency varies depending on your shipment volume and inquiry activity (typically 2&ndash;5 messages per active freight load).
              </li>
              <li>
                <strong>Rates:</strong> Message and data rates may apply depending on your mobile carrier plan.
              </li>
              <li>
                <strong>How to Opt-Out:</strong> You may cancel the SMS service at any time. Simply reply <strong>STOP</strong> to any text message received from us. After sending STOP, you will receive a confirmation message that you have been unsubscribed, and no further text messages will be sent unless you re-subscribe.
              </li>
              <li>
                <strong>Help & Support:</strong> For assistance, reply <strong>HELP</strong> to any message or contact our team via email at{' '}
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-blue-700 dark:text-blue-400 underline font-semibold">
                  {COMPANY_DETAILS.email}
                </a>.
              </li>
              <li>
                <strong>Mobile Carriers:</strong> Supported wireless carriers are not liable for delayed or undelivered messages.
              </li>
              <li>
                <strong>Privacy Commitment:</strong> We do not share, sell, rent, or trade your mobile phone number or SMS opt-in consent with any third parties or affiliates for promotional or marketing purposes.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              6. Website Intellectual Property & Permitted Use
            </h2>
            <p>
              All content on this website, including texts, design layouts, graphics, wordmarks, and equipment descriptions, is the property of {COMPANY_DETAILS.name} and protected by applicable copyright and trademark laws. You are granted a limited, non-exclusive license to view website materials solely for legitimate commercial freight tendering purposes.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms, all rate contracts, and transportation transactions shall be governed by and construed in accordance with federal motor carrier laws and the laws of the State of Minnesota, without regard to conflict of law principles. Any legal action arising out of these Terms shall be instituted in the state or federal courts situated in or having jurisdiction over Dakota County, Minnesota.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              8. Contact & Formal Notices
            </h2>
            <p>
              For formal legal inquiries, contract notifications, or questions regarding these Terms, please contact our administrative office:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-[#0f1b3b] rounded-lg border border-slate-200 dark:border-slate-800 text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">{COMPANY_DETAILS.name}</p>
              <p>{COMPANY_DETAILS.address.street}</p>
              <p>{COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}</p>
              <p className="mt-1">
                Phone:{' '}
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-blue-700 dark:text-blue-400 font-mono hover:underline">
                  {COMPANY_DETAILS.phone}
                </a>
              </p>
              <p className="mt-0.5 text-blue-700 dark:text-blue-400 font-medium">
                Email: <a href={`mailto:${COMPANY_DETAILS.email}`} className="underline">{COMPANY_DETAILS.email}</a>
              </p>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                USDOT: {COMPANY_DETAILS.usdotNumber} · MC: {COMPANY_DETAILS.mcNumber}
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
