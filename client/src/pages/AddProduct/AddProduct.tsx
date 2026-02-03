import "./AddProduct.css";
import { useState } from "react";
import FormulaireProduct from "../../components/FormulaireProduct/FormulaireProduct";
import Modal from "../../components/Modal/Modal.tsx";

function AddProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="formulaire-container">
      {/* Bouton pour ouvrir le modal */}
      <button
        type="button"
        className="add-product-btn"
        onClick={() => setIsModalOpen(true)}
      >
        + Ajouter un produit
      </button>

      {/* Modal avec le formulaire */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouveau produit"
      >
        <FormulaireProduct
          onSuccess={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default AddProduct;
