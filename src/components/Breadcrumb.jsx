import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/Breadcrumb.css";

/**
 * Breadcrumb
 *
 * Props:
 * - current: string
 */

function Breadcrumb({ current }) {

  const isHome = useMemo(() => current === "Home", [current]);

  return (

    <nav
      className="breadcrumb"
      aria-label="Breadcrumb"
    >

      <div className="container breadcrumb__inner">

        <ol className="breadcrumb__list">

          <li>

            {

              isHome ? (

                <span
                  className="breadcrumb__current"
                  aria-current="page"
                >

                  Home

                </span>

              ) : (

                <Link
                  to="/"
                  className="breadcrumb__link"
                >

                  Home

                </Link>

              )

            }

          </li>

          {

            !isHome && (

              <>

                <li
                  className="breadcrumb__sep"
                  aria-hidden="true"
                >

                  /

                </li>

                <li
                  className="breadcrumb__current"
                  aria-current="page"
                >

                  {current}

                </li>

              </>

            )

          }

        </ol>

      </div>

    </nav>

  );

}

export default memo(Breadcrumb);