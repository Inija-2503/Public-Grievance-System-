const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-9 rounded-lg shadow-xl w-full max-w-md">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
