import { useAuth } from '../contexts/AuthContext';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
        <div className="grid gap-6">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Content Management</h2>
            {/* Add your admin controls here */}
          </div>
          
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            {/* Add your user management controls here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
