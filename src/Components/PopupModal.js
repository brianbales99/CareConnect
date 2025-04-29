// src/components/PopupModal.js
import React from "react";
import "./PopupModal.css";

export default function PopupModal({ isOpen, title, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">{title}</h2>
        <div className="popup-body">
          {children}
        </div>
        <button onClick={onClose} className="popup-close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
