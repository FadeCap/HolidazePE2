import { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";

function BookingForm({ venueId, maxGuests, bookedDates }) {
  const [dates, setDates] = useState(null); // Dates from calendar
  const [guests, setGuests] = useState(1); // Number of guests
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle calendar date selection
  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);
  };

  // Handle guest input change
  const handleGuestsChange = (e) => {
    setGuests(e.target.value);
  };

  // Handle the booking submission
  const handleBooking = async () => {
    if (!dates || guests < 1) {
      alert("Please select valid dates and number of guests.");
      return;
    }

    const [dateFrom, dateTo] = dates; // Start and end date from calendar selection
    const bookingData = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests: parseInt(guests),
      venueId,
    };

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "https://v2.api.noroff.dev/holidaze/bookings",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      console.log(response.data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Error while booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form mt-6">
      {/* Calendar */}
      <Calendar
        selectRange={true}
        onChange={handleDateChange}
        tileDisabled={({ date }) =>
          bookedDates.some(
            (booking) => date >= booking.start && date <= booking.end
          )
        }
      />

      {/* Guests input */}
      <div className="mt-4">
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Number of Guests
        </label>
        <input
          type="number"
          id="guests"
          value={guests}
          onChange={handleGuestsChange}
          className="mt-1 p-2 border rounded-md w-full"
          min={1}
          max={maxGuests} // Ensure maxGuests is passed correctly
        />
      </div>

      {/* Book Now Button */}
      <div className="flex justify-center p-4">
        <button
          onClick={handleBooking}
          disabled={isSubmitting}
          className={`mt-4 bg-blue-600 text-white py-2 px-4 rounded ${
            isSubmitting ? "opacity-50" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Booking..." : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default BookingForm;
