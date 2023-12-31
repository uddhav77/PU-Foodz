import mykey from "./khaltiKey";
let config = {
  // replace this key with yours
  publicKey: mykey.publicTestkey,
  productIdentity: "1234567890",
  productName: "HungerHub",
  productUrl: "http://localhost:5173",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
