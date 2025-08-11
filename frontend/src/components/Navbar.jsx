import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold hover:text-yellow-400">
          MyBlog
        </Link>

        {/* Links */}
        <div className="flex gap-4">
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
          {token && (
            <Link to="/dashboard" className="hover:text-yellow-400">
              Dashboard
            </Link>
          )}
          {!token ? (
            <>
              <Link to="/login" className="hover:text-yellow-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-yellow-400">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
