import { memo } from "react";

import Button from "../components/Button";

import "../styles/NotFound.css";

function NotFound() {
  return (
    <section className="not-found">

      <div className="container not-found__inner">

        <span className="eyebrow">
          404
        </span>

        <h1 className="not-found__title">
          This Route Doesn't Exist
        </h1>

        <p className="not-found__text">
          The page you're looking for isn't here.
          It may have moved, or the address may
          be off by a turn.
        </p>

        <Button
          as="a"
          href="/"
          size="lg"
        >
          Back to Home
        </Button>

      </div>

    </section>
  );
}

export default memo(NotFound);