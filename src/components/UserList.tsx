import React, { useState } from "react";
import UserCard from "./UserCard";
import { User, TypeMessage } from "../utils/types";
import apiService from "../services/apiService";

interface UserListProps {
  users: User[];
  setUsers: (users: User[]) => void;
  setMessage: (object: TypeMessage) => void;
}

const UserList: React.FC<UserListProps> = ({ users, setUsers, setMessage }) => {
  const [openUserId, setOpenUserId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenUserId(openUserId === id ? null : id);
  };

  const handleEdit = async (updatedUser: User) => {
    try {
      const { id, ...data } = updatedUser;
      const updatedUserResult = await apiService.updateUser(
        updatedUser.id,
        data
      );
      setUsers(
        users.map((user) =>
          user.id === updatedUser.id ? updatedUserResult : user
        )
      );
      setMessage({
        type: "success",
        message: "User updated successfully",
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.message,
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await apiService.deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      setMessage({
        type: "success",
        message: "User deleted successfully",
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.message,
      });
    }
  };

  return (
    <div>
      {users.length === 0 ? (
        <div className="flex justify-center h-72 items-center">
          <p className="italic">No User Found!</p>
        </div>
      ) : (
        <React.Fragment>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isOpen={user.id === openUserId}
              onToggle={() => handleToggle(user.id)}
              onEdit={handleEdit}
              onDelete={handleDeleteUser}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserList;
