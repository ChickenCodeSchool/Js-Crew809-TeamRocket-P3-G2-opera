import { useParams } from "react-router-dom";
import HeaderCategorie from "../../components/HeaderCategorie/headerCategorie";
import CategorieProduct from "../../components/categorieProduct/CategorieProduct";

function BrandCategory() {
  const { id } = useParams();
  const brandId = Number(id);
  return (
    <div>
      <HeaderCategorie brandId={brandId} />
      <CategorieProduct brandId={brandId} categoryId={brandId} name="" />
    </div>
  );
}

export default BrandCategory;
