import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { COMPANY_DETAILS, QuoteFormData, QuoteFormErrors } from '../types';

import { sendQuoteEmail } from '../services/emailjs';

const STORAGE_KEY = 'mmd_quote_draft';

const INITIAL_FORM: QuoteFormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  originCityState: '',
  destinationCityState: '',
  pickupDate: '',
  freightType: '',
  weightLbs: '',
  shipmentDetails: '',
  smsConsent: false,
  termsConsent: false,
};

export const ContactAndQuote: React.FC = () => {
  const [formData, setFormData] = useState<QuoteFormData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore storage error
    }
    return INITIAL_FORM;
  });

  const submissionInFlight = useRef(false);

  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
    details?: {
      timestamp: string;
      origin: string;
      destination: string;
    };
  }>({ status: 'idle', message: '' });

  // Automatically preserve form values in sessionStorage as the user types
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // ignore storage error
    }
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name as keyof QuoteFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTermsCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, termsConsent: e.target.checked }));
    if (e.target.checked && errors.termsConsent) {
      setErrors((prev) => ({ ...prev, termsConsent: undefined }));
    }
  };

  const validate = (): QuoteFormErrors => {
    const newErrors: QuoteFormErrors = {};

    if (!formData.termsConsent) {
      newErrors.termsConsent =
        'Please agree to the Terms and Conditions and Privacy Policy before submitting your quote request.';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit phone number.';
    }

    if (!formData.originCityState.trim()) {
      newErrors.originCityState = 'Pickup city and state is required.';
    }

    if (!formData.destinationCityState.trim()) {
      newErrors.destinationCityState = 'Delivery city and state is required.';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate = 'Preferred pickup date is required.';
    }

    if (!formData.freightType.trim()) {
      newErrors.freightType = 'Freight type or cargo description is required.';
    }

    if (
      formData.weightLbs &&
      (isNaN(Number(formData.weightLbs)) || Number(formData.weightLbs) <= 0)
    ) {
      newErrors.weightLbs = 'Please enter a valid weight in pounds (or leave blank).';
    } else if (Number(formData.weightLbs) > 46000) {
      newErrors.weightLbs =
        'Standard 53-ft dry van maximum legal payload is ~45,000 lbs.';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionInFlight.current) return;

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first field that failed the current validation pass.
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.getElementById(firstErrorKey);
      if (el) el.focus();
      return;
    }

    submissionInFlight.current = true;
    setIsSubmitting(true);
    setSubmitResult({ status: 'idle', message: '' });

    // Show success only after EmailJS accepts the request.
    try {
      await sendQuoteEmail(formData);

      setSubmitResult({
        status: 'success',
        message: 'Quote request submitted successfully.',
        details: {
          timestamp: new Date().toLocaleString(),
          origin: formData.originCityState,
          destination: formData.destinationCityState,
        },
      });
    } catch {
      setSubmitResult({
        status: 'error',
        message: 'We could not send your quote request. Your shipment details have been preserved. Please try again or email dispatch directly.',
      });
    } finally {
      submissionInFlight.current = false;
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setSubmitResult({ status: 'idle', message: '' });
    setErrors({});
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 sm:py-24 bg-white dark:bg-[#080e1e] transition-colors"
      aria-labelledby="contact-and-quote-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wider uppercase mb-3">
            <span>Direct Communication</span>
            <span aria-hidden="true">·</span>
            <span>Shipper Dispatch</span>
          </div>
          <h2
            id="contact-and-quote-heading"
            style={{ textWrap: 'balance' }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
          >
            Connect With Our Team & Request a Freight Rate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Reach our Burnsville operations base directly or submit your shipment parameters below for dry van rate evaluation and carrier booking.
          </p>
        </div>

        {/* 2-Column Coordinated Layout: Contact Details on Left, Quote Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-[#0f1b3b] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-6">
                Company Information
              </h3>

              <div className="space-y-5 text-sm">
                {/* Legal Entity */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Carrier Name
                  </p>
                  <p className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                    {COMPANY_DETAILS.name}
                  </p>
                </div>

                {/* Physical Address */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Base of Operations
                  </p>
                  <div className="flex items-start gap-2.5 mt-1 text-slate-800 dark:text-slate-200">
                    <MapPin className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
                    <address className="not-italic leading-relaxed">
                      {COMPANY_DETAILS.address.street}<br />
                      {COMPANY_DETAILS.address.city}, {COMPANY_DETAILS.address.state} {COMPANY_DETAILS.address.zip}
                    </address>
                  </div>
                </div>

                {/* Email Contact */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Official Business Email
                  </p>
                  <div className="flex items-center gap-2.5 mt-1 text-slate-800 dark:text-slate-200">
                    <Mail className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                {/* Phone Contact */}
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Business Telephone
                  </p>
                  <div className="flex items-start gap-2.5 mt-1">
                    <Phone className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <a
                        href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                        className="font-bold text-slate-900 dark:text-white text-base font-mono hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                      >
                        {COMPANY_DETAILS.phone}
                      </a>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Direct line for dispatch, load scheduling, and rate inquiries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Authorities */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                    <span>Federal Operating Authority</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white dark:bg-[#132247] p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">MC NUMBER</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                        {COMPANY_DETAILS.mcNumber}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[#132247] p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">USDOT NUMBER</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                        {COMPANY_DETAILS.usdotNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Standard Links: Email Us and Call Us */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}?subject=Freight%20Inquiry%20-%20MMD%20Logistics`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors min-h-[44px]"
                  >
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-800 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors min-h-[44px]"
                    aria-label={`Call us at ${COMPANY_DETAILS.phone}`}
                  >
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Call Us:</span>
                    <span className="font-mono">{COMPANY_DETAILS.phone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Carrier Scope Box */}
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-[#0c1630] border border-blue-100 dark:border-blue-900/50 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Standard Equipment Scope
              </p>
              <p>
                Exclusively handling dry van freight requiring 53' trailers. Hazmat, refrigerated/reefer, flatbed, and oversized heavy-haul shipments are outside standard operating scope unless confirmed in advance.
              </p>
            </div>
          </div>

          {/* Right Column: Quote Form */}
          <div
            id="quote"
            className="scroll-mt-24 lg:col-span-7 bg-slate-50 dark:bg-[#0f1b3b] p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm"
          >
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                Request a Freight Quote
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Please provide your load parameters. Fields marked with <span className="text-rose-600 font-semibold">*</span> are required.
              </p>
            </div>

            {/* Success Feedback Banner */}
            {submitResult.status === 'success' && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200 text-sm space-y-3"
              >
                <div className="flex items-center gap-2.5 text-blue-900 dark:text-blue-300 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Freight Quote Request Received</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  Thank you for submitting your freight requirements for lane{' '}
                  <span className="font-semibold text-blue-800 dark:text-blue-300">{submitResult.details?.origin} → {submitResult.details?.destination}</span>. Our dispatch team is reviewing equipment capacity and will deliver your rate confirmation promptly.
                </p>
                <div className="p-3 bg-white dark:bg-[#132247] rounded-lg border border-blue-100 dark:border-blue-900 text-xs font-mono space-y-1">
                  <div>Timestamp: {submitResult.details?.timestamp}</div>
                  <div>Carrier Dispatch Desk: {COMPANY_DETAILS.phone}</div>
                </div>
                <div className="pt-1 flex gap-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="cursor-pointer text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                  <span className="text-slate-300">·</span>
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                    className="text-xs font-semibold text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    Call Dispatch for Immediate Booking: {COMPANY_DETAILS.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {submitResult.status === 'error' && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                <div>
                  <p className="font-semibold">Submission Issue</p>
                  <p className="text-xs mt-1">{submitResult.message}</p>
                </div>
              </div>
            )}

            {/* Quote Form Elements */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Row 1: Name and Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.fullName
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Company Name <span className="text-slate-400 font-normal normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Acme Manufacturing"
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    placeholder="name@company.com"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.email
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    placeholder="(555) 123-4567"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.phone
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Pickup and Delivery Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="originCityState"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Pickup City & State <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="originCityState"
                    name="originCityState"
                    value={formData.originCityState}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.originCityState}
                    aria-describedby={errors.originCityState ? 'origin-error' : undefined}
                    placeholder="e.g. Minneapolis, MN"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.originCityState
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.originCityState && (
                    <p id="origin-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.originCityState}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="destinationCityState"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Delivery City & State <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="destinationCityState"
                    name="destinationCityState"
                    value={formData.destinationCityState}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.destinationCityState}
                    aria-describedby={errors.destinationCityState ? 'destination-error' : undefined}
                    placeholder="e.g. Chicago, IL"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.destinationCityState
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.destinationCityState && (
                    <p id="destination-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.destinationCityState}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Pickup Date, Freight Type, Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="pickupDate"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Preferred Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="pickupDate"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.pickupDate}
                    aria-describedby={errors.pickupDate ? 'date-error' : undefined}
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.pickupDate
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.pickupDate && (
                    <p id="date-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.pickupDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="freightType"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Freight Type <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="freightType"
                    name="freightType"
                    value={formData.freightType}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.freightType}
                    aria-describedby={errors.freightType ? 'freight-error' : undefined}
                    placeholder="e.g. Palletized Goods"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.freightType
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.freightType && (
                    <p id="freight-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.freightType}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="weightLbs"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                  >
                    Weight (lbs) <span className="text-slate-400 font-normal normal-case">(opt)</span>
                  </label>
                  <input
                    type="number"
                    id="weightLbs"
                    name="weightLbs"
                    value={formData.weightLbs}
                    onChange={handleChange}
                    placeholder="e.g. 38500"
                    min="1"
                    max="45000"
                    disabled={isSubmitting}
                    className={`w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border ${
                      errors.weightLbs
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-blue-600'
                    } focus:outline-none focus:ring-1 transition-colors`}
                  />
                  {errors.weightLbs && (
                    <p id="weight-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-medium">
                      {errors.weightLbs}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 5: Additional Shipment Details */}
              <div>
                <label
                  htmlFor="shipmentDetails"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1"
                >
                  Additional Shipment Details <span className="text-slate-400 font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  id="shipmentDetails"
                  name="shipmentDetails"
                  rows={3}
                  value={formData.shipmentDetails}
                  onChange={handleChange}
                  placeholder="Specify dock appointment requirements, pallet count, loading hours, or special handling notes..."
                  disabled={isSubmitting}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white dark:bg-[#132247] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-600 focus:outline-none transition-colors"
                />
              </div>

              {/* MANDATORY TERMS CONSENT CHECKBOX */}
              <div className="pt-2 pb-1 border-t border-slate-200/90 dark:border-slate-800">
                <div className={`flex items-start gap-3 p-3.5 bg-white dark:bg-[#132247] rounded-xl border ${
                  errors.termsConsent
                    ? 'border-rose-500 ring-1 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700/80'
                }`}>
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      id="termsConsent"
                      name="termsConsent"
                      type="checkbox"
                      checked={formData.termsConsent}
                      onChange={handleTermsCheckboxChange}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.termsConsent}
                      aria-describedby={errors.termsConsent ? 'terms-consent-error' : undefined}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-blue-700 rounded border-slate-300 dark:border-slate-600 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <label
                    htmlFor="termsConsent"
                    className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed cursor-pointer select-none"
                  >
                    I have read and agree to the{' '}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-700 dark:text-blue-400 font-semibold underline hover:text-blue-900 dark:hover:text-blue-300 inline-flex items-center gap-0.5"
                    >
                      <span>Terms and Conditions</span>
                      <span className="sr-only">(opens in a new tab)</span>
                      <ExternalLink className="w-2.5 h-2.5 inline" aria-hidden="true" />
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-700 dark:text-blue-400 font-semibold underline hover:text-blue-900 dark:hover:text-blue-300 inline-flex items-center gap-0.5"
                    >
                      <span>Privacy Policy</span>
                      <span className="sr-only">(opens in a new tab)</span>
                      <ExternalLink className="w-2.5 h-2.5 inline" aria-hidden="true" />
                    </a>.
                  </label>
                </div>
                {errors.termsConsent && (
                  <p id="terms-consent-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium" role="alert">
                    {errors.termsConsent}
                  </p>
                )}
              </div>

              {/* Submit Button & Anti-Duplicate Handling */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed rounded-xl shadow-md transition-all duration-150 min-h-[48px] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Validating & Staging Rate Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                Your entries remain saved while reading legal terms. No marketing data is shared with external third parties.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
