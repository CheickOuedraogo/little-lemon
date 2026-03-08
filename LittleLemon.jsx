import { useState, useReducer, useEffect, useCallback } from "react";

/* =============================================
   SIMULATED API  (remplace fetchAPI / submitAPI)
============================================= */
const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const fetchAPI = (date) => {
  const slots = ["17:00","18:00","19:00","19:30","20:00","20:30","21:00","21:30"];
  const seed = new Date(date).getDate();
  return slots.filter((_, i) => seededRandom(seed + i) > 0.3);
};

const submitAPI = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random() > 0.05), 600); // 95% success
  });
};

/* =============================================
   REDUCER – état des créneaux de réservation
============================================= */
const initialState = { availableTimes: [] };

const timesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      return { ...state, availableTimes: fetchAPI(action.date) };
    default:
      return state;
  }
};

/* =============================================
   VALIDATION HELPERS (unit-testable)
============================================= */
export const validateName   = (v) => v.trim().length >= 2;
export const validateEmail  = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const validateDate   = (v) => { if (!v) return false; return new Date(v) >= new Date(new Date().toDateString()); };
export const validateGuests = (v) => Number(v) >= 1 && Number(v) <= 10;
export const validateTime   = (v) => v !== "";

/* =============================================
   STYLES INLINE  (CSS-in-JS compact)
============================================= */
const G = {
  // palette
  green:  "#495e57",
  yellow: "#f4ce14",
  dark:   "#333333",
  light:  "#edefee",
  white:  "#ffffff",
  card:   "#faf7f4",
  muted:  "#6b6b6b",
  link:   "#0f6e84",
  error:  "#c0392b",
  success:"#27ae60",
  // font
  heading: "'Georgia', serif",
  body:    "'Trebuchet MS', sans-serif",
};

