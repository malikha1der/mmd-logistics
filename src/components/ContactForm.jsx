import { useState, useCallback, useRef } from "react";
import emailjs from "@emailjs/browser";

import FormField from "./FormField";
import FormStatusMessage from "./FormStatusMessage";
import Button from "./Button";

import { EMAIL_CONFIG } from "../config/emailConfig";

import "../styles/ContactForm.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  message: "",
  // Honeypot - real visitors never see or fill this. Any bot that blindly
  // fills every field in the DOM will populate it, so we reject silently.
  companyWebsite: "",
};

// Minimum time between two submits, to stop accidental double-clicks and
// rapid-fire duplicate sends (not a substitute for real server-side
// rate-limiting, which this frontend-only architecture can't provide).
const SUBMIT_COOLDOWN_MS = 4000;

const MAX_LENGTHS = {
  name: 100,
  email: 254,
  phone: 30,
  message: 2000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > MAX_LENGTHS.name) {
    errors.name = `Name must be ${MAX_LENGTHS.name} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Please enter your email.";
  } else if (email.length > MAX_LENGTHS.email) {
    errors.email = "Enter a valid email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone.length > MAX_LENGTHS.phone) {
    errors.phone = `Phone number must be ${MAX_LENGTHS.phone} characters or fewer.`;
  }

  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length > MAX_LENGTHS.message) {
    errors.message = `Message must be ${MAX_LENGTHS.message} characters or fewer.`;
  }

  return errors;
}

function isEmailJsConfigured() {
  return Boolean(
    EMAIL_CONFIG.serviceId &&
      EMAIL_CONFIG.contactTemplateId &&
      EMAIL_CONFIG.publicKey &&
      !EMAIL_CONFIG.serviceId.startsWith("YOUR_") &&
      !EMAIL_CONFIG.contactTemplateId.startsWith("YOUR_") &&
      !EMAIL_CONFIG.publicKey.startsWith("YOUR_")
  );
}

function ContactForm() {
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

    // Honeypot tripped - silently pretend to succeed so the bot moves on,
    // without ever sending an email or logging what it submitted.
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
        EMAIL_CONFIG.contactTemplateId,
        {
          from_name: values.name.trim(),
          from_email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
        },
        EMAIL_CONFIG.publicKey
      );

      setStatus("success");
      resetForm();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <FormStatusMessage
        status={
          status === "success" || status === "error"
            ? status
            : null
        }
        successText="Thanks! Your message has been sent successfully. Our dispatcher will contact you shortly."
        errorText="Something went wrong while sending your message. Please try again."
      />

      {/* Honeypot field - invisible and unreachable for real users (off-screen,
          not tabbable, hidden from assistive tech), left in the DOM for bots. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="companyWebsite">Company Website</label>
        <input
          type="text"
          id="companyWebsite"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={values.companyWebsite}
          onChange={handleChange}
        />
      </div>

      <div className="contact-form__row">
        <FormField
          label="Full Name"
          id="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          required
          maxLength={MAX_LENGTHS.name}
          autoComplete="name"
          placeholder="John Miller"
        />

        <FormField
          label="Email"
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
          maxLength={MAX_LENGTHS.email}
          autoComplete="email"
          placeholder="john@example.com"
        />
      </div>

      <FormField
        label="Phone Number"
        id="phone"
        type="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        maxLength={MAX_LENGTHS.phone}
        autoComplete="tel"
        placeholder="+1 (555) 123-4567"
      />

      <FormField
        label="Message"
        id="message"
        as="textarea"
        rows={5}
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        required
        maxLength={MAX_LENGTHS.message}
        placeholder="Tell us about your shipment or ask your question..."
      />

      <Button
        type="submit"
        size="lg"
        loading={status === "sending"}
      >
        {status === "sending"
          ? "Sending..."
          : "Send Message"}
      </Button>
    </form>
  );
}

export default ContactForm;