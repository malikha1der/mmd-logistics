import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, Truck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { COMPANY_DETAILS } from '../types';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      // Scroll to element after navigation
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky  top-[3px] z-50 w-full transition-all duration-300 ease-in-out  ${
        isScrolled
          ? 'translate-y-0 py-2.5 bg-white/95 dark:bg-[#0a1128]/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 dark:border-slate-800/90'
          : ' translate-y-[3px] py-4 md:py-5 bg-white dark:bg-[#080e1e] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-2.5 text-slate-900 dark:text-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
          >
            <div
              className={`flex items-center justify-center rounded-lg bg-blue-700 dark:bg-blue-600 text-white transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-9 h-9 md:w-10 md:h-10'
              }`}
            >
              <Truck className={isScrolled ? 'w-4 h-4' : 'w-5 h-5'} />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-extrabold tracking-tight font-sans transition-all duration-300 ${
                  isScrolled
                    ? 'text-base md:text-lg'
                    : 'text-lg md:text-xl'
                } text-slate-950 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400`}
              >
                {COMPANY_DETAILS.name}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200 "
          >
            <a
              href="/"
              onClick={handleHomeClick}
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1.5 py-1 "
            >
              Home
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1.5 py-1"
            >
              About
            </button>
            <Link
              to="/terms-and-conditions"
              className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1.5 py-1"
            >
              Terms & Conditions
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="cursor-pointer hover:text-blue-700 dark:hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded px-1.5 py-1"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions - Primary CTA and Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => handleNavClick('quote')}
              className="cursor-pointer px-5 py-2.5 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm hover:shadow transition-all duration-150 whitespace-nowrap active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0a1128]"
            >
              Get a Quote
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="cursor-pointer p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#0a1128]/98 backdrop-blur-xl px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200"
        >
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="/"
              onClick={handleHomeClick}
              className="px-3 py-2.5 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors flex items-center min-h-[44px]"
            >
              Home
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="text-left px-3 py-2.5 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors flex items-center min-h-[44px]"
            >
              About
            </button>
            <Link
              to="/terms-and-conditions"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors flex items-center min-h-[44px]"
            >
              Terms & Conditions
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="text-left px-3 py-2.5 text-base font-semibold text-slate-800 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors flex items-center min-h-[44px]"
            >
              Contact
            </button>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => handleNavClick('quote')}
                className="w-full text-center px-4 py-3 text-base font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-colors min-h-[48px] flex items-center justify-center"
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
