export default function StarRating({ rating, maxRating }) {
  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span key={i} className={`text-yellow-500 text-2xl mr-1 font-bold`}>
        {" "}
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
}
