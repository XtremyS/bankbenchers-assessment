import React from "react";

interface AddUserProps {
  handleCreateUser: (
    name: string,
    username: string,
    email: string,
    phone: string
  ) => void;
}

const AddUser: React.FC<AddUserProps> = ({ handleCreateUser }) => {
  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    handleCreateUser(
      event.target.name.value,
      event.target.username.value,
      event.target.email.value,
      event.target.phone.value
    );
    event.target.name.value = "";
    event.target.username.value = "";
    event.target.email.value = "";
    event.target.phone.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <h3 className="text-center text-xl font-bold mb-5">Add User</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          className="border rounded-lg p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          className="border rounded-lg p-2 mb-2 w-full"
          required
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          className="border rounded-lg p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Enter Phone"
          name="phone"
          className="border rounded-lg p-2 mb-2 w-full"
          required
        />
      </div>
      <div>
        <button
          onSubmit={handleOnSubmit}
          className="bg-[#ff3939] text-white rounded-lg px-8 py-2 "
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddUser;
