import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Redirect after login/register

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = isLogin
      ? "https://v2.api.noroff.dev/auth/login?_holidaze=true"
      : "https://v2.api.noroff.dev/auth/register";
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (isLogin && data.data?.accessToken) {
          // Store accessToken in local storage
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.data));
  
          // Show success message and redirect to profile
          setMessage("You are now logged in");
          setTimeout(() => {
            navigate("/profile");
          }, 2000);
        } else if (!isLogin) {
          // Registration was successful
          setMessage("Thank you for registering!");
          
          // Switch to login mode after registration
          setTimeout(() => {
            toggleAuthMode(); // Switch to login mode
          }, 2000);
        }
      } else {
        // Handle error
        setMessage(
          isLogin
            ? "Login failed. Please try again."
            : "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  // Toggle between login and register
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setForm({ email: "", password: "" }); // Reset form on toggle
    setMessage(""); // Clear message
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Add more fields if registering */}
        {!isLogin && (
          <>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Bio</label>
              <input
                type="text"
                name="bio"
                value={form.bio || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {/* Toggle button */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={toggleAuthMode}
          className="text-blue-500 hover:underline"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
