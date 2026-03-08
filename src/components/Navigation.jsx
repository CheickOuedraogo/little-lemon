import React from "react";
import { css } from "../styles";

const Navigation = ({ page, setPage }) => {
  const liens = [
    { id: "Accueil", texte: "Accueil" },
    { id: "Menu", texte: "Menu" },
    { id: "Reserver", texte: "Réserver" },
    { id: "APropos", texte: "À propos" }
  ];

  return (
    <nav style={css.nav} role="navigation" aria-label="Navigation principale">
      <ul style={css.navList}>
        {liens.map((l) => (
          <li key={l.id}>
            <span
              style={css.navLien(page === l.id)}
              onClick={() => setPage(l.id)}
              role="link"
              aria-current={page === l.id ? "page" : undefined}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setPage(l.id)}
            >
              {l.texte}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
