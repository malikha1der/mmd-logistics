import { memo, useMemo } from "react";
import "../styles/FormStatusMessage.css";

/**
 * FormStatusMessage
 *
 * Props:
 * - status: "success" | "error" | null
 * - successText: string
 * - errorText: string
 */

function FormStatusMessage({
  status,
  successText,
  errorText,
}) {

  const message = useMemo(() => {

    if (!status) return null;

    return status === "success"
      ? successText
      : errorText;

  }, [status, successText, errorText]);

  const role = useMemo(() => {

    return status === "error"
      ? "alert"
      : "status";

  }, [status]);

  if (!status) return null;

  return (

    <div
      className={`form-status form-status--${status}`}
      role={role}
    >

      {message}

    </div>

  );

}

export default memo(FormStatusMessage);