import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { COMPANY_DETAILS } from '../types';

export const PrivacyPolicyPage: React.FC = () => {
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
            <Lock className="w-4 h-4" />
            <span>Information Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Privacy Policy
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
              1. Introduction & Carrier Scope
            </h2>
            <p>
              {COMPANY_DETAILS.name} (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is dedicated to protecting the personal and commercial information collected through our website and dispatch operations.
            </p>
            <p>
              This Privacy Policy describes how we collect, use, maintain, protect, and disclose information gathered from shippers, freight brokers, logistics managers, and website visitors when you interact with our freight transport services, request rate quotes, or communicate with our operations team.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              2. Information We Collect
            </h2>
            <p>We collect information directly from you when you submit a rate quote inquiry or communicate with our team:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>Contact Identifiers:</strong> Name, business or company name, email address, and telephone number.</li>
              <li><strong>Shipment Details:</strong> Origin city and state, destination city and state, preferred pickup and delivery dates, freight description, estimated weight, pallet counts, and loading requirements.</li>
              <li><strong>SMS Consent Records:</strong> Affirmative opt-in status, timestamp of consent, telephone number provided, and version of consent text accepted.</li>
              <li><strong>Technical Logs:</strong> Browser type, operating system, and standard server interaction logs collected automatically when accessing our website.</li>
            </ul>
          </section>

          {/* Section 3: STRICT 10DLC SMS PRIVACY CLAUSE */}
          <section className="space-y-3 p-5 rounded-2xl bg-blue-50/70 dark:bg-[#0c1630] border border-blue-200/80 dark:border-blue-900/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-700 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                3. Mobile Messaging & SMS Privacy Protection (10DLC Compliance)
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-blue-950 dark:text-blue-200">
              No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              All categories in this policy exclude text messaging originator opt-in data and consent; this information will not be shared with, sold to, or rented to any third parties or marketing affiliates under any circumstances.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Mobile phone numbers collected specifically for SMS communication will be utilized solely by {COMPANY_DETAILS.name} to send conversational and operational updates concerning your shipment, rate quotes, and dispatch logistics.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              4. How We Use Your Information
            </h2>
            <p>The information we collect is used strictly for commercial freight transportation purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Evaluating freight lane parameters and calculating accurate dry van rate quotations.</li>
              <li>Dispatching equipment, coordinating drivers, and scheduling pickup and delivery dock appointments.</li>
              <li>Generating Bills of Lading, rate confirmations, proof of delivery (POD), and freight billing invoices.</li>
              <li>Complying with Federal Motor Carrier Safety Administration (FMCSA), Department of Transportation (DOT), and state transportation statutory requirements.</li>
              <li>Responding to customer service inquiries and carrier compliance audits.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              5. Disclosure of Information
            </h2>
            <p>
              We do not sell, rent, or lease your personal or business information. We only disclose information in limited operational circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li><strong>Operating Facilities:</strong> Sharing origin and destination shipping information with authorized shippers, receivers, and warehouse docks necessary to execute freight pickup and delivery.</li>
              <li><strong>Legal & Regulatory Mandates:</strong> Disclosing information when required by federal, state, or local law, including FMCSA audits, law enforcement subpoenas, or legal processes.</li>
              <li><strong>Safety & Protection:</strong> Protecting the rights, property, or safety of {COMPANY_DETAILS.name}, our drivers, equipment, and customers against fraud or security threats.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              6. Data Security & Retention
            </h2>
            <p>
              We implement industry-standard administrative, technical, and physical safeguards designed to secure your personal information from accidental loss and unauthorized access, alteration, or disclosure. Freight transaction records and bills of lading are retained in accordance with federal DOT statutory recordkeeping requirements (minimum 3 years).
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              7. Cookies & Tracking Technologies
            </h2>
            <p>
              Our website uses only essential functional session storage to preserve your quote form inputs and theme preferences (light/dark mode). We do not deploy intrusive third-party cross-site advertising trackers or behavior profiling networks.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">
              8. Your Rights & Contact Details
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal contact information you have provided to us. To exercise these rights or inquire regarding our privacy practices:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-[#0f1b3b] rounded-lg border border-slate-200 dark:border-slate-800 text-sm">
              <p className="font-semibold text-slate-900 dark:text-white">{COMPANY_DETAILS.name}</p>
              <p className="text-slate-600 dark:text-slate-300">{COMPANY_DETAILS.address.street}</p>
              <p className="text-slate-600 dark:text-slate-300">{COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}</p>
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
