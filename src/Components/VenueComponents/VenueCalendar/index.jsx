import Calendar from 'react-calendar';

function VenueCalendar({ bookedDates }) {
  const isDateBooked = (date) => {
    return bookedDates.some(
      (booking) =>
        date >= booking.start && date <= booking.end
    );
  };

  const tileDisabled = ({ date }) => {
    return isDateBooked(date);
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4">Available Dates</h2>
      <Calendar tileDisabled={tileDisabled} />
    </div>
  );
}

export default VenueCalendar;
