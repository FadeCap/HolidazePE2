export default function StarRating({ rating, maxRating }) {
    const stars = [];
    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span key={i} className={`text-yellow-400 text-2xl`}> {/* Adjust the size here */}
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return <div className="flex">{stars}</div>;
  }
  