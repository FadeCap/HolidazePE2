// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import ProfileModal from "../../Components/ProfileModal";
import UserBookings from "../../Components/UserBookings";
import axios from "axios";
import LogoutButton from "../../Components/LogoutButton";

const apiKey = import.meta.env.VITE_API_KEY;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

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
    navigate("/venue-manager"); // Navigate to the VenueManagerPage
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-0 border shadow-lg border-gray-300 rounded-lg mt-8">
      <div className="relative overflow-hidden">
        <div
          className="bg-cover bg-center h-64 rounded-t-lg"
          style={{ backgroundImage: `url(${user.banner.url})` }}
        />
        <img
          src={user.avatar.url}
          alt={user.avatar.alt}
          className="w-24 h-24 rounded-full border-4 border-white absolute bottom-2 left-2"
        />
      </div>

      <div className="flex justify-between items-center ml-4 mt-4 p-4">
        <h1 className="text-2xl font-bold truncate max-w-[70%]">{user.name}</h1>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-600 text-white py-2 px-4 rounded mr-2"
          >
            Settings
          </button>
          {user.venueManager && (
            <button
              onClick={handleManageVenues}
              className="bg-green-500 text-white py-2 px-4 rounded mb-4"
            >
              Manage Your Venues
            </button>
          )}
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>

      <p className="text-gray-600 m-4 pl-4 pb-4">{user.bio}</p>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={user}
        onUpdate={handleUpdate}
      />

      <div className="flex p-4">
        <div className="w-1/3">
          <UserBookings username={user.name} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