const css = {
  page: { fontFamily: G.body, background: "#e8e4e0", minHeight: "100vh", margin: 0 },

  // Header
  header: { background: "#f0ece8", padding: "14px 40px", display: "flex", justifyContent: "center", alignItems: "center", borderBottom: "1px solid #ccc", animation: "fadeDown .4s ease" },
  logoWrap: { display: "flex", alignItems: "center", gap: 12, cursor: "pointer" },
  logoImg: { width: 64, height: 64, objectFit: "contain", transition: "transform .3s" },
  logoText: { fontFamily: G.heading, fontSize: "2.4rem", fontWeight: 700, color: G.green, letterSpacing: "0.12em" },

  // Nav
  nav: { background: G.dark, display: "flex", justifyContent: "center" },
  navList: { listStyle: "none", display: "flex", margin: 0, padding: 0 },
  navLink: (active) => ({
    display: "inline-block", padding: "13px 20px", color: active ? G.yellow : G.white,
    cursor: "pointer", fontWeight: 500, fontSize: "0.97rem", letterSpacing: "0.04em",
    borderBottom: active ? `3px solid ${G.yellow}` : "3px solid transparent",
    transition: "color .2s, border-color .2s",
  }),

  // Main
  main: { maxWidth: 880, margin: "0 auto", padding: "24px 20px 48px" },

  // Banner
  banner: { borderRadius: 10, overflow: "hidden", position: "relative", height: 230, marginBottom: 28,
            backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=900&q=80')",
            backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 4px 18px rgba(0,0,0,.22)" },
  bannerOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.72) 55%, rgba(0,0,0,.05))",
                   padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 12, maxWidth: 560 },
  bannerTitle: { fontFamily: G.heading, fontSize: "2.1rem", color: G.yellow, textShadow: "0 2px 6px rgba(0,0,0,.5)", margin: 0 },
  bannerText: { fontSize: "0.82rem", color: "#e0e0e0", lineHeight: 1.6, margin: 0 },

  // Grid 3 cols
  grid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },

  // Card
  card: { background: G.card, borderRadius: 8, padding: "18px 16px 20px",
          display: "flex", flexDirection: "column", gap: 11,
          boxShadow: "0 2px 8px rgba(0,0,0,.08)", transition: "transform .25s, box-shadow .25s" },
  cardTitle: { fontFamily: G.heading, fontSize: "1.45rem", fontWeight: 700, color: G.dark, margin: 0 },
  cardImg: { width: "100%", height: 155, objectFit: "cover", borderRadius: 6, transition: "transform .3s" },
  cardText: { fontSize: "0.83rem", color: G.muted, lineHeight: 1.65, margin: 0 },
  cardLink: { color: G.link, fontSize: "0.84rem", fontWeight: 600, textDecoration: "underline", cursor: "pointer", marginTop: "auto" },

  hoursList: { listStyle: "none", padding: 0, margin: 0, fontSize: "0.86rem", lineHeight: 2.2, fontWeight: 500 },

  // Booking page
  bookingWrap: { maxWidth: 520, margin: "0 auto" },
  bookingTitle: { fontFamily: G.heading, fontSize: "2rem", color: G.green, marginBottom: 6 },
  bookingSubtitle: { color: G.muted, marginBottom: 24, fontSize: "0.9rem" },

  // Form
  form: { background: G.white, borderRadius: 10, padding: "28px 30px", boxShadow: "0 4px 20px rgba(0,0,0,.1)" },
  formGroup: { display: "flex", flexDirection: "column", gap: 5, marginBottom: 18 },
  label: { fontWeight: 600, fontSize: "0.88rem", color: G.dark },
  input: (err) => ({
    padding: "10px 12px", borderRadius: 6, border: `1.5px solid ${err ? G.error : "#ccc"}`,
    fontFamily: G.body, fontSize: "0.92rem", outline: "none", transition: "border-color .2s",
  }),
  errMsg: { color: G.error, fontSize: "0.77rem", marginTop: 2 },
  submitBtn: (loading) => ({
    width: "100%", padding: "13px", borderRadius: 7, border: "none",
    background: loading ? "#aaa" : G.green, color: G.white, fontWeight: 700,
    fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer",
    transition: "background .2s, transform .15s", marginTop: 8,
    letterSpacing: "0.04em",
  }),

  // Confirmation
  confirm: { textAlign: "center", padding: "48px 20px" },
  confirmIcon: { fontSize: "4rem", marginBottom: 12 },
  confirmTitle: { fontFamily: G.heading, fontSize: "2rem", color: G.green, marginBottom: 10 },
  confirmText: { color: G.muted, lineHeight: 1.7, maxWidth: 420, margin: "0 auto 24px" },
  backBtn: { padding: "10px 28px", borderRadius: 7, border: "none", background: G.green, color: G.white,
             fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" },

  // Footer
  footer: { maxWidth: 880, margin: "0 auto", padding: "14px 20px",
            display: "grid", gridTemplateColumns: "auto 1fr", alignItems: "center",
            gap: 20, borderTop: "2px solid #bbb" },
  footerLogoImg: { width: 52, height: 52, objectFit: "contain", border: "1px solid #ccc", borderRadius: 4, padding: 4, background: G.white },
  footerCopy: { display: "flex", justifyContent: "flex-end", color: G.muted, fontSize: "0.82rem" },

  // About page
  aboutWrap: { maxWidth: 680, margin: "0 auto" },
  aboutTitle: { fontFamily: G.heading, fontSize: "2rem", color: G.green, marginBottom: 14 },
  aboutText: { lineHeight: 1.8, color: G.muted, marginBottom: 16, fontSize: "0.93rem" },
  aboutImg: { width: "100%", borderRadius: 10, marginBottom: 20, maxHeight: 260, objectFit: "cover" },

  // Menu page
  menuTitle: { fontFamily: G.heading, fontSize: "2rem", color: G.green, marginBottom: 20 },
  menuGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 },
  menuCard: { background: G.card, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,.08)" },
  menuCardImg: { width: "100%", height: 140, objectFit: "cover" },
  menuCardBody: { padding: "14px 16px" },
  menuCardTitle: { fontFamily: G.heading, fontSize: "1.1rem", fontWeight: 700, marginBottom: 4 },
  menuCardDesc: { fontSize: "0.82rem", color: G.muted, lineHeight: 1.55 },
  menuCardPrice: { fontSize: "1rem", fontWeight: 700, color: G.green, marginTop: 8 },
};

/* =============================================
   KEYFRAMES (injected once)
============================================= */
const styleTag = `
  @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(14px)}  to{opacity:1;transform:translateY(0)} }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { margin: 0; }
  input:focus, select:focus, textarea:focus { border-color: #495e57 !important; box-shadow: 0 0 0 3px rgba(73,94,87,.15); }
  button:hover:not(:disabled) { filter: brightness(1.08); transform: translateY(-1px); }
`;

/* =============================================
   COMPONENTS
============================================= */

