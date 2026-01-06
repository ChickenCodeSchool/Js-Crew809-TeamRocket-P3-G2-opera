import "./BookmarkCard.css";

type BookmarkCardProps = {
  image: string;
  categoryName: string;
};

export default function BookmarkCard({ image, categoryName }: BookmarkCardProps) {
  return (
    <div className="bookmark-card">
      <img src={image} alt={categoryName} className="bookmark-card-image" />
      <h3 className="bookmark-card-title">{categoryName}</h3>
    </div>
  );
}
