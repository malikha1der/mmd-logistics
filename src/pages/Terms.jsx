import { memo } from "react";

import PageHero from "../components/PageHero";

import "../styles/Terms.css";

/**
 * Terms Section
 */

const TermsSection = memo(function TermsSection({

  title,
  children,

}) {

  return (

    <section className="terms-section">

      <h2 className="terms-section__title">
        {title}
      </h2>

      <div className="terms-section__body">
        {children}
      </div>

    </section>

  );

});

function Terms() {

  return (

    <>

      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using MMD Logistics's services."
      />

      <section className="section">

        <div className="container terms">

          <p className="terms__updated">
            Last updated: -- / -- / ----
          </p>

          <TermsSection title="1. Acceptance of Terms">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="2. Booking & Load Confirmation">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="3. Cancellations & Detention">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="4. Payment Terms">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="5. Liability & Cargo Claims">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="6. Governing Law">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

          <TermsSection title="7. Contact">
            <p className="terms__placeholder">
              Add your content here.
            </p>
          </TermsSection>

        </div>

      </section>

    </>

  );

}

export default memo(Terms);