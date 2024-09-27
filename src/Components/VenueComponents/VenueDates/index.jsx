function VenueDates({ created, updated }) {
  return (
    <div className="mt-4 text-gray-400">
      <p>Created on: {new Date(created).toLocaleDateString()}</p>
      <p>Last updated: {new Date(updated).toLocaleDateString()}</p>
    </div>
  );
}

export default VenueDates;
