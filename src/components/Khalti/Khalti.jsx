import React, { useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";

const Khalti = () => {
  let checkout = new KhaltiCheckout(config);
  return (
    <div className="flex justify-center">
      <button
        onClick={() => checkout.show({ amount: 1000 })}
        className="bg-purple-700 p-4 text-white cursor:pointer font-bold border-2 text-4xl rounded-xl"
      >
        Pay with Khalti
      </button>
    </div>
  );
};

export default Khalti;
