import { memo, useMemo } from "react";
import "../styles/Loader.css";

/**
 * Loader
 *
 * Props:
 * - label
 * - size
 */

export const Loader = memo(function Loader({
  label = "Loading",
  size = "md",
}) {

  return (

    <div
      className="loader"
      role="status"
      aria-live="polite"
    >

      <span
        className={`loader__spinner loader__spinner--${size}`}
      />

      <span className="visually-hidden">
        {label}
      </span>

    </div>

  );

});

/**
 * SkeletonLine
 *
 * Props:
 * - width
 * - height
 */

export const SkeletonLine = memo(function SkeletonLine({

  width = "100%",
  height = "16px",

}) {

  const style = useMemo(() => ({
    width,
    height,
  }), [width, height]);

  return (

    <span
      className="skeleton-line"
      style={style}
      aria-hidden="true"
    />

  );

});

export default Loader;