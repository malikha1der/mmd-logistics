export interface CompanyInfo {
  name: string;
  legalName: string;
  mcNumber: string;
  usdotNumber: string;
  email: string;
  phone: string;
  phoneRaw: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
  };
  phoneStatus: 'PENDING_VERIFICATION' | 'VERIFIED';
  equipmentType: string;
  businessType: string;
  effectiveDate: string;
}

export const COMPANY_DETAILS: CompanyInfo = {
  name: "MMD LOGISTICS LLC",
  legalName: "MMD LOGISTICS LLC",
  mcNumber: "1178290",
  usdotNumber: "3535101",
  email: "mmdlogisticllc@gmail.com",
  phone: "(612) 887-1277",
  phoneRaw: "+16128871277",
  address: {
    street: "1600 W 143RD ST APT 104",
    city: "BURNSVILLE",
    state: "MN",
    zip: "55306-4963",
    full: "1600 W 143RD ST APT 104, BURNSVILLE, MN 55306-4963"
  },
  phoneStatus: "VERIFIED",
  equipmentType: "53-foot dry van",
  businessType: "Interstate freight transportation",
  effectiveDate: "March 15, 2024" // Agreed client document baseline
};

export interface QuoteFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  originCityState: string;
  destinationCityState: string;
  pickupDate: string;
  freightType: string;
  weightLbs: string;
  shipmentDetails: string;
  smsConsent: boolean;
  termsConsent: boolean;
}

export interface QuoteFormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  originCityState?: string;
  destinationCityState?: string;
  pickupDate?: string;
  freightType?: string;
  weightLbs?: string;
  termsConsent?: string;
  smsConsent?: string;
  general?: string;
}

export interface StoredSmsConsentRecord {
  phoneNumber: string;
  email: string;
  consented: boolean;
  timestamp: string;
  consentTextVersion: string;
  ipPlaceholder: string;
}
