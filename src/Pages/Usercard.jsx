import { Edit, Trash2 } from "lucide-react";

function Usercard({ user, onEdit, onDelete }) {
  return (
    <div
      key={user.id}
      className="bg-white shadow-lg rounded-xl p-6 flex items-center transform transition-all duration-300 hover:scale-105 mt-4 sm:h-[150px] h-[100px]"
    >
      {/* Large Avatar */}
      <img
        src={user.avatar}
        alt={user.first_name}
        className="sm:w-24 sm:h-24 rounded-full border-4 border-gray-400 mr-2 w-12 h-12"
      />

      {/* User Info */}
      <div className="flex-1 space-y-1">
        <h2 className="sm:text-2xl font-bold text-gray-900 text-lg">
          {user.first_name} {user.last_name}
        </h2>
        <p className="sm:text-md text-sm text-gray-600">{user.email}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col space-y-2">
        <button
          className="bg-green-500 hover:bg-green-600 text-white  font-semibold sm:px-6 sm:py-3 py-2 px-2 rounded-lg flex items-center space-x-2"
          onClick={() => onEdit(user)}
        >
          <Edit className="w-6 h-6" />
          <span>Edit</span>
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold sm:px-6 sm:py-3 px-2 py-2 rounded-lg flex items-center space-x-2"
          onClick={() => onDelete(user.id)}
        >
          <Trash2 className="w-6 h-6" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default Usercard;
