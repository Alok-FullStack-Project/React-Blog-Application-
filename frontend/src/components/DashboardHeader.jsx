// ----------------- DashboardHeader.js -----------------
import { Link } from 'react-router-dom';

const DashboardHeader = ({ heading, linkURL = null, linkTitle = null }) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-3xl font-bold mb-6 text-center">{heading}</h1>
    {linkTitle && (
      <Link
        to={linkURL}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
      >
        {linkTitle}
      </Link>
    )}
  </div>
);

export default DashboardHeader;
