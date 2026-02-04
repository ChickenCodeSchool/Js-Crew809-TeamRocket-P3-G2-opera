import { useRef, useState } from "react";
import type { FormEventHandler } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";
import "./Register.css";

import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivacyModal from "../PolitiqueConfidentialite/PrivacyModal";

function NumberStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;
  return (
    <div
      className={`MuiStepIcon-root ${active ? "Mui-active" : ""} ${
        completed ? "Mui-completed" : ""
      }`}
    >
      {icon}
    </div>
  );
}

function Register() {
  const [step, setStep] = useState(1);
  const [accountData, setAccountData] = useState<{
    mail: string;
    password: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
  }>({
    mail: "",
    password: "",
  });
  const [consent, setConsent] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const adressRef = useRef<HTMLInputElement>(null);
  const postalCodeRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { setAuth } = useOutletContext<{
    setAuth: (auth: Auth | null) => void;
  }>();

  const handleNextStep = () => {
    if (step === 1) {
      const mail = emailRef.current?.value?.trim();
      const password = passwordRef.current?.value;
      const confirm = confirmPasswordRef.current?.value;

      if (!mail || !password || !confirm) {
        toast.error("Remplissez tous les champs");
        return;
      }
      if (password !== confirm) {
        toast.error("Les mots de passe ne correspondent pas");
        return;
      }
      setAccountData({ mail, password });
    }

    if (step === 2) {
      const firstname = firstnameRef.current?.value?.trim();
      const lastname = lastnameRef.current?.value?.trim();
      const phone = phoneRef.current?.value?.trim() || "";

      if (!firstname || !lastname || !phone) {
        toast.error("Remplissez tous les champs");
        return;
      }
      setAccountData({ ...accountData, firstname, lastname, phone });
    }

    setStep((prev) => prev + 1);
  };

  const handlePreviousStep = () =>
    setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!consent) {
      toast.error(
        "Vous devez accepter la politique de confidentialité pour créer un compte.",
      );
      return;
    }

    const { mail, password, firstname, lastname, phone } = accountData;

    if (!mail || !password) {
      toast.error("Email ou mot de passe manquant");
      return;
    }

    const adress = adressRef.current?.value?.trim() || "";
    const postal_code = postalCodeRef.current?.value?.trim() || "";
    const country = countryRef.current?.value?.trim() || "";

    const payload = {
      mail,
      password,
      firstname,
      lastname,
      phone,
      adress,
      postal_code,
      country,
    };

    try {
      const response = await fetch("http://localhost:3310/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Erreur lors de l'inscription");
        return;
      }
      const result = await response.json();

      if (setAuth) {
        setAuth({
          user: result.user,
          token: "",
        });
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Erreur serveur");
    }
  };

  const steps = ["Compte", "Identité", "Adresse"];

  const connector = (
    <StepConnector
      sx={{
        [`&.${stepConnectorClasses.active}`]: {
          "& .MuiStepConnector-line": {
            background: "linear-gradient(to right, #000 0%, #000 100%)",
            transition: "all 0.5s ease",
          },
        },
        [`&.${stepConnectorClasses.completed}`]: {
          "& .MuiStepConnector-line": {
            background: "linear-gradient(to right, #000 0%, #000 100%)",
          },
        },
        "& .MuiStepConnector-line": {
          height: 2,
          backgroundColor: "#ddd",
          borderRadius: 1,
        },
      }}
    />
  );

  return (
    <>
      <form className="register_form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <Box className="stepper-box">
          <Stepper activeStep={step - 1} alternativeLabel connector={connector}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel slots={{ stepIcon: NumberStepIcon }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {step === 1 && (
          <>
            <div className="form_group">
              <input
                ref={emailRef}
                id="email"
                type="email"
                placeholder=" "
                required
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="form_group">
              <input
                ref={passwordRef}
                id="password"
                type="password"
                placeholder=" "
                required
              />
              <label htmlFor="password">Mot de passe</label>
            </div>
            <div className="form_group">
              <input
                ref={confirmPasswordRef}
                id="confirm-password"
                type="password"
                placeholder=" "
                required
              />
              <label htmlFor="confirm-password">
                Confirmer le mot de passe
              </label>
            </div>
            <div className="register_buttons_group">
              <button
                type="button"
                className="register_button"
                onClick={handleNextStep}
              >
                Continuer
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form_group">
              <input
                ref={firstnameRef}
                id="firstname"
                placeholder=" "
                required
              />
              <label htmlFor="firstname">Prénom</label>
            </div>
            <div className="form_group">
              <input ref={lastnameRef} id="lastname" placeholder=" " required />
              <label htmlFor="lastname">Nom</label>
            </div>
            <div className="form_group">
              <input ref={phoneRef} id="phone" type="tel" placeholder=" " />
              <label htmlFor="phone">Téléphone</label>
            </div>
            <div className="register_buttons_group">
              <button
                type="button"
                className="register_button"
                onClick={handlePreviousStep}
              >
                Retour
              </button>
              <button
                type="button"
                className="register_button"
                onClick={handleNextStep}
              >
                Continuer
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="form_group">
              <input ref={adressRef} id="adress" placeholder=" " />
              <label htmlFor="adress">Adresse</label>
            </div>
            <div className="form_group">
              <input ref={postalCodeRef} id="postal-code" placeholder=" " />
              <label htmlFor="postal-code">Code postal</label>
            </div>
            <div className="form_group">
              <input ref={countryRef} id="country" placeholder=" " />
              <label htmlFor="country">Pays</label>
            </div>

            <div className="form_group checkbox_group">
              <input
                type="checkbox"
                id="rgpd-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="rgpd-consent">
                En créant mon compte, j’accepte que mes données personnelles
                soient traitées pour la gestion de mon compte et de mes
                commandes, conformément à la{" "}
                <button
                  type="button"
                  className="register_privacy_link"
                  onClick={() => setIsPrivacyOpen(true)}
                >
                  politique de confidentialité
                </button>
                .
              </label>
            </div>

            <div className="register_buttons_group">
              <button
                type="button"
                className="register_button"
                onClick={handlePreviousStep}
              >
                Retour
              </button>
              <button type="submit" className="register_button">
                S'inscrire
              </button>
            </div>
          </>
        )}
      </form>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ToastContainer position="top-left" autoClose={3000} limit={1} />
    </>
  );
}

export default Register;
