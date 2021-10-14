import React from "react";
import { Link } from "react-router-dom";
import "./404.css";

export default function NotFound() {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState([
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);

  return (
    <div className="not-found">
      {state.map((val, indez) => (
        <span className="particle" key={indez}>
          {val}
        </span>
      ))}
      <article className="content">
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
