import React from "react";
import { css } from "../styles";

const ReservationConfirmee = ({ details, retourAccueil }) => (
  <main style={css.principal} role="main">
    <div style={{ ...css.confirmation, animation: "fadeUp .5s ease" }}>
      <div style={css.confirmIcone}>🍋</div>
      <h1 style={css.confirmTitre}>Réservation Confirmée !</h1>
      <p style={css.confirmTexte}>
        Merci <strong>{details.nom}</strong> !<br/>
        Votre table pour <strong>{details.invites} personne{details.invites > 1 ? "s" : ""}</strong> est
        réservée le <strong>{details.date}</strong> à <strong>{details.heure}</strong>.<br/>
        Un e-mail de confirmation sera envoyé à <strong>{details.email}</strong>.
      </p>
      <button style={css.retourBtn} onClick={retourAccueil}>
        Faire une autre réservation
      </button>
    </div>
  </main>
);

export default ReservationConfirmee;
