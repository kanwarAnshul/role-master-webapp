import { useState } from 'react';

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'Read' },
    { id: 2, name: 'Write' },
    { id: 3, name: 'Delete' },
  ]);
  const [currentPermission, setCurrentPermission] = useState({ id: null, name: '' });
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (permission = { id: null, name: '' }) => {
    setCurrentPermission(permission);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentPermission({ id: null, name: '' });
  };

  const handleSavePermission = () => {
    if (currentPermission.id) {
      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission.id === currentPermission.id ? currentPermission : permission
        )
      );
    } else {
      setPermissions((prevPermissions) => [
        ...prevPermissions,
        { ...currentPermission, id: Date.now() },
      ]);
    }
    handleCloseDialog();
  };

  const handleDeletePermission = (id) => {
    setPermissions((prevPermissions) => prevPermissions.filter((permission) => permission.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Permission Management</h1>

      <button
        onClick={() => handleOpenDialog()}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
      >
        Add New Permission
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Permission Name</th>
              <th className="px-4 py-2 text-left border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id}>
                <td className="px-4 py-2 border-b">{permission.name}</td>
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleOpenDialog(permission)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePermission(permission.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission Dialog */}
      {openDialog && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">{currentPermission.id ? 'Edit Permission' : 'Add Permission'}</h2>
            <input
              type="text"
              value={currentPermission.name}
              onChange={(e) =>
                setCurrentPermission((prevPermission) => ({
                  ...prevPermission,
                  name: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Permission Name"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermission}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManagement;
