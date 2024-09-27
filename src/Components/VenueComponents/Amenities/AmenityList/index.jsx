import AmenityIcon from "../AmenityIcon";

export default function AmenitiesList({ amenities }) {
  return (
    <div className="p-4">
      <ul className="flex flex-wrap space-x-1 list-none">
        {amenities.map((amenity) => (
          <li key={amenity.name}>
            <AmenityIcon available={amenity.available} name={amenity.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
