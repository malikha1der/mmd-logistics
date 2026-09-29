# EmailJS quote integration

Configured service: service_ru8wceq
Configured template: template_uv5oa59
The supplied public key is configured in src/services/emailjs.ts (including its leading hyphen).

In the EmailJS template, keep To Email fixed as mmdlogisticllc@gmail.com, From Email as the connected service default, and Reply To as {{email}}.
Subject: New Freight Quote: {{originCityState}} to {{destinationCityState}}

Template parameters: fullName, companyName, email, phone, originCityState, destinationCityState, pickupDate, freightType, weightLbs, shipmentDetails, smsConsent (Yes/No), submittedAt (UTC), consentTextVersion.

No extra dependency or environment variable is required. Build and deploy as before. Where configured, allow your production domain in EmailJS origin settings. An accepted API response does not prove inbox delivery: submit one real quote yourself and check the recipient inbox/spam and EmailJS history.

Only ContactAndQuote.tsx and the new services/emailjs.ts implement changes. The form sends through EmailJS REST; errors preserve entries. It does not send SMS or automatic customer replies. The former simulated send and localStorage submission log were removed; session draft preservation remains.
