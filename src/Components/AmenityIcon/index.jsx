// src/components/AmenityIcon.jsx
export default function AmenityIcon({ available }) {
    return available ? (
      <span className="text-green-600">✔</span>
    ) : (
      <span className="text-red-600">❌</span>
    );
  }
  