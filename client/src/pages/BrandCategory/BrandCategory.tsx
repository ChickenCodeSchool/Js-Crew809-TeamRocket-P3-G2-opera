import { useParams } from "react-router-dom";
import HeaderCategorie from "../../components/HeaderCategorie/headerCategorie";
import CategorieProduct from "../../components/categorieProduct/CategorieProduct";

function BrandCategory() {
  const { brandId, categoryId } = useParams<{
    brandId: string;
    categoryId: string;
  }>();

  return (
    <div>
      <HeaderCategorie brandId={Number(brandId)} />
      <CategorieProduct
        brandId={Number(brandId)}
        categoryId={Number(categoryId)}
        name=""
      />
    </div>
  );
}

export default BrandCategory;
