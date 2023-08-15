import React from "react";
import ReactDom from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "#99CCFF",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className="rounded-3xl shadow-2xl">
        <button
          className="bg-red-400 p-6  rounded-tr-3xl rounded-bl-3xl shadow-2xl w-[200x] h-[100px] text-5xl text-white"
          style={{ marginLeft: "97.3%", marginTop: "" }}
          onClick={onClose}
        >
          {" "}
          X{" "}
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
