import { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";

import FormField from "./FormField";
import FormStatusMessage from "./FormStatusMessage";
import Button from "./Button";

import { EMAIL_CONFIG } from "../config/emailConfig";

import "../styles/QuoteForm.css";

const INITIAL_STATE = {
  pickupLocation: "",
  deliveryLocation: "",
  freightType: "",
  pickupDate: "",
  weight: "",
  pallets: "",
  contactDetails: "",
  notes: "",
  // Honeypot - see ContactForm.jsx for the full rationale.
  companyWebsite: "",
};

// Minimum time between two submits, to stop accidental double-clicks and
// rapid-fire duplicate sends.
const SUBMIT_COOLDOWN_MS = 4000;

const MAX_LENGTHS = {
  pickupLocation: 150,
  deliveryLocation: 150,
  weight: 50,
  pallets: 4,
  contactDetails: 200,
  notes: 2000,
};

const FREIGHT_TYPES = [
  {
    value: "general",
    label: "General Freight",
  },
  {
    value: "palletized",
    label: "Palletized Goods",
  },
  {
    value: "retail",
    label: "Retail / Consumer Goods",
  },
  {
    value: "food-grade",
    label: "Food Grade (Non Perishable)",
  },
  {
    value: "other",
    label: "Other",
  },
];

function validate(values) {
  const errors = {};

  const pickupLocation = values.pickupLocation.trim();
  const deliveryLocation = values.deliveryLocation.trim();
  const weight = values.weight.trim();
  const pallets = values.pallets.trim();
  const contactDetails = values.contactDetails.trim();
  const notes = values.notes.trim();

  if (!pickupLocation) {
    errors.pickupLocation = "Pickup location is required.";
  } else if (pickupLocation.length > MAX_LENGTHS.pickupLocation) {
    errors.pickupLocation = `Pickup location must be ${MAX_LENGTHS.pickupLocation} characters or fewer.`;
  }

  if (!deliveryLocation) {
    errors.deliveryLocation = "Delivery location is required.";
  } else if (deliveryLocation.length > MAX_LENGTHS.deliveryLocation) {
    errors.deliveryLocation = `Delivery location must be ${MAX_LENGTHS.deliveryLocation} characters or fewer.`;
  }

  if (!values.freightType) {
    errors.freightType = "Please select freight type.";
  } else if (
    !FREIGHT_TYPES.some(
      (freightType) => freightType.value === values.freightType
    )
  ) {
    errors.freightType = "Please select a valid freight type.";
  }

  if (!values.pickupDate) {
    errors.pickupDate = "Pickup date is required.";
  } else {
    const selectedDate = new Date(`${values.pickupDate}T00:00:00`);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate < today
    ) {
      errors.pickupDate = "Pickup date cannot be in the past.";
    }
  }

  if (!weight) {
    errors.weight = "Weight is required.";
  } else if (weight.length > MAX_LENGTHS.weight) {
    errors.weight = `Weight must be ${MAX_LENGTHS.weight} characters or fewer.`;
  }

  if (pallets) {
    const palletCount = Number(pallets);

    if (
      !Number.isInteger(palletCount) ||
      palletCount < 0 ||
      palletCount > 9999
    ) {
      errors.pallets = "Enter a valid number of pallets.";
    }
  }

  if (!contactDetails) {
    errors.contactDetails = "Contact details are required.";
  } else if (contactDetails.length > MAX_LENGTHS.contactDetails) {
    errors.contactDetails = `Contact details must be ${MAX_LENGTHS.contactDetails} characters or fewer.`;
  }

  if (notes.length > MAX_LENGTHS.notes) {
    errors.notes = `Notes must be ${MAX_LENGTHS.notes} characters or fewer.`;
  }

  return errors;
}

function isEmailJsConfigured() {
  return Boolean(
    EMAIL_CONFIG.serviceId &&
      EMAIL_CONFIG.quoteTemplateId &&
      EMAIL_CONFIG.publicKey &&
      !EMAIL_CONFIG.serviceId.startsWith("YOUR_") &&
      !EMAIL_CONFIG.quoteTemplateId.startsWith("YOUR_") &&
      !EMAIL_CONFIG.publicKey.startsWith("YOUR_")
  );
}

function QuoteForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const lastSubmitRef = useRef(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const nextErrors = { ...prev };
      delete nextErrors[name];

      return nextErrors;
    });

    setStatus(null);
  }, []);

  const resetForm = useCallback(() => {
    setValues(INITIAL_STATE);
    setErrors({});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.companyWebsite) {
      setStatus("success");
      resetForm();
      return;
    }

    const now = Date.now();

    if (status === "sending" || now - lastSubmitRef.current < SUBMIT_COOLDOWN_MS) {
      return;
    }

    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus(null);
      return;
    }

    if (!isEmailJsConfigured()) {
      console.error(
        "EmailJS is not configured. Add the real EmailJS service, template, and public key values to src/config/emailConfig.js."
      );
      setStatus("error");
      return;
    }

    try {
      lastSubmitRef.current = now;
      setStatus("sending");

      await emailjs.send(
        EMAIL_CONFIG.serviceId,
        EMAIL_CONFIG.quoteTemplateId,
        {
          pickup_location: values.pickupLocation.trim(),
          delivery_location: values.deliveryLocation.trim(),
          freight_type: values.freightType,
          pickup_date: values.pickupDate,
          weight: values.weight.trim(),
          pallets: values.pallets.trim(),
          contact_details: values.contactDetails.trim(),
          notes: values.notes.trim(),
        },
        EMAIL_CONFIG.publicKey
      );

      setStatus("success");
      resetForm();
    } catch (error) {
      console.error("Quote form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <form
      className="quote-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormStatusMessage
        status={
          status === "success" || status === "error"
            ? status
            : null
        }
        successText="Quote request has been sent successfully. Our dispatcher will contact you shortly."
        errorText="Unable to send quote request. Please try again."
      />

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="quoteCompanyWebsite">Company Website</label>
        <input
          type="text"
          id="quoteCompanyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={handleChange}
        />
      </div>

      <div className="quote-form__row">
        <FormField
          label="Pickup Location"
          id="pickupLocation"
          value={values.pickupLocation}
          onChange={handleChange}
          error={errors.pickupLocation}
          required
          maxLength={MAX_LENGTHS.pickupLocation}
          autoComplete="street-address"
          placeholder="City, State"
        />

        <FormField
          label="Delivery Location"
          id="deliveryLocation"
          value={values.deliveryLocation}
          onChange={handleChange}
          error={errors.deliveryLocation}
          required
          maxLength={MAX_LENGTHS.deliveryLocation}
          placeholder="City, State"
        />
      </div>

      <div className="quote-form__row">
        <FormField
          label="Freight Type"
          id="freightType"
          as="select"
          options={FREIGHT_TYPES}
          value={values.freightType}
          onChange={handleChange}
          error={errors.freightType}
          required
          placeholder="Select Freight Type"
        />

        <FormField
          label="Pickup Date"
          id="pickupDate"
          type="date"
          value={values.pickupDate}
          onChange={handleChange}
          error={errors.pickupDate}
          required
        />
      </div>

      <div className="quote-form__row quote-form__row--three">
        <FormField
          label="Weight"
          id="weight"
          value={values.weight}
          onChange={handleChange}
          error={errors.weight}
          required
          maxLength={MAX_LENGTHS.weight}
          placeholder="38,000 lbs"
        />

        <FormField
          label="Number of Pallets"
          id="pallets"
          type="number"
          min="0"
          max="9999"
          step="1"
          value={values.pallets}
          onChange={handleChange}
          error={errors.pallets}
          inputMode="numeric"
          placeholder="24"
        />

        <FormField
          label="Contact Details"
          id="contactDetails"
          value={values.contactDetails}
          onChange={handleChange}
          error={errors.contactDetails}
          required
          maxLength={MAX_LENGTHS.contactDetails}
          autoComplete="email"
          placeholder="Name / Phone / Email"
        />
      </div>

      <FormField
        label="Additional Notes"
        id="notes"
        as="textarea"
        rows={4}
        value={values.notes}
        onChange={handleChange}
        error={errors.notes}
        maxLength={MAX_LENGTHS.notes}
        placeholder="Any special instructions..."
      />

      <Button
        type="submit"
        size="lg"
        loading={status === "sending"}
      >
        {status === "sending"
          ? "Submitting..."
          : "Request Quote"}
      </Button>
    </form>
  );
}

export default QuoteForm;