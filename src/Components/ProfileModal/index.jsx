// src/components/ProfileModal.jsx
import React, { useState } from "react";

function ProfileModal({ isOpen, onClose, userData, onUpdate }) {
  const [bio, setBio] = useState(userData.bio);
  const [avatarUrl, setAvatarUrl] = useState(userData.avatar.url);
  const [bannerUrl, setBannerUrl] = useState(userData.banner.url);
  const [venueManager, setVenueManager] = useState(userData.venueManager);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      bio,
      avatar: { url: avatarUrl, alt: userData.avatar.alt },
      banner: { url: bannerUrl, alt: userData.banner.alt },
      venueManager,
    };
    onUpdate(updatedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Avatar URL</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Banner URL</label>
            <input
              type="text"
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={venueManager}
                onChange={() => setVenueManager(!venueManager)}
              />
              Become Venue Manager
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
        <button className="mt-4 text-red-600" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
