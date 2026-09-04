import '../styles/RouteDivider.css'

/**
 * RouteDivider
 * Decorative section divider styled like a highway lane marker.
 * Purely presentational - hidden from assistive tech.
 *
 * Props:
 * - tone: 'light' | 'dark'  (default: 'light') - controls contrast for use on navy vs white sections
 */
function RouteDivider({ tone = 'light' }) {
  return (
    <div className={`route-divider route-divider--${tone}`} aria-hidden="true">
      <span className="route-divider__line" />
      <span className="route-divider__marker" />
      <span className="route-divider__line" />
    </div>
  )
}

export default RouteDivider
