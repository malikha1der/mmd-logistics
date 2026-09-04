import { memo } from "react";
import { Link } from "react-router-dom";

import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import StatsBar from "../components/StatsBar";
import Card from "../components/Card";
import RouteDivider from "../components/RouteDivider";
import Reveal from "../components/Reveal";


import "../styles/About.css";
import "../styles/Button.css";


const STATS = Object.freeze([
  { value: "15", label: "Trucks in our fleet" },
  { value: "50", label: "States covered" },
  { value: "6 yrs", label: "Years in business" },
]);

const VALUES = Object.freeze([
  {
    icon: "🤝",
    title: "Straight Talk",
    description:
      "No booking portals or guesswork. Call our dispatchers directly and get real answers about your load.",
  },
  {
    icon: "📦",
    title: "Careful Handling",
    description:
      "Every load is planned around dock hours, freight type, and delivery windows, not just the fastest route.",
  },
  {
    icon: "🇺🇸",
    title: "Coast to Coast",
    description:
      "From short regional runs to full cross-country hauls, we cover pickup and delivery in all 50 states.",
  },
]);

function About() {
  return (
    <>
      <PageHero
        eyebrow="About MMD Logistics"
        title="Freight Moved by People Who Answer the Phone"
        subtitle="MMD Logistics is a U.S. full truckload carrier built around dependable dispatch, a modern 53' dry van fleet, and nationwide coverage."
      />

      <section className="section">
        <div className="container about-story">
          <Reveal>
            <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on Dispatch, Not Just Diesel"
              align="left"
              as="h2"
            />

            <p className="about-story__text">
              MMD Logistics started with a simple idea: shippers shouldn't
              have to fight an app or an inbox to get a load moving. Over
              the past 6 years, we've grown into a fleet of 15 trucks
              running full truckload freight across all 50 states, backed
              by dispatchers who pick up the phone and know the freight
              they're booking.
            </p>

            <p className="about-story__text">
              Every load that comes through MMD Logistics is booked,
              picked up, and dropped off by our own team — no unnecessary
              layers between you and the truck carrying your freight.
            </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
          <div className="about-story__stats">
            <StatsBar stats={STATS} />
          </div>
          </Reveal>
        </div>
      </section>

      <div className="route-divider-wrap">
        <RouteDivider tone="light" />
      </div>

      <section
        className="section section--parallax"
       
      >
        <div
          className="section--parallax__overlay"
          aria-hidden="true"
        />

        <div className="container">
          <Reveal><SectionHeading
            eyebrow="What We Stand For"
            title="How We Run Freight"
            subtitle="A few things that stay consistent on every load, in every state."
          /></Reveal>

          <div className="about-values-grid">
            {VALUES.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <Card {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-dispatch">
          <Reveal>
          <div className="about-dispatch__copy">
            <SectionHeading
              eyebrow="Our Dispatchers"
              title="Real Dispatchers, Ready to Book Your Load"
              subtitle="Give us your pickup, delivery, and freight details and our dispatch team will match it to an available truck — usually while you're still on the phone."
              align="left"
              as="h2"
            />

            <Link
              to="/contact#contact-form" size="lg"
              className="btn btn--primary btn--lg"
            >
              Talk to Dispatch
            </Link>
          </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default memo(About);