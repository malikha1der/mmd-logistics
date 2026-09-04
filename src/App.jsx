import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/Loader'
import Home from './pages/Home'

// Route-level code splitting: only the Home bundle (the most-visited page)
// loads on first paint. Every other page is fetched on demand, which keeps
// the initial JS payload small and the first render fast.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Terms = lazy(() => import('./pages/Terms'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
