 // Make a PUT request to the API
 const response = await axios.put(
    `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
    updatedUser,
    {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    }

     // Update the local storage and state with the new user data
     const updatedUserData = response.data.data;
     localStorage.setItem("user", JSON.stringify(updatedUserData));
     setUser(updatedUserData);
     alert("Profile updated successfully!");