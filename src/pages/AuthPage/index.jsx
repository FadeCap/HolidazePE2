import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthPage() {
  const [form, setForm] = useState({ username: '', password: '', email: '', bio: '', avatar: '', banner: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState(''); // Message to display after form submission
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Simulate login request
      console.log('Login form submitted:', form);
      setMessage('You are now logged in');
      setSubmitted(true);
      // Show the message for 3 seconds, then navigate to profile page
      setTimeout(() => {
        navigate('/profile');
      }, 3000);
    } else {
      // Simulate registration request
      console.log('Registration form submitted:', form);
      setMessage('Thank you for registering!');
      setSubmitted(true);
      // Show the message for 3 seconds, then reload the page to show login screen
      setTimeout(() => {
        window.location.href = '/auth'; // Forces a page reload
      }, 3000);
    }

    // Reset form
    setForm({ username: '', password: '', email: '', bio: '', avatar: '', banner: '' });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setSubmitted(false); // Reset the submitted state when switching between forms
  };

  if (submitted) {
    return (
      <div className="container mx-auto p-4 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email field for both login and register */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            pattern=".+@stud\.noroff\.no"
            title="Email must end with @stud.noroff.no"
          />
        </div>

        {!isLogin && (
          <>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                name="username"
                value={form.username}
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
                value={form.bio}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Avatar URL</label>
              <input
                type="text"
                name="avatar"
                value={form.avatar}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1">Banner URL</label>
              <input
                type="text"
                name="banner"
                value={form.banner}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </>
        )}

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button onClick={toggleForm} className="text-blue-500 hover:underline">
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
