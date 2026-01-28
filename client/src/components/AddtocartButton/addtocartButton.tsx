import { useCartContext } from "../../contexts/CartContext";
import "./addtocartButton.css";

type Props = {
  productId: number;
  productName: string;
  price: number;
  imageUrl: string;
  selectedSize?: number | null;
  selectedSizeLabel?: string;
};

function AddtocartButton({
  productId,
  productName,
  price,
  imageUrl,
  selectedSize,
  selectedSizeLabel,
}: Props) {
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Veuillez sélectionner une taille");
      return;
    }

    addToCart({
      product_id: productId,
      name: productName,
      price,
      image_url: imageUrl,
      quantity: 1,
      size_id: selectedSize,
      size_label: selectedSizeLabel || "",
    });
  };

  return (
    <button
      type="button"
      className="add-to-cart-button"
      onClick={handleAddToCart}
    >
      Ajouter au panier
    </button>
  );
}

export default AddtocartButton;
