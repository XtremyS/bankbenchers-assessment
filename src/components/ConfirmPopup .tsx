// ConfirmPopup.js
import React from "react";
interface ConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg w-full h-full max-h-[150px] max-w-[500px]">
        <div className="flex justify-between items-center">
          <h2>Are you sure you want to delete?</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <img
              src="/close.png"
              alt="close icon"
              className="w-6 h-6 rounded-full"
            />
          </button>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className=" border border-gray-400 rounded-lg px-8 py-2  mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#ff3939] text-white rounded-lg px-8 py-2 "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
