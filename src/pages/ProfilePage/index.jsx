// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import ProfileModal from "../../Components/ProfileModal";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleUpdate = async (updatedData) => {
    const accessToken = localStorage.getItem('accessToken');
  
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
      <h1 className="text-2xl font-bold truncate max-w-[70%]"> {/* Add truncate and max-width */}
        {user.name}
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Profile Settings
      </button>
    </div>
  
    <p className="text-gray-600 m-4 pl-4 pb-4">{user.bio}</p>
  
    <ProfileModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      userData={user}
      onUpdate={handleUpdate}
    />
  </div>
  
  );
}

export default ProfilePage;
