import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../../Components/ProfileModal";
import UserBookings from "../../Components/UserBookings";
import axios from "axios";
import LogoutButton from "../../Components/LogoutButton";

const apiKey = import.meta.env.VITE_API_KEY;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
    } else {
      // Redirect to login if no user is found
      navigate("/auth");
    }
  }, [navigate]);

  const handleUpdate = async (updatedData) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      alert("You need to log in again.");
      return;
    }

    try {
      const response = await axios.put(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
          },
        }
      );

      const updatedUserData = response.data.data;
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      setUser(updatedUserData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleManageVenues = () => {
    navigate("/venue-manager");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-0 border shadow-lg border-gray-300 rounded-lg mt-8">
      <div className="relative overflow-hidden">
        <div
          className="bg-cover bg-center h-64 rounded-t-lg"
          style={{
            backgroundImage: `url(${
              user.banner?.url || "/default-banner.jpg"
            })`, // Fallback banner
          }}
        />
        <img
          src={user.avatar?.url || "/default-avatar.jpg"} // Fallback avatar
          alt={user.avatar?.alt || "User Avatar"}
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-2 left-2"
        />
      </div>

      {/* Adjust spacing and stacking on mobile */}
      <div className="flex flex-col sm:flex-row justify-between items-center ml-4 mt-4 p-4 space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-bold truncate max-w-full sm:max-w-[70%]">{user.name}</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-600 text-white py-2 px-4 rounded"
          >
            Settings
          </button>
          {user.venueManager && (
            <button
              onClick={handleManageVenues}
              className="bg-green-700 text-white py-2 px-4 rounded"
            >
              Manage Your Venues
            </button>
          )}
          <LogoutButton />
        </div>
      </div>

      <p className="text-gray-600 m-4 pl-4 pb-4">{user.bio || "No bio available"}</p>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onUpdate={handleUpdate}
      />

      {/* Make the booking section more responsive */}
      <div className="flex flex-col sm:flex-row p-4">
        <div className="w-full sm:w-1/3">
          <UserBookings username={user.name} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
