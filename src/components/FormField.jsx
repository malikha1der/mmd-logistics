import { memo, useMemo } from "react";
import "../styles/FormField.css";

function FormField({
  label,
  id,
  as = "input",
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options = [],
  rows = 5,
  ...rest
}) {
  const describedBy = useMemo(
    () => (error ? `${id}-error` : undefined),
    [error, id]
  );

  const sharedProps = useMemo(
    () => ({
      id,
      name: id,
      value,
      onChange,
      "aria-invalid": error ? "true" : undefined,
      "aria-describedby": describedBy,
      className: `form-field__control ${
        error ? "form-field__control--error" : ""
      }`,
      placeholder,
      ...rest,
    }),
    [
      id,
      value,
      onChange,
      error,
      describedBy,
      placeholder,
      rest,
    ]
  );

  return (
    <div className="form-field">
      <label
        htmlFor={id}
        className="form-field__label"
      >
        {label}

        {required && (
          <>
            <span
              className="form-field__required"
              aria-hidden="true"
            >
              {" "}
              *
            </span>

            <span className="visually-hidden">
              {" "}
              (required)
            </span>
          </>
        )}
      </label>

      {as === "textarea" && (
        <textarea
          rows={rows}
          {...sharedProps}
        />
      )}

      {as === "select" && (
        <select {...sharedProps}>
          <option
            value=""
            disabled
          >
            {placeholder || "Select an option"}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input
          type={type}
          {...sharedProps}
        />
      )}

      {error && (
        <p
          className="form-field__error"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default memo(FormField);