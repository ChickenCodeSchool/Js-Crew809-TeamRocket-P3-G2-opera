import { useParams } from "react-router-dom";
import HeaderCategorie from "../../components/HeaderCategorie/headerCategorie";

function BrandCategory() {
  const { id } = useParams();
  const brandId = Number(id);
  return (
    <div>
      <HeaderCategorie brandId={brandId} />
    </div>
  );
}

export default BrandCategory;
