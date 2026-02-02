import "./Modal.css";
import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape key handled in useEffect
    <div className="modal-overlay" onClick={onClose}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only needed for click */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header avec titre et bouton fermer */}
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {/* Contenu */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
