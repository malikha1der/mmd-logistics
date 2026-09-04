import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";
import Card from "../components/Card";
import Reveal from "../components/Reveal";

import { CONTACT_INFO } from "../config/contactInfo";

import "../styles/Contact.css";

const CONTACT_CARDS = [
  {
    icon: "📞",
    title: "Call Dispatch",
    description: `${CONTACT_INFO.phone} - available 24/7 for load booking and driver support.`,
    href: CONTACT_INFO.phoneHref,
  },
  {
    icon: "✉️",
    title: "Email Dispatch",
    description: `${CONTACT_INFO.email} - for quotes, documents, and general questions.`,
    href: CONTACT_INFO.emailHref,
  },
  {
    icon: "📍",
    title: "Coverage Area",
    description: "Pickup and delivery available in all 50 U.S. states.",
  },
];

function Contact() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact-form") {
      const timer = setTimeout(() => {
        document.getElementById("contact-form")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a Dispatcher"
        subtitle="Have a load to book or a question about our fleet? Reach our dispatch team directly, or send a message below."
      />

      <section className="section">

        <div className="container contact-cards">

          {CONTACT_CARDS.map((card, index) => (
            <Reveal key={card.title} delay={index * 80}>
              <Card {...card} />
            </Reveal>
          ))}

        </div>

      </section>

      <section className="section section--fog">

        <div className="container contact-layout">
          <section id="contact-form">
            <Reveal><SectionHeading
              eyebrow="Send a Message"
              title="Reach Our Dispatch Team"
              subtitle="Fill out the form and a dispatcher will get back to you shortly."
              align="left"
              as="h2"
            /></Reveal>

            <Reveal delay={100}><div className="contact-form-wrap">
              <ContactForm />
            </div></Reveal>
          </section>

        </div>

      </section>
    </>
  );
}

export default Contact;