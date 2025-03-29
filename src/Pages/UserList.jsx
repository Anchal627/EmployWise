import { LogOut, SearchIcon, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllUser, deleteUser, updateUser } from "../API/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Usercard from "./Usercard";
import Pagination from "./Pagination";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const getUsers = async (page) => {
    try {
      const response = await fetchAllUser(page);
      setUsers(response.data);
      setTotalPages(response.total_pages);
    } catch (error) {
      setError("Failed to fetch the users");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };
  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        toast.error("User deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          icon: <Trash2 className="text-red-600" />,
        });
      } catch (error) {
        setError("Failed to delete user");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    setIsModalOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateUser(selectedUser.id, formData);

      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      toast.success("User updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      closeModal();
    } catch (error) {
      setError("Failed to update user");
      setUpdating(false);
      closeModal();
    } finally {
      setUpdating(false);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="h-full w-full bg-white">
      <div className="h-20 w-full border-b-2 shadow-lg flex justify-between items-center bg-gray-900">
        <h1 className="text-3xl font-bold ml-2 text-white">Users List</h1>
        <button
          className="flex items-center px-4 py-2 text-lg text-red-600 hover:text-red-800 justify-center"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </button>
      </div>
      <div className="sm:w-[700px] w-[300px]  mx-auto rounded-[40px] mt-10 relative">
        <input
          type="text"
          placeholder="Search Users by name... "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-[700px] w-[300px] rounded-[40px] p-[10px] border border-black pl-10"
        />
        <SearchIcon className="absolute top-2.5 left-3 text-gray-400" />
      </div>
      <div className="w-full border border-dashed border-t-2 border-gray-400 mt-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[370px]  overflow-y-scroll lg:overflow-hidden overflow-x-hidden mt-5">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Usercard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500 text-xl">{error}</p>
        )}
        {isModalOpen && selectedUser && (
          <form onSubmit={handleSubmit}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white sm:p-6 p-4 rounded-lg shadow-lg sm:w-96 w-72">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Edit User</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="mt-4">
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full border p-2 rounded-md"
                  />
                  <label className="block font-semibold mt-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full border p-2 rounded-md"
                  />
                  <label className="block font-semibold mt-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full border p-2 rounded-md"
                  />

                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
                    type="submit"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <ToastContainer />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default UserList;
