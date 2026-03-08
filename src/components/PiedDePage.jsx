import React from "react";
import { css } from "../styles";
import logo_citron from "../images/littlelemon_logo.png";

const PiedDePage = () => (
  <footer style={css.piedDePage} role="contentinfo">
    <div>
      <img src={logo_citron}
           alt="Petit logo Little Lemon" style={css.footerLogoImg}/>
    </div>
    <div style={css.footerCopy}>
      <p>Copyright Little Lemon &copy; {new Date().getFullYear()}</p>
    </div>
  </footer>
);

export default PiedDePage;
