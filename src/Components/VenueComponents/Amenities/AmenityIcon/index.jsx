export default function AmenityIcon({ available, name }) {
  return (
    <span
      className={`inline-flex items-center py-1 px-2 rounded-full text-xs ${
        available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}
    >
      {available ? '✔' : '❌'} {name}
    </span>
  );
}
