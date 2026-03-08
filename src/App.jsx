import React, { useState, useReducer, useCallback } from "react";
import { css, styleTag } from "./styles";
import EnTete from "./components/EnTete";
import Navigation from "./components/Navigation";
import PageAccueil from "./components/PageAccueil";
import PageMenu from "./components/PageMenu";
import PageAPropos from "./components/PageAPropos";
import FormulaireReservation from "./components/FormulaireReservation";
import ReservationConfirmee from "./components/ReservationConfirmee";
import PiedDePage from "./components/PiedDePage";

/* =============================================
   API SIMULÉE (Inspirée de LittleLemon.jsx)
   ============================================= */
const genererAleatoire = (graine) => {
  const x = Math.sin(graine) * 10000;
  return x - Math.floor(x);
};

const recupererHorairesAPI = (date) => {
  const créneaux = ["17:00", "18:00", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  const graine = new Date(date).getDate();
  return créneaux.filter((_, i) => genererAleatoire(graine + i) > 0.3);
};

const soumettreAPI = (donnees) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random() > 0.05), 600); // 95% de succès
  });
};

/* =============================================
   GESTION DE L'ÉTAT (Reducer)
   ============================================= */
const etatInitialHoraires = { horairesDisponibles: recupererHorairesAPI(new Date()) };

const reducteurHoraires = (etat, action) => {
  switch (action.type) {
    case "METTRE_A_JOUR":
      return { ...etat, horairesDisponibles: recupererHorairesAPI(action.date) };
    default:
      return etat;
  }
};

export default function App() {
  const [page, setPage] = useState("Accueil");
  const [etatHoraires, dispatch] = useReducer(reducteurHoraires, etatInitialHoraires);
  const [detailsReservation, setDetailsReservation] = useState(null);
  const [estConfirme, setEstConfirme] = useState(false);

  const mettreAJourHoraires = useCallback((date) => {
    dispatch({ type: "METTRE_A_JOUR", date });
  }, []);

  const gererSoumission = async (donnees) => {
    const succes = await soumettreAPI(donnees);
    if (succes) {
      setDetailsReservation(donnees);
      setEstConfirme(true);
    } else {
      alert("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
    }
  };

  const retournerAccueil = () => {
    setEstConfirme(false);
    setDetailsReservation(null);
    setPage("Accueil");
  };

  const afficherPage = () => {
    if (estConfirme) {
      return <ReservationConfirmee details={detailsReservation} retourAccueil={retournerAccueil} />;
    }

    switch (page) {
      case "Accueil":
        return <PageAccueil setPage={setPage} />;
      case "Menu":
        return <PageMenu />;
      case "Reserver":
        return (
          <FormulaireReservation
            horairesDisponibles={etatHoraires.horairesDisponibles}
            mettreAJourHoraires={mettreAJourHoraires}
            soumettreFormulaire={gererSoumission}
          />
        );
      case "APropos":
        return <PageAPropos />;
      default:
        return <PageAccueil setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{styleTag}</style>
      <div style={css.page}>
        <EnTete auClic={() => setPage("Accueil")} />
        <Navigation page={page} setPage={setPage} />
        {afficherPage()}
        <PiedDePage />
      </div>
    </>
  );
}
