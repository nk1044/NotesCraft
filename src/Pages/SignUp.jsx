import React, { useState, useEffect } from 'react';
import { account } from '../Appwrite/AppwriteAuth.js';
import { ID } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Store/Zustand.js';

function SignUp() {
  const [User, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const setZustandUser = useUser((state) => state.SetUser); // Zustand store setter
  const zustandUser = useUser((state) => state.User); // Zustand store getter

  useEffect(() => {
    if (zustandUser?.name) {
      setUser({
        name: zustandUser.name,
        email: zustandUser.email,
        password: '' // Keep password empty for security
      });
    }
  }, [zustandUser]); // Triggered when Zustand user state changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promise = await account.create(
        ID.unique(),
        User.email,
        User.password,
        User.name
      );
      console.log('Account created:', promise);
      setZustandUser({ name: User.name, email: User.email }); // Save to Zustand store
      navigate('/'); // Navigate to homepage after signup
    } catch (error) {
      console.log('Error during sign-up:', error);
    }
  };


  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      setZustandUser({});
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      {zustandUser?.name ? (
        <div className="h-screen flex justify-center flex-col items-center">
        <div className="border-2 p-10 rounded-2xl bg-gray-200">
          <h1 className="font-bold text-2xl text-center mb-4">
            Logged In User: {zustandUser.name}
          </h1>
          <div className="flex justify-between">
            <button
              className="border border-black/10 p-2 rounded-lg bg-sky-400 text-white hover:bg-sky-500"
              onClick={() => navigate('/')}
            >
              Go to Home
            </button>
            <button
              className="border border-black/10 p-2 rounded-lg bg-red-400 text-white hover:bg-red-500"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <div className="border-2 border-black/10 mx-auto bg-gray-100 p-10 rounded-2xl w-[90%] max-w-md ">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  id="Name"
                  placeholder="Enter name"
                  className="ml-4 px-2 rounded-lg bg-gray-100 border border-black/10 py-2 sm:py-1 w-[90%] sm:w-[100%]"
                  value={User.name}
                  onChange={(e) =>
                    setUser({ ...User, name: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between mb-2">
                <input
                  type="email"
                  id="Email"
                  placeholder="Enter email"
                  className="ml-4 px-2 rounded-lg bg-gray-100 border border-black/10 py-2 sm:py-1 w-[90%] sm:w-[100%]"
                  value={User.email}
                  onChange={(e) =>
                    setUser({ ...User, email: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between mb-2">
                <input
                  type="password"
                  id="Pass"
                  placeholder="Enter password"
                  className="ml-4 px-2 rounded-lg bg-gray-100 border border-black/10 py-2 sm:py-1 w-[90%] sm:w-[100%]"
                  value={User.password}
                  onChange={(e) =>
                    setUser({ ...User, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="border border-black/10 p-2 rounded-lg w-full bg-sky-400 text-white hover:bg-sky-500"
              >
                Submit
              </button>
              <div>
                Already have an account?{' '}
                <span
                  className="text-sky-500 cursor-pointer hover:text-blue-800"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
