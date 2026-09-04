import truck1 from '../assets/truck-1.jpg'
import truck1Webp from '../assets/truck-1.webp'
import truck2 from '../assets/truck-2.jpg'
import truck2Webp from '../assets/truck-2.webp'
import truck3 from '../assets/truck-3.jpg'
import truck3Webp from '../assets/truck-3.webp'
import truck4 from '../assets/truck-4.jpg'
import truck4Webp from '../assets/truck-4.webp'
import TruckSlider from '../components/TruckSlider'
import StatsBar from '../components/StatsBar'
import RouteDivider from '../components/RouteDivider'
import SectionHeading from '../components/SectionHeading'
import Card from '../components/Card'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import '../styles/Home.css'
import { Link } from 'react-router-dom'


const FLEET_SLIDES = [
  { src: truck1, webp: truck1Webp, width: 1400, height: 929, alt: 'MMD Logistics fleet truck 01, 53 foot dry van trailer', name: 'Truck 1', unit: '01' },
  { src: truck2, webp: truck2Webp, width: 1400, height: 627, alt: 'MMD Logistics fleet truck 02, 53 foot dry van trailer', name: 'Truck 2', unit: '02' },
  { src: truck3, webp: truck3Webp, width: 1400, height: 933, alt: 'MMD Logistics fleet truck 03, 53 foot dry van trailer', name: 'Truck 3', unit: '03' },
  { src: truck4, webp: truck4Webp, width: 1400, height: 726, alt: 'MMD Logistics fleet truck 04, 53 foot dry van trailer', name: 'Truck 4', unit: '04' },
]

const STATS = [
  { value: '15', label: 'Trucks in our fleet' },
  { value: '50', label: 'States covered' },
  { value: '6 yrs', label: 'Years in business' },
]

const WHY_CHOOSE_US = [
  {
    icon: '📞',
    title: 'Dispatch Support',
    description: 'Talk directly to a dispatcher to book your load - real people, fast answers, no automated runaround.',
  },
  {
    icon: '🚛',
    title: '53\' Dry Van Fleet',
    description: 'A modern fleet of 53-foot dry van trailers ready for full truckload freight of nearly any size.',
  },
  {
    icon: '🗺️',
    title: 'Nationwide Coverage',
    description: 'We pick up and drop off in all 50 states, so your freight moves wherever your business takes you.',
  },
  {
    icon: '⏱️',
    title: 'On-Time Commitment',
    description: 'Every load is tracked closely from pickup to delivery so you always know where your freight stands.',
  },
]

function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="hero"
       
        role="img"
        aria-label="MMD Logistics semi truck with 53 foot dry van trailer on the highway"
      >
        <div className="hero__overlay" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__copy">
            <span className="eyebrow">MMD Logistics &bull; Nationwide Freight</span>

            <h1 className="hero__title">
              Your Load,<br />Delivered <span className="hero__title-accent">On Time</span>,<br />Every State.
            </h1>

            <p className="hero__subtitle">
              MMD Logistics books, picks up, and delivers full truckload freight across all 50 states with a
              modern fleet of 53' dry van trailers and dispatchers ready to talk load details right now.
            </p>

            <div className="hero__actions">
              <Button as="a" href="/services#get-a-quote" size="lg">
                Get a Quote
              </Button>

              <Button as="a" href="/contact#contact-form" variant="secondary" size="lg">
                Talk to Dispatch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="route-divider-wrap">
        <RouteDivider tone="light" />
      </div>

      {/* Fleet slider */}
      <section className="section fleet-section">
        <div className="container">
          <Reveal><SectionHeading
            eyebrow="Our Fleet"
            title="Trucks Built for the Long Haul"
            subtitle="A look at the 53' dry van trailers moving freight across the country every day."
          /></Reveal>

          <Reveal delay={100}><TruckSlider slides={FLEET_SLIDES} /></Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section section--navy">
        <div className="container">
          <Reveal><SectionHeading
            eyebrow="By the Numbers"
            title="A Growing Fleet You Can Rely On"
            align="center"
          /></Reveal>

          <Reveal delay={100}><StatsBar stats={STATS} /></Reveal>
        </div>
      </section>

      <div className="route-divider-wrap">
        <RouteDivider tone="light" />
      </div>

      {/* Why choose us */}
      <section
        className="section section--parallax"
       
      >
        <div className="section--parallax__overlay" aria-hidden="true" />

        <div className="container">
          <Reveal><SectionHeading
            eyebrow="Why MMD Logistics"
            title="Freight Handled the Right Way"
            subtitle="From the first call to final delivery, here's what shippers can expect."
          /></Reveal>

          <div className="home-grid">
            {WHY_CHOOSE_US.map((item) => (
              <Reveal key={item.title} delay={WHY_CHOOSE_US.indexOf(item) * 80}><Card {...item} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div>
            <h2 className="cta-banner__title">
              Ready to book a load?
            </h2>

            <p className="cta-banner__subtitle">
              Get a quote in minutes or speak with a dispatcher directly.
            </p>
          </div>

          <div className="cta-banner__actions">
            <Button as="a" href="/services#get-a-quote" size="lg">
              Get a Quote
            </Button>

            <Button as="a" href="/contact#contact-form" variant="ghost" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home