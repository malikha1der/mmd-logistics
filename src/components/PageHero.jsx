import '../styles/PageHero.css'

/**
 * PageHero
 * Compact navy header band used at the top of inner pages.
 * Props:
 * - eyebrow: string
 * - title: string
 * - subtitle: string (optional)
 */
function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner reveal reveal--visible">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  )
}

export default PageHero
