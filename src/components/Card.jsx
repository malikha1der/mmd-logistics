import { memo, useMemo } from "react";
import "../styles/Card.css";

/**
 * Card
 * Generic content card used across Services, About, and Home sections.
 *
 * Props:
 * - icon
 * - title
 * - description
 * - tone
 * - href
 */

function Card({
  icon,
  title,
  description,
  tone = "light",
  href,
}) {

  const classes = useMemo(() => {
    return href
      ? `card card--${tone} card--link`
      : `card card--${tone}`;
  }, [tone, href]);

  const content = (
    <>
      {icon && (
        <span
          className="card__icon"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <h3 className="card__title">
        {title}
      </h3>

      <p className="card__description">
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
}

export default memo(Card);