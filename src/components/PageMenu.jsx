import React from "react";
import { css } from "../styles";

const articlesMenu = [
  { titre: "Salade Grecque", prix: "€9.50", desc: "Tomates, concombre, olives, feta et huile d'olive vierge extra.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { titre: "Bruschetta al Pomodoro", prix: "€7.00", desc: "Pain grillé, tomates fraîches, basilic et ail.",
    img: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&q=80" },
  { titre: "Pasta Carbonara", prix: "€14.50", desc: "Spaghetti, pancetta, parmesan, œuf et poivre noir.",
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80" },
  { titre: "Grillades Mixtes", prix: "€18.00", desc: "Sélection de viandes grillées, légumes de saison et sauce tzatziki.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  { titre: "Pizza Margherita", prix: "€12.00", desc: "Sauce tomate, mozzarella et basilic frais sur pâte fine.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
  { titre: "Tiramisu Maison", prix: "€6.50", desc: "Mascarpone, café espresso, biscuits ladyfinger et cacao.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
];

const PageMenu = () => (
  <main style={css.principal} role="main">
    <section style={{ animation: "fadeUp .45s ease" }} aria-label="Notre menu">
      <h1 style={css.menuTitre}>Notre Menu</h1>
      <div style={css.menuGrille}>
        {articlesMenu.map((item, i) => (
          <article key={i} style={{ ...css.menuCarte, animation: `fadeUp .4s ease ${i * 0.07}s both` }}>
            <img src={item.img} alt={item.titre} style={css.menuCarteImg}/>
            <div style={css.menuCarteCorps}>
              <h2 style={css.menuCarteTitre}>{item.titre}</h2>
              <p style={css.menuCarteDesc}>{item.desc}</p>
              <p style={css.menuCartePrix}>{item.prix}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default PageMenu;
