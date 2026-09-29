import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, ShieldCheck, AlertCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../types';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (targetId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-[#060c1a] text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand and Description (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                {COMPANY_DETAILS.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Interstate freight transportation specializing in reliable 53-foot dry van logistics solutions. Federal motor carrier authority dedicated to safe and compliant commercial freight movement.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                MC {COMPANY_DETAILS.mcNumber}
              </span>
              <span>·</span>
              <span>USDOT {COMPANY_DETAILS.usdotNumber}</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={handleHomeClick}
                  className="hover:text-white transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className="cursor-pointer hover:text-white transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className="cursor-pointer hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Base & Operational Status (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Carrier Headquarters
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <address className="not-italic">
                  {COMPANY_DETAILS.address.street}<br />
                  {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}
                </address>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="hover:text-white font-mono transition-colors"
                >
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-white mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Freight Dispatch & Operations</span>
                </div>
                <p className="text-slate-400">
                  Dedicated interstate dry van transportation. Dispatch office: <span className="text-slate-200 font-mono">{COMPANY_DETAILS.phone}</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} {COMPANY_DETAILS.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/terms-and-conditions" className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
