export const G = {
  // palette
  vert:   "#495e57",
  jaune:  "#f4ce14",
  sombre: "#333333",
  clair:  "#edefee",
  blanc:  "#ffffff",
  carte:  "#faf7f4",
  muet:   "#6b6b6b",
  lien:   "#0f6e84",
  erreur: "#c0392b",
  succes: "#27ae60",
  // polices
  titre:  "'Georgia', serif",
  corps:  "'Trebuchet MS', sans-serif",
};

export const css = {
  page: { fontFamily: G.corps, background: "#e8e4e0", minHeight: "100vh", margin: 0 },

  // Header
  enTete: { background: "#f0ece8", padding: "14px 40px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #ccc", animation: "fadeDown .4s ease" },
  logoWrap: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoImg: { width: 64, height: 64, objectFit: "contain", transition: "transform .3s" },
  logoTexte: { fontFamily: G.titre, fontSize: "2.4rem", fontWeight: 700, color: G.vert, letterSpacing: "0.12em" },

  // Nav
  nav: { background: G.sombre, display: "flex", justifyContent: "center" },
  navList: { listStyle: "none", display: "flex", margin: 0, padding: 0 },
  navLien: (actif) => ({
    display: "inline-block", padding: "13px 20px", color: actif ? G.jaune : G.blanc,
    cursor: "pointer", fontWeight: 500, fontSize: "0.97rem", letterSpacing: "0.04em",
    borderBottom: actif ? `3px solid ${G.jaune}` : "3px solid transparent",
    transition: "color .2s, border-color .2s",
  }),

  // Principal
  principal: { maxWidth: 880, margin: "0 auto", padding: "24px 20px 48px" },

  // Bannière
  banniere: { borderRadius: 10, overflow: "hidden", position: "relative", height: 230, marginBottom: 28,
            backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80')",
            backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 4px 18px rgba(0,0,0,.22)" },
  banniereOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.72) 55%, rgba(0,0,0,.05))",
                   padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, maxWidth: 560 },
  banniereTitre: { fontFamily: G.titre, fontSize: "2.1rem", color: G.jaune, textShadow: "0 2px 6px rgba(0,0,0,.5)", margin: 0 },
  banniereTexte: { fontSize: "0.82rem", color: "#e0e0e0", lineHeight: 1.6, margin: 0 },

  // Grille 3 cols
  grille3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },

  // Carte
  carte: { background: G.carte, borderRadius: 8, padding: "18px 16px 20px",
          display: "flex", flexDirection: "column", gap: 11,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "transform .25s, box-shadow .25s" },
  carteTitre: { fontFamily: G.titre, fontSize: "1.45rem", fontWeight: 700, color: G.sombre, margin: 0 },
  carteImg: { width: "100%", height: 155, objectFit: "cover", borderRadius: 6, transition: "transform .3s" },
  carteTexte: { fontSize: "0.83rem", color: G.muet, lineHeight: 1.65, margin: 0 },
  carteLien: { color: G.lien, fontSize: "0.84rem", fontWeight: 600, textDecoration: "underline", cursor: "pointer", marginTop: "auto" },

  listeHoraires: { listStyle: "none", padding: 0, margin: 0, fontSize: "0.86rem", lineHeight: 2.2, fontWeight: 500 },

  // Page Réservation
  reservationWrap: { maxWidth: 520, margin: "0 auto" },
  reservationTitre: { fontFamily: G.titre, fontSize: "2rem", color: G.vert, marginBottom: 6 },
  reservationSousTitre: { color: G.muet, marginBottom: 24, fontSize: "0.9rem" },

  // Formulaire
  formulaire: { background: G.blanc, borderRadius: 10, padding: "28px 30px", boxShadow: "0 4px 20px rgba(0,0,0,.1)" },
  formGroup: { display: "flex", flexDirection: "column", gap: 5, marginBottom: 18 },
  label: { fontWeight: 600, fontSize: "0.88rem", color: G.sombre },
  input: (err) => ({
    padding: "10px 12px", borderRadius: 6, border: `1.5px solid ${err ? G.erreur : "#ccc"}`,
    fontFamily: G.corps, fontSize: "0.92rem", outline: "none", transition: "border-color .2s",
  }),
  errMsg: { color: G.erreur, fontSize: "0.77rem", marginTop: 2 },
  submitBtn: (chargement) => ({
    width: "100%", padding: "13px", borderRadius: 7, border: "none",
    background: chargement ? "#aaa" : G.vert, color: G.blanc, fontWeight: 700,
    fontSize: "1rem", cursor: chargement ? "not-allowed" : "pointer",
    transition: "background .2s, transform .15s", marginTop: 8,
    letterSpacing: "0.04em",
  }),

  // Confirmation
  confirmation: { textAlign: "center", padding: "48px 20px" },
  confirmIcone: { fontSize: "4rem", marginBottom: 12 },
  confirmTitre: { fontFamily: G.titre, fontSize: "2rem", color: G.vert, marginBottom: 10 },
  confirmTexte: { color: G.muet, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 24px" },
  retourBtn: { padding: "10px 28px", borderRadius: 7, border: "none", background: G.vert, color: G.blanc,
             fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" },

  // Pied de page
  piedDePage: { maxWidth: 880, margin: "0 auto", padding: "14px 20px",
            display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center",
            gap: 20, borderTop: "2px solid #bbb" },
  footerLogoImg: { width: 52, height: 52, objectFit: "contain", border: "1px solid #ccc", borderRadius: 4, padding: 4, background: G.blanc },
  footerCopy: { display: "flex", justifyContent: "flex-end", color: G.muet, fontSize: "0.82rem" },

  // Page À propos
  aboutWrap: { maxWidth: 680, margin: "0 auto" },
  aboutTitre: { fontFamily: G.titre, fontSize: "2rem", color: G.vert, marginBottom: 14 },
  aboutTexte: { lineHeight: 1.8, color: G.muet, marginBottom: 16, fontSize: "0.93rem" },
  aboutImg: { width: "100%", borderRadius: 10, marginBottom: 20, maxHeight: 260, objectFit: "cover" },

  // Page Menu
  menuTitre: { fontFamily: G.titre, fontSize: "2rem", color: G.vert, marginBottom: 20 },
  menuGrille: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 },
  menuCarte: { background: G.carte, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.08)" },
  menuCarteImg: { width: "100%", height: 140, objectFit: "cover" },
  menuCarteCorps: { padding: "14px 16px" },
  menuCarteTitre: { fontFamily: G.titre, fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 },
  menuCarteDesc: { fontSize: "0.82rem", color: G.muet, lineHeight: 1.55 },
  menuCartePrix: { fontSize: "1rem", fontWeight: 700, color: G.vert, marginTop: 8 },
};

export const styleTag = `
  @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)}  to{opacity:1;transform:translateY(0)} }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { margin: 0; }
  input:focus, select:focus, textarea:focus { border-color: #495e57 !important; box-shadow: 0 0 0 3px rgba(73,94,87,.15); }
  button:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
`;