// — Logo —
const Logo = ({ onClick }) => (
  <div style={css.logoWrap} onClick={onClick} role="link" aria-label="Accueil Little Lemon">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lemon.svg/240px-Lemon.svg.png"
      alt="Little Lemon logo"
      style={css.logoImg}
      onMouseOver={e => e.currentTarget.style.transform = "rotate(-10deg) scale(1.06)"}
      onMouseOut={e  => e.currentTarget.style.transform = ""}
    />
    <span style={css.logoText}>LITTLE LEMON</span>
  </div>
);

// — Navigation —
const Nav = ({ page, setPage }) => {
  const links = ["Home", "Menu", "Book", "About"];
  return (
    <nav style={css.nav} role="navigation" aria-label="Navigation principale">
      <ul style={css.navList}>
        {links.map(l => (
          <li key={l}>
            <span
              style={css.navLink(page === l)}
              onClick={() => setPage(l)}
              role="link"
              aria-current={page === l ? "page" : undefined}
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && setPage(l)}
            >{l}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// — Home Page —
const HomePage = ({ setPage }) => (
  <main style={css.main} role="main">
    {/* Banner */}
    <section aria-label="Promotion" style={{ animation: "fadeDown .5s ease .05s both" }}>
      <div style={css.banner}>
        <div style={css.bannerOverlay}>
          <h1 style={css.bannerTitle}>30% Off This Weekend</h1>
          <p style={css.bannerText}>
            Découvrez notre cuisine méditerranéenne fraîche et savoureuse. Des ingrédients locaux,
            des recettes authentiques et une ambiance chaleureuse vous attendent.
            Réservez dès maintenant pour profiter de l'offre du week-end.
          </p>
        </div>
      </div>
    </section>

    {/* Three columns */}
    <section aria-label="Nos services" style={{ ...css.grid3, animation: "fadeUp .5s ease .2s both" }}>

      <article style={css.card}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.cardTitle}>Our New Menu</h2>
        <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80"
             alt="Brochettes grillées" style={css.cardImg}/>
        <p style={css.cardText}>
          Découvrez notre nouvelle sélection de plats méditerranéens, élaborés avec des produits frais
          du marché. Des saveurs authentiques qui vous transporteront en Grèce et en Italie.
        </p>
        <span style={css.cardLink} onClick={() => setPage("Menu")} role="link" tabIndex={0}>
          See our new menu
        </span>
      </article>

      <article style={css.card}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.cardTitle}>Book a table</h2>
        <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80"
             alt="Salade fraîche colorée" style={css.cardImg}/>
        <p style={css.cardText}>
          Réservez votre table pour une expérience gastronomique inoubliable. Que ce soit pour un
          dîner romantique, un repas en famille ou un déjeuner d'affaires, nous vous accueillons.
        </p>
        <span style={css.cardLink} onClick={() => setPage("Book")} role="link" tabIndex={0}>
          Book your table now
        </span>
      </article>

      <article style={css.card}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,.14)"; }}
        onMouseOut={e  => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)"; }}>
        <h2 style={css.cardTitle}>Opening Hours</h2>
        <img src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80"
             alt="Chef en cuisine" style={css.cardImg}/>
        <p style={css.cardText}>
          Notre équipe de chefs passionnés prépare chaque jour des plats avec amour et expertise.
          Venez nous rendre visite pendant nos horaires d'ouverture.
        </p>
        <ul style={css.hoursList}>
          <li>Mon – Fri : 2pm – 10pm</li>
          <li>Sat : 2pm – 11pm</li>
          <li>Sun : 2pm – 9pm</li>
        </ul>
      </article>

    </section>
  </main>
);

// — Booking Form —
const BookingPage = () => {
  const today = new Date().toISOString().split("T")[0];
  const [state, dispatch] = useReducer(timesReducer, initialState);

  const [form, setForm] = useState({
    name: "", email: "", date: today, time: "", guests: 2, occasion: "", note: ""
  });
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [loading, setLoading]   = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Charger les créneaux dès qu'une date est choisie
  useEffect(() => {
    if (form.date) dispatch({ type: "UPDATE_TIMES", date: form.date });
  }, [form.date]);

  // Reset time si plus disponible
  useEffect(() => {
    if (form.time && !state.availableTimes.includes(form.time)) {
      setForm(f => ({ ...f, time: "" }));
    }
  }, [state.availableTimes]);

  const validate = useCallback((f) => {
    const e = {};
    if (!validateName(f.name))     e.name    = "Le nom doit contenir au moins 2 caractères.";
    if (!validateEmail(f.email))   e.email   = "Adresse e-mail invalide.";
    if (!validateDate(f.date))     e.date    = "Veuillez choisir une date à partir d'aujourd'hui.";
    if (!validateTime(f.time))     e.time    = "Veuillez sélectionner un créneau horaire.";
    if (!validateGuests(f.guests)) e.guests  = "Entre 1 et 10 convives.";
    return e;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setTouched(t => ({ ...t, [name]: true }));
  };

  const handleBlur = (e) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const ok = await submitAPI(form);
    setLoading(false);
    if (ok) setConfirmed(true);
    else alert("Une erreur est survenue. Veuillez réessayer.");
  };

  if (confirmed) return (
    <main style={css.main} role="main">
      <div style={{ ...css.confirm, animation: "fadeUp .5s ease" }}>
        <div style={css.confirmIcon}>🍋</div>
        <h1 style={css.confirmTitle}>Réservation Confirmée !</h1>
        <p style={css.confirmText}>
          Merci <strong>{form.name}</strong> !<br/>
          Votre table pour <strong>{form.guests} personne{form.guests > 1 ? "s" : ""}</strong> est
          réservée le <strong>{form.date}</strong> à <strong>{form.time}</strong>.<br/>
          Un e-mail de confirmation sera envoyé à <strong>{form.email}</strong>.
        </p>
        <button style={css.backBtn} onClick={() => setConfirmed(false)}>
          Faire une autre réservation
        </button>
      </div>
    </main>
  );

  const F = ({ name, label, type = "text", children, as }) => {
    const err = touched[name] && errors[name];
    return (
      <div style={css.formGroup}>
        <label htmlFor={name} style={css.label}>{label}</label>
        {as === "select" ? (
          <select id={name} name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur}
                  style={css.input(err)} aria-invalid={!!err} aria-describedby={err ? `${name}-err` : undefined}>
            {children}
          </select>
        ) : as === "textarea" ? (
          <textarea id={name} name={name} value={form[name]} onChange={handleChange} onBlur={handleBlur}
                    rows={3} style={{ ...css.input(err), resize: "vertical" }} placeholder="Allergies, préférences…"/>
        ) : (
          <input id={name} name={name} type={type} value={form[name]} onChange={handleChange} onBlur={handleBlur}
                 style={css.input(err)} aria-invalid={!!err} aria-describedby={err ? `${name}-err` : undefined}/>
        )}
        {err && <span id={`${name}-err`} style={css.errMsg} role="alert">{err}</span>}
      </div>
    );
  };

  return (
    <main style={css.main} role="main">
      <section style={{ ...css.bookingWrap, animation: "fadeUp .45s ease" }} aria-label="Réservation">
        <h1 style={css.bookingTitle}>Réserver une table</h1>
        <p style={css.bookingSubtitle}>Remplissez le formulaire ci-dessous pour réserver votre expérience culinaire.</p>

        <div style={css.form} role="form" aria-label="Formulaire de réservation">
          <F name="name"  label="Nom complet *" />
          <F name="email" label="Adresse e-mail *" type="email" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <F name="date" label="Date *" type="date" />
            <div style={css.formGroup}>
              <label htmlFor="time" style={css.label}>Créneau horaire *</label>
              <select id="time" name="time" value={form.time} onChange={handleChange} onBlur={handleBlur}
                      style={css.input(touched.time && errors.time)}
                      aria-invalid={!!(touched.time && errors.time)}>
                <option value="">-- Choisir --</option>
                {state.availableTimes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              {touched.time && errors.time && <span style={css.errMsg} role="alert">{errors.time}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <F name="guests" label="Nombre de convives *" type="number" />
            <F name="occasion" label="Occasion" as="select">
              <option value="">-- Optionnel --</option>
              <option value="Anniversaire">🎂 Anniversaire</option>
              <option value="Romantique">💑 Dîner romantique</option>
              <option value="Affaires">💼 Repas d'affaires</option>
              <option value="Famille">👨‍👩‍👧 Repas en famille</option>
            </F>
          </div>

          <F name="note" label="Notes spéciales" as="textarea" />

          <button
            style={css.submitBtn(loading)}
            onClick={handleSubmit}
            disabled={loading}
            aria-label="Confirmer la réservation"
          >
            {loading ? "Envoi en cours…" : "Confirmer la réservation"}
          </button>
        </div>
      </section>
    </main>
  );
};

// — Menu Page —
const menuItems = [
  { title: "Salade Grecque", price: "€9.50", desc: "Tomates, concombre, olives, feta et huile d'olive vierge extra.",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80" },
  { title: "Bruschetta al Pomodoro", price: "€7.00", desc: "Pain grillé, tomates fraîches, basilic et ail.",
    img: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=400&q=80" },
  { title: "Pasta Carbonara", price: "€14.50", desc: "Spaghetti, pancetta, parmesan, œuf et poivre noir.",
    img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80" },
  { title: "Grillades Mixtes", price: "€18.00", desc: "Sélection de viandes grillées, légumes de saison et sauce tzatziki.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80" },
  { title: "Pizza Margherita", price: "€12.00", desc: "Sauce tomate, mozzarella et basilic frais sur pâte fine.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
  { title: "Tiramisu Maison", price: "€6.50", desc: "Mascarpone, café espresso, biscuits ladyfinger et cacao.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80" },
];

const MenuPage = () => (
  <main style={css.main} role="main">
    <section style={{ animation: "fadeUp .45s ease" }} aria-label="Notre menu">
      <h1 style={css.menuTitle}>Notre Menu</h1>
      <div style={css.menuGrid}>
        {menuItems.map((item, i) => (
          <article key={i} style={{ ...css.menuCard, animation: `fadeUp .4s ease ${i * 0.07}s both` }}>
            <img src={item.img} alt={item.title} style={css.menuCardImg}/>
            <div style={css.menuCardBody}>
              <h2 style={css.menuCardTitle}>{item.title}</h2>
              <p style={css.menuCardDesc}>{item.desc}</p>
              <p style={css.menuCardPrice}>{item.price}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

// — About Page —
const AboutPage = () => (
  <main style={css.main} role="main">
    <article style={{ ...css.aboutWrap, animation: "fadeUp .45s ease" }}>
      <h1 style={css.aboutTitle}>À propos de Little Lemon</h1>
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80"
           alt="Intérieur du restaurant" style={css.aboutImg}/>
      <p style={css.aboutText}>
        Little Lemon est un restaurant méditerranéen de quartier fondé par deux frères,
        <strong> Mario</strong> et <strong> Adrian</strong>, originaires d'Italie. Ils ont ouvert
        leurs portes en 2010 avec une vision simple : proposer une cuisine méditerranéenne authentique
        dans une atmosphère chaleureuse et conviviale.
      </p>
      <p style={css.aboutText}>
        Chaque plat est préparé avec des ingrédients frais et locaux, soigneusement sélectionnés
        auprès de producteurs de la région. Notre chef, formé à Naples et Athènes, apporte une
        touche de modernité tout en respectant les recettes traditionnelles transmises de génération
        en génération.
      </p>
      <p style={css.aboutText}>
        Notre mission est de vous offrir bien plus qu'un simple repas — une expérience culinaire
        mémorable qui vous transporte au cœur de la Méditerranée. Rejoignez-nous pour partager
        un moment de convivialité autour d'une table bien garnie.
      </p>
    </article>
  </main>
);

// — Footer —
const Footer = () => (
  <footer style={css.footer} role="contentinfo">
    <div>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Lemon.svg/240px-Lemon.svg.png"
           alt="Little Lemon small logo" style={css.footerLogoImg}/>
    </div>
    <div style={css.footerCopy}>
      <p>Copyright Little Lemon &copy; {new Date().getFullYear()}</p>
    </div>
  </footer>
);

/* =============================================
   APP ROOT
============================================= */
export default function App() {
  const [page, setPage] = useState("Home");

  const renderPage = () => {
    switch (page) {
      case "Home":  return <HomePage setPage={setPage}/>;
      case "Book":  return <BookingPage/>;
      case "Menu":  return <MenuPage/>;
      case "About": return <AboutPage/>;
      default:      return <HomePage setPage={setPage}/>;
    }
  };

  return (
    <>
      <style>{styleTag}</style>
      <div style={css.page}>
        {/* Semantic: header + nav outside main */}
        <header style={css.header} role="banner">
          <Logo onClick={() => setPage("Home")}/>
        </header>

        <Nav page={page} setPage={setPage}/>

        {renderPage()}

        <Footer/>
      </div>
    </>
  );
}
