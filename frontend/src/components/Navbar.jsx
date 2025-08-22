import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Reusable link style with animated underline
  const linkClass = (path) =>
    `relative px-3 py-2 font-medium transition duration-300 
     ${location.pathname === path ? 'text-yellow-300' : 'hover:text-yellow-300'}
     after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:bottom-0 
     after:bg-yellow-400 after:transition-all after:duration-300 
     hover:after:w-full`;

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white hover:text-yellow-300 transition"
        >
          MyBlog
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className={linkClass('/')}>
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
            </Link>
          )}
          {user && (
            <Link to="/categories" className={linkClass('/categories')}>
              Categories
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" className={linkClass('/login')}>
                Login
              </Link>
              <Link to="/register" className={linkClass('/register')}>
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Welcome message badge */}
              <span className="px-4 py-1 rounded-full bg-white/20 text-white font-semibold shadow-md backdrop-blur-sm">
                👋 Welcome, {user?.name || 'Guest'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-5 py-2 rounded-lg font-semibold text-white 
                           shadow-md hover:shadow-red-400/50 hover:bg-red-600 
                           transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
