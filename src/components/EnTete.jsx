import React from "react";
import { css } from "../styles";
import logo_citron from "../images/littlelemon_logo.png";

const EnTete = ({ auClic }) => (
  <header style={css.enTete} role="banner">
    <div style={css.logoWrap} onClick={auClic} role="link" aria-label="Accueil Little Lemon">
      <img
        src={logo_citron}
        alt="Logo Little Lemon"
        style={css.logoImg}
        onMouseOver={(e) => (e.currentTarget.style.transform = "rotate(-10deg) scale(1.06)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "")}
      />
      <span style={css.logoTexte}>LITTLE LEMON</span>
    </div>
  </header>
);

export default EnTete;
