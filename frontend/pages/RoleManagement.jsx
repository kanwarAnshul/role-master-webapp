import { useState } from "react";

const RoleManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    id: null,
    name: "",
    permissions: [],
  });

  const permissionsList = ["Read", "Write", "Delete"];

  const handleOpenDialog = (role = { id: null, name: "", permissions: [] }) => {
    setCurrentRole(role);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentRole({ id: null, name: "", permissions: [] });
  };

  const handleSaveRole = () => {
    if (currentRole.id) {
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role.id === currentRole.id ? currentRole : role
        )
      );
    } else {
      setRoles((prevRoles) => [
        ...prevRoles,
        { ...currentRole, id: Date.now() },
      ]);
    }
    handleCloseDialog();
  };

  const handleDeleteRole = (id) => {
    setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = currentRole.permissions.includes(permission)
      ? currentRole.permissions.filter((perm) => perm !== permission)
      : [...currentRole.permissions, permission];

    setCurrentRole((prevRole) => ({
      ...prevRole,
      permissions: updatedPermissions,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Role Management</h1>

      <button
        onClick={() => handleOpenDialog()}
        className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add New Role
      </button>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 font-semibold text-sm text-gray-700">Role Name</th>
              <th className="px-4 py-2 font-semibold text-sm text-gray-700">Permissions</th>
              <th className="px-4 py-2 font-semibold text-sm text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-2 text-gray-800">{role.name}</td>
                <td className="px-4 py-2 text-gray-600">{role.permissions.join(", ")}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleOpenDialog(role)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteRole(role.id)}
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

      {openDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">{currentRole.id ? "Edit Role" : "Add Role"}</h2>

            <div className="mb-4">
              <label htmlFor="roleName" className="block text-gray-700 mb-2">Role Name</label>
              <input
                id="roleName"
                type="text"
                value={currentRole.name}
                onChange={(e) =>
                  setCurrentRole((prevRole) => ({
                    ...prevRole,
                    name: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <p className="font-semibold text-gray-700">Assign Permissions:</p>
              {permissionsList.map((permission) => (
                <div key={permission} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={currentRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="mr-2"
                  />
                  <label className="text-gray-600">{permission}</label>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseDialog}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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

export default RoleManagement;
