import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import { User, TypeMessage } from "./utils/types";
import apiService from "./services/apiService";
import AddUser from "./components/AddUser";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<TypeMessage>({
    type: null,
    message: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const fetchUsers = async () => {
    try {
      const result = await apiService.getUsers();
      setUsers(result);
      setLoadingData(false);
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.message,
      });
    }
  };

  // console.log(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async (
    name: string,
    username: string,
    email: string,
    phone: string
  ) => {
    try {
      const newUser = await apiService.createUser({
        name,
        username,
        email,
        phone,
      });
      setUsers([...users, newUser]);
      setMessage({
        type: "success",
        message: "User created successfully!",
      });
    } catch (err: any) {
      setMessage({
        type: "error",
        message: err.message,
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-5">
      <h1 className="text-2xl text-center font-bold mb-4">
        BankBenchers Assessment
      </h1>
      {message?.type && (
        <p
          className={`text-center ${
            message?.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message?.message}
        </p>
      )}
      {/* SEARCH BAR COMPONENT */}
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* ADD USER COMPONENT */}
      <AddUser handleCreateUser={handleCreateUser} />

      {/*  USER COMPONENT */}
      {loadingData ? (
        <div className="flex h-[400px] justify-center items-center">
          <img src="/loading.png" className="w-24 h-24" alt="loading" />
        </div>
      ) : (
        <UserList
          users={filteredUsers}
          setUsers={setUsers}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default App;
