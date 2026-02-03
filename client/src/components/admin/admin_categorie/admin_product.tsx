import { useEffect, useState } from "react";
import "./admin_product.css";
import FormulaireProduct from "../../FormulaireProduct/FormulaireProduct.tsx";
import Modal from "../../Modal/Modal.tsx";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  brand_id: string;
  brand_name: string;
  image_url: string | null;
  total_stock: number | null;
};

type Brand = {
  brand_id: number;
  name: string;
};

type Category = {
  categorie_id: number;
  name: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState("");

  // State pour le modal d'ajout
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // States pour le modal d'édition
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: 0,
    color: "",
  });

  // Fonction pour recharger les produits après ajout
  const refreshProducts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedBrand) params.append("brandId", selectedBrand);
      if (selectedCategory) params.append("categoryId", selectedCategory);

      const url = `${import.meta.env.VITE_API_URL}/api/admin/products?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur chargement produits:", error);
    }
  };

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const brandsRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/brands`,
        );
        const brandsData = await brandsRes.json();
        setBrands(brandsData);

        const categoriesRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/categories`,
        );
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erreur chargement filtres:", error);
      }
    };

    fetchFiltersData();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: loading uniquement au premier fetch
  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) setLoading(true);
      try {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (selectedBrand) params.append("brandId", selectedBrand);
        if (selectedCategory) params.append("categoryId", selectedCategory);

        const url = `${import.meta.env.VITE_API_URL}/api/admin/products?${params.toString()}`;
        const res = await fetch(url);
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.error("Erreur chargement produits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedBrand, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 100);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      color: product.color,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${editingProduct.product_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        },
      );

      if (res.ok) {
        setProducts(
          products.map((p) =>
            p.product_id === editingProduct.product_id
              ? { ...p, ...editForm }
              : p,
          ),
        );
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Erreur modification:", error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/products/${productId}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        setProducts(products.filter((p) => p.product_id !== productId));
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // Callback quand un produit est ajouté avec succès
  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    refreshProducts(); // Recharge la liste
  };

  return (
    <div className="admin-products">
      <h1>Gestion des Produits</h1>

      <div className="admin-filters">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="admin-search"
        />

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="admin-select"
          title="Filtrer par marque"
        >
          <option value="">Toutes les marques</option>
          {brands.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="admin-select"
          title="Filtrer par catégorie"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.categorie_id} value={category.categorie_id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Bouton qui ouvre le modal */}
        <button
          type="button"
          className="add-product-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          Ajouter un produit
        </button>
      </div>

      <p>{products.length} produit(s) trouvé(s)</p>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Marque</th>
              <th>Prix</th>
              <th>Couleur</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>
                  {product.image_url ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
                      alt={product.name}
                      className="admin-product-img"
                    />
                  ) : (
                    <span>Pas d'image</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.brand_name}</td>
                <td>€ {Math.floor(product.price)}</td>
                <td>{product.color}</td>
                <td>{product.total_stock ?? "N/A"}</td>
                <td className="admin-actions">
                  <button
                    type="button"
                    className="admin-btn-edit"
                    onClick={() => handleEditClick(product)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="admin-btn-delete"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal pour AJOUTER un produit */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nouveau produit"
      >
        <FormulaireProduct
          onSuccess={handleAddSuccess}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Modal pour ÉDITER un produit (ton code existant) */}
      {editingProduct && (
        <>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: overlay click to close */}
          <div
            className="admin-modal-overlay"
            onClick={() => setEditingProduct(null)}
          />
          <dialog className="admin-modal" open>
            <h2>Modifier le produit</h2>

            <label>
              Nom
              <input
                type="text"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </label>

            <label>
              Description
              <textarea
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />
            </label>

            <label>
              Prix (€)
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm({ ...editForm, price: Number(e.target.value) })
                }
              />
            </label>

            <label>
              Couleur
              <input
                type="text"
                value={editForm.color}
                onChange={(e) =>
                  setEditForm({ ...editForm, color: e.target.value })
                }
              />
            </label>

            <div className="admin-modal-buttons">
              <button
                type="button"
                className="admin-btn-cancel"
                onClick={() => setEditingProduct(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="admin-btn-save"
                onClick={handleSaveEdit}
              >
                Enregistrer
              </button>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
}
