import React, { useState, useEffect } from 'react';
import { account} from '../Appwrite/AppwriteAuth.js';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Store/Zustand.js';

const getCurrentUser = async (SetUser) => {
  try {
    const user = await account.get();
    SetUser({ name: user.name, email: user.email });
    return user;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    SetUser({});
    return null;
  }
};

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const navigate = useNavigate();
  const [User, setUser] = useState({
    email: '',
    password: '',
  });
  const [LoginError, setLoginError] = useState(false);

  const SetUser = useUser((state) => state.SetUser);
  const ZustandUser = useUser((state) => state.User);

  useEffect(() => {
    SetUser({});
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser(SetUser);
      if (user) {
        setLoggedInUser({ name: user.name, email: user.email });
      }
    };
    fetchCurrentUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(User.email, User.password);
      const currentUser = await account.get();
      setLoggedInUser({ name: currentUser.name, email: currentUser.email });
      SetUser({ name: currentUser.name, email: currentUser.email });
      navigate('/');
    } catch (error) {
      console.error('Failed to log in:', error);
      setLoginError(true);
    }
  };


  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      setLoggedInUser({});
      SetUser({});
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <>
      {loggedInUser.name? (
        <div className="h-screen flex justify-center flex-col items-center">
          <div className="border-2 p-10 rounded-2xl bg-gray-200">
            <h1 className="font-bold text-2xl text-center mb-4">
              Logged In User: {loggedInUser.name}
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
          <div className="border border-black/10 bg-gray-100 rounded-2xl p-8 w-[90%] max-w-md">
            {LoginError?(
              <h2 className="font-bold text-2xl text-center mb-4">Invalid Credentials</h2>):(
              <h2 className="font-bold text-2xl text-center mb-4">Login 1</h2>)}
            
            <form
              action="#"
              method="post"
              className="grid grid-cols-1 gap-4"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between mb-2 ">
                <input
                  type="text"
                  id="Email"
                  placeholder="Enter email"
                  className="ml-4 px-2 rounded-lg bg-gray-100 border py-2 sm:py-1 border-black/10 w-[90%] sm:w-[100%]"
                  onChange={(e) =>
                    setUser({
                      ...User,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-between mb-2">
                <input
                  type="password"
                  id="Pass"
                  placeholder="Enter password"
                  className="ml-4 px-2 rounded-lg bg-gray-100 border py-2 sm:py-1 border-black/10 w-[90%] sm:w-full"
                  onChange={(e) =>
                    setUser({
                      ...User,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="border border-black/10 p-1 sm:p-2 rounded-lg w-full bg-sky-400 text-white hover:bg-sky-500"
              >
                Submit
              </button>
              <div>
                Don't have an account?{' '}
                <span
                  className="text-sky-500 cursor-pointer hover:text-blue-800"
                  onClick={() => navigate('/signup')}
                >
                  SignUp
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
