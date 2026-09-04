import { useState } from 'react'
import '../styles/TruckSlider.css'

/**
 * TruckSlider
 * Fleet image carousel.
 */
function TruckSlider({ slides = [] }) {
  const [index, setIndex] = useState(0)

  const goNext = () => {
    setIndex((i) => (i + 1) % slides.length)
  }

  const goPrev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length)
  }

  const trackStyle = {
    transform: `translate3d(-${index * 100}%, 0, 0)`,
  }

  if (!slides.length) {
    return (
      <div className="truck-slider truck-slider--empty">
        <p>Fleet photos coming soon.</p>
      </div>
    )
  }

  return (
    <div
      className="truck-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="MMD Logistics fleet"
    >
      <div className="truck-slider__viewport">
        <div
          className="truck-slider__track"
          style={trackStyle}
        >
          {slides.map((slide, i) => (
            <div
              className="truck-slider__slide"
              key={slide.unit}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== index}
            >
              <picture>
                {slide.webp && <source srcSet={slide.webp} type="image/webp" />}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width}
                  height={slide.height}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </picture>

              <div className="truck-slider__caption">
                <span className="truck-slider__caption-name">
                  {slide.name}
                </span>

                <span className="truck-slider__caption-tag">
                  53' Dry Van
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="truck-slider__arrow truck-slider__arrow--prev"
        onClick={goPrev}
        aria-label="Previous truck"
      >
        <span aria-hidden="true">&#8249;</span>
      </button>

      <button
        type="button"
        className="truck-slider__arrow truck-slider__arrow--next"
        onClick={goNext}
        aria-label="Next truck"
      >
        <span aria-hidden="true">&#8250;</span>
      </button>

      <div
        className="truck-slider__dots"
        role="tablist"
        aria-label="Choose fleet photo"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.unit}
            role="tab"
            aria-selected={i === index}
            aria-label={`Show ${slide.name}`}
            className={`truck-slider__dot ${
              i === index ? 'truck-slider__dot--active' : ''
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <span className="visually-hidden" aria-live="polite">
        Showing {slides[index].name}, slide {index + 1} of {slides.length}
      </span>
    </div>
  )
}

export default TruckSlider