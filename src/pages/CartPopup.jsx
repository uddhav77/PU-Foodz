import React from "react";

const CartPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center text-3xl text-black justify-center z-50">
      <div className="bg-white p-32 rounded-lg shadow-2xl">
        <h2 className="text-4xl font-bold mb-2">Food Added to Cart!</h2>
        <p className="text-3xl">Enjoy your delicious meal!</p>
        <button
          className="mt-4 p-4 px-4 bg-red-500 text-white rounded-lg shadow-2xl hover:bg-red-600 transition-colors"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
