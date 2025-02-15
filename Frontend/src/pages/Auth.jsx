import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate} from 'react-router-dom';
import {login, register} from '../redux/Slices/AuthSlice';
import {useDispatch, useSelector} from 'react-redux';       // usedispatch pour envoyer des actions au store et use selector pour lire les données du store
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth); // recupère les données du store
  // handle submit recupére et voir si les champs sont faites ou pas voir si les données du formulaire et les envoie au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email, password }));
    }
    // } else {
    //   // dispatch(register({ username, email, password }));
    //   setShowToast(true);
    //   setToastMessage("L'inscription est désactivée pour le moment");
    //   setToastType('info'); 
    // }
  };

useEffect(() => {
    if (isAuthenticated && !loading && !error) {
      navigate('/dashboard');
    }
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-teal-500 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-teal-500 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {isLogin ? 'Please sign in to continue' : 'Please fill in your information'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:bg-gray-700"
                placeholder="John Doe"
                required={!isLogin}
              />
            </motion.div>
          )} */}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:bg-gray-700"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 dark:bg-gray-700"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-teal-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {
              loading ? 'Loading...' : isLogin ? 'Sign in' : 'Sign up'
            
            }
          </button>
          {error && (
            <p className="text-red-500 text-sm text-center">
              {typeof error === 'string' ? error : error.message || 'Une erreur est survenue'}
            </p>
          )}
        </form>
        {/* <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-violet-500 hover:text-violet-600 dark:text-violet-400"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div> */}
      </motion.div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default Auth;
