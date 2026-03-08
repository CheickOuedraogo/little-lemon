import React, { useState, useEffect, useCallback } from "react";
import { css } from "../styles";

// Helpers de validation traduits
const validerNom = (v) => v.trim().length >= 2;
const validerEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const validerDate = (v) => { if (!v) return false; return new Date(v) >= new Date(new Date().toDateString()); };
const validerInvites = (v) => Number(v) >= 1 && Number(v) <= 10;
const validerHeure = (v) => v !== "";

const FormulaireReservation = ({ horairesDisponibles, mettreAJourHoraires, soumettreFormulaire }) => {
  const aujourdhui = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    nom: "", email: "", date: aujourdhui, heure: "", invites: 2, occasion: "", note: ""
  });
  const [erreurs, setErreurs] = useState({});
  const [touche, setTouche] = useState({});
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    if (form.date) mettreAJourHoraires(form.date);
  }, [form.date, mettreAJourHoraires]);

  const valider = useCallback((f) => {
    const e = {};
    if (!validerNom(f.nom)) e.nom = "Le nom doit contenir au moins 2 caractères.";
    if (!validerEmail(f.email)) e.email = "Adresse e-mail invalide.";
    if (!validerDate(f.date)) e.date = "Veuillez choisir une date à partir d'aujourd'hui.";
    if (!validerHeure(f.heure)) e.heure = "Veuillez sélectionner un créneau horaire.";
    if (!validerInvites(f.invites)) e.invites = "Entre 1 et 10 convives.";
    return e;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setTouche(t => ({ ...t, [name]: true }));
  };

  const handleBlur = (e) => {
    setTouche(t => ({ ...t, [e.target.name]: true }));
    setErreurs(valider({ ...form, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tousTouches = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouche(tousTouches);
    const errs = valider(form);
    setErreurs(errs);
    if (Object.keys(errs).length > 0) return;

    setChargement(true);
    await soumettreFormulaire(form);
    setChargement(false);
  };

  const F = ({ name, label, type = "text", children, as }) => {
    const err = touche[name] && erreurs[name];
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
    <section style={{ ...css.reservationWrap, animation: "fadeUp .45s ease" }} aria-label="Réservation">
      <h1 style={css.reservationTitre}>Réserver une table</h1>
      <p style={css.reservationSousTitre}>Remplissez le formulaire ci-dessous pour réserver votre expérience culinaire.</p>

      <form onSubmit={handleSubmit} style={css.formulaire} aria-label="Formulaire de réservation">
        <F name="nom" label="Nom complet *" />
        <F name="email" label="Adresse e-mail *" type="email" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <F name="date" label="Date *" type="date" />
          <div style={css.formGroup}>
            <label htmlFor="heure" style={css.label}>Créneau horaire *</label>
            <select id="heure" name="heure" value={form.heure} onChange={handleChange} onBlur={handleBlur}
                    style={css.input(touche.heure && erreurs.heure)}
                    aria-invalid={!!(touche.heure && erreurs.heure)}>
              <option value="">-- Choisir --</option>
              {horairesDisponibles.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {touche.heure && erreurs.heure && <span style={css.errMsg} role="alert">{erreurs.heure}</span>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <F name="invites" label="Nombre de convives *" type="number" />
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
          type="submit"
          style={css.submitBtn(chargement)}
          disabled={chargement}
          aria-label="Confirmer la réservation"
        >
          {chargement ? "Envoi en cours…" : "Confirmer la réservation"}
        </button>
      </form>
    </section>
  );
};

export default FormulaireReservation;
