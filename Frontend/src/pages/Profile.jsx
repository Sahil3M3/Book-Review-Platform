import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setFormData({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setMessage('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessage('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile.');
    }

    setUpdating(false);
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 space-y-4"
      >
        <div>
          <label className="block font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            disabled={!editing}
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-gray-50 disabled:opacity-70"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            disabled={!editing}
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 bg-gray-50 disabled:opacity-70"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          {editing ? (
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Edit
            </button>
          )}
        </div>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes('success')
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Profile;
