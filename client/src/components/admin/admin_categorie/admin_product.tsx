import { useEffect, useState } from "react";
import "./admin_product.css";

type Product = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  brand_id: string;
  brand_name: string;
  image_url: string | null;
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

  // Charger les marques et catégories au montage
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

  // Charger les produits
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
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

  return (
    <div className="admin-products">
      <h1>Gestion des Produits</h1>

      {/* Barre de recherche et filtres */}
      <div className="admin-filters">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-search"
          title="Filtrer par marque"
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
      </div>

      {/* Compteur */}
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
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>
                  {product.image_url ? (
                    <img
                      //  src={`${import.meta.env.VITE_API_URL}${product.image_url}`}
                      alt={product.name}
                      className="admin-product-img"
                    />
                  ) : (
                    <span>Pas d'image</span>
                  )}
                </td>
                <td>{product.name}</td>
                <td>{product.brand_name}</td>
                <td>{product.price} €</td>
                <td>{product.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
