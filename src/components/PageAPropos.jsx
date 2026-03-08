import React from "react";
import { css } from "../styles";

const PageAPropos = () => (
  <main style={css.principal} role="main">
    <article style={{ ...css.aboutWrap, animation: "fadeUp .45s ease" }}>
      <h1 style={css.aboutTitre}>À propos de Little Lemon</h1>
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
           alt="Intérieur du restaurant" style={css.aboutImg}/>
      <p style={css.aboutTexte}>
        Little Lemon est un restaurant méditerranéen de quartier fondé par deux frères,
        <strong> Mario</strong> et <strong> Adrian</strong>, originaires d'Italie. Ils ont ouvert
        leurs portes en 2010 avec une vision simple : proposer une cuisine méditerranéenne authentique
        dans une atmosphère chaleureuse et conviviale.
      </p>
      <p style={css.aboutTexte}>
        Chaque plat est préparé avec des ingrédients frais et locaux, soigneusement sélectionnés
        auprès de producteurs de la région. Notre chef apporte une
        touche de modernité tout en respectant les recettes traditionnelles.
      </p>
      <p style={css.aboutTexte}>
        Notre mission est de vous offrir bien plus qu'un simple repas — une expérience culinaire
        mémorable qui vous transporte au cœur de la Méditerranée. 
      </p>
    </article>
  </main>
);

export default PageAPropos;
