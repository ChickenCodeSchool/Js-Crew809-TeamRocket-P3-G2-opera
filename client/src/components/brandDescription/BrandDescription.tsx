import { useEffect, useState } from "react";
import "./BrandDescription.css";

type BrandData = {
  brand_id: number;
  name: string;
  description: string;
  url: string;
};

type Props = {
  brandId: number;
};

function BrandDescription({ brandId }: Props) {
  const [brand, setBrand] = useState<BrandData | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/brands/${brandId}`)
      .then((res) => res.json())
      .then((data) => setBrand(data));
  }, [brandId]);

  if (!brand) return null;

  return (
    <section className="brand-desc-section">
      <div className="brand-desc-container">
        <p className="brand-text">{brand.description}</p>
      </div>
    </section>
  );
}

export default BrandDescription;
