import "./FormulaireProduct.css";
import { useEffect, useState } from "react";

type NewProductData = {
  name: string;
  description: string;
  brand_id: number;
  price: number;
  color: string;
  gender: string;
  category_id: number;
};

type Brand = {
  brand_id: number;
  name: string;
};

type ImagePreview = {
  id: string;
  file: File;
  preview: string;
  isMain: boolean;
};

type Category = {
  categorie_id: number;
  name: string;
};

export default function FormulaireProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<NewProductData>({
    name: "",
    description: "",
    brand_id: 0,
    price: 0,
    color: "",
    gender: "",
    category_id: 0,
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Charger les marques au montage du composant
  useEffect(() => {
    const fetchBrands = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${API_URL}/brands`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: Brand[] = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Erreur lors du chargement des marques:", error);
      }
    };
    fetchBrands();
  }, []);

  // Nettoyer les previews quand le composant se démonte
  useEffect(() => {
    return () => {
      for (const img of images) {
        URL.revokeObjectURL(img.preview);
      }
    };
  }, [images]);

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages: ImagePreview[] = files.map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      isMain: images.length === 0 && index === 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const setMainImage = (index: number) => {
    setImages((prev) =>
      prev.map((img, i) => ({
        ...img,
        isMain: i === index,
      })),
    );
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // Si on supprime l'image principale et qu'il reste des images
      if (prev[index].isMain && newImages.length > 0) {
        newImages[0].isMain = true;
      }
      // Libérer la mémoire
      URL.revokeObjectURL(prev[index].preview);
      return newImages;
    });
  };

  const uploadImages = async (productId: number): Promise<void> => {
    const formDataImages = new FormData();

    for (const img of images) {
      formDataImages.append("images", img.file);
      formDataImages.append("isMain", img.isMain ? "1" : "0");
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/products/${productId}/images`,
      {
        method: "POST",
        body: formDataImages,
      },
    );

    if (!response.ok) {
      throw new Error("Erreur lors de l'upload des images");
    }
  };

  //On recherche les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      const API_URL = import.meta.env.VITE_API_URL;

      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (!response.ok) throw new Error("Erreur catégories");

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      // 1️⃣ créer le produit
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          brand_id: Number(formData.brand_id),
          price: Number(formData.price),
          category_id: Number(formData.category_id),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du produit");
      }

      // ⚠️ RÉCUPÉRER L'ID DU PRODUIT
      const data: { product_id: number } = await response.json();

      // 2️⃣ uploader les images
      if (images.length > 0) {
        await uploadImages(data.product_id);
      }

      alert("Produit + images créés 🎉");

      // reset
      setFormData({
        name: "",
        description: "",
        brand_id: 0,
        price: 0,
        color: "",
        gender: "",
        category_id: 0,
      });

      for (const img of images) {
        URL.revokeObjectURL(img.preview);
      }
      setImages([]);

      // Reset input file
      const fileInput = document.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      brand_id: 0,
      price: 0,
      color: "",
      gender: "",
      category_id: 0,
    });
    for (const img of images) {
      URL.revokeObjectURL(img.preview);
    }

    setImages([]);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {/* Nom du produit */}
      <div className="product-form__field">
        <label htmlFor="name" className="product-form__label">
          Nom du produit
        </label>
        <input
          className="product-form__input"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          placeholder="Ex: Le 37 Bea En Suede"
        />
      </div>

      {/* Description */}
      <div className="product-form__field">
        <label htmlFor="description" className="product-form__label">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          rows={3}
          className="product-form__textarea"
          placeholder="Description du produit..."
        />
      </div>

      {/* Marque et Prix */}
      <div className="product-form__row">
        <div className="product-form__field">
          <label htmlFor="brand_id" className="product-form__label">
            Marque
          </label>
          <select
            name="brand_id"
            value={formData.brand_id}
            onChange={onChange}
            required
            className="product-form__select"
          >
            <option value="">Sélectionnez une marque</option>
            {brands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="product-form__field">
          <label htmlFor="category_id" className="product-form__label">
            Catégorie
          </label>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={onChange}
            required
            className="product-form__select"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category.categorie_id} value={category.categorie_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="product-form__field">
          <label htmlFor="price" className="product-form__label">
            Prix (€)
          </label>
          <input
            className="product-form__input"
            type="number"
            name="price"
            value={formData.price}
            onChange={onChange}
            required
            step="0.01"
            min="0"
            placeholder="3200.00"
          />
        </div>
      </div>

      {/* Couleur et Genre */}
      <div className="product-form__row">
        <div className="product-form__field">
          <label htmlFor="color" className="product-form__label">
            Couleur
          </label>
          <input
            className="product-form__input"
            type="text"
            name="color"
            value={formData.color}
            onChange={onChange}
            placeholder="Marron, Noir, Rouge..."
          />
        </div>

        <div className="product-form__field">
          <label htmlFor="gender" className="product-form__label">
            Genre
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="product-form__select"
          >
            <option value="">Sélectionnez</option>
            <option value="unisex">Unisexe</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>
        </div>
      </div>

      {/* Upload images */}
      <div className="product-form__field">
        <label htmlFor="images" className="product-form__label">
          Images ({images.length} sélectionnée{images.length > 1 ? "s" : ""})
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageSelect}
          className="product-form__file-input"
        />
      </div>

      {/* Preview des images */}
      {images.length > 0 && (
        <div className="product-form__images-preview">
          <p className="product-form__images-hint">
            Cliquez sur une image pour la définir comme principale
          </p>
          <div className="product-form__images-grid">
            {images.map((img, index) => (
              <button
                type="button"
                key={img.id}
                className={`product-form__image-item ${
                  img.isMain ? "product-form__image-item--main" : ""
                }`}
                onClick={() => setMainImage(index)}
                aria-pressed={img.isMain}
                aria-label={`Définir l’image ${index + 1} comme principale`}
              >
                <img
                  src={img.preview}
                  alt={`Preview ${index + 1}`}
                  className="product-form__image-preview"
                />

                {/* Badge principale */}
                {img.isMain && (
                  <div className="product-form__main-badge">★ Principale</div>
                )}

                {/* Bouton supprimer */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="product-form__remove-btn"
                  aria-label="Supprimer l'image"
                >
                  ×
                </button>

                {/* Overlay hover */}
                {!img.isMain && (
                  <div className="product-form__image-overlay">
                    <span>Définir comme principale</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Boutons */}
      <div className="product-form__actions">
        <button
          type="button"
          className="product-form__button product-form__button--cancel"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="product-form__button product-form__button--submit"
          disabled={isLoading}
        >
          {isLoading ? "Publication..." : "Publier"}
        </button>
      </div>
    </form>
  );
}
