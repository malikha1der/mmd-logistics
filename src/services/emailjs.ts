import type { QuoteFormData } from '../types';

// EmailJS browser identifiers are public, not private credentials.
const EMAILJS = {
  serviceId: 'service_ru8wceq',
  templateId: 'template_uv5oa59',
  publicKey: '-rCVNRbz7a4NLnKpR',
};

export async function sendQuoteEmail(data: QuoteFormData) {
  const submittedAt = new Date().toISOString();
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS.serviceId,
      template_id: EMAILJS.templateId,
      user_id: EMAILJS.publicKey,
      template_params: {
        ...data,
        companyName: data.companyName.trim() || 'Not provided',
        weightLbs: data.weightLbs.trim() || 'Not provided',
        shipmentDetails: data.shipmentDetails.trim() || 'Not provided',
        email: data.email.trim(),
        smsConsent: data.smsConsent ? 'Yes' : 'No',
        termsConsent: data.termsConsent ? 'Yes' : 'No',
        submittedAt,
        consentTextVersion: 'quote-form-v1',
      },
    }),
  });
  if (!response.ok) throw new Error('Email submission failed.');
  return { submittedAt };
}
