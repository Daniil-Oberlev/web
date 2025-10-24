import { Link } from "react-router-dom";

import { NAV_SECTIONS } from "./constants";

import "./index.css";

export const Navigation = () => {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {NAV_SECTIONS.map(({ path, label, anchor }) => (
          <li key={anchor} className="navigation__list-item">
            <Link to={`${path}${anchor}`}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
