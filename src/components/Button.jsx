import { memo, useCallback, useMemo } from "react";
import "../styles/Button.css";

/**
 * Reusable button/link component.
 *
 * Props:
 * - variant: 'primary' | 'secondary' | 'ghost'
 * - size: 'md' | 'lg'
 * - as: 'button' | 'a' | any React component (e.g. Link)
 * - href
 * - loading
 * - disabled
 * - type
 * - onClick
 * - children
 */

function Button({
  variant = "primary",
  size = "md",
  as = "button",
  href,
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  children,
  className = "",
  ...rest
}) {
  const classes = useMemo(
    () =>
      `btn btn--${variant} btn--${size} ${
        loading ? "btn--loading" : ""
      } ${className}`.trim(),
    [variant, size, loading, className]
  );

  const isDisabled = disabled || loading;

  const handleClick = useCallback(
    (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      onClick?.(event);
    },
    [isDisabled, onClick]
  );

  const content = (
    <>
      {loading && (
        <span
          className="btn__spinner"
          aria-hidden="true"
        />
      )}

      <span className={loading ? "btn__label--hidden" : ""}>
        {children}
      </span>
    </>
  );

  if (as === "a") {
    return (
      <a
        href={href}
        className={classes}
        aria-disabled={isDisabled}
        onClick={handleClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button
        type={type}
        className={classes}
        disabled={isDisabled}
        onClick={onClick}
        {...rest}
      >
        {content}
      </button>
    );
  }

  const Component = as;

  return (
    <Component
      className={classes}
      aria-disabled={isDisabled}
      onClick={handleClick}
      {...rest}
    >
      {content}
    </Component>
  );
}

export default memo(Button);