import React from "react";
import { css } from "../styles";

const PageAccueil = ({ setPage }) => (
  <main style={css.principal} role="main">
    {/* Bannière */}
    <section aria-label="Promotion" style={{ animation: "fadeDown .5s ease .05s both" }}>
      <div style={css.banniere}>
        <div style={css.banniereOverlay}>
          <h1 style={css.banniereTitre}>-30% ce Week-end</h1>
          <p style={css.banniereTexte}>
            Découvrez notre cuisine méditerranéenne fraîche et savoureuse. Des ingrédients locaux,
            des recettes authentiques et une ambiance chaleureuse vous attendent.
            Réservez dès maintenant pour profiter de l'offre du week-end.
          </p>
        </div>
      </div>
    </section>

    {/* Grille de services */}
    <section aria-label="Nos services" style={{ ...css.grille3, animation: "fadeUp .5s ease .2s both" }}>

      <article style={css.carte}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.carteTitre}>Notre Nouveau Menu</h2>
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
             alt="Brochettes grillées" style={css.carteImg}/>
        <p style={css.carteTexte}>
          Découvrez notre nouvelle sélection de plats méditerranéens, élaborés avec des produits frais
          du marché. Des saveurs authentiques qui vous transporteront.
        </p>
        <span style={css.carteLien} onClick={() => setPage("Menu")} role="link" tabIndex={0}>
          Voir le menu
        </span>
      </article>

      <article style={css.carte}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.carteTitre}>Réserver une Table</h2>
        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"
             alt="Salade fraîche colorée" style={css.carteImg}/>
        <p style={css.carteTexte}>
          Réservez votre table pour une expérience gastronomique inoubliable. Que ce soit pour un
          dîner romantique ou un repas en famille.
        </p>
        <span style={css.carteLien} onClick={() => setPage("Reserver")} role="link" tabIndex={0}>
          Réserver maintenant
        </span>
      </article>

      <article style={css.carte}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.carteTitre}>Horaires d'Ouverture</h2>
        <img src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80"
             alt="Chef en cuisine" style={css.carteImg}/>
        <p style={css.carteTexte}>
          Notre équipe de chefs passionnés prépare chaque jour des plats avec amour et expertise.
          Venez nous rendre visite.
        </p>
        <ul style={css.listeHoraires}>
          <li>Lun – Ven : 14h – 22h</li>
          <li>Sam : 14h – 23h</li>
          <li>Dim : 14h – 21h</li>
        </ul>
      </article>

    </section>
  </main>
);

export default PageAccueil;
