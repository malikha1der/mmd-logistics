# MMD Logistics — Project File Structure

```
xyz-trucking/
├── public/
│   └── favicon.svg              # Site favicon (MMD monogram) — swap this file to change it
│
├── src/
│   ├── assets/                  # Truck illustrations used across the site
│   │   ├── hero-bg-truck.svg    # Wide background truck (Home hero + parallax sections)
│   │   ├── truck-1.svg          # Fleet slider — Truck 1
│   │   ├── truck-2.svg          # Fleet slider — Truck 2
│   │   └── truck-3.svg          # Fleet slider — Truck 3
│   │
│   ├── components/              # Reusable building blocks used by the pages
│   │   ├── Breadcrumb.jsx       # "Home / About" style strip under the navbar
│   │   ├── Button.jsx           # Primary/secondary/ghost button, loading state
│   │   ├── Card.jsx             # Generic info card (supports tel:/mailto: links)
│   │   ├── ContactForm.jsx      # Contact page form (EmailJS)
│   │   ├── Footer.jsx           # Site footer
│   │   ├── FormField.jsx        # Reusable input/textarea/select field
│   │   ├── FormStatusMessage.jsx# Success/error banner for forms
│   │   ├── Layout.jsx           # Wraps every page: Navbar + Breadcrumb + Footer
│   │   ├── Loader.jsx           # Spinner + skeleton loading placeholders
│   │   ├── Navbar.jsx           # Top navigation (responsive, mobile menu)
│   │   ├── PageHero.jsx         # Navy header band used on inner pages
│   │   ├── QuoteForm.jsx        # "Get a Quote" form on Services page (EmailJS)
│   │   ├── RouteDivider.jsx     # Dashed "highway lane" section divider
│   │   ├── SectionHeading.jsx   # Eyebrow + title + subtitle heading block
│   │   ├── StatsBar.jsx         # Stat counters (15 trucks / 50 states / 6 yrs)
│   │   └── TruckSlider.jsx      # Fleet image carousel with next/prev arrows
│   │
│   ├── config/
│   │   └── emailConfig.js       # ⚙️ EmailJS service ID, template IDs, public key
│   │
│   ├── pages/                   # One file per route/page
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx         # 404 fallback page
│   │   ├── Services.jsx
│   │   └── Terms.jsx            # Placeholder sections — add your legal text here
│   │
│   ├── styles/                  # All CSS files, one per component/page
│   │   ├── index.css            # Design tokens (colors, fonts), global resets
│   │   └── ...                  # Button.css, Card.css, Home.css, etc.
│   │
│   ├── App.jsx                  # Route definitions (react-router-dom)
│   └── main.jsx                 # App entry point
│
├── index.html                   # Page title, meta description
├── package.json                 # Dependencies + npm scripts
└── vite.config.js               # Vite build configuration
```

## Quick reference — where to edit what

| I want to...                          | Edit this file                              |
|----------------------------------------|----------------------------------------------|
| Connect real EmailJS account           | `src/config/emailConfig.js`                   |
| Change the favicon                     | `public/favicon.svg`                          |
| Add Terms & Conditions text            | `src/pages/Terms.jsx`                         |
| Change fleet truck names/images        | `src/pages/Home.jsx` (`FLEET_SLIDES`) + `src/assets/` |
| Change colors/fonts sitewide            | `src/styles/index.css`                        |
| Edit page content (About/Services/etc) | `src/pages/*.jsx`                             |
| Edit navbar links or logo               | `src/components/Navbar.jsx`                   |
| Edit footer info                        | `src/components/Footer.jsx`                   |
