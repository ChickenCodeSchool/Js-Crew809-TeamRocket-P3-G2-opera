import "./contact.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

function Contact() {
  return (
    <div>
      <h1 className="title_contact">
        Comment contacter le service clientèle OPÉRA
      </h1>
      <p className="choose_conctact">
        Choisissez votre mode de communication préféré pour nous joindre
      </p>

      <article className="method_contact">
        <div>
          <h3>TELEPHONE</h3>
          <p>Du lundi Au Dimanche de 10h à 10h (CET)</p>
          <p>
            <BsFillTelephoneFill />
            Appelez-nous +33 158962424
          </p>
        </div>
        <div>
          <h3>LIVE CHAT</h3>
          <p>Du Lundi au Dimanche de 10h à 19h (CET)</p>
          <p>
            <IoChatbubbleEllipsesSharp />
            Envoyez-nous un message
          </p>
        </div>
      </article>
      <div className="mail_contact">
        <h3>E-MAIL</h3>
        <p>Un conseiller clientèle se chargera d’étudier votre demande </p>
        <p>
          <IoIosMail />
          Écrivez-nous{" "}
        </p>
      </div>
    </div>
  );
}

export default Contact;
