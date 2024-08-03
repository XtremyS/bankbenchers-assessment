import React, { useState } from "react";
import { User } from "../utils/types";
import ConfirmPopup from "../components/ConfirmPopup ";

interface UserCardProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    onEdit(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsPopupOpen(true);
  };

  return (
    <React.Fragment>
      <ConfirmPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => onDelete(user.id)}
      />
      <div className="border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              {isEditing ? (
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 mb-2 w-full"
                  />
                  <input
                    type="text"
                    name="username"
                    value={editedUser.username}
                    onChange={handleInputChange}
                    className="border rounded-lg p-2 mb-2 w-full"
                  />
                </div>
              ) : (
                <h2 className="text-lg font-semibold">
                  {user.name} ({user.username})
                </h2>
              )}
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`text-xl cursor-pointer`}
            disabled={isEditing}
          >
            <img
              src="/down-chevron.png"
              alt={user.name}
              className={`w-6 h-6 rounded-full mr-4 ${
                isOpen ? "rotate-180" : ""
              } `}
            />
          </button>
        </div>

        {isOpen && (
          <div className="mt-4">
            {!isEditing ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-gray-400">Email</h2>
                    <p>{user.email}</p>
                  </div>
                  <div>
                    <h2 className="text-gray-400">Phone</h2>
                    <p className="capitalize">{user.phone}</p>
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4">
                  <div onClick={() => setIsEditing(true)}>
                    <img
                      src="/pencil.png"
                      className="w-5 h-5 cursor-pointer"
                      alt={user.name}
                    />
                  </div>
                  <div onClick={handleDelete}>
                    <img
                      src="/delete.png"
                      className="w-5 h-5 cursor-pointer"
                      alt={user.name}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h2 className="text-gray-400">Email</h2>
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      className="border rounded-lg p-2 mb-2 w-full"
                    />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-gray-400">Phone</h2>
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      className="border rounded-lg p-2 mb-2 w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4">
                  <div onClick={handleCancel}>
                    <img
                      src="/cross.png"
                      className="w-6 h-6 cursor-pointer"
                      alt={user.name}
                    />
                  </div>
                  <div onClick={handleSave}>
                    <img
                      src="/check.png"
                      className="w-6 h-6 cursor-pointer"
                      alt={user.name}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserCard;
