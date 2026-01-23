import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import "../AddtocartButton/addtocartButton.css";

type AddtocartButtonProps = {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
};

function AddtocartButton({
  productId,
  productName,
  price,
  imageUrl,
}: AddtocartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      product_id: productId,
      name: productName,
      price,
      image_url: imageUrl,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 5000);
  };

  return (
    <div>
      <button
        type="button"
        className={`add-to-cart-button ${isAdded ? "added" : ""}`}
        onClick={handleAddToCart}
      >
        {isAdded ? "Ajouté au panier" : "Ajouter au panier"}
      </button>
    </div>
  );
}

export default AddtocartButton;
