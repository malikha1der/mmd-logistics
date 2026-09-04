import { memo, useMemo } from "react";
import "../styles/SectionHeading.css";

/**
 * SectionHeading
 *
 * Props:
 * - eyebrow
 * - title
 * - subtitle
 * - align ('left' | 'center')
 * - as ('h2' | 'h3')
 */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
}) {

  const Heading = useMemo(() => as, [as]);

  const classes = useMemo(() => {
    return `section-heading section-heading--${align}`;
  }, [align]);

  return (
    <div className={classes}>

      {eyebrow && (
        <span className="eyebrow">
          {eyebrow}
        </span>
      )}

      <Heading className="section-heading__title">
        {title}
      </Heading>

      {subtitle && (
        <p className="section-heading__subtitle">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default memo(SectionHeading);