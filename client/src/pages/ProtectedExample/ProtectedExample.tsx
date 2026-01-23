import { useOutletContext } from "react-router-dom";
import type { Auth } from "../../App";

function ProtectedExample() {
  const { auth } = useOutletContext<{ auth: Auth | null }>();

  return (
    <div style={{ padding: 24 }}>
      <h2>Page protegee</h2>
      <p>Seuls les utilisateurs connectes peuvent voir ce contenu.</p>
      <p>Bonjour {auth?.user.firstname ?? "utilisateur"}.</p>
    </div>
  );
}

export default ProtectedExample;
