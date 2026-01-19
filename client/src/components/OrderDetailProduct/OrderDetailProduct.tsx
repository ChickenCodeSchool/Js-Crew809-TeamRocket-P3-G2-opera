import "./OrderDetailProduct.css";

// On définit le type de l'article spécifique au détail
export interface OrderDetailItem {
  product_id: number;
  name: string;
  image_url: string;
  quantity: number;
  unit_price: number;
}

type Props = {
  item: OrderDetailItem;
};

export default function OrderDetailProduct({ item }: Props) {
  return (
    <div className="product-card-orderDetail">
      {/* Image du produit */}
      <div className="product-image-container-orderDetail">
        <img
          src={`${import.meta.env.VITE_API_URL}${item.image_url}`}
          alt={item.name}
          className="product-img-orderDetail"
        />
      </div>

      {/* Informations Produit */}
      <div className="product-info-orderDetail">
        <h3 className="product-name-orderDetail">{item.name}</h3>
        <p className="product-price-orderDetail">
          € {new Intl.NumberFormat("fr-FR").format(item.unit_price)}
        </p>
        {/* On peut afficher la quantité si besoin, même si pas sur la maquette */}
        {item.quantity > 1 && (
          <p className="product-quantity-orderDetail">x {item.quantity}</p>
        )}
      </div>
    </div>
  );
}
