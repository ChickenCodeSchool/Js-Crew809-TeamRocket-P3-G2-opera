import "./suggestions.css";
import { useParams } from "react-router-dom";
import BookmarkCard from "../BookmarkCard/BookmarkCard";

function Suggestions() {
  const { id } = useParams();
  const brandId = Number(id);
  return (
    <div className="suggestions-container">
      <div className="suggestions-header">
        <div className="suggestion-title">Suggestions</div>
        <div className="suggestion-subtitle">
          Produits similaires que vous pourriez aimer
        </div>
      </div>
      <div className="suggestions-component">
        <BookmarkCard brandId={brandId} />
      </div>
    </div>
  );
}

export default Suggestions;
