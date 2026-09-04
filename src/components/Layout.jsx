import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Layout
 * Wraps every page with the persistent Navbar and the Footer, plus a
 * skip-link for accessibility.
 */
function Layout({ children }) {
  const location = useLocation()

  // Scroll to top when navigating to a new route without a hash
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

export default Layout
