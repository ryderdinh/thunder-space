import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

export default function NotFound() {
  const [state, setState] = React.useState([
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);

  return (
    <div className="not-found">
      {state.map((val) => (
        <span class="particle">{val}</span>
      ))}
      <article class="content">
        <p>Damnit stranger,</p>
        <p>
          You got lost in the <strong>404</strong> galaxy.
        </p>
        <p>
          <Link to="/">
            <button>Go back to HRM.</button>
          </Link>
        </p>
      </article>
    </div>
  );
}
