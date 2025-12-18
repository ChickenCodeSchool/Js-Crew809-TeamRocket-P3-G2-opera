import { useEffect, useState } from "react";
import "./CollectionLp.css";

interface BrandPicture {
  brand_picture_id: number;
  brand_id: number;
  url: string;
  is_main: number;
  type: string;
  brand_name: string;
}

interface BrandGroup {
  id: number;
  brandName: string;
  logo: string | null;
  collectionImages: string[];
}

function CollectionLp() {
  const [brandsData, setBrandsData] = useState<BrandGroup[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/collections`)
      .then((response) => response.json())
      .then((data: BrandPicture[]) => {
        const grouped = data.reduce<Record<number, BrandGroup>>((acc, item) => {
          const { brand_id, brand_name } = item;

          if (!acc[brand_id]) {
            acc[brand_id] = {
              id: brand_id,
              brandName: brand_name,
              logo: null,
              collectionImages: [],
            };
          }

          if (item.type === "logo_black" || item.type.includes("logo")) {
            acc[brand_id].logo = item.url;
          } else if (item.type === "collection") {
            acc[brand_id].collectionImages.push(item.url);
          }
          return acc;
        }, {});

        const manualOrder: Record<string, number> = {
          cartier: 1,
          chanel: 2,
          dior: 3,
          gucci: 4,
          guerlain: 5,
          hermes: 6,
          lv: 7,
          "louis vuitton": 7,
          prada: 8,
          ysl: 9,
          "yves saint laurent": 9,
          rolex: 10,
        };

        const sortedBrands = Object.values(grouped).sort((a, b) => {
          const nameA = a.brandName.toLowerCase();
          const nameB = b.brandName.toLowerCase();

          const orderA = manualOrder[nameA];
          const orderB = manualOrder[nameB];

          if (orderA !== undefined && orderB !== undefined) {
            return orderA - orderB;
          }

          if (orderA !== undefined) return -1;
          if (orderB !== undefined) return 1;

          return nameA.localeCompare(nameB);
        });

        setBrandsData(sortedBrands);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="collection-container-collectionLp" data-nav-theme="dark">
      {brandsData.map(
        (brand) =>
          brand.collectionImages.length > 0 && (
            <div key={brand.id} className="brand-row-collectionLp">
              <div className="card-interactive-collectionLp">
                <img
                  src={`${import.meta.env.VITE_API_URL}${
                    brand.collectionImages[0]
                  }`}
                  alt={`${brand.brandName} Collection`}
                  className="card-bg-img-collectionLp"
                />

                <div className="card-overlay-hover-collectionLp">
                  <div
                    className="card-blur-bg-collectionLp"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_API_URL}${
                        brand.collectionImages[0]
                      })`,
                    }}
                  />
                  <div className="card-white-filter-collectionLp" />

                  {brand.logo && (
                    <img
                      src={`${import.meta.env.VITE_API_URL}${brand.logo}`}
                      alt={`${brand.brandName} Logo`}
                      className={`brand-logo-img-collectionLp brand-logo-${brand.brandName
                        .toLowerCase()
                        .replace(/\s+/g, "")}-collectionLp`}
                    />
                  )}
                </div>
              </div>

              {brand.collectionImages.slice(1).map((imgUrl, index) => (
                <div key={imgUrl} className="runway-card-collectionLp">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${imgUrl}`}
                    alt={`${brand.brandName} look ${index}`}
                    className="runway-img-collectionLp"
                  />
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
}

export default CollectionLp;
