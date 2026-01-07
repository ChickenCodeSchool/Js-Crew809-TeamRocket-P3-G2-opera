import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BrandDescription.css";

interface BrandData {
  Brand_id: number;
  name: string;
  description: string;
  url: string;
}

function BrandDescription() {
  const { id } = useParams();
  const [brand, setBrand] = useState<BrandData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/brands/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Marque introuvable");
        return res.json();
      })
      .then((data) => {
        const brandData = Array.isArray(data) ? data[0] : data;
        setBrand(brandData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="brand-loading">Chargement...</div>;
  if (!brand) return <div className="brand-error">Marque introuvable.</div>;

  return (
    <section className="brand-desc-section">
      {brand.url && (
        <img
          src={`${import.meta.env.VITE_API_URL}${brand.url}`}
          alt={`Logo ${brand.name}`}
          className="brand-logo"
        />
      )}
      <div className="brand-desc-container">
        <p className="brand-text">{brand.description}</p>
      </div>
    </section>
  );
}

export default BrandDescription;
