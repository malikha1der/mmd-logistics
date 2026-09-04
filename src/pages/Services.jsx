import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Card from "../components/Card";
import RouteDivider from "../components/RouteDivider";
import QuoteForm from "../components/QuoteForm";
import Reveal from "../components/Reveal";


import "../styles/Services.css";


const SERVICES = [
  {
    icon: "🚚",
    title: "Full Truckload (FTL)",
    description:
      "Dedicated 53' dry van capacity for your freight, with no stops for other shippers along the way.",
  },
  {
    icon: "📋",
    title: "Load Booking & Dispatch",
    description:
      "Call our dispatchers directly to book a load - we confirm pickup, delivery, and truck availability fast.",
  },
  {
    icon: "📍",
    title: "Pickup & Drop Nationwide",
    description:
      "We pick up and deliver freight in all 50 states, from single loads to recurring lanes.",
  },
  {
    icon: "🔄",
    title: "Dedicated & Repeat Lanes",
    description:
      "Running the same lane regularly? We can dedicate trucks to keep your freight moving on schedule.",
  },
];

const PROCESS_STEPS = [
  {
    title: "Call Dispatch",
    description:
      "Share your pickup, delivery, and freight details with a dispatcher, or submit a quote request below.",
  },
  {
    title: "Get Matched",
    description:
      "We match your load to an available 53' dry van truck from our fleet.",
  },
  {
    title: "Load & Go",
    description:
      "Our driver arrives for pickup, and your freight is on its way to delivery.",
  },
  {
    title: "Delivered",
    description:
      "Freight is dropped off and confirmed - dispatch stays reachable the whole way.",
  },
];

function Services() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#get-a-quote") {
      const timer = setTimeout(() => {
        const element = document.getElementById("get-a-quote");
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Full Truckload Freight, Booked Directly with Dispatch"
        subtitle="53' dry van capacity, nationwide pickup and delivery, and dispatchers who book your load in one call."
      />

      <section
        className="section section--parallax"
       
      >
        <div
          className="section--parallax__overlay"
          aria-hidden="true"
        />

        <div className="container">

          <Reveal><SectionHeading
            eyebrow="What We Offer"
            title="Services Built Around Your Load"
          /></Reveal>

          <div className="services-grid">

            {SERVICES.map((service, index) => (
              <Reveal key={service.title} delay={index * 80}>
                <Card {...service} />
              </Reveal>
            ))}

          </div>

        </div>
      </section>

      <div className="route-divider-wrap">
        <RouteDivider tone="light" />
      </div>

      <section className="section section--navy">

        <div className="container">

          <Reveal><SectionHeading
            eyebrow="How It Works"
            title="Booking a Load with MMD Logistics"
          /></Reveal>

          <ol className="process-steps">

            {PROCESS_STEPS.map((step, index) => (

              <Reveal as="li" delay={index * 80} key={step.title} className="process-steps__item">

                <span className="process-steps__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>

                  <h3 className="process-steps__title">
                    {step.title}
                  </h3>

                  <p className="process-steps__desc">
                    {step.description}
                  </p>

                </div>

              </Reveal>

            ))}

          </ol>

        </div>

      </section>

      <section
        className="section section--fog"
        id="get-a-quote"
      >

        <div className="container">

          <Reveal><SectionHeading
            eyebrow="Get a Quote"
            title="Request Pricing for Your Load"
            subtitle="Fill in your load details and a dispatcher will follow up with pricing and truck availability."
          /></Reveal>

          <Reveal delay={100}><div className="quote-form-wrap">
            <QuoteForm />
          </div></Reveal>

        </div>

      </section>

    </>
  );
}

export default Services;