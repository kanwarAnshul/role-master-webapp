import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaEdit, FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [role, setRole] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/api/v4/user/get-all-users', {
          withCredentials: true,
        })
        setUsers(response.data.users)
      } catch (error) {
        console.error('Failed to fetch users:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleAddUser = async () => {
    if (!username || !email || !role) {
      alert('Please fill in all fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.')
      return
    }
    try {
      const { data } = await axios.post(
        '/api/v4/user/add-user',
        { username, email, role },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      console.log('User added:', data)
      setUsername('')
      setEmail('')
      setRole('')
      setIsDialogOpen(false)
      setUsers((prevUsers) => [...prevUsers, data.user])
    } catch (error) {
      console.error(
        `Error adding the user: ${error.response?.status} - ${error.response?.data?.message || error.message}`,
      )
    }
  }

  const handleEditUser = async () => {
    if (!username || !email || !role) {
      alert('Please fill in all fields.')
      return
    }
    try {
      const { data } = await axios.post(
        `/api/v4/user/edit-user/${editingUser._id}`,
        { username, email, role,status },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      console.log('User updated:', data)
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editingUser._id ? { ...user, username, email, role,status } : user)),
      )
      setUsername('')
      setEmail('')
      setRole('')
      setEditingUser(null)
      setIsDialogOpen(false)
    } catch (error) {
      console.error(
        `Error updating user: ${error.response?.status} - ${error.response?.data?.message || error.message}`,
      )
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      await axios.post(`/api/v4/user/delete-user/${userId}`, {
        withCredentials: true,
      })
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
      console.log(`User with ID ${userId} deleted successfully`)
    } catch (error) {
      console.error(
        `Error deleting user: ${error.response?.status} - ${error.response?.data?.message || error.message},`,
      )
      alert('Failed to delete user. Please try again.')
    }
  }

  const openEditDialog = (user) => {
    setUsername(user.username)
    setEmail(user.email)
    setRole(user.role)
    setEditingUser(user)
    setIsDialogOpen(true)
  }

  const handleInputChange = (setter) => (e) => setter(e.target.value)
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <header className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-3xl font-bold text-blue-600">RBAC Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setEditingUser(null)
                setUsername('')
                setEmail('')
                setRole('')
                setIsDialogOpen(true)
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
            >
              <FaPlusCircle size={20} />
              Add User
            </button>
          </div>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-6">User Management</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-100 text-blue-700">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center p-3">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-blue-50 transition">
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.status? "Active":"Inactive"}</td>
                      <td className="p-3">{user.role}</td>
                      <td className="p-3 flex gap-3">
                        <button
                          onClick={() => openEditDialog(user)}
                          className="text-blue-500 hover:scale-110 transform transition"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-500 hover:scale-110 transform transition"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {isDialogOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-xl font-semibold mb-4">
        {editingUser ? 'Edit User' : 'Add User'}
      </h2>
      <form>
        <div className="mb-4">
          <label className="block font-medium mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={handleInputChange(setUsername)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleInputChange(setEmail)}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Role</label>
          <select
            value={role}
            onChange={handleInputChange(setRole)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Status</label>
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status}
                onChange={() => setStatus((prevStatus) => !prevStatus)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-5 peer-checked:after:bg-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-gray-500 after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
            <span className="text-sm font-medium">
              {status ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setIsDialogOpen(false);
              setEditingUser(null);
            }}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={editingUser ? handleEditUser : handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            {editingUser ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </>
  )
}
export default Dashboard
